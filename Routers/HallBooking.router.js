import express from 'express'; // Import the Express framework and its Router module

// Import controller functions from HallBooking.controller.js
import { allbookedRooms, allcustomers, bookRoom, createRoom, getcustomer } from '../Controllers/HallBooking.controller.js';

// Create an instance of Express Router
const router = express.Router();

//Routers for the endpoints
router.post('/createroom', createRoom);
router.post('/bookroom/:id', bookRoom);
router.get('/allbookedrooms', allbookedRooms);
router.get('/allcustomers', allcustomers);
router.get('/getcustomerbyid/:id', getcustomer);

export default router;