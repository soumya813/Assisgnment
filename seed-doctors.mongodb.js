// Connect to your database
use('Cluster0');

// Drop existing collection if needed
db.doctors.drop();

// Insert the doctors data
db.doctors.insertMany([
  {
    name: 'Dr. A Sharma',
    specialty: 'General Physician',
    experience: 12,
    location: 'Delhi',
    rating: 4.7,
    image: '',
    languages: ['English', 'Hindi'],
    fee: 500
  },
  // ...existing doctor entries...
]);
