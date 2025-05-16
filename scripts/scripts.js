document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navbarList = document.querySelector('.navbar-list');
    const navLinks = document.querySelectorAll('.navlinks a');

    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme);

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


