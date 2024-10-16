// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import categoryRoutes from './routes/categoryRoutes.js'; 
import productRoutes from './routes/productRoutes.js';  
import authRoutes from './routes/authRoutes.js';
import { engine } from 'express-handlebars';
import adminRoutes from './routes/adminRoutes.js';
import { protect } from './middleware/authMiddleware.js';
import './handlebarsHelpers.js'; // Import helper

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method')); // Đảm bảo dòng này tồn tại

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/dashboard', protect, adminRoutes);

app.engine('.hbs', engine({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
  if (!req.cookies.token) {
    return res.redirect('/login');
  }
  res.redirect('/dashboard');
});

app.get('/login', (req, res) => {
  res.render('login', { layout: 'main', isLoginPage: true });
});

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });