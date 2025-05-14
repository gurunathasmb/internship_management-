import mongoose from 'mongoose';
 const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
 //93tqzhM0hM9Zx9T1
 // mongodb+srv://gayathrirv21:93tqzhM0hM9Zx9T1@cluster0.o3hpbzb.mongodb.net/



 //Ev8dCMLptKfwS1QB


 //mongodb+srv://gayathrirv21:Ev8dCMLptKfwS1QB@cluster0.lk77q8d.mongodb.net/