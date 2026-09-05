import events from "./concertData.js";

//all DOM selector
const allEvents = document.querySelector(".allEvents");

// event card
function renderEventCard(event) {
  const card = document.createElement("div");
  card.className =
    "card border w-80 border-gray-300 p-2 grid gap-y-5 bg-gray-200";
  card.innerHTML = `
     <div class="imageSection  ">
                    <img src="${event.image}"
                        alt="" class="h-36 w-80">
                </div>
                <div class="eventInfo text-center">
                    <h1 class="text-xl font-semibold text-center mb-4 ">${event.title}</h1>
                    <p>Artist:${event.artist}</p>
                    <p>Venue: ${event.venue}</p>
                    <p>Date:${event.date}</p>
            
                </div>
                <div class="button text-center">
                    <button class="detailBtn bg-green-400 px-3 py-1 rounded-md cursor-pointer" data-id=${event.id}>Detail</button>
                </div>

    `;
  return card;
}

function displayCard() {
  allEvents.innerHTML = "";
  events.forEach((event) => {
    const card = renderEventCard(event);
    allEvents.appendChild(card);
  });
}

//eventlistener
allEvents.addEventListener("click", (e) => {
  if (!e.target.classList.contains("detailBtn")) return;
  const eventId = e.target.dataset.id;

  window.location.href = `booking.html?id=${eventId}`
});

// function call
displayCard(events);
