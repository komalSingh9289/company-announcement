import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/announcements";

  const getAnnouncements = async () => {
    try {
      const res = await axios.get(API_URL);
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Failed to fetch announcements", err);
    } finally {
      setLoading(false);
    }
  };

  const createAnnouncement = async (data) => {
    try {
      const res = await axios.post(API_URL, data);

      console.log("Server response:", res.data);

      if (!res.data.id || !res.data.title) {
        throw new Error("Incomplete data returned from server");
      }

      setAnnouncements((prev) => {
        const newState = [...prev, res.data];
        console.log("New announcements state:", newState);
        return newState;
      });

      alert("Announcement created successfully");
      return res.data;
    } catch (err) {
      console.error("Failed to create announcement", err);
      alert("Failed to create announcement");
      throw err;
    }
  };
  const updateAnnouncement = async (id, data) => {
    try {
      await axios.put(`${API_URL}/${id}`, data);
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...data } : a))
      );
    } catch (err) {
      console.error("Failed to update announcement", err);
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to delete announcement", err);
    }
  };

  const searchAnnouncements = async (q) => {
    // console.log("Searching announcements with query:", q);
    try {
      const res = await axios.get(`${API_URL}/search?query=${q}`);
      // console.log("Search results:", res.data);

      setAnnouncements(res.data);
    } catch (err) {
      console.error("Failed to search announcements", err);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        loading,
        getAnnouncements,
        createAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        searchAnnouncements,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};
