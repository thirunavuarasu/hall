import express from 'express';  // Import the Express framework
import cors from 'cors';  // Import CORS middleware for handling cross-origin requests

// Import the hallBookingRouter from the specified file
import hallBookingRouter from './Routers/HallBooking.router.js'

const app = express(); // Create an instance of Express application

app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // Parse JSON bodies sent in requests


// Define the port number
const PORT = 4000;

// Root endpoint to verify API is running
app.get('/', (req, res) => {
    res.status(200).json({
        message: "API for Hall Booking app",
        CreateRoom: {
            EndPoint: "/api/hallbooking/createroom",
            Method: "POST",
            Body: {
                message: "Feilds to give in body",
                Example: {
                    "numberOfSeatsAvailable": 3,
                    "amenities": "Ac,Tv",
                    "pricePerHour": 3000,
                    "id": 4
                }
            }
        },
        BookRoom: {
            EndPoint: "/api/hallbooking/bookroom/:RoomId",
            ExampleAPI: "/api/hallbooking/bookroom/2",
            Method: "POST",
            Body: {
                message: "Feilds to give in body",
                Example: {
                    "customer": "Sam K",
                    "customerId": 1002,
                    "date": "2024-07-20",
                    "startTime": "8:00",
                    "endTime": "12:00"
                }
            }
        },
        ListAllRooms:{
            EndPoint: "/api/hallbooking/allbookedrooms",
            Method: "GET",
        },
        ListAllCustomers:{
            EndPoint: "/api/hallbooking/allcustomers",
            Method: "GET",
        },
        DetailsOfCustomerBooking:{
            EndPoint: "/api/hallbooking/getcustomerbyid/customerId",
            ExampleAPI: "/api/hallbooking/getcustomerbyid/1002",
            Method: "GET",
        }
    })
})

// Mount hallBookingRouter under '/api/hallbooking' path
app.use('/api/hallbooking', hallBookingRouter);

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
    console.log('App is listening');
})