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

// POST /api/doctors/seed
export async function POST() {
  try {
    await connectDB();
    await Doctor.deleteMany({});
    
    const seedDoctors = [
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
      {
        name: 'Dr. C Patel',
        specialty: 'Internal Medicine',
        experience: 15,
        location: 'Ahmedabad',
        rating: 4.8,
        image: '',
        languages: ['English', 'Gujarati', 'Hindi'],
        fee: 600,
      },
      {
        name: 'Dr. D Reddy',
        specialty: 'General Physician',
        experience: 10,
        location: 'Hyderabad',
        rating: 4.6,
        image: '',
        languages: ['English', 'Telugu'],
        fee: 450,
      },
      {
        name: 'Dr. E Singh',
        specialty: 'Internal Medicine',
        experience: 9,
        location: 'Chandigarh',
        rating: 4.4,
        image: '',
        languages: ['English', 'Punjabi', 'Hindi'],
        fee: 480,
      },
      {
        name: 'Dr. F Khan',
        specialty: 'General Physician',
        experience: 7,
        location: 'Lucknow',
        rating: 4.3,
        image: '',
        languages: ['English', 'Hindi', 'Urdu'],
        fee: 420,
      },
      {
        name: 'Dr. G Mehta',
        specialty: 'Internal Medicine',
        experience: 11,
        location: 'Bangalore',
        rating: 4.7,
        image: '',
        languages: ['English', 'Kannada', 'Hindi'],
        fee: 550,
      },
      {
        name: 'Dr. H Das',
        specialty: 'General Physician',
        experience: 13,
        location: 'Kolkata',
        rating: 4.9,
        image: '',
        languages: ['English', 'Bengali', 'Hindi'],
        fee: 530,
      }
    ];

    await Doctor.insertMany(seedDoctors);
    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}