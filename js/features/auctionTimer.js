import { auctions } from "../data/auctions.js";

export function startAuctionTimers() {
  setInterval(() => {
    auctions.forEach(auction => {
      const el = document.querySelector(
        `.countdown[data-id="${auction.id}"]`
      );

      if (!el) return;

      const remaining = auction.endTime - Date.now();

      if (remaining <= 0) {
        el.textContent = "Auction ended";
        el.classList.add("ended");
        return;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      el.textContent = `${minutes}m ${seconds}s remaining`;
    });
  }, 1000);
}
