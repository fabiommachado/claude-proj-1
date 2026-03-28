// SPA navigation for Nexosoft site
const navLinks = document.querySelectorAll('.nav-link');
const sections = {
    home: document.getElementById('hero'),
    about: document.getElementById('about'),
    clients: document.getElementById('clients'),
    contacts: document.getElementById('contacts')
};

function showSection(page) {
    Object.entries(sections).forEach(([key, section]) => {
        if (section) section.classList.toggle('hidden', key !== page && !(page === 'home' && key === 'hero'));
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const page = link.getAttribute('data-page');
        showSection(page);
    });
});

// Default to home/hero
showSection('home');
navLinks[0].classList.add('active');
