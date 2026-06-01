// ===== FUNCIONALIDAD DE LAS CARTAS =====

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const closeBtns = document.querySelectorAll('.close-btn');

    // Añadir evento click a cada tarjeta
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Evitar que el botón cerrar abra la tarjeta
            if (e.target.closest('.close-btn')) return;
            
            toggleCard(card);
        });

        // Evento touch para móviles
        card.addEventListener('touchend', (e) => {
            if (e.target.closest('.close-btn')) return;
            
            toggleCard(card);
        });
    });

    // Funcionalidad de los botones cerrar
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.card');
            toggleCard(card);
        });
    });

    // Función para alternar la tarjeta
    function toggleCard(card) {
        // Cerrar otras tarjetas abiertas
        cards.forEach(c => {
            if (c !== card && c.classList.contains('active')) {
                c.classList.remove('active');
            }
        });

        // Abrir/Cerrar la tarjeta actual
        card.classList.toggle('active');

        // Reproducir un sonido suave (opcional - requiere agregar un archivo de audio)
        playCardSound();
    }

    // Función para reproducir un sonido (efecto visual de interactividad)
    function playCardSound() {
        // Puedes uncommentear esto si tienes un archivo de audio
        // const audio = new Audio('card-flip.mp3');
        // audio.play().catch(e => console.log('Audio error:', e));
    }

    // Cerrar tarjeta al presionar la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cards.forEach(card => {
                if (card.classList.contains('active')) {
                    card.classList.remove('active');
                }
            });
        }
    });

    // Agregar efectos adicionales al pasar el mouse
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('active')) {
                createFloatingHeart(card);
            }
        });
    });

    // Función para crear corazones flotantes (decorativo)
    function createFloatingHeart(card) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'absolute';
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = '1.5rem';
        heart.style.zIndex = '10';
        
        const rect = card.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        
        card.style.position = 'relative';
        card.appendChild(heart);

        // Animar el corazón
        let opacity = 1;
        let posY = y;
        const interval = setInterval(() => {
            opacity -= 0.05;
            posY -= 2;
            heart.style.opacity = opacity;
            heart.style.transform = `translateY(${posY - y}px)`;
            
            if (opacity <= 0) {
                clearInterval(interval);
                heart.remove();
            }
        }, 30);
    }

    // Animación de entrada de la página
    animatePageEntry();
});

// ===== ANIMACIONES DE ENTRADA =====

function animatePageEntry() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
            }, 10);
        }, index * 100);
    });
}

// ===== EFECTO PARALLAX (Opcional) =====

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (header) {
        header.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ===== SOPORTE PARA TEMAS OSCUROS (Opcional) =====

// Detectar preferencia del usuario
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Podrías agregar estilos específicos para tema oscuro aquí
    document.body.style.setProperty('--color-light', '#1a1a2e');
}

// ===== MEJORA DE ACCESIBILIDAD =====

// Permitir navegación por teclado
document.addEventListener('keydown', (e) => {
    const cards = document.querySelectorAll('.card');
    const activeCard = document.querySelector('.card.active');
    
    if (e.key === 'Tab') {
        // Mejorar navegación con Tab
        cards.forEach(card => {
            card.addEventListener('focus', () => {
                card.style.outline = '3px solid rgba(255, 105, 180, 0.5)';
                card.style.outlineOffset = '5px';
            });
            
            card.addEventListener('blur', () => {
                card.style.outline = 'none';
            });
        });
    }
});

// ===== COPIAR CONTENIDO (Función auxiliar) =====

function copyCardContent() {
    const activeCard = document.querySelector('.card.active');
    if (activeCard) {
        const text = activeCard.querySelector('.card-back p')?.textContent;
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('Contenido copiado');
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        }
    }
}

// Ctrl+C para copiar contenido de la tarjeta activa
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const activeCard = document.querySelector('.card.active');
        if (activeCard) {
            const text = activeCard.querySelector('.card-back p')?.textContent;
            if (text) {
                navigator.clipboard.writeText(text);
            }
        }
    }
});

// ===== CUESTIONARIO CON 30 PREGUNTAS Y 5 ALEATORIAS =====

// Banco de 30 preguntas
const allQuestions = [
    // Preguntas de Administración
    {
        question: "¿Cuál es la primera función del administrador en una empresa?",
        answers: ["Ventas", "Planificación y organización", "Marketing"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Qué es el ROI (Retorno sobre la Inversión)?",
        answers: ["El costo de producción", "La ganancia que se obtiene de una inversión", "El precio de venta"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Cuál es el objetivo principal de un administrador?",
        answers: ["Minimizar gastos", "Maximizar recursos y alcanzar objetivos empresariales", "Aumentar precios"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Qué es el liderazgo en administración?",
        answers: ["Dictar órdenes", "Influir y guiar a otros para lograr objetivos comunes", "Controlar el dinero"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Cuál es la importancia de la comunicación en una empresa?",
        answers: ["Gastar menos dinero", "Facilitar la coordinación y evitar malentendidos", "Aumentar las horas de trabajo"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Qué es un presupuesto empresarial?",
        answers: ["Un documento de marketing", "Plan de ingresos y gastos estimados", "Un contrato laboral"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Cuál es la función del control en administración?",
        answers: ["Despedir empleados", "Verificar que las actividades se realicen según lo planeado", "Aumentar precios"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Qué es la organización en administración?",
        answers: ["Vender productos", "Estructurar recursos y tareas para alcanzar objetivos", "Hacer publicidad"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Cuál es la importancia de la motivación en el trabajo?",
        answers: ["Gastar dinero", "Aumentar la productividad y satisfacción de empleados", "Reducir salarios"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Qué es la eficiencia empresarial?",
        answers: ["Trabajar mucho", "Lograr objetivos con el mínimo de recursos", "Vender más caro"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Cuáles son los niveles jerárquicos en una empresa?",
        answers: ["Solo gerentes", "Directivo, administrativo y operativo", "Solo empleados"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Qué es la toma de decisiones en administración?",
        answers: ["Adivinar", "Proceso de elegir opciones basándose en información y análisis", "Copiar a otros"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Cuál es la importancia de la delegación de tareas?",
        answers: ["Perder tiempo", "Distribuir responsabilidades para mejorar eficiencia", "Crear problemas"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Qué es la gestión del talento humano?",
        answers: ["Pagar poco", "Atraer, desarrollar y retener a los mejores empleados", "Controlar estrictamente"],
        correct: 1,
        category: "Administración"
    },
    {
        question: "¿Cuáles son los tipos de administración existentes?",
        answers: ["Solo una", "Científica, administrativa, moderna y otras escuelas", "Solo antigua"],
        correct: 1,
        category: "Administración"
    },
    // Preguntas de Espacio
    {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        answers: ["Saturno", "Júpiter", "Neptuno"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Cuánto tiempo tarda la luz del sol en llegar a la Tierra?",
        answers: ["2 minutos", "8 minutos y 20 segundos", "1 minuto"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Cuántas lunas tiene Marte?",
        answers: ["0 lunas", "2 lunas", "4 lunas"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Cuál es el planeta más cercano al Sol?",
        answers: ["Venus", "Mercurio", "Tierra"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Cuántas lunas tiene Saturno?",
        answers: ["Más de 80", "10", "5"],
        correct: 0,
        category: "Espacio"
    },
    {
        question: "¿Qué es una constelación?",
        answers: ["Un planeta", "Grupo de estrellas con forma visible desde la Tierra", "Una galaxia"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Cuál es la temperatura aproximada del núcleo del Sol?",
        answers: ["1 millón de grados", "15 millones de grados", "100 mil grados"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Qué es un agujero negro?",
        answers: ["Un planeta oscuro", "Región del espacio con gravedad tan fuerte que nada escapa", "Una estrella apagada"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Cuántos planetas hay en el sistema solar?",
        answers: ["9", "8", "10"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Qué es la Vía Láctea?",
        answers: ["Una estrella", "Nuestra galaxia", "Un cometa"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Cuál es el planeta con más anillos visibles?",
        answers: ["Júpiter", "Saturno", "Urano"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Qué es una supernova?",
        answers: ["Una nova pequeña", "Explosión de una estrella masiva", "Un tipo de planeta"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Cuál es el diámetro aproximado del Sol?",
        answers: ["1 millón de km", "1.4 millones de km", "500 mil km"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Qué es el Big Bang?",
        answers: ["Una explosión en el espacio", "Teoría del origen del universo", "Una estrella"],
        correct: 1,
        category: "Espacio"
    },
    {
        question: "¿Cuántos años luz está Alfa Centauri de la Tierra?",
        answers: ["5 años luz", "4.37 años luz", "10 años luz"],
        correct: 1,
        category: "Espacio"
    }
];

let currentQuestions = [];
let answeredQuestions = new Set();
let correctCount = 0;

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function initializeQuiz() {
    answeredQuestions = new Set();
    correctCount = 0;
    
    // Seleccionar 5 preguntas aleatorias del banco de 30
    const shuffled = shuffleArray(allQuestions);
    currentQuestions = shuffled.slice(0, 5);
    
    // Barajar las respuestas de cada pregunta
    currentQuestions = currentQuestions.map(q => ({
        ...q,
        answers: shuffleArray(q.answers),
        correctIndex: q.answers.indexOf(q.answers[q.correct])
    }));
    
    generateQuizHTML();
    attachAnswerListeners();
    updateProgress();
}

function generateQuizHTML() {
    const container = document.getElementById('quizQuestions');
    container.innerHTML = '';
    
    currentQuestions.forEach((q, index) => {
        const questionHTML = `
            <div class="quiz-item">
                <div class="question-number">${index + 1}</div>
                <div class="question-content">
                    <p class="question-text">${q.question}</p>
                    <div class="answers">
                        ${q.answers.map((answer, i) => `
                            <button class="answer-btn" data-question="${index}" data-answer="${i}">
                                ${answer}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += questionHTML;
    });
}

function attachAnswerListeners() {
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            handleAnswer(btn);
        });
    });
}

function handleAnswer(button) {
    const questionIndex = parseInt(button.dataset.question);
    const answerIndex = parseInt(button.dataset.answer);
    
    if (answeredQuestions.has(questionIndex)) {
        return;
    }
    
    const question = currentQuestions[questionIndex];
    const quizItem = button.closest('.quiz-item');
    const answerButtons = quizItem.querySelectorAll('.answer-btn');
    
    // Deshabilitar todos los botones
    answerButtons.forEach(btn => btn.disabled = true);
    
    // Obtener el índice correcto basado en el array barajado
    let correctAnswerIndex = -1;
    question.answers.forEach((answer, i) => {
        if (answer === question.answers[question.correct]) {
            correctAnswerIndex = i;
        }
    });
    
    if (answerIndex === correctAnswerIndex) {
        button.classList.add('correct');
        correctCount++;
        showResultFeedback(true);
        createConfettiEffect(button);
    } else {
        button.classList.add('incorrect');
        answerButtons[correctAnswerIndex].classList.add('correct');
        showResultFeedback(false);
        createHeartEffect(button);
    }
    
    answeredQuestions.add(questionIndex);
    updateProgress();
    
    if (answeredQuestions.size === 5) {
        setTimeout(() => {
            showFinalResult();
        }, 1200);
    }
}

function showResultFeedback(isCorrect) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.background = isCorrect ? '#10b981' : 'var(--color-secondary)';
    notification.style.color = 'white';
    notification.style.padding = '25px 40px';
    notification.style.borderRadius = '15px';
    notification.style.fontWeight = 'bold';
    notification.style.fontSize = '1rem';
    notification.style.zIndex = '9999';
    notification.style.textAlign = 'center';
    notification.style.maxWidth = '90%';
    notification.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
    notification.style.animation = 'slideDown 0.4s ease-out';
    notification.textContent = isCorrect ? '¡Correcto! 🎉' : '¡Buen intento! 💕';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 1500);
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const answeredCount = document.getElementById('answeredCount');
    const percentage = (answeredQuestions.size / 5) * 100;
    
    progressFill.style.width = percentage + '%';
    answeredCount.textContent = answeredQuestions.size;
}

function showFinalResult() {
    // Ocultar preguntas
    document.getElementById('quizQuestions').style.display = 'none';
    document.querySelector('.quiz-progress').style.display = 'none';
    
    const quizResult = document.getElementById('quizResult');
    const resultMessage = document.getElementById('resultMessage');
    const resultDetails = document.getElementById('resultDetails');

    let percentage = (correctCount / 5) * 100;
    let emoji = '';
    let message = '';
    let details = '';

    if (percentage === 100) {
        message = `¡PERFECTO! Obtuviste ${correctCount}/5 respuestas correctas`;
        details = `<p class="result-correct">¡Increíble! ¡Lo hiciste perfecto! 🎉 Tu inteligencia y dedicación me fascina. Eres brillante y tengo todo el orgullo del mundo en ti. Con esa dedicación, serás una administradora extraordinaria. ¡Te amo mucho! 💕✨</p>`;
        createConfettiExplosion();
    } else if (percentage === 80) {
        message = `¡Excelente! Obtuviste ${correctCount}/5 respuestas correctas`;
        details = `<p class="result-correct">¡Muy bien hecho! Estoy orgulloso de tu esfuerzo. Solo una pregunta no fue, pero eso es increíble. Eres muy inteligente y capaz. ¡Sigue así! 🚀💕</p>`;
    } else if (percentage >= 60) {
        message = `¡Buen trabajo! Obtuviste ${correctCount}/5 respuestas correctas`;
        details = `<p class="result-incorrect">¡Muy bien por intentarlo! Cada respuesta que acertaste te acerca a tus metas. No importa los errores, lo importante es que aprendes. Tú tienes potencial ilimitado. ¡Adelante! 💪🌟</p>`;
    } else {
        message = `¡Empezaste bien! Obtuviste ${correctCount}/5 respuestas correctas`;
        details = `<p class="result-incorrect">Cada intento es un aprendizaje. No te desanimes, eres una persona inteligente y capaz. Los grandes profesionales empezaron así. Creo en ti. ¡Vamos, tú puedes lograrlo! 💕✨</p>`;
    }

    resultMessage.innerHTML = `${emoji} ${message}`;
    resultDetails.innerHTML = details;
    quizResult.classList.add('active');

    setTimeout(() => {
        quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
}

function createConfettiEffect(element) {
    for (let i = 0; i < 6; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = ['💕', '⭐', '✨', '🌸'][Math.floor(Math.random() * 4)];
        confetti.style.position = 'fixed';
        confetti.style.left = element.getBoundingClientRect().left + 'px';
        confetti.style.top = element.getBoundingClientRect().top + 'px';
        confetti.style.fontSize = '1.3rem';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9998';
        
        document.body.appendChild(confetti);

        let x = (Math.random() - 0.5) * 80;
        let y = (Math.random() - 0.5) * 80;
        let duration = 800 + Math.random() * 400;

        const animation = confetti.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0.4)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        animation.onfinish = () => confetti.remove();
    }
}

function createHeartEffect(element) {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'fixed';
        heart.style.left = element.getBoundingClientRect().left + 'px';
        heart.style.top = element.getBoundingClientRect().top + 'px';
        heart.style.fontSize = '1.2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9998';
        
        document.body.appendChild(heart);

        let x = (Math.random() - 0.5) * 60;
        let y = (Math.random() + 1) * 80;

        const animation = heart.animate([
            { transform: 'translateY(0) opacity(1)', offset: 0 },
            { transform: `translate(${x}px, -${y}px) opacity(0)`, offset: 1 }
        ], {
            duration: 1000,
            easing: 'ease-in'
        });

        animation.onfinish = () => heart.remove();
    }
}

function createConfettiExplosion() {
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = ['🎉', '💕', '⭐', '✨', '🌸', '❤️'][Math.floor(Math.random() * 6)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '0px';
        confetti.style.fontSize = '1.5rem';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9998';
        
        document.body.appendChild(confetti);

        let duration = 1500 + Math.random() * 1000;

        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(360deg) scale(0)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        animation.onfinish = () => confetti.remove();
    }
}

// Inicializar quiz cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
    initializeQuiz();
});

function scrollToCards() {
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Agregar animaciones CSS dinámicas
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
