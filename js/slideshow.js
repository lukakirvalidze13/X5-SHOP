window.rotateSlide = function(step) {
    const slides = document.querySelectorAll('.nl-pure-slide');
    const bar = document.getElementById('nlActiveBar');
    
    let activeIndex = -1;
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            activeIndex = index;
        }
    });

    if (activeIndex === -1) return;

    // ძველს ვუშლით აქტიურ კლასს
    slides[activeIndex].classList.remove('active');

    // ახალი ინდექსის გამოთვლა
    let newIndex = (activeIndex + step + slides.length) % slides.length;

    // ახალს ვამატებთ აქტიურ კლასს
    slides[newIndex].classList.add('active');

    // პროგრესის ბარის განახლება
    if (bar) {
        // პროცენტი ითვლება დინამიურად: (მიმდინარე + 1) / სულ
        const width = ((newIndex + 1) / slides.length) * 100;
        bar.style.width = width + "%";
    }
};

// საწყისი მნიშვნელობის დაყენება ჩატვირთვისას
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.nl-pure-slide');
    const bar = document.getElementById('nlActiveBar');
    if (bar && slides.length > 0) {
        bar.style.width = (100 / slides.length) + "%";
    }
});