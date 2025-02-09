import express from "express";

import { 
    getUserCollection, 
    updateUserCollection, 
    filterUserCollection, 
    searchUserCollection 
} from "../controllers/userCollectionsController.js";

const router = express.Router();

router.get("/:user_id", getUserCollection);      
router.put("/:user_id/:angel_id", updateUserCollection);  
router.get("/:user_id/filter", filterUserCollection);     
router.get("/:user_id/search", searchUserCollection);     

export default router;
