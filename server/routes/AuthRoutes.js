import Router from 'express'; 
import { checkUser, onBoardUser } from '../controllers/AuthController.js'; //Import the checkUser function from the AuthController.js file.

const router = Router(); 

router.post("/check-user", checkUser);  //This will call the checkUser function when a POST request is made to the /check-user route.
router.post("/onboard-user", onBoardUser);

export default router; 