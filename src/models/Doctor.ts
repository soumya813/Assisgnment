import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: Number,
  location: String,
  rating: Number,
  image: String,
  languages: [String],
  fee: Number,
});

export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);