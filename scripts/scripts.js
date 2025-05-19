document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.navbar-list');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    const liens = document.querySelectorAll('.navlinks a');
    liens.forEach(lien => {
        lien.addEventListener('click', () => {
            if (menu.classList.contains('active')) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    });

    const switchTheme = document.querySelector('#checkbox');
    
    if (localStorage.getItem('theme') === 'dark-mode') {
        document.body.classList.add('dark-mode');
        switchTheme.checked = true;
    }

    switchTheme.addEventListener('change', () => {
        if (switchTheme.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    const formulaire = document.querySelector('.contact-form');
    
    if (formulaire) {
        const champs = formulaire.querySelectorAll('input, textarea');
        
        champs.forEach(champ => {
            champ.addEventListener('input', verifierChamp);
            champ.addEventListener('blur', verifierChamp);
        });

        function verifierChamp() {
            const message = this.nextElementSibling;
            let estValide = true;
            let texteErreur = '';

            if (this.value.trim() === '') {
                estValide = false;
                texteErreur = 'Ce champ est requis';
            }
            else if (this.type === 'email' && !verifierEmail(this.value)) {
                estValide = false;
                texteErreur = 'Veuillez entrer une adresse email valide';
            }

            if (!estValide) {
                this.classList.add('error');
                message.textContent = texteErreur;
                message.classList.add('show', 'error');
            } else {
                this.classList.remove('error');
                message.classList.remove('show', 'error');
            }

            return estValide;
        }

        function verifierEmail(email) {
            return email.includes('@') && email.includes('.');
        }

        formulaire.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let formulaireValide = true;
            
            champs.forEach(champ => {
                if (!verifierChamp.call(champ)) {
                    formulaireValide = false;
                }
            });

            if (formulaireValide) {
                formulaire.classList.add('form-success');
                
                setTimeout(() => {
                    alert('Votre message a été envoyé avec succès !');
                    formulaire.reset();
                    formulaire.classList.remove('form-success');
                }, 1000);
            }
        });
    }
}); 


