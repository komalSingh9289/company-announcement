import db from "../config/db.js";

const Announcement = {
  getAll: (callback) => db.query("SELECT * FROM announcements", callback),

  getById: (id, callback) =>
    db.query("SELECT * FROM announcements WHERE id = ?", [id], callback),

  create: (announcement, callback) =>
    db.query("INSERT INTO announcements SET ?", announcement, callback),

  update: (id, announcement, callback) =>
    db.query(
      "UPDATE announcements SET ? WHERE id = ?",
      [announcement, id],
      callback
    ),

  delete: (id, callback) =>
    db.query("DELETE FROM announcements WHERE id = ?", [id], callback),

search: (query, callback) => {
  const sql = 'SELECT * FROM announcements WHERE title LIKE ? OR description LIKE ?';
  const values = [`%${query}%`, `%${query}%`];
  db.query(sql, values, callback);
}
};

export default Announcement;
