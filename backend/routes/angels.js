// make routes RESTful

// editted

import express from "express";
import {
	getAllAngels,
	getAngelById,
	getAngelsBySeries,
	getAngelsForProfilePic,
} from "../controllers/angelsController.js";

const router = express.Router();

router.get("/", getAllAngels);
// get a specific angel by id -> necessary ? -> for searching
router.get("/:id", getAngelById);
router.get("/series/:series_id", getAngelsBySeries);
router.get("/profile-pictures", getAngelsForProfilePic);

export default router;
