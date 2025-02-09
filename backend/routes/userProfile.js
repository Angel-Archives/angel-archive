// make routes RESTful

import express from "express";
import { getUserStats, getUsersNearYou } from "../controllers/userProfileController.js";

const router = express.Router();

router.get("/:user_id/stats", getUserStats);  
router.get("/nearby", getUsersNearYou);       

export default router;
