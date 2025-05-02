"use client";

import React, { useEffect, useState } from 'react';
import Header from './Header';
import { FaUserMd, FaMapMarkerAlt, FaLanguage, FaStar, FaRegClock } from 'react-icons/fa';

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
      <section className="relative bg-gradient-to-r from-blue-300 via-white to-green-200 py-14 px-4 mb-12 rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-200 opacity-40 rounded-b-full blur-2xl z-0"></div>
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-2/3 h-24 bg-green-200 opacity-30 rounded-t-full blur-2xl z-0"></div>
        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold text-blue-900 mb-4 drop-shadow-2xl tracking-tight animate-fade-in">General Physician / Internal Medicine</h1>
        <p className="relative z-10 text-xl md:text-2xl text-gray-700 mb-8 font-medium max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.1s'}}>Consult with top General Physicians and Internal Medicine specialists for all your health concerns. Book appointments, view profiles, and filter by experience, language, and more.</p>
        <div className="relative z-10 flex gap-4 flex-wrap justify-center animate-fade-in" style={{animationDelay: '0.2s'}}>
          <span className="inline-block bg-blue-300/80 text-blue-900 font-semibold px-6 py-2 rounded-full shadow-lg border border-blue-400">Verified Doctors</span>
          <span className="inline-block bg-green-300/80 text-green-900 font-semibold px-6 py-2 rounded-full shadow-lg border border-green-400">Instant Booking</span>
          <span className="inline-block bg-yellow-200/90 text-yellow-800 font-semibold px-6 py-2 rounded-full shadow-lg border border-yellow-300">24x7 Availability</span>
        </div>
      </section>
      <main className="container mx-auto px-4 flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/4 mb-8 lg:mb-0 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 flex flex-col gap-8 sticky top-8 h-fit animate-fade-in border border-blue-100">
          <h2 className="text-xl font-bold text-blue-800 mb-2 flex items-center gap-2"><FaRegClock className="text-blue-400" /> Filter Doctors</h2>
          <form className="flex flex-col gap-5" onSubmit={handleFilterSubmit}>
            <div>
              <label className="text-sm font-medium mb-1">Location</label>
              <input name="location" value={filters.location} onChange={handleFilterChange} placeholder="Location" className="border p-2 rounded w-full bg-white/80" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1">Min Experience</label>
              <input name="minExperience" value={filters.minExperience} onChange={handleFilterChange} placeholder="Years" type="number" className="border p-2 rounded w-full bg-white/80" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1">Max Fee</label>
              <input name="maxFee" value={filters.maxFee} onChange={handleFilterChange} placeholder="Fee" type="number" className="border p-2 rounded w-full bg-white/80" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1">Language</label>
              <input name="language" value={filters.language} onChange={handleFilterChange} placeholder="Language" className="border p-2 rounded w-full bg-white/80" />
            </div>
            <button type="submit" className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-xl font-semibold mt-2 shadow-lg hover:scale-105 transition">Apply Filters</button>
            <button type="button" onClick={() => setShowAddForm(true)} className="bg-gradient-to-r from-green-600 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition">Add Doctor</button>
            {loading && <span className="ml-2">Loading...</span>}
          </form>
        </aside>
        {/* Main Content */}
        <section className="flex-1 flex flex-col gap-10">
          {/* Add Doctor Form */}
          {showAddForm && (
            <form className="mb-8 flex flex-wrap gap-4 bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl form-pop border border-blue-100" onSubmit={handleAddDoctor}>
              <input name="name" value={newDoctor.name} onChange={handleAddDoctorChange} placeholder="Name" className="border p-2 rounded w-48 bg-white/80" required />
              <input name="specialty" value={newDoctor.specialty} onChange={handleAddDoctorChange} placeholder="Specialty" className="border p-2 rounded w-48 bg-white/80" required />
              <input name="experience" value={newDoctor.experience} onChange={handleAddDoctorChange} placeholder="Experience (years)" type="number" className="border p-2 rounded w-32 bg-white/80" required />
              <input name="location" value={newDoctor.location} onChange={handleAddDoctorChange} placeholder="Location" className="border p-2 rounded w-32 bg-white/80" required />
              <input name="rating" value={newDoctor.rating} onChange={handleAddDoctorChange} placeholder="Rating" type="number" step="0.1" className="border p-2 rounded w-32 bg-white/80" required />
              <input name="fee" value={newDoctor.fee} onChange={handleAddDoctorChange} placeholder="Fee" type="number" className="border p-2 rounded w-32 bg-white/80" required />
              <input name="languages" value={newDoctor.languages} onChange={handleAddDoctorChange} placeholder="Languages (comma separated)" className="border p-2 rounded w-48 bg-white/80" required />
              <input name="image" value={newDoctor.image} onChange={handleAddDoctorChange} placeholder="Image URL" className="border p-2 rounded w-48 bg-white/80" />
              <button type="submit" className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition">Save</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-400 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition">Cancel</button>
            </form>
          )}
          {/* Doctor Cards Grid */}
          <div className="flex flex-col gap-6">
            {doctors.map((doc, idx) => (
              <div key={doc._id} className="relative bg-white/80 backdrop-blur-xl border border-blue-100 rounded-2xl shadow-2xl flex flex-row items-center hover:shadow-3xl transition card-glow fade-in group overflow-hidden min-h-[140px] max-h-[220px] p-4">
                {/* Badge - now inside card, above name */}
                <div className="flex flex-col items-center w-28 mr-6">
                  <img src={doc.image || 'https://www.apollo247.com/images/doctors/doctor-default.png'} alt={doc.name} className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 group-hover:scale-110 transition shadow-lg mb-1" />
                  {idx === 0 && (
                    <span className="mt-1 mb-1 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 text-yellow-900 font-extrabold px-3 py-1 rounded-full shadow text-xs z-10 animate-badge-pop ring-2 ring-yellow-300 ring-offset-2">DOCTOR OF THE HOUR</span>
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="font-bold text-lg text-blue-900 flex items-center gap-2"><FaUserMd className="text-blue-400" />{doc.name}</h3>
                  <div className="text-blue-700 font-medium flex items-center gap-2"><FaRegClock className="text-blue-300" />{doc.specialty}</div>
                  <div className="text-gray-600 text-xs flex items-center gap-2"><FaStar className="text-yellow-400" />{doc.experience} yrs experience</div>
                  <div className="text-gray-600 text-xs flex items-center gap-2"><FaMapMarkerAlt className="text-green-400" />{doc.location}</div>
                  <div className="text-gray-600 text-xs flex items-center gap-2"><FaLanguage className="text-blue-400" />{doc.languages.join(', ')}</div>
                  <div className="text-yellow-500 font-semibold flex items-center gap-1"><FaStar className="text-yellow-400" /> {doc.rating}</div>
                </div>
                {/* Price & Button */}
                <div className="flex flex-col items-end gap-2 min-w-[120px]">
                  <span className="bg-gradient-to-r from-green-200 to-green-400 text-green-900 font-bold px-4 py-1 rounded-full text-xs shadow-lg border border-green-300 mb-1">₹{doc.fee}</span>
                  <button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-4 py-2 rounded-xl font-bold bounce-btn shadow-lg text-xs transition">Consult Online</button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Help Section */}
        <aside className="hidden xl:flex flex-col gap-8 w-1/4 bg-gradient-to-br from-blue-100/80 to-green-100/80 rounded-2xl shadow-2xl p-8 h-fit sticky top-8 animate-fade-in border border-blue-100 items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/3208/3208720.png" alt="Help" className="w-24 h-24 mb-2 opacity-90" />
          <h2 className="text-xl font-bold text-blue-800 mb-2">Need Help?</h2>
          <p className="text-gray-700 text-center">Our support team is available 24x7 to assist you with booking, queries, and more.</p>
          <a href="#" className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-8 py-3 rounded-xl font-bold text-center shadow-lg transition">Chat with Support</a>
        </aside>
        {/* Floating Add Doctor Button (Mobile) */}
        <button type="button" onClick={() => setShowAddForm(true)} className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-green-600 to-blue-500 text-white p-5 rounded-full shadow-2xl lg:hidden flex items-center gap-2 text-lg font-bold animate-fade-in border-4 border-white/80">
          + Add Doctor
        </button>
      </main>
    </>
  );
}
