import Announcement from "../models/Announcement-model.js";

export const getAll = (req, res) => {
  Announcement.getAll((err, results) =>
    err ? res.status(500).send(err) : res.json(results)
  );
};

export const getById = (req, res) => {
  Announcement.getById(req.params.id, (err, result) =>
    err ? res.status(500).send(err) : res.json(result[0])
  );
};

export const create = (req, res) => {
  const { title, description } = req.body;
   const created_at = new Date(); // Get current timestamp
  Announcement.create({ title, description }, (err, result) => {
    if (err) res.status(500).send(err);
    else {

      res.status(201).json({ id: result.insertId, title, description, created_at });
  };
  });
};

export const update = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  Announcement.update(id, { title, description }, (err, result) => {
    if (err) res.status(500).send(err);
    else res.json({ message: "Announcement updated successfully" });
  });
};

export const deleteById = (req, res) => {
  const { id } = req.params;
  Announcement.delete(id, (err) =>
    err
      ? res.status(500).send(err)
      : res.json({ message: "Announcement deleted successfully" })
  );
};

export const search = (req, res) => {
 const searchTerm = req.query.query;
Announcement.search(searchTerm, (err, results) => {
  if (err) return res.status(500).send(err);
  console.log("Search results:", results); // Debug
  res.json(results);
});
};

