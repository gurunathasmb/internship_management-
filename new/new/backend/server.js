import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/db.js';
import Internship from './models/Internship.js';
import internshipRoutes from './routes/internshipRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';


connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//console.log(process.env.MONGO_URI);
app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Internship Management API is running...');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`));

