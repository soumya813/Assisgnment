"use client";

import React, { useEffect, useState } from 'react';
import Header from './Header';

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  experience: number;
  location: string;
  rating: number;
  image: string;
  languages: string[];
  fee: number;
}

export default function GeneralPhysicianPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState({
    location: '',
    minExperience: '',
    maxFee: '',
    language: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    experience: '',
    location: '',
    rating: '',
    image: '',
    languages: '',
    fee: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAndSeed = async () => {
      setLoading(true);
      const res = await fetch('http://localhost:4000/api/doctors');
      const data = await res.json();
      // Only seed if doctors array exists and is empty
      if (data && Array.isArray(data.doctors) && data.doctors.length === 0) {
        await fetch('http://localhost:4000/api/doctors/seed', { method: 'POST' });
        await fetchDoctors();
      } else if (data && Array.isArray(data.doctors)) {
        setDoctors(data.doctors);
      } else if (Array.isArray(data)) {
        setDoctors(data);
      } else {
        setDoctors([]);
      }
      setLoading(false);
    };
    checkAndSeed();
  }, []);

  const fetchDoctors = async (filterParams = {}) => {
    const params = new URLSearchParams(filterParams as any).toString();
    const res = await fetch(`http://localhost:4000/api/doctors?${params}`);
    const data = await res.json();
    if (data && Array.isArray(data.doctors)) {
      setDoctors(data.doctors);
    } else if (Array.isArray(data)) {
      setDoctors(data);
    } else {
      setDoctors([]);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDoctors(filters);
  };

  const handleAddDoctorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('http://localhost:4000/api/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newDoctor,
        experience: Number(newDoctor.experience),
        rating: Number(newDoctor.rating),
        fee: Number(newDoctor.fee),
        languages: newDoctor.languages.split(',').map(l => l.trim()),
      }),
    });
    setShowAddForm(false);
    setNewDoctor({ name: '', specialty: '', experience: '', location: '', rating: '', image: '', languages: '', fee: '' });
    setLoading(false);
    // Always fetch first page with no filters to show the new doctor
    fetchDoctors();
  };

  return (
    <>
      <Header />
      {/* Specialty Banner */}
      <section className="relative bg-gradient-to-r from-blue-200 via-white to-green-100 py-12 px-4 mb-10 rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-100 opacity-40 rounded-b-full blur-2xl z-0"></div>
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-2/3 h-24 bg-green-100 opacity-30 rounded-t-full blur-2xl z-0"></div>
        <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 drop-shadow-lg tracking-tight animate-fade-in">General Physician / Internal Medicine</h1>
        <p className="relative z-10 text-lg md:text-xl text-gray-700 mb-6 font-medium max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.1s'}}>Consult with top General Physicians and Internal Medicine specialists for all your health concerns. Book appointments, view profiles, and filter by experience, language, and more.</p>
        <div className="relative z-10 flex gap-4 flex-wrap justify-center animate-fade-in" style={{animationDelay: '0.2s'}}>
          <span className="inline-block bg-blue-200 text-blue-900 font-semibold px-5 py-2 rounded-full shadow-md border border-blue-300">Verified Doctors</span>
          <span className="inline-block bg-green-200 text-green-900 font-semibold px-5 py-2 rounded-full shadow-md border border-green-300">Instant Booking</span>
          <span className="inline-block bg-yellow-100 text-yellow-800 font-semibold px-5 py-2 rounded-full shadow-md border border-yellow-200">24x7 Availability</span>
        </div>
      </section>
      <main className="container mx-auto px-4">
        {/* Filters */}
        <form className="mb-8 flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow" onSubmit={handleFilterSubmit}>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Location</label>
            <input name="location" value={filters.location} onChange={handleFilterChange} placeholder="Location" className="border p-2 rounded w-40" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Min Experience</label>
            <input name="minExperience" value={filters.minExperience} onChange={handleFilterChange} placeholder="Years" type="number" className="border p-2 rounded w-32" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Max Fee</label>
            <input name="maxFee" value={filters.maxFee} onChange={handleFilterChange} placeholder="Fee" type="number" className="border p-2 rounded w-32" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Language</label>
            <input name="language" value={filters.language} onChange={handleFilterChange} placeholder="Language" className="border p-2 rounded w-32" />
          </div>
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded font-semibold">Apply Filters</button>
          <button type="button" onClick={() => setShowAddForm(true)} className="bg-green-700 text-white px-6 py-2 rounded font-semibold ml-auto">Add Doctor</button>
          {loading && <span className="ml-2">Loading...</span>}
        </form>
        {/* Add Doctor Form */}
        {showAddForm && (
          <form className="mb-8 flex flex-wrap gap-4 bg-gray-50 p-6 rounded-lg shadow-lg form-pop" onSubmit={handleAddDoctor}>
            <input name="name" value={newDoctor.name} onChange={handleAddDoctorChange} placeholder="Name" className="border p-2 rounded w-48" required />
            <input name="specialty" value={newDoctor.specialty} onChange={handleAddDoctorChange} placeholder="Specialty" className="border p-2 rounded w-48" required />
            <input name="experience" value={newDoctor.experience} onChange={handleAddDoctorChange} placeholder="Experience (years)" type="number" className="border p-2 rounded w-32" required />
            <input name="location" value={newDoctor.location} onChange={handleAddDoctorChange} placeholder="Location" className="border p-2 rounded w-32" required />
            <input name="rating" value={newDoctor.rating} onChange={handleAddDoctorChange} placeholder="Rating" type="number" step="0.1" className="border p-2 rounded w-32" required />
            <input name="fee" value={newDoctor.fee} onChange={handleAddDoctorChange} placeholder="Fee" type="number" className="border p-2 rounded w-32" required />
            <input name="languages" value={newDoctor.languages} onChange={handleAddDoctorChange} placeholder="Languages (comma separated)" className="border p-2 rounded w-48" required />
            <input name="image" value={newDoctor.image} onChange={handleAddDoctorChange} placeholder="Image URL" className="border p-2 rounded w-48" />
            <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded font-semibold">Save</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-400 text-white px-6 py-2 rounded font-semibold">Cancel</button>
          </form>
        )}
        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc, idx) => (
            <div key={doc._id} className="bg-white border rounded-xl p-6 shadow-lg flex flex-col items-center hover:shadow-2xl transition card-glow fade-in" style={{ animationDelay: `${idx * 0.08}s` }}>
              <img src={doc.image || 'https://www.apollo247.com/images/doctors/doctor-default.png'} alt={doc.name} className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-200" />
              <h3 className="font-bold text-xl text-blue-900 mb-1">{doc.name}</h3>
              <div className="text-blue-700 font-medium mb-1">{doc.specialty}</div>
              <div className="text-gray-600 text-sm mb-1">{doc.experience} yrs experience</div>
              <div className="text-gray-600 text-sm mb-1">{doc.location}</div>
              <div className="text-gray-600 text-sm mb-1">Languages: {doc.languages.join(', ')}</div>
              <div className="text-yellow-500 font-semibold mb-1">★ {doc.rating}</div>
              <div className="text-green-700 font-bold text-lg mb-2">₹{doc.fee}</div>
              <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold w-full bounce-btn">Book Appointment</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
