let slideIndex = 0;
let autoPlay;

const slides = document.getElementsByClassName("slide");

function showSlides(n) {
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    
    // Ocultar todas
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Mostrar la actual
    slides[slideIndex].classList.add("active");
}

// Función para botones manuales
function moveSlide(n) {
    clearInterval(autoPlay); // Detiene el auto-cambio si el usuario interactúa
    slideIndex += n;
    showSlides(slideIndex);
    startAutoPlay(); // Reinicia el contador
}

// Función automática
function startAutoPlay() {
    autoPlay = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000);
}

// Iniciar al cargar
document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
    startAutoPlay();
});