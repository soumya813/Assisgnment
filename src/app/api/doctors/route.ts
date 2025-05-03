import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Doctor } from '../../../models/Doctor';

// MongoDB connection
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables');
      }
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// GET /api/doctors
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const location = searchParams.get('location');
    const minExperience = searchParams.get('minExperience');
    const maxFee = searchParams.get('maxFee');
    const language = searchParams.get('language');
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Number(searchParams.get('limit')) || 5;

    let filter: any = {};
    if (specialty) filter.specialty = specialty;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (minExperience) filter.experience = { $gte: Number(minExperience) };
    if (maxFee) filter.fee = { $lte: Number(maxFee) };
    if (language) filter.languages = { $regex: language, $options: 'i' };

    const total = await Doctor.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    
    const doctors = await Doctor.find(filter)
      .sort({ rating: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ 
      doctors,
      page,
      limit,
      total,
      totalPages
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/doctors
export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const doctor = new Doctor(data);
    await doctor.save();
    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}