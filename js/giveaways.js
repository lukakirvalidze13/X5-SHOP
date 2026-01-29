// Modal Control
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function showSuccess() {
    closeModal('confirmModal');
    // მცირე დაყოვნება ეფექტისთვის
    setTimeout(() => {
        openModal('successModal');
        // სისტემური ლოგი
        console.log("[SYS] GIVEAWAY_ENTRY_ENCRYPTED");
    }, 500);
}

// Countdown Timer
let giveawayTime = 9912;
setInterval(() => {
    const h = Math.floor(giveawayTime / 3600);
    const m = Math.floor((giveawayTime % 3600) / 60);
    const s = giveawayTime % 60;
    const timerEl = document.getElementById('timer');
    if (timerEl) {
        timerEl.innerText = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    if (giveawayTime > 0) giveawayTime--;
}, 1000);