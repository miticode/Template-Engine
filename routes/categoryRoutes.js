import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory, getProductsByCategory } from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);
router.get('/:id/products', getProductsByCategory); 

export default router;