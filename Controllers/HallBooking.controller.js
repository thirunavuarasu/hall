// Array of predefined rooms with their details
const rooms = [
    {
        id: 1,
        name: 'Room1',
        numberOfSeatsAvailable: 4,
        amenities: "Tv,Ac,Projector,Washing Machine",
        pricePerHour: 2000,
    },
    {
        id: 2,
        name: 'Room2',
        numberOfSeatsAvailable: 5,
        amenities: "Tv,Ac,Projector,Washing Machine",
        pricePerHour: 2500,
    },
    {
        id: 3,
        name: 'Room3',
        numberOfSeatsAvailable: 8,
        amenities: "Tv,Ac,Projector,Washing Machine",
        pricePerHour: 4000,
    }
];

// Array to store booking details
const bookings = [
    {
        customer: "THIRUNAVUKKARASU.M",
        bookingDate: "2024-07-19",
        startTime: "8:00",
        endTime: "12:00",
        roomId: 1,
        customerId: 1001,
        roomName: 'Room1',
        status: "booked"
    }
];

// Array to store customer details including bookings
const customers = [
    {
        name: "Bala",
        id: 1001,
        booking: [
            {
                customer: "Bala",
                date: "2024-07-19",
                startTime: "8:00",
                endTime: "12:00",
                bookingDate: "2024-07-18",
                roomId: 1,
                roomName: 'Room1',
                status: "booked"
            }
        ]
    }
];

// Controller function to create a new room
export const createRoom = (req, res) => {
    try {
        const roomDetails = req.body;
        const { numberOfSeatsAvailable, amenities, pricePerHour, id } = req.body;
        if (!numberOfSeatsAvailable || !amenities || !pricePerHour || !id) {
            return res.status(400).json({
                "message": "All fields are required.",
                "Requried fields": "id,numberOfSeatsAvailable,amenities ,pricePerHour"
            });
        }
        const roomIdExists = rooms.find(room => room.id == roomDetails.id);
        if (roomIdExists != undefined) {
            return res.status(200).json({
                "message": "Room already available",
                "Available rooms": rooms
            });
        }
        rooms.push({ id, name: `Room${id}`, ...roomDetails });
        res.status(201).json({
            "message": "Room created Successfully!",
            "Available rooms": rooms
        })
    } catch (error) {
        res.status(401).json({ "error": error });
    }

}

// Controller function to book a room
export const bookRoom = (req, res) => {
    try {
        const { customer, startTime, endTime, date, customerId } = req.body;
        if (!customer || !startTime || !endTime || !date || !customerId) {
            return res.status(400).json({
                "message": "All fields are required.",
                "Requried fields": "customer,customerId,date,startTime,endTime"
            });
        }

        const roomId = req.params.id;
        const roomDetails = req.body;


        const roomIdExists = rooms.find(room => room.id == roomId);
        if (roomIdExists === undefined) {
            return res.status(404).json({
                "message": "Room does not exist!",
                "Available rooms": rooms
            })
        }

        const matchingRooms = bookings.filter(booking => booking.roomId == roomId);
        if (matchingRooms.length > 0) {

            const groupBookingsByDate = bookings.filter(booking => {
                let bookedStartTime = parseInt(booking.startTime);
                let bookedEndTime = parseInt(booking.endTime);
                let newStartTime = parseInt(startTime);
                let newEndTime = parseInt(endTime);

                return booking.roomId == roomId
                    && booking.bookingDate == roomDetails.date && (
                        (newStartTime >= bookedStartTime && newStartTime < bookedEndTime) ||
                        (newEndTime > bookedStartTime && newEndTime <= bookedEndTime) ||
                        (newStartTime <= bookedStartTime && newEndTime >= bookedEndTime)
                    )
            })

            console.log(groupBookingsByDate);
            if (groupBookingsByDate.length == 0) {

                bookings.push({ ...roomDetails, bookingDate: roomDetails.date, roomId: Number(roomId), roomName: `Room${roomId}`, customerId, status: "booked" })

                const customerDetails = customers.find(customer => customer.id == customerId);

                if (customerDetails != undefined) {
                    customerDetails.booking.push({ ...roomDetails, bookingDate: roomDetails.date, roomId: Number(roomId), roomName: `Room${roomId}`, status: "booked" })
                }
                else {
                    const newCustomerDetails = {
                        name: customer,
                        id: customerId,
                        booking: [
                            {
                                customer,
                                bookingDate: date,
                                startTime,
                                endTime,
                                roomId,
                                roomName: `Room${roomId}`,
                                status: "booked"
                            }
                        ]
                    }
                    customers.push(newCustomerDetails);
                }



                return res.status(200).json({
                    "message": "Room successfully booked!",
                    "Bookings": bookings,
                })
            }
            else {
                return res.status(200).json({
                    "message": "Room already booked in this date and time",
                    "Bookings": bookings
                })
            }
        }
        else {
            bookings.push({ ...roomDetails, bookingDate: roomDetails.date, roomId: Number(roomId), roomName: `Room${roomId}`, customerId, status: "booked" })


            const customerDetails = customers.find(customer => customer.id == customerId);
            if (customerDetails != undefined) {
                customerDetails.booking.push({
                    customer,
                    customerId,
                    bookingDate: date,
                    startTime,
                    endTime,
                    roomId,
                    status: "booked"
                })
            }

            else {
                const newCustomerDetails = {
                    name: customer,
                    id: customerId,
                    booking: [
                        {
                            customer,
                            bookingDate: date,
                            startTime,
                            endTime,
                            roomId,
                            roomName: `Room${roomId}`,
                            status: "booked"
                        }
                    ]
                }
                customers.push(newCustomerDetails);
            }

            return res.status(200).json({
                "message": "Room successfully booked!",
                "Bookings": bookings,
            })
        }
    } catch (error) {
        res.status(400).json({ "error": error });
    }


}

// Controller function to get details of all booked rooms
export const allbookedRooms = (req, res) => {
    const bookedRooms = bookings.map(booking => {
        return {
            roomName: booking.roomName,
            bookedStatus: booking.status,
            customerName: booking.customer,
            customerId: booking.customerId,
            date: booking.bookingDate,
            startTime: booking.startTime,
            endTime: booking.endTime
        }
    })

    res.status(200).json({
        "message": "Booked room details",
        "bookedRooms": bookedRooms
    })
}

// Controller function to get details of all customers and their bookings
export const allcustomers = (req, res) => {
    const allCustomersDetails = customers.map(customer => {
        return {
            customerName: customer.name,
            customerId: customer.id,
            bookings: customer.booking.map(details => {
                return {
                    roomName: details.roomName,
                    date: details.bookingDate,
                    startTime: details.startTime,
                    endtime: details.endTime
                }
            })
        }
    })

    res.status(200).json({
        "message": "All customer details",
        "customers": allCustomersDetails
    })
}

// Controller function to get details of a customer by ID
export const getcustomer = (req, res) => {
    const customerId = req.params.id;
    const customer = customers.find(customer => customer.id == customerId);
    if (customer == undefined) {
        return res.status(404).json({ "message": "customer not found!" });
    }
    const count = (customer.booking).length;
    const customerDetails = {
        customerName: customer.name,
        customerId: customer.id,
        bookings: customer.booking.map(details => {
            return {
                roomName: details.roomName,
                date: details.bookingDate,
                startTime: details.startTime,
                endtime: details.endTime,
                bookingId: `b${customer.booking.length}`,
                bookingDate: (new Date()).toLocaleDateString(),
                bookingStatus: "booked"
            }
        })
    }

    res.status(200).json({
        "no of bookings": count,
        "customerDetails": customerDetails
    })
}
