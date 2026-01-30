// ==========================================
// BMW GIVEAWAY SYSTEM - FINAL OPTIMIZED JS
// ==========================================

const tasks = { insta: false, verify: false, share: false };
let gameActive = false;
let gameTimeout;

// 1. არქივის მონაცემთა ბაზა
const archiveData = {
    'M4': {
        title: 'BMW M4 COMPETITION',
        img: 'https://bmw.scene7.com/is/image/BMW/M4--1680x756?wid=1680&hei=756',
        winner: 'Lasha_**92',
        date: '15/01/2026',
        feedback: '„დაუჯერებელია! არ მეგონა თუ მართლა მოვიგებდი. M4-ის ხმა არის რაღაც საოცრება. მადლობა ადმინისტრაციას ასეთი შანსისთვის!“',
        likes: '1,240', fire: '850', rocket: '120'
    },
    'M5': {
        title: 'BMW M5 CS',
        img: 'https://4kwallpapers.com/images/walls/thumbs_3t/18178.jpg',
        winner: 'Gio_RTX',
        date: '02/01/2026',
        feedback: '„საუკეთესო საჩუქარი წლის დასაწყისში! BMW M5 CS არის ჩემი ოცნების მანქანა. ყველაფერი გამჭვირვალედ მოხდა, სრული რეკომენდაცია თქვენ!“',
        likes: '2,501', fire: '1,105', rocket: '430'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enterGiveawayBtn');
    const gameCircle = document.getElementById('gameCircle');
    const reqYes = document.getElementById('reqYes');
    const reqNo = document.getElementById('reqNo');

    // მთავარი ღილაკი -> ხსნის დადასტურებას
    if (enterBtn) {
        enterBtn.onclick = () => {
            if (!enterBtn.classList.contains('locked')) {
                document.getElementById('reqModal').classList.remove('hidden');
            }
        };
    }

    // დადასტურება "კი" -> იწყებს რეაქციის თამაშს
    if (reqYes) {
        reqYes.onclick = () => {
            document.getElementById('reqModal').classList.add('hidden');
            document.getElementById('gameModal').classList.remove('hidden');
            startGame();
        };
    }

    if (reqNo) reqNo.onclick = () => document.getElementById('reqModal').classList.add('hidden');

    // რეაქციის თამაშის ლოგიკა
    if (gameCircle) {
        gameCircle.onclick = () => {
            if (gameActive) {
                gameActive = false;
                showSuccess();
            } else {
                clearTimeout(gameTimeout);
                gameCircle.textContent = "ზედმეტად ადრეა!";
                setTimeout(startGame, 1000);
            }
        };
    }
});

// --- დავალებების ფუნქციები ---

function handleTask(type, url = null) {
    if (url) window.open(url, '_blank');
    
    setTimeout(() => {
        const reqModal = document.getElementById('reqModal');
        reqModal.classList.remove('hidden');

        document.getElementById('reqYes').onclick = () => {
            tasks[type] = true;
            const taskEl = document.getElementById(`task-${type}`);
            const statusEl = document.getElementById(`status-${type}`);
            
            if (taskEl) taskEl.classList.add('completed');
            if (statusEl) {
                statusEl.textContent = 'დასრულებულია_✓';
                statusEl.style.color = '#50ffaf';
            }
            
            reqModal.classList.add('hidden');
            checkTasks();
            resetReqYes(); // ვაბრუნებთ თავდაპირველ ფუნქციას
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
        btn.disabled = false;
        btn.textContent = 'მონაწილეობის_მიღება';
    }
}

// --- თამაშის და წარმატების ფუნქციები ---

function startGame() {
    const circle = document.getElementById('gameCircle');
    gameActive = false;
    circle.textContent = "მოიცადეთ...";
    circle.classList.remove('reaction-ready');
    
    if (gameTimeout) clearTimeout(gameTimeout);
    gameTimeout = setTimeout(() => {
        gameActive = true;
        circle.classList.add('reaction-ready');
        circle.textContent = "დააჭირეთ!";
    }, Math.random() * 2000 + 2000);
}

function showSuccess() {
    document.getElementById('gameModal').classList.add('hidden');
    const successModal = document.getElementById('successModal');
    
    const id = 'X6-M-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('ticketID').textContent = id;
    
    successModal.classList.remove('hidden');
    document.getElementById('statusText').innerHTML = `<span style="color:#50ffaf">● სტატუსი: მონაწილე_ვერიფიცირებულია</span>`;
}

// --- არქივის ფუნქციები ---

function showArchiveDetails(carKey) {
    const data = archiveData[carKey];
    if (!data) return;

    // მონაცემების შევსება (მოცილებულია DATA_POINT და undefined)
    document.getElementById('archiveCarTitle').innerText = data.title;
    document.getElementById('archiveModalImg').src = data.img;
    document.getElementById('archiveWinner').innerText = data.winner;
    document.getElementById('archiveDate').innerText = data.date;
    
    document.getElementById('react-likes').innerText = data.likes;
    document.getElementById('react-fire').innerText = data.fire;
    document.getElementById('react-rocket').innerText = data.rocket;

    const modal = document.getElementById('archiveModal');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.opacity = '1';

    // Typewriter ეფექტი ფიდბექისთვის
    const feedbackEl = document.getElementById('archiveFeedback');
    feedbackEl.innerHTML = "";
    let i = 0;
    
    if (window.typeTimer) clearInterval(window.typeTimer);
    
    window.typeTimer = setInterval(() => {
        if (i < data.feedback.length) {
            feedbackEl.innerHTML += data.feedback.charAt(i);
            i++;
        } else {
            clearInterval(window.typeTimer);
        }
    }, 25);
}

function closeArchiveModal() {
    const modal = document.getElementById('archiveModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }, 300);
    if (window.typeTimer) clearInterval(window.typeTimer);
}

function closeAllModals() {
    document.querySelectorAll('.nl-modal-overlay').forEach(m => m.classList.add('hidden'));
    if (gameTimeout) clearTimeout(gameTimeout);
}