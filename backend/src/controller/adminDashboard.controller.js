const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

exports.getDashboardData = async (req, res) => {
  try {
    /* ---------------- TOTAL STATS ---------------- */

    const totalRevenueAgg = await Order.aggregate([
      { $match: { orderStatus: { $ne: "CANCELLED" } } },
      { $group: { _id: null, total: { $sum: "$totalDiscountedPrice" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const [
      totalOrders,
      totalProducts,
      totalCustomers,
    ] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      User.countDocuments(),
    ]);

    /* ---------------- LAST 24 HOURS ---------------- */

    const last24h = new Date();
    last24h.setHours(last24h.getHours() - 24);

    const ordersLast24h = await Order.countDocuments({
      createdAt: { $gte: last24h },
    });

    /* ---------------- REVENUE GRAPH (LAST 7 DAYS) ---------------- */

    const revenueChart = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          orderStatus: { $ne: "CANCELLED" },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%d %b", date: "$createdAt" },
          },
          revenue: { $sum: "$totalDiscountedPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    /* ---------------- RECENT ORDERS ---------------- */

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "email")
      .select("totalDiscountedPrice orderStatus user")
      .lean();

    res.json({
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCustomers,
        ordersLast24h,
      },
      revenueChart: revenueChart.map((r) => ({
        date: r._id,
        revenue: r.revenue,
      })),
      recentOrders: recentOrders.map((o) => ({
        _id: o._id,
        email: o.user?.email || "Guest",
        amount: o.totalDiscountedPrice,
        status: o.orderStatus,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "user",
          as: "orders",
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "address",
          foreignField: "_id",
          as: "addresses",
        },
      },
      {
        $project: {
          email: 1,
          mobile: 1,
          addresses: 1,
          ordersCount: { $size: "$orders" },
          totalSpent: {
            $sum: "$orders.totalDiscountedPrice",
          },
          orders: {
            $map: {
              input: "$orders",
              as: "o",
              in: {
                _id: "$$o._id",
                total: "$$o.totalDiscountedPrice",
                status: "$$o.orderStatus",
                createdAt: "$$o.createdAt",
              },
            },
          },
        },
      },
      { $sort: { totalSpent: -1 } },
    ]);

    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

