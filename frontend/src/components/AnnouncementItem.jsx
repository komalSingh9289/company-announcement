import { Edit2, Trash2, Calendar } from 'lucide-react';
import React from 'react';
const AnnouncementItem = ({ announcement, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex-1">
          {announcement.title}
        </h3>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(announcement)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Edit announcement"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(announcement.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete announcement"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div
        className="text-gray-600 mb-4 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={createMarkup(announcement.description)}
      />

      <div className="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
        <Calendar size={14} className="mr-2" />
        <span>Created: {formatDate(announcement.created_at)}</span>
       
      </div>
    </div>
  );
};

export default AnnouncementItem;
