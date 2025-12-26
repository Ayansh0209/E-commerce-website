const { create } = require("../models/cartItem.model");
const Category = require("../models/category.model.js");
const Product = require("../models/product.model.js");

async function createProduct(reqData) {
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
    // top level (Men)
    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1
        })
        await topLevel.save();
    }
    // second level (T shirts , gym wear , etc )
    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id
    })
    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        })
        await secondLevel.save();
    }
    /*
        let thirdLevel = await Category.findOne({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
        })
        if (!thirdLevel) {
            thirdLevel = new Category({
                name: reqData.thirdLevelCategory,
                parentCategory: secondLevel._id,
                level: 3
            })
            await thirdLevel.save();
        }
            */
    const product = new Product({
        title: reqData.title,
        description: reqData.description,
        brand: reqData.brand,
        imageUrl: reqData.imageUrl,
        color: reqData.color,
        price: reqData.price,
        discountedPrice: reqData.discountedPrice,
        discountPercent: reqData.discountPercent,
        sizes: reqData.sizes,
        fit: reqData.fit,
        print: reqData.print,
        isBestSeller: reqData.isBestSeller || false,
        isNewArrival: reqData.isNewArrival || false,
        quantity: reqData.quantity,
        category: secondLevel._id,
    })

    return await product.save();

}

async function deleteProduct(productId) {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return "Product deleted Successfully";
}

async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(id) {
    const product = await Product.findById(id).populate("category").exec();

    if (!product) {
        throw new Error("Product not found with id " + id);
    }
    return product;
}

async function getAllProducts(reqQuery) {
    let {
        category,
        color,
        sizes,
        fit,
        print,
        isBestSeller,
        isNewArrival,
        minPrice,
        maxPrice,
        minDiscount,
        sort,
        stock,
        pageNumber,
        pageSize
    } = reqQuery;


    pageSize = pageSize || 10;

    let query = Product.find().populate("category");

    if (category) {
        const existCategory = await Category.findOne({ name: category });
        if (existCategory) {
            query = query.where("category").equals(existCategory._id);
        }
        else {
            return { content: [], currentPage: 1, totalPages: 0 }
        }
    }
    if (fit) {
        const fitSet = new Set(fit.split(",").map(v => v.trim()));
        query = query.where("fit").in([...fitSet]);
    }

    if (print) {
        const printSet = new Set(print.split(",").map(v => v.trim()));
        query = query.where("print").in([...printSet]);
    }

    if (isBestSeller === "true") {
        query = query.where("isBestSeller").equals(true);
    }

    if (isNewArrival === "true") {
        query = query.where("isNewArrival").equals(true);
    }


    if (color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));

        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

        query = query.where("color").regex(colorRegex);
    }

    if (sizes) {
        const sizeArray = sizes.split(",").map(s => s.trim());
        query = query.where("sizes.name").in(sizeArray);
    }


    if (minPrice && maxPrice) {
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
        query = query.where("discountPersent").gt(minDiscount)
    }

    if (stock === "in_stock") {
        query = query.where("quantity").gt(0);
    }
    else if (stock === "out_of_stock") {
        query = (await query.where("quantity")).gt(1);
    }

    // if (sort) {
    //     const sortDirection = sort === "price_hight?-1:1";
    //     query = query.sort({ discountedPrice: sortDirection });
    // }
    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }

    //const totalProducts = await Product.countDocuments(query);
    const totalProducts = await query.clone().countDocuments();

    const skip = (pageNumber - 1) * pageSize;

    query = query.skip(skip).limit(pageSize);

    const products = await query.exec();

    const totalPages = Math.ceil(totalProducts / pageSize);
    return { content: products, currentPage: pageNumber, totalPages };

}

async function createMultipleProducts(products) {
    for (let product of products) {
        await createProduct(product);
    }


}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    createMultipleProducts,
    findProductById
}
    ;