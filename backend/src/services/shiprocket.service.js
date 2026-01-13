const Order = require("../models/order.model");

let shiprocketToken = null;
let tokenExpiry = null;

async function getShiprocketToken() {
  // reuse token if valid
  if (shiprocketToken && tokenExpiry > Date.now()) {
    return shiprocketToken;
  }

  const res = await fetch(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to authenticate with Shiprocket");
  }

  const data = await res.json();

  shiprocketToken = data.token;
  tokenExpiry = Date.now() + 9 * 24 * 60 * 60 * 1000; // ~9 days

  return shiprocketToken;
}

 

async function createShiprocketOrder(orderId) {
  const order = await Order.findById(orderId)
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress").populate("user");
    console.log("🟢 ORDER CHECK");
console.log({
  orderId: order._id,
  userEmail: order.user?.email,
  hasShippingAddress: !!order.shippingAddress,
  shippingAddress: order.shippingAddress
});


  if (!order) throw new Error("Order not found");

  const token = await getShiprocketToken();
console.log("🟢 ADDRESS FIELDS CHECK");
console.log({
  firstName: order.shippingAddress?.firstName,
  lastName: order.shippingAddress?.lastName,
  street: order.shippingAddress?.streetAddress,
  city: order.shippingAddress?.city,
  state: order.shippingAddress?.state,
  pincode: order.shippingAddress?.zipCode,
  phone: order.shippingAddress?.mobile,
});

  const payload = {
    order_id: order._id.toString(),
    order_date: new Date().toISOString().split("T")[0],
    pickup_location: "Primary", // must exist in Shiprocket
    billing_customer_name: order.shippingAddress.firstName,
    billing_last_name: order.shippingAddress.lastName || "",
    billing_address: order.shippingAddress.streetAddress,
    billing_city: order.shippingAddress.city,
    billing_pincode: order.shippingAddress.zipCode,
    billing_state: order.shippingAddress.state,
    billing_country: "India",
    billing_email: order.user.email,
    billing_phone: order.shippingAddress.mobile,

  shipping_customer_name: order.shippingAddress.firstName,
  shipping_last_name: order.shippingAddress.lastName || "",
  shipping_address: order.shippingAddress.streetAddress,
  shipping_city: order.shippingAddress.city,
  shipping_pincode: order.shippingAddress.zipCode,
  shipping_state: order.shippingAddress.state,
  shipping_country: "India",
  shipping_phone: order.shippingAddress.mobile,


    shipping_is_billing: true,

    order_items: order.orderItems.map(item => ({
      name: item.product.title,
      sku: item.product._id.toString(),
      units: item.quantity,
      selling_price: item.discountedPrice,
    })),

    payment_method: "Prepaid",
    sub_total: order.totalDiscountedPrice,
    length: 10,
    breadth: 10,
    height: 5,
    weight: 0.5
  };
console.log("📦 SHIPROCKET PAYLOAD (SANITY CHECK)");
console.log(JSON.stringify({
  pickup_location: payload.pickup_location,
  billing_address: payload.billing_address,
  billing_city: payload.billing_city,
  billing_pincode: payload.billing_pincode,
  shipping_address: payload.shipping_address,
  shipping_city: payload.shipping_city,
  shipping_pincode: payload.shipping_pincode,
  order_items_count: payload.order_items.length,
}, null, 2));

  const res = await fetch(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }
  );

//   if (!res.ok) {
//     const error = await res.text();
//     throw new Error(`Shiprocket order failed: ${error}`);
//   }

  const data = await res.json();


console.log("🚀 Shiprocket response:", JSON.stringify(data, null, 2));

if (!data.shipment_id) {
  throw new Error(
    `Shiprocket rejected order: ${JSON.stringify(data)}`
  );
}


  // save shipment info
  order.shipment = {
    provider: "SHIPROCKET",
    orderId: data.order_id,
    shipmentId: data.shipment_id,
    awb: data.awb_code,
    courier: data.courier_name,
    status: "CREATED"
  };

  await order.save();
  return order;
}

module.exports = { getShiprocketToken,createShiprocketOrder };
