import React, { useContext, useState, useEffect } from 'react';
import { AnnouncementContext } from '../context/Announcement-context';
import RichTextEditor from '../components/RichTextEditor';
import { Save, X } from 'lucide-react';

const AnnouncementForm = ({ onClose, announcement }) => {
  const {
    createAnnouncement,
    updateAnnouncement,
  } = useContext(AnnouncementContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState({ error: null });

  useEffect(() => {
    if (announcement) {
      setTitle(announcement.title);
      setDescription(announcement.description);
    }
  }, [announcement]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title.trim() || !description.trim()) {
      setState({ error: 'All fields are required.' });
      setIsSubmitting(false);
      return;
    }

    try {
      if (announcement) {
        await updateAnnouncement(announcement.id, { title, description });
      } else {
        await createAnnouncement({ title, description });
      }
      onClose();
    } catch (err) {
      setState({ error: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {announcement ? 'Edit Announcement' : 'Create New Announcement'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-auto max-h-[calc(90vh-6rem)]">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter announcement title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Enter your announcement description with rich text formatting..."
            />
          </div>

          {state.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{state.error}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              {isSubmitting ? 'Saving...' : (announcement ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;
