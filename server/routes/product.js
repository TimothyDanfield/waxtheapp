const express = require("express");
const Product = require("../models/Product");
const verifyToken = require("../middleware/auth");
const upload = require("../middleware/multer");
const User = require("../models/User");
const verifyRole = require("../middleware/role");
const deleteProductImage = require("../utils/deleteProductImage");
const { validateBodyParams } = require("../middleware/ErrorHandler");
const cloudinary = require("../middleware/cloudinary");

const router = express.Router()

const populateProductOwnder = {
    path: "productOwner",
    select: "email"
}

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const productList = await Product.find().populate(populateProductOwnder)
            return res.status(200).json(productList)
        } catch (error) {
            console.log(error)
        }
    })

    .post(verifyToken, upload.single("file"), async (req, res, next) => {
        const { name, price, description } = req.body
        if (
            name === "undefined" ||
            price === "undefined" ||
            description === "undefined"
        ) {
            return res.status(400).send({ Error: "Add new product canceled" })
        }

        if (!req.file) {
            return res.status(400).send({ Error: "Please include a product image" })
        }

        const { path, originalname, mimetype } = req.file
        if (!(name && price && description)) {
            return res.status(422).send({ Error: "Please fill out all required fields" })
        } else {
            const checkForProduct = await Product.findOne({ name })
            if (checkForProduct) {
                return res.status(409).send({ Error: "A product with that name already exists" })
            } else {
                try {
                    const b64 = Buffer.from(req.file.buffer).toString("base64")
                    let dataURI = "data:" + req.file.mimetype + ";base64," + b64
                    const imageResult = await cloudinary.uploader.upload(dataURI, {
                        public_id: name,
                        resource_type: "auto"
                    })

                    const newProduct = await Product.create({
                        name,
                        price,
                        description,
                        photo: {
                            name: originalname,
                            path: imageResult.secure_url,
                            contentType: mimetype,
                            cloudinaryId: imageResult.public_id,
                        },
                        productOwner: req.user.user_id
                    })
                    console.log(newProduct)
                    return res.status(201).send(newProduct)
                } catch (error) {
                    console.log(error)
                    res.send({ message: error.message })
                }
            }
        }
    })


router
    .route("/:id")
    .get(async (req, res, next) => {
        const { id } = req.params
        if (!id) {
            return res.status(500).send({ Error: "No product ID provided" })
        }

        try {
            const product = await Product.findById(id)
            if (!product) {
                return res.status(400).send({ Error: "Product not found" })
            } else {
                return res.status(200).send(product)
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    .patch(async (req, res, next) => {
        const { id } = req.params
        const userId = req.user.user_id
        const { name, price, description } = req.body

        if (!id) {
            return res.status(409).send({ Error: "No product ID provided" })
        }

        try {
            let product = await Product.findById(id)

            const checkIsAdmin = await User.findOne({ _id: userId })
            if(checkIsAdmin.role !== "admin") {
                return res.status(401).json({ Error: "Not Authorized" })
            }
            if (req.file) {
                const { path, originalname, mimetype } = req.file;

                //upload image to cloudinary
                const imageResult = await cloudinary.uploader.upload(path, {
                    public_id: name, // keep product name in cloudinary file name.
                    overwrite: true,
                    transformation: [
                        {
                            dpr: "auto",
                            responsive: true,
                            width: "auto",
                            crop: "scale",
                            fetch_format: "webp",
                        },
                        {
                            border: "3px_solid_rgb:00390b",
                            radius: 20,
                        },
                    ],
                });

                if (imageResult) {
                    const updateProduct = await Product.findByIdAndUpdate(
                        id,
                        {
                            name,
                            price,
                            description,
                            category,
                            quantity,
                            photo: {
                                name: originalname,
                                path: imageResult.secure_url,
                                contentType: mimetype,
                                cloudinaryId: imageResult.public_id,
                            },
                        }
                    );
                    return res.status(200).send(updateProduct);
                } else {
                    res.status(500).json({ error: "Something went wrong." });
                }
            }

            if (price) {
                product.price = price;
            }
            if (description) {
                product.description = description;
            }

            if (quantity) {
                product.quantity = quantity;
            }

            if (name) {
                product.name = name;
            }
            if (category) {
                product.category = category;
            }

            await product.save();
            product = product.toJSON();
            return res.status(200).json(product);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: "Something went wrong" });
        }
    })

    .delete(verifyToken, async (req, res, next) => {
        const { id } = req.params;
        const userId = req.user.user_id;

        const checkIsAdmin = await User.findById({ _id: userId });

        if (checkIsAdmin.role !== "admin") {
            return res.status(401).json({ error: "Not Authorized." });
        } else if (!id) {
            return res.status(409).send({ error: "No product ID provided" });
        } else {
            try {
                const deleteProduct = await Product.findByIdAndDelete(id);
    
                await deleteProductImage(deleteProduct);
    
                return res.status(200).send(deleteProduct);
            } catch (error) {
                console.log(error);
                return res.status(500).send({ error: "Something went wrong" });
            }
        }
    }
    );

module.exports = router