import { Router } from "express";
import { addMessage, getMessages, addImageMessage, addAudioMessage, getInitialContactsWithMessages } from "../controllers/MessageController.js";
import multer from "multer";

const router = Router();


const uploadImage = multer({dest: "uploads/images/"});

const uploadAudio = multer({dest: "uploads/recordings/"});

router.post("/add-new-message", addMessage);
router.get("/get-messages/:fromUser/:toUser", getMessages);
router.post("/add-image-message", uploadImage.single("image"), addImageMessage);
router.post("/add-audio-message", uploadAudio.single("audio"), addAudioMessage);
router.get("/get-initial-contacts/:fromUser", getInitialContactsWithMessages);

export default router;

