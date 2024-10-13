import Category from '../models/Category.js';
import Product from '../models/Product.js';

export const adminDashboard = (req, res) => {
  res.render('admin/dashboard');
};

export const listCategories = async (req, res) => {
  const categories = await Category.find();
  res.render('admin/categories', { categories });
};

export const newCategoryForm = (req, res) => {
  res.render('admin/newCategory');
};

export const editCategoryForm = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render('admin/editCategory', { category });
};

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = new Category({ name, description });
  await category.save();
  res.redirect('/dashboard/categories');
};

export const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  await Category.findByIdAndUpdate(req.params.id, { name, description });
  res.redirect('/dashboard/categories');
};

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  await Product.deleteMany({ category: categoryId });
  await Category.findByIdAndDelete(categoryId);
  res.json({ success: true });
};

export const listProducts = async (req, res) => {
  const products = await Product.find().populate('category');
  res.render('admin/products', { products });
};

export const newProductForm = async (req, res) => {
  const categories = await Category.find();
  res.render('admin/newProduct', { categories });
};

export const editProductForm = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  const categories = await Category.find();
  res.render('admin/editProduct', { product, categories });
};

export const createProduct = async (req, res) => {
  const { name, price, category, description, isFeature } = req.body;

  // Validation
  if (!name || !price || !category || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (!/^[a-zA-Z\s\/]+$/.test(name)) {
    return res.status(400).json({ message: 'Invalid product name' });
  }
  if (price < 0 || price > 999.999) {
    return res.status(400).json({ message: 'Price must be between 0 and 999.999' });
  }

  const productExists = await Product.findOne({ name });
  if (productExists) {
    return res.status(400).json({ message: 'Product name must be unique' });
  }

  const product = new Product({ name, price, category, description, isFeature });
  await product.save();
  res.redirect('/dashboard/products');
};

export const updateProduct = async (req, res) => {
  const { name, price, category, description, isFeature } = req.body;

  // Validation
  if (!name || !price || !category || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (!/^[a-zA-Z\s\/]+$/.test(name)) {
    return res.status(400).json({ message: 'Invalid product name' });
  }
  if (price < 0 || price > 999.999) {
    return res.status(400).json({ message: 'Price must be between 0 and 999.999' });
  }

  await Product.findByIdAndUpdate(req.params.id, { name, price, category, description, isFeature });
  res.redirect('/dashboard/products');
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};