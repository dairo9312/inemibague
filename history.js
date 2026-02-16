// 1. Base de datos de las tarjetas
const historyData = [
    {
        text: `"La historia del INEM comienza con el sueño de ofrecer una educación que uniera el saber académico con el saber hacer, preparando a los jóvenes para los retos reales de la sociedad y la industria."`,
        author: "— Un Legado de Excelencia en Ibagué",
        caption: "El Comienzo de una Misión Global",
        icon: "fa-book-open"
    },
    {
        text: `"En el año 2017, la institución dio un paso hacia el futuro con la implementación de la Jornada Única, fortaleciendo la calidad educativa y el tiempo de aprendizaje de nuestros estudiantes."`,
        author: "— Compromiso con la Calidad",
        caption: "Evolución y Jornada Única 2017",
        icon: "fa-clock"
    },
    {
        text: `"Hoy, el INEM Manuel Murillo Toro se proyecta como un referente de innovación técnica, formando ciudadanos capaces de transformar su entorno con ética y excelencia."`,
        author: "— Liderazgo Institucional",
        caption: "Hacia una Nueva Era Educativa",
        icon: "fa-graduation-cap"
    }
];

let currentIndex = 0;

// --- FUNCIÓN PARA LAS TARJETAS (FLECHAS) ---
function changeCard(direction) {
    const card = document.getElementById('history-card');
    const text = document.getElementById('card-text');
    const author = document.getElementById('card-author');
    const caption = document.getElementById('card-caption');
    const iconElement = document.getElementById('card-icon');

    // Efecto de salida
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    if(iconElement) iconElement.style.transform = 'scale(0)';

    setTimeout(() => {
        currentIndex += direction;
        if (currentIndex >= historyData.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = historyData.length - 1;

        const data = historyData[currentIndex];

        text.innerText = data.text;
        author.innerText = data.author;
        caption.innerText = data.caption;

        if(iconElement) {
            iconElement.className = ''; 
            iconElement.classList.add('fas', data.icon); 
            iconElement.style.transform = 'scale(1)';
        }

        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 300);
}

// --- LÓGICA PARA LA LÍNEA DE TIEMPO (SCROLL) ---
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progress-bar');
    const container = document.querySelector('.timeline-container');
    const items = document.querySelectorAll('.timeline-item');
    
    if (!container || !progressBar) return; // Evita errores si no existen los elementos

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Punto de activación: cuando el elemento llega al 60% de la pantalla (bajando)
    const triggerPoint = windowHeight * 0.6;

    // 1. CALCULAR PROGRESO DE LA LÍNEA AZUL
    let progressHeight = 0;
    if (rect.top < triggerPoint) {
        progressHeight = triggerPoint - rect.top;
    }
    
    let percentage = (progressHeight / rect.height) * 100;
    percentage = Math.min(Math.max(percentage, 0), 100);
    
    progressBar.style.height = percentage + '%';

    // 2. ACTIVAR ICONOS (AZUL)
    items.forEach(item => {
        const dot = item.querySelector('.timeline-dot');
        const dotRect = dot.getBoundingClientRect();

        // Si el centro del círculo cruzó el punto de activación
        if (dotRect.top + (dotRect.height / 2) < triggerPoint) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});