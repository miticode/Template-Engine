import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const productExists = await Product.findOne({ name });
    if (productExists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = new Product({ name, price, category, description });
    await product.save();

    const populatedProduct = await Product.findById(product._id).populate(
      "category",
      "name"
    );

    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists)
        return res.status(400).json({ message: "Invalid category" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, description },
      { new: true, runValidators: true }
    ).populate("category");

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
