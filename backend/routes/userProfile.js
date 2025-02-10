// make routes RESTful

import express from "express";
import {
	getUserStats,
	getUsersNearYou,
	updateProfilePicture,
} from "../controllers/userProfileController.js";

const router = express.Router();

router.post("/update-profile-picture", updateProfilePicture);
router.get("/:user_id/stats", getUserStats);
router.get("/nearby", getUsersNearYou);

export default router;
