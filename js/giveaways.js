const tasks = { insta: false, verify: false, share: false };
let gameActive = false;
let gameTimeout;

document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enterGiveawayBtn');
    const gameCircle = document.getElementById('gameCircle');
    const reqYes = document.getElementById('reqYes');
    const reqNo = document.getElementById('reqNo');

    // 1. Enter Button -> Open Confirmation
    if (enterBtn) {
        enterBtn.onclick = () => {
            if (!enterBtn.classList.contains('locked')) {
                document.getElementById('reqModal').classList.remove('hidden');
            }
        };
    }

    // 2. Confirmation "YES" -> Start Game
    if (reqYes) {
        reqYes.onclick = () => {
            document.getElementById('reqModal').classList.add('hidden');
            document.getElementById('gameModal').classList.remove('hidden');
            startGame();
        };
    }

    if (reqNo) reqNo.onclick = () => document.getElementById('reqModal').classList.add('hidden');

    // 3. Reaction Game Logic
    if (gameCircle) {
        gameCircle.onclick = () => {
            if (gameActive) {
                gameActive = false;
                showSuccess();
            } else {
                clearTimeout(gameTimeout);
                gameCircle.textContent = "TOO EARLY!";
                setTimeout(startGame, 1000);
            }
        };
    }
});

// --- Functions ---

function handleTask(type, url = null) {
    if (url) window.open(url, '_blank');
    
    // პატარა დაყოვნება და მერე კითხვა
    setTimeout(() => {
        const reqModal = document.getElementById('reqModal');
        reqModal.classList.remove('hidden');

        document.getElementById('reqYes').onclick = () => {
            tasks[type] = true;
            const taskEl = document.getElementById(`task-${type}`);
            const statusEl = document.getElementById(`status-${type}`);
            
            taskEl.classList.add('completed');
            statusEl.textContent = 'COMPLETED_✓';
            statusEl.style.color = '#50ffaf';
            
            reqModal.classList.add('hidden');
            checkTasks();
            
            // ვაბრუნებთ ორიგინალ ფუნქციას reqYes-ზე
            resetReqYes();
        };
    }, 1000);
}

function resetReqYes() {
    document.getElementById('reqYes').onclick = () => {
        document.getElementById('reqModal').classList.add('hidden');
        document.getElementById('gameModal').classList.remove('hidden');
        startGame();
    };
}

function checkTasks() {
    const btn = document.getElementById('enterGiveawayBtn');
    const allDone = Object.values(tasks).every(t => t === true);
    if (allDone) {
        btn.classList.remove('locked');
        btn.classList.add('ready');
        btn.disabled = false;
        btn.textContent = 'ENTER_GIVEAWAY';
    }
}

function startGame() {
    const circle = document.getElementById('gameCircle');
    gameActive = false;
    circle.textContent = "WAITING...";
    circle.classList.remove('reaction-ready');
    
    if (gameTimeout) clearTimeout(gameTimeout);
    gameTimeout = setTimeout(() => {
        gameActive = true;
        circle.classList.add('reaction-ready');
        circle.textContent = "CLICK NOW!";
    }, Math.random() * 2000 + 2000);
}

function showSuccess() {
    document.getElementById('gameModal').classList.add('hidden');
    const successModal = document.getElementById('successModal');
    
    // Generate Ticket ID
    const id = 'X6-M-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('ticketID').textContent = id;
    
    successModal.classList.remove('hidden');
    document.getElementById('statusText').innerHTML = `<span style="color:#50ffaf">● STATUS: PARTICIPANT_VERIFIED</span>`;
}

function closeAllModals() {
    document.querySelectorAll('.nl-modal-overlay').forEach(m => m.classList.add('hidden'));
    if (gameTimeout) clearTimeout(gameTimeout);
}