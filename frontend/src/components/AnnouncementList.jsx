import React, { useContext, useEffect, useState } from "react";
import AnnouncementItem from "./AnnouncementItem";
import axios from "axios";
import { AnnouncementContext } from "../context/Announcement-context";

export default function AnnouncementList({ onEdit }) {
  const [loading, setLoading] = useState(true);
   const {
      announcements,
      getAnnouncements,
      createAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
    } = useContext(AnnouncementContext);

  const loadAnnouncements = async () => {
    await getAnnouncements();
    setLoading(false);
  
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    await deleteAnnouncement(id);
    await getAnnouncements(); // Fetch updated list after deletion
  };

  return (
    <div className=" p-6">
      {loading ? (
        <div className="text-center text-gray-500">Loading announcements...</div>
      ) : announcements.length === 0 ? (
        <div className="text-center text-gray-500">No announcements available.</div>
      ) : (
        <div className="space-y-6">
          {announcements.map((item) => (
            <AnnouncementItem
              key={item.id}
              announcement={item}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
