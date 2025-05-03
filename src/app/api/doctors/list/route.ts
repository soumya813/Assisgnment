import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Doctor } from '../../../../models/Doctor';

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

// GET /api/doctors/list
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 5;  // Default to 5 items per page
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
        hasPrevPage: page > 1,
        limit
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}