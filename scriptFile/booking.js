import events from "./concertData.js";

//DOM selector
const eventInfo = document.querySelector(".eventInfo");
const seatDetail = document.querySelector(".seatDetail");

//get id from url
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");
console.log(eventId);

//find id respective data from database

const event = events.find((event) => event.id === Number(eventId));

eventInfo.innerHTML = `
<img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXZlbnR8ZW58MHx8MHx8fDA%3D" alt="" class=" m-auto">
    <div>
        <h1 class="mb-3 text-xl font-semibold text-center">${event.title}</h1>
        <p>Artist: ${event.artist}</p>
        <p>Category: ${event.category}</p>
        <p>Date: ${event.date}</p>
        <p>Time: ${event.time}</p>
        <p>Venue: ${event.venue}</p>
        <p>Artist: ${event.artist}</p>
        <p>City: ${event.city}</p>
        <p>Description: ${event.description}</p>
    </div>
`;

//creating seat

const rows = ["A", "B", "C", "D", "E", "F", "G"];

rows.forEach((row) => {
  for (let col = 1; col <= 6; col++) {
    const seat = `${row}${col}`;
    seatDetail.innerHTML += `
        <button
        class="seatBtn bg-gray-300 p-3 rounded-full cursor-pointer hover:bg-gray-400" data-seat="${seat}"
      >
        ${seat}
      </button>
        `;
  }
});

//getting id of seat

seatDetail.addEventListener('click', (e)=>{
    if(!e.target.classList.contains('seatBtn')) return

    console.log(e.target.dataset.seat)
})
