import express from 'express';
import { 
  adminDashboard, 
  listCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory, 
  listProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  newCategoryForm,
  editCategoryForm,
  newProductForm,
  editProductForm
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getProductsByCategory } from '../controllers/categoryController.js'; // Import phương thức mới

const router = express.Router();

router.get('/', protect, adminDashboard);
router.get('/categories', protect, listCategories);
router.get('/categories/new', protect, newCategoryForm);
router.post('/categories', protect, createCategory);
router.get('/categories/:id/edit', protect, editCategoryForm);
router.put('/categories/:id', protect, updateCategory);
router.delete('/categories/:id', protect, deleteCategory);
router.get('/categories/:id/products', protect, getProductsByCategory); // Route mới

router.get('/products', protect, listProducts);
router.get('/products/new', protect, newProductForm);
router.post('/products', protect, createProduct);
router.get('/products/:id/edit', protect, editProductForm);
router.put('/products/:id', protect, updateProduct); 
router.delete('/products/:id', protect, deleteProduct);

export default router;