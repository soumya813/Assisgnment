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

interface FilterParams {
  location?: string;
  minExperience?: string;
  maxFee?: string;
  language?: string;
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

  useEffect(() => {
    const checkAndSeed = async () => {
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
    };
    checkAndSeed();
  }, []);

  const fetchDoctors = async (filterParams: FilterParams = {}) => {
    const params = new URLSearchParams(filterParams as Record<string, string>).toString();
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
    // Always fetch first page with no filters to show the new doctor
    fetchDoctors();
  };

  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto flex bg-[#fafbfc] min-h-[calc(100vh-120px)] pr-8 pl-8">
        {/* Sidebar Filters */}
        <aside className="w-[270px] border-r border-gray-200 bg-white py-8 px-6 flex-shrink-0 flex flex-col justify-between min-h-[calc(100vh-120px)]">
          <div>
            <button type="button" onClick={() => setShowAddForm(true)} className="w-full bg-green-700 text-white px-6 py-2 rounded font-semibold mb-6">Add Doctor</button>
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold text-gray-900">Filters</span>
              <button className="text-blue-600 text-sm font-semibold hover:underline" onClick={() => setFilters({ location: '', minExperience: '', maxFee: '', language: '' })}>Clear All</button>
            </div>
            {showAddForm && (
              <form className="mb-6 flex flex-col gap-3 bg-gray-50 p-4 rounded-lg shadow form-pop border border-blue-100" onSubmit={handleAddDoctor}>
                <input name="name" value={newDoctor.name} onChange={handleAddDoctorChange} placeholder="Name" className="border p-2 rounded" required />
                <input name="specialty" value={newDoctor.specialty} onChange={handleAddDoctorChange} placeholder="Specialty" className="border p-2 rounded" required />
                <input name="experience" value={newDoctor.experience} onChange={handleAddDoctorChange} placeholder="Experience (years)" type="number" className="border p-2 rounded" required />
                <input name="location" value={newDoctor.location} onChange={handleAddDoctorChange} placeholder="Location" className="border p-2 rounded" required />
                <input name="rating" value={newDoctor.rating} onChange={handleAddDoctorChange} placeholder="Rating" type="number" step="0.1" className="border p-2 rounded" required />
                <input name="fee" value={newDoctor.fee} onChange={handleAddDoctorChange} placeholder="Fee" type="number" className="border p-2 rounded" required />
                <input name="languages" value={newDoctor.languages} onChange={handleAddDoctorChange} placeholder="Languages (comma separated)" className="border p-2 rounded" required />
                <input name="image" value={newDoctor.image} onChange={handleAddDoctorChange} placeholder="Image URL" className="border p-2 rounded" />
                <div className="flex gap-2 mt-2">
                  <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded font-semibold">Save</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded font-semibold">Cancel</button>
                </div>
              </form>
            )}
            <form onSubmit={handleFilterSubmit} className="flex flex-col gap-6">
              <div>
                <div className="font-semibold text-gray-900 mb-2">Location</div>
                <input name="location" value={filters.location} onChange={handleFilterChange} placeholder="Location" className="border p-2 rounded w-full" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">Experience (In Years)</div>
                <input name="minExperience" value={filters.minExperience} onChange={handleFilterChange} placeholder="Min" type="number" className="border p-2 rounded w-full mb-2" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">Fees (In Rupees)</div>
                <input name="maxFee" value={filters.maxFee} onChange={handleFilterChange} placeholder="Max Fee" type="number" className="border p-2 rounded w-full" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">Language</div>
                <input name="language" value={filters.language} onChange={handleFilterChange} placeholder="Language" className="border p-2 rounded w-full" />
              </div>
              <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded font-semibold mt-2">Apply Filters</button>
            </form>
          </div>
        </aside>
        {/* Main Content */}
        <section className="flex-1 px-10 py-8">
          <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <span className="hover:underline cursor-pointer">Home</span>
            <span className="mx-1">›</span>
            <span className="hover:underline cursor-pointer">Doctors</span>
            <span className="mx-1">›</span>
            <span className="text-blue-700 font-semibold">General Physicians</span>
          </nav>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-1">Consult General Physicians Online - Internal Medicine Specialists</h1>
              <div className="text-gray-600 text-base">(762 doctors)</div>
            </div>
            <div>
              <button className="flex items-center border border-gray-300 rounded px-4 py-2 text-gray-700 font-semibold text-base bg-white hover:bg-gray-50">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3" /></svg>
                Relevance
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          </div>
          {/* Doctor Cards */}
          <div className="flex flex-col gap-6">
            {doctors.length === 0 && (
              <div className="text-center text-gray-500 py-8">No doctors found.</div>
            )}
            {doctors.map((doc, idx) => (
              <div key={doc._id} className="flex items-center bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-5 relative">
                {/* Doctor of the Hour badge - moved above card */}
                {idx === 0 && (
                  <span className="absolute -top-4 right-8 bg-[#b68c2a] text-white font-bold px-4 py-1 rounded text-xs tracking-wide shadow-lg z-20">DOCTOR OF THE HOUR</span>
                )}
                <img src={doc.image || 'https://www.apollo247.com/images/doctors/doctor-default.png'} alt={doc.name} className="w-20 h-20 rounded object-cover border border-gray-200" />
                <div className="ml-6 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg text-gray-900">{doc.name}</span>
                  </div>
                  <div className="text-gray-700 text-sm mb-1">{doc.specialty}</div>
                  <div className="text-[#6b21a8] text-xs font-bold mb-1">{doc.experience} YEARS</div>
                  <div className="text-gray-500 text-xs">{doc.location}</div>
                  <div className="text-gray-500 text-xs">{doc.languages && doc.languages.join(', ')}</div>
                </div>
                <div className="flex flex-col items-end min-w-[220px]">
                  <span className="font-bold text-2xl text-gray-900 mb-2">₹{doc.fee}</span>
                  <button className="w-full border-2 border-[#0096ff] text-[#0096ff] font-semibold rounded-lg px-8 py-2 bg-white hover:bg-blue-50 transition">Consult Online</button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Help Section */}
        <aside className="w-[300px] flex flex-col items-center justify-center px-6 py-8 bg-[#00214d] rounded-xl ml-8 mt-16 h-fit" style={{marginRight: 24}}>
          <img src="https://www.apollo247.com/images/doctors/doctor-default.png" alt="Help" className="w-24 h-24 rounded-full object-cover mb-4" />
          <div className="text-white text-lg font-semibold mb-2 text-center">Need help consult the right doctor?</div>
          <a href="#" className="text-blue-200 underline text-base font-medium text-center">Call +91-8040245807 to book instantly</a>
        </aside>
      </main>
      {/* Info + Related Links and FAQ Section Below Main Content */}
      <section className="max-w-[1100px] mx-auto bg-white rounded-xl shadow p-8 mt-10 mb-10 text-gray-900">
        <h2 className="font-bold text-lg mb-2">Book Consult for General Medicine Online</h2>
        <p className="mb-4">Booking an appointment with a top general physician (GP) is now easier than ever with <b>Apollo 24|7</b>. Our experienced doctors provide comprehensive care for a wide range of medical conditions, including <b>fever</b>, <b>allergies</b>, and diabetes. You can conveniently schedule an online general physician consultation or visit a trusted hospital/clinic near you. Our allergies doctor and diabetes doctor offer flexible appointment slots to suit your needs. With transparent general physician fees and genuine general physician reviews, you can make an informed decision when choosing your healthcare provider. Take charge of your health today by booking a doctor near your location by searching the phrase general physician near me.</p>
        <h3 className="font-bold mb-2">What is General Medicine?</h3>
        <p className="mb-4">General medicine is a medical speciality that focuses on the prevention, diagnosis, and treatment of internal diseases in adults. This speciality encompasses a wide range of acute and chronic conditions affecting various parts of the body, including fever, <b>asthma</b>, <b>heart disease</b>, liver problems, hypertension, and <b>neurological disorders</b>. General medicine plays a crucial role in healthcare by providing comprehensive medical care, managing complex conditions, and addressing multiple co-morbidities. General physicians are essential in preventive healthcare, early diagnosis, and the long-term management of chronic diseases, ultimately improving patient outcomes and quality of life.</p>
        <h3 className="font-bold mb-2">Who is a General Physician?</h3>
        <p className="mb-4">A general physician is a medical doctor who specialises in the diagnosis, treatment, and prevention of adult diseases. To become a general physician in the Indian subcontinent, one must complete an MBBS degree followed by postgraduate training in General Medicine or Internal Medicine. General physicians are trained to diagnose and treat a wide range of medical conditions, providing comprehensive care that includes preventive health measures, early detection of diseases, and long-term management of chronic conditions. They play a vital role in coordinating care when patients have multiple co-morbidities or complex presentations, making them essential in preventive healthcare.</p>
        <h3 className="font-bold mb-2">What Do General Physicians Do?</h3>
        <p className="mb-2">General physicians (GPs) are the first point of contact for patients seeking medical care. Some of the key responsibilities of doctors include:</p>
        <ul className="list-disc pl-8 mb-2">
          <li>Conducting thorough physical examinations and taking detailed medical histories to accurately diagnose health issues</li>
          <li>Ordering and interpreting diagnostic tests, such as blood work, imaging studies, and biopsies, to identify underlying conditions</li>
          <li>Developing personalised treatment plans that may include medications, lifestyle modifications, or referrals to specialists when necessary</li>
          <li>Providing preventive care, such as vaccinations and screenings, to help patients maintain optimal health and prevent the onset of diseases</li>
          <li>Educating patients about their health conditions, treatment options, and self-care strategies to promote better health outcomes</li>
          <li>Collaborating with other healthcare professionals, such as specialists and nurses, to ensure comprehensive and coordinated patient care</li>
        </ul>
        {/* Related Links and FAQ Section - merged, no gap */}
        <div className="mt-8">
          <div className="mb-8">
            <div className="flex flex-col gap-2">
              <a href="#" className="font-semibold text-black hover:underline flex items-center gap-1">General Physician/ Internal Medicine Specialists Available for online consults <svg className="w-4 h-4 inline text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0 0L10 21l-7-7L21 10z" /></svg></a>
              <a href="#" className="font-semibold text-black hover:underline flex items-center gap-1">Female General Physician/ Internal Medicine Specialists in top cities <svg className="w-4 h-4 inline text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0 0L10 21l-7-7L21 10z" /></svg></a>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-black">General Physician/ Internal Medicine Specialists in top cities</span>
                <svg className="w-4 h-4 text-gray-700 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-black">Related Treatments</span>
                <svg className="w-4 h-4 text-gray-700 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-black">Related Procedures</span>
                <svg className="w-4 h-4 text-gray-700 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="font-bold text-xl mb-4">FAQs</h2>
            <div className="divide-y divide-gray-200">
              {[
                'What is the role of a general physician or GP?',
                'When should I visit a general physician for a fever?',
                'Can a general physician help manage my diabetes?',
                'How can I book an appointment with a general physician near me?',
                'What is the average general physician fee for a consultation?',
                'How can I find reliable general physician reviews before booking an appointment?',
                'What should I expect during my first visit to a general physician?',
                'Can a general physician treat allergies?',
                'How often should I visit my general physician for check-ups?',
                'What are the qualifications required to become a general physician in India?'
              ].map((faq, i) => (
                <div key={i} className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50">
                  <span>{faq}</span>
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="w-full bg-[#fafbfc] border-t border-gray-200 py-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between px-8 gap-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <img src="https://newassets.apollo247.com/images/ic_logo.png" alt="Apollo 24/7" className="h-12 w-auto mb-2" />
          </div>
          {/* App Download */}
          <div className="flex flex-col items-center">
            <span className="font-bold text-base mb-2">Get Apollo Mobile App</span>
            <div className="flex gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 w-auto" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-12 w-auto" />
              </a>
            </div>
          </div>
          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end">
            <span className="font-bold text-base mb-2">Find Us</span>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" className="h-10 w-10 rounded-full bg-[#4267B2] p-2" /></a>
              <a href="#" aria-label="X"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X" className="h-10 w-10 rounded-full bg-black p-2" /></a>
              <a href="#" aria-label="LinkedIn"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" className="h-10 w-10 rounded-full bg-[#0077B5] p-2" /></a>
              <a href="#" aria-label="YouTube"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg" alt="YouTube" className="h-10 w-10 rounded-full bg-[#FF0000] p-2" /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
