import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Doctor } from '../../../../models/Doctor';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/doctors');
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// GET /api/doctors/list
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const total = await Doctor.countDocuments();
    const doctors = await Doctor.find().skip(skip).limit(limit);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      doctors,
      pagination: {
        currentPage: page,
        totalPages,
        totalDoctors: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}