import express from "express";
import { create, deleteById, getAll, getById, search, update } from "../controllers/announcement-controllers.js";


const router = express.Router();

router.get('/search', search);
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteById);



export default router;
