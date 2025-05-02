require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/doctors');

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

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
const Doctor = mongoose.model('Doctor', doctorSchema);

// List doctors with filters and pagination
app.get('/api/doctors', async (req, res) => {
  const { specialty, location, minExperience, maxFee, language, page = 1, limit = 10 } = req.query;
  let filter = {};
  if (specialty) filter.specialty = specialty;
  if (location) filter.location = location;
  if (minExperience) filter.experience = { $gte: Number(minExperience) };
  if (maxFee) filter.fee = { $lte: Number(maxFee) };
  if (language) filter.languages = language;
  const skip = (Number(page) - 1) * Number(limit);
  const total = await Doctor.countDocuments(filter);
  const doctors = await Doctor.find(filter).skip(skip).limit(Number(limit));
  res.json({ total, page: Number(page), limit: Number(limit), doctors });
});

// Add a new doctor
app.post('/api/doctors', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Seed doctors (for demo)
app.post('/api/doctors/seed', async (req, res) => {
  await Doctor.deleteMany({});
  await Doctor.insertMany([
    {
      name: 'Dr. A Sharma',
      specialty: 'General Physician',
      experience: 12,
      location: 'Delhi',
      rating: 4.7,
      image: '',
      languages: ['English', 'Hindi'],
      fee: 500,
    },
    {
      name: 'Dr. B Verma',
      specialty: 'General Physician',
      experience: 8,
      location: 'Mumbai',
      rating: 4.5,
      image: '',
      languages: ['English', 'Marathi'],
      fee: 400,
    },
    // Add more sample doctors as needed
  ]);
  res.send('Seeded');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
