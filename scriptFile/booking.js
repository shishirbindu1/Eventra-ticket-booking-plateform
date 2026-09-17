import events from "./concertData.js";

// DOM selectors
const eventInfo = document.querySelector(".eventInfo");
const seatInfo = document.querySelector(".seatInfo");
const calculation = document.querySelector(".calculation");
const bookingAction = document.querySelector(".bookingAction");
const alertMsg = document.querySelector(".alertMsg");

// Get event ID from URL
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

// Find event
const event = events.find((event) => event.id === Number(eventId));


// -------------------------
// SOLD SEATS
// -------------------------

const soldSeats = JSON.parse(
    localStorage.getItem("soldSeats")
) || {};

const eventSoldSeats = soldSeats[eventId] || [];

console.log("Sold seats:", eventSoldSeats);


// -------------------------
// STATE
// -------------------------

let selectedSeat = [];
let totalPrice = 0;


// -------------------------
// EVENT INFORMATION
// -------------------------

eventInfo.innerHTML = `
    <div class="grid gap-4">
        <img 
            src="${event.image}" 
            alt="${event.title}"
            class="w-full h-64 object-cover rounded-lg"
        >

        <div>
            <h1 class="text-2xl font-bold">
                ${event.title}
            </h1>

            <p class="text-gray-600">
                ${event.artist}
            </p>

            <p class="mt-2">
                ${event.date} | ${event.time}
            </p>

            <p>
                ${event.venue}, ${event.city}
            </p>

            <p class="mt-2 font-semibold">
                Rs. ${event.price} per seat
            </p>
        </div>
    </div>
`;


// -------------------------
// CREATE SEATS
// -------------------------

const rows = ["A", "B", "C", "D", "E", "F", "G"];

rows.forEach((row) => {

    for (let number = 1; number <= 6; number++) {

        const seatNumber = `${row}${number}`;

        const seat = document.createElement("button");

        seat.textContent = seatNumber;

        seat.dataset.seat = seatNumber;

        // Check whether seat is already sold
        if (eventSoldSeats.includes(seatNumber)) {

            seat.className =
                "seatBtn bg-red-500 text-white cursor-not-allowed";

            seat.disabled = true;

        } else {

            seat.className =
                "seatBtn bg-gray-200 hover:bg-green-400 cursor-pointer";
        }

        seatInfo.appendChild(seat);
    }
});


// -------------------------
// SEAT SELECTION
// -------------------------

seatInfo.addEventListener("click", (e) => {

    if (!e.target.classList.contains("seatBtn")) return;

    const seatNumber = e.target.dataset.seat;

    // Don't allow sold seats
    if (eventSoldSeats.includes(seatNumber)) return;


    // Check whether seat is already selected
    if (selectedSeat.includes(seatNumber)) {

        // Remove seat
        selectedSeat = selectedSeat.filter(
            (seat) => seat !== seatNumber
        );

        // Remove selected styling
        e.target.classList.remove(
            "bg-green-500",
            "text-white"
        );

        e.target.classList.add("bg-gray-200");

    } else {

        // Add seat
        selectedSeat.push(seatNumber);

        // Add selected styling
        e.target.classList.remove("bg-gray-200");

        e.target.classList.add(
            "bg-green-500",
            "text-white"
        );
    }


    // Calculate total
    totalPrice = selectedSeat.length * event.price;


    // Display calculation
    calculation.innerHTML = `
        <div class="flex justify-between">
            <span>Selected Seats</span>
            <span>${selectedSeat.length}</span>
        </div>

        <div class="flex justify-between font-bold">
            <span>Total</span>
            <span>Rs. ${totalPrice}</span>
        </div>
    `;
});


// -------------------------
// CHECKOUT BUTTON
// -------------------------

bookingAction.innerHTML = `
    <button
        class="checkoutBtn bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer"
    >
        Checkout
    </button>
`;


// -------------------------
// CHECKOUT
// -------------------------

bookingAction.addEventListener("click", (e) => {

    if (!e.target.classList.contains("checkoutBtn")) return;


    // No seat selected
    if (selectedSeat.length === 0) {

        alertMsg.textContent = "Please select at least one seat.";

        alertMsg.className =
            "alertMsg text-center text-red-500 mt-3";

        return;
    }


    // Save selected seats
    localStorage.setItem(
        "selectedSeat",
        JSON.stringify(selectedSeat)
    );


    // Save total price
    localStorage.setItem(
        "totalPrice",
        totalPrice
    );


    // Go to checkout
    window.location.href = `checkout.html?id=${event.id}`;
});