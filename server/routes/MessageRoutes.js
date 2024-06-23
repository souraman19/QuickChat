import { Router } from "express";
import { addMessage, getMessages } from "../controllers/MessageController.js";

const router = Router();

router.post("/add-new-message", addMessage);
router.get("/get-messages/:fromUser/:toUser", getMessages);

export default router;

