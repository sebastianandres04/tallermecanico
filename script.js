
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const contactForm = document.querySelector('.contact-form');
const mensajes = [];

function toggleMenu() {
    nav.classList.toggle('active');
    navLinks.forEach((link, index) => {
        link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    });
    burger.classList.toggle('toggle');
}

function cerrarMenu() {
    if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => link.style.animation = '');
    }
}
const nosotros = document.getElementById("nosotros");

nosotros.addEventListener("mouseenter", () => {
    nosotros.style.backgroundColor = "#fdf3f2";
});
nosotros.addEventListener("mouseleave", () => {
    nosotros.style.backgroundColor = "transparent";
});

function resaltarServicio(id) {
    const tarjeta = document.getElementById(id);
    tarjeta.addEventListener("mouseenter", () => {
        tarjeta.style.backgroundColor = "#e0e0e0";
    });
    tarjeta.addEventListener("mouseleave", () => {
        tarjeta.style.backgroundColor = "white";
    });
}

resaltarServicio("servicio-mecanica");
resaltarServicio("servicio-aceite");
resaltarServicio("servicio-reparaciones");
resaltarServicio("servicio-diagnostico");

function validarFormulario(form) {
    const nombre = form.querySelector('input[placeholder="Nombre"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const telefono = form.querySelector('input[type="tel"]').value.trim();
    const mensaje = form.querySelector('textarea').value.trim();
    if (!nombre || !email || !telefono || !mensaje) {
        alert("Todos los campos son obligatorios.");
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Correo inválido.");
        return false;
    }
    if (!/^\+56\s?9\d{8}$/.test(telefono)) {
        alert("El teléfono debe tener 8 dígitos, ejemplo: 80829302");
        return false;
    }
    return true;
}

burger.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', cerrarMenu));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validarFormulario(this)) {
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            mensajes.push(data);
            alert('¡Gracias por tu mensaje!');
            this.reset();
        }
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .gallery-item, .feature');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

const style = document.createElement('style');
style.textContent = `
    .service-card, .gallery-item, .feature {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .burger.toggle .line2 {
        opacity: 0;
    }
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);
