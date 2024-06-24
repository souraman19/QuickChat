import { Router } from "express";
import { addMessage, getMessages, addImageMessage } from "../controllers/MessageController.js";
import multer from "multer";

const router = Router();


const uploadImage = multer({dest: "uploads/images/"});

router.post("/add-new-message", addMessage);
router.get("/get-messages/:fromUser/:toUser", getMessages);
router.post("/add-image-message", uploadImage.single("image"), addImageMessage);

export default router;

