import React, { useState, useContext, useEffect } from 'react';
import { Megaphone, Plus, Search } from 'lucide-react';
import AnnouncementForm from '../components/AnnouncementForm';
import AnnouncementList from '../components/AnnouncementList';
import { AnnouncementContext } from '../context/Announcement-context';

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
const [query, setQuery] = useState('');


  const {
    announcements,
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
     searchAnnouncements,
  } = useContext(AnnouncementContext);

  const handleCreateNew = () => {
    setEditingAnnouncement(null);
    setShowForm(true);
  };

const handleFormSubmit = async (formData) => {
  try {
    if (editingAnnouncement) {
      await updateAnnouncement(editingAnnouncement.id, formData);
    } else {
      await createAnnouncement(formData);
    }
    setShowForm(false);
    setEditingAnnouncement(null);
  } catch (error) {
    alert('Error submitting announcement');
    
  }
};


  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setShowForm(true);
  };

const handleSearch = (e) => {
  const value = e.target.value;
  setQuery(value);
  if (value.trim() !== "") {
    searchAnnouncements(value);
  } else {
    getAnnouncements(); 
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Megaphone size={32} className="text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Company Announcements
                </h1>
                <p className="text-gray-600">
                  Manage company-wide notifications and updates
                </p>
              </div>
            </div>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              New Announcement
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* search  */}
         <div className="flex justify-end mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search announcements..."
              value={query}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* announcement list */}

        {announcements.length > 0 ? (
          <AnnouncementList
            announcements={announcements}
            onEdit={handleEdit}
          />
        ) : (
          <p className="text-gray-500 text-center mt-10">No announcements yet.</p>
        )}
      </main>

      {showForm && (
        <AnnouncementForm
          announcement={editingAnnouncement}
          onClose={() => {
            setShowForm(false);
            setEditingAnnouncement(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
