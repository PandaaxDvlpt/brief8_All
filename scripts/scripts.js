document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navbarList = document.querySelector('.navbar-list');
    const navLinks = document.querySelectorAll('.navlinks a');


    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navbarList.classList.toggle('active');
    };


    hamburger.addEventListener('click', toggleMenu);


    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && 
            !navbarList.contains(e.target) && 
            navbarList.classList.contains('active')) {
            toggleMenu();
        }
    });
}); 