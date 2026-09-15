import events from './concertData.js'

//DOMS selector
const cart = document.querySelector('.cardSection')
const message = document.querySelector(".message")

const params = new URLSearchParams(window.location.search)
const eventId = params.get("id")

const event = events.find((event) => event.id === Number(eventId));

const selectedSeat = JSON.parse(
    localStorage.getItem("selectedSeat")
)
const totalPrice = localStorage.getItem("totalPrice")


cart.innerHTML = `
<div class=" max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-6">
            <div class="message"></div>
            <!-- Header -->
            <div class="mb-6">
                <p class="text-sm text-gray-500">Booking Summary</p>

                <h1 class="text-2xl font-bold mt-1">
                    ${event.title}
                </h1>

                <p class="text-gray-600 mt-1">
                    ${event.artist}
                </p>
            </div>


            <!-- Event Details -->
            <div class="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">

                <div>
                    <p class="text-xs text-gray-500">Date</p>
                    <p class="font-medium">${event.date}</p>
                </div>

                <div>
                    <p class="text-xs text-gray-500">Time</p>
                    <p class="font-medium">${event.time}</p>
                </div>

                <div class="col-span-2">
                    <p class="text-xs text-gray-500">Venue</p>
                    <p class="font-medium">${event.venue}</p>
                </div>

            </div>


            <!-- Seats -->
            <div class="mt-6">

                <p class="text-sm text-gray-500">
                    Selected Seats
                </p>

                <div class="flex gap-2 mt-2">

                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-md font-medium">
                        ${selectedSeat}
                    </span>

                    

                </div>

            </div>


            <!-- Price -->
            <div class="border-t border-gray-200 mt-6 pt-5">

                <div class="flex justify-between text-gray-600">
                    <span>Ticket price</span>
                    <span>${event.price}</span>
                </div>

                <div class="flex justify-between text-gray-600 mt-2">
                    <span>Number of seats</span>
                    <span>${selectedSeat.length}</span>
                </div>

                <div class="flex justify-between text-xl font-bold mt-4">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                </div>

            </div>


            <!-- Payment -->
            <button
                class=" payNow w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg cursor-pointer">
                Pay Now
            </button>

        </div>
`

cart.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('payNow')) return
    
    

    setTimeout(() => {
        message.textContent = `Payment Successful!`
    }, 500);

    setTimeout(() => {
        window.location.href = 'index.html'
    }, 3000);

    
})

