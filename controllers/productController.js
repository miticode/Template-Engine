import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    console.log('Request Body:', req.body); // Thêm dòng này để kiểm tra giá trị của req.body

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid product name' });
    }

    const product = new Product({ name, price, category, description, image });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const { name, price, category, description, image } = req.body;

    console.log('Request Body:', req.body); // Thêm dòng này để kiểm tra giá trị của req.body

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid product name' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, description, image },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
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
