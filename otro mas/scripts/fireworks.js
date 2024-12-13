document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');

    // Generar partículas de fuegos artificiales
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particlesContainer.appendChild(particle);

        // Posición inicial de la partícula
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Establecer los valores aleatorios para el movimiento
        const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio
        const distance = Math.random() * 200 + 100; // Distancia aleatoria
        const xOffset = Math.cos(angle) * distance;
        const yOffset = Math.sin(angle) * distance;

        // Establecer las propiedades de movimiento para la animación
        particle.style.setProperty('--x', `${xOffset}px`);
        particle.style.setProperty('--y', `${yOffset}px`);

        // Eliminar la partícula después de la animación
        setTimeout(() => {
            particlesContainer.removeChild(particle);
        }, 1000); // Duración de la animación
    }

    // Generar partículas continuamente
    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createParticle(x, y);
    }, 10); // Intervalo entre la creación de partículas
});
