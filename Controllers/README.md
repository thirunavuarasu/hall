🏢 Hall Booking App API
Welcome to the Hall Booking App API! This API is designed to manage hall reservations, providing various endpoints for creating rooms, booking rooms, and retrieving booking details.

🔗 Key Features
Create Room

Endpoint: POST /api/hallbooking/createroom
Description: Allows creation of a new room with specified details such as number of seats available, amenities, price per hour, and ID.
Book Room

Endpoint: POST /api/hallbooking/bookroom/:RoomId
Description: Books a room for a customer for a specific date and time. Replace :RoomId in the endpoint with the actual room ID.
List All Booked Rooms

Endpoint: GET /api/hallbooking/allbookedrooms
Description: Retrieves a list of all currently booked rooms, including details like room name, booking status, customer name, date, and timings.
List All Customers

Endpoint: GET /api/hallbooking/allcustomers
Description: Retrieves details of all customers who have made bookings, including their name, customer ID, and a list of their bookings with room details.
Details of Customer Booking

Endpoint: GET /api/hallbooking/getcustomerbyid/:customerId
Description: Retrieves details of a specific customer's bookings based on their customer ID, including booking ID, room name, date, timings, and booking status.
🚀 Technologies Used
Node.js: JavaScript runtime environment
Express: Web application framework for Node.js
📝 Postman Documentation
Explore and test the endpoints using Postman.