import { auctions } from "../data/auctions.js";

const container = document.querySelector(".auction-grid");

export function renderAuctions() {
  if (!container) return;

  container.innerHTML = "";

  auctions.forEach(auction => {
    const isEnded = Date.now() > auction.endTime;

    const card = document.createElement("div");
    card.className = "auction-card";

    card.innerHTML = `
      <img src="${auction.image}" alt="${auction.title}">
      <div class="auction-content">
        <h3>${auction.title}</h3>
        <p>${auction.year} • ${auction.engine}</p>
        <p>📍 ${auction.location}</p>

        <div class="price">
          €${auction.currentBid.toLocaleString()}
        </div>

        <div class="countdown" data-id="${auction.id}"></div>

        <button class="bid-btn" ${isEnded ? "disabled" : ""}>
          ${isEnded ? "Auction Ended" : "Place Bid"}
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}
