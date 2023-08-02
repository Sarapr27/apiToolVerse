require("dotenv").config();
const Product = require("../db");
const cloudinary = require("cloudinary").v2;

const postCloudinary = async (req, res) => {
  try {
    const fileStr = req.body.image;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "upload_toolverse", // Reemplaza por tu upload preset de Cloudinary
    });

    const image = uploadedResponse.secure_url;

    // Encuentra el producto por su id y actualiza el campo "image"
    const productId = req.body.productId;
    await Product.update(
      { image: image }, // Cambia "imageURL" por "image"
      { where: { id: productId } } // Condición para encontrar el producto
    );

    res.json({ url: image });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
};

module.exports = { postCloudinary };
