document.addEventListener('DOMContentLoaded', function () {
    // Número de partículas
    const numberOfParticles = 500;
    const particlesContainer = document.body;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particlesContainer.appendChild(particle);

        // Establecer posiciones y animación aleatoria
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 5 + 2}px`; // Tamaño aleatorio de las partículas
        particle.style.height = particle.style.width; // Mantener el mismo ancho y alto
        particle.style.backgroundColor = '#ffffff'; // Color blanco para las partículas
        particle.style.borderRadius = '50%'; // Forma redonda
        particle.style.zIndex = '10'; // Asegura que las partículas estén por encima de otros elementos

        // Movimiento aleatorio de las partículas a través de JavaScript
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 5 + 5;

        // Aplicar animación a cada partícula
        particle.style.animation = `particleMovement ${duration}s linear infinite`;
        particle.style.animationDelay = `${delay}s`;

        // Establecer posiciones aleatorias para el inicio
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Agregar animación en JavaScript
        particle.style.transform = `translate(${randomX}vw, ${randomY}vh)`;
    }
});

// Estilo CSS de las partículas
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes particleMovement {
            0% {
                transform: translate(0, 0);
            }
            100% {
                transform: translate(30px, 30px); /* Movimiento aleatorio pero limitado a 30px */
            }
        }

        /* Estilo de las partículas */
        .particle {
            position: absolute;
            background-color: #ffffff; /* Color blanco */
            border-radius: 50%; /* Redondeadas */
            z-index: 10;
        }
    </style>
`);
