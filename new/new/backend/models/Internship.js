import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ['internship', 'job'], default: 'internship' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postedAt: { type: Date, default: Date.now },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Student IDs
  
}
);

const Internship=mongoose.model('Internship', internshipSchema);
export default Internship;
