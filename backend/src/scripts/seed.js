require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const User = require("../models/user.model");

const sampleCategories = [
  { name: "Men", level: 1 },
  { name: "Women", level: 1 },
  { name: "T-Shirts", level: 2, parentCategoryName: "Men" },
  { name: "Shirts", level: 2, parentCategoryName: "Men" },
  { name: "Jeans", level: 2, parentCategoryName: "Men" },
  { name: "T-Shirts", level: 2, parentCategoryName: "Women" },
  { name: "Dresses", level: 2, parentCategoryName: "Women" },
  { name: "Skirts", level: 2, parentCategoryName: "Women" },
];

const sampleProducts = [
  {
    title: "Classic White T-Shirt",
    description: "Comfortable cotton t-shirt perfect for everyday wear",
    price: 1299,
    discountedPrice: 999,
    discountPercent: 23,
    quantity: 50,
    brand: "E-commerce ",
    color: "White",
    sizes: [
      { name: "S", quantity: 10 },
      { name: "M", quantity: 15 },
      { name: "L", quantity: 15 },
      { name: "XL", quantity: 10 },
    ],
    imageUrl: "/assets/Frame 161.png",
    categoryName: "T-Shirts",
  },
  {
    title: "Blue Denim Jeans",
    description: "Stylish blue jeans with perfect fit",
    price: 2999,
    discountedPrice: 2399,
    discountPercent: 20,
    quantity: 30,
    brand: "E-commerce ",
    color: "Blue",
    sizes: [
      { name: "28", quantity: 5 },
      { name: "30", quantity: 10 },
      { name: "32", quantity: 10 },
      { name: "34", quantity: 5 },
    ],
    imageUrl: "/assets/Frame 2.png",
    categoryName: "Jeans",
  },
  {
    title: "Red Summer Dress",
    description: "Elegant red dress for summer occasions",
    price: 1999,
    discountedPrice: 1599,
    discountPercent: 20,
    quantity: 25,
    brand: "E-commerce ",
    color: "Red",
    sizes: [
      { name: "S", quantity: 8 },
      { name: "M", quantity: 9 },
      { name: "L", quantity: 8 },
    ],
    imageUrl: "/assets/Frame 3.png",
    categoryName: "Dresses",
  },
];

const sampleAdminUser = {
  firstName: "Admin",
  lastName: "User",
  firebaseUid: "admin-firebase-uid-sample",
  email: "admin@faltufashion.com",
  role: "ADMIN",
};

async function seedDatabase() {
  try {
    await connectDB();
    console.log("Connected to database");

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({ email: sampleAdminUser.email });

    console.log("Cleared existing data");

    // Seed categories
    const categoriesMap = {};
    for (const catData of sampleCategories) {
      let parentCategory = null;
      if (catData.parentCategoryName) {
        parentCategory = await Category.findOne({ name: catData.parentCategoryName });
      }

      const category = new Category({
        name: catData.name,
        level: catData.level,
        parentCategory: parentCategory ? parentCategory._id : null,
      });

      await category.save();
      categoriesMap[catData.name] = category;
      console.log(`Created category: ${catData.name}`);
    }

    // Seed products
    for (const prodData of sampleProducts) {
      const category = categoriesMap[prodData.categoryName];
      if (!category) {
        console.log(`Category not found for product: ${prodData.title}`);
        continue;
      }

      const product = new Product({
        ...prodData,
        category: category._id,
      });

      await product.save();
      console.log(`Created product: ${prodData.title}`);
    }

    // Seed admin user
    const adminUser = new User(sampleAdminUser);
    await adminUser.save();
    console.log(`Created admin user: ${sampleAdminUser.email}`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();