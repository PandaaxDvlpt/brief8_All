async function fetchData() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=3');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        return null;
    }
}

const avisTexts = {
    5: ["Une expérience parfaite du début à la fin ! Accueil chaleureux, chambre impeccable, services au top. Nous reviendrons sans hésiter. Merci pour ce moment inoubliable !"],
    4: ["Très bon séjour ! La chambre était propre et confortable, le personnel attentif, et le petit déjeuner copieux. Quelques petits détails à améliorer, mais globalement satisfaits."],
    3: ["Séjour correct dans l'ensemble. La chambre était simple mais fonctionnelle. Le personnel était poli, sans plus. Bon rapport qualité-prix, mais rien d'exceptionnel."],
    2: ["L'hôtel a quelques points positifs, comme son emplacement, mais la propreté laissait à désirer et le service n'était pas à la hauteur. Il y a clairement des choses à améliorer."],
    1: ["Je suis très déçu de mon séjour. La chambre était sale à mon arrivée, le personnel peu accueillant, et j'ai eu du mal à dormir à cause du bruit. Je ne recommande pas cet hôtel."]
};

function createStars() {
    const stars = Math.floor(Math.random() * 5) + 1;
    return {
        stars: '★'.repeat(stars),
        rating: stars
    };
}

let allRatings = [];

async function displayData() {
    const avisContent = document.querySelector('.avis-content');
    const data = await fetchData();
    allRatings = []; 

    if (!data) return;

    data.results.forEach((user) => {
        const { stars, rating } = createStars();
        allRatings.push(rating); 
        const avisItem = document.createElement('div');
        avisItem.classList.add('avis-item');
        avisItem.innerHTML = `
            <img class="pdp" src="${user.picture.large}" alt="Photo de profil">
            <h3 class="name">${user.name.first} ${user.name.last}</h3>
            <p class="location">${user.location.city}, ${user.location.country}</p>
            <p class="email">${user.email}</p>
            <div class="stars">${stars}</div>
            <p class="avis-text">${avisTexts[rating][0]}</p>
        `;
        avisContent.appendChild(avisItem);
    });

    
    const averageRating = allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length;
    const ratingElement = document.getElementById('rating');
    ratingElement.innerHTML = `Note moyenne : ` + `<span class="sunid">${averageRating.toFixed(1)} ★</span>`;
}

displayData();


async function fetchCelebrity() {
    const options = {
        method: 'GET',
        headers: {
            'X-Api-Key': 'QRGsZLLXuw3E4CnZ2LX7Ug==aG2el5R945B6jBi0',
            'Content-Type': 'application/json'
        }
    };

    const celebrities = [
        'P Diddy',
        'Gerard Depardieu',
        'Kanye West',
        'Jeffrey Epstein'
    ];

    try {
        const promises = celebrities.map(celebrity => 
            fetch(`https://api.api-ninjas.com/v1/celebrity?name=${encodeURIComponent(celebrity)}`, options)
                .then(response => response.json())
        );

        const results = await Promise.all(promises);
        return results.flat(); 
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        return null;
    }
}

async function displayCelebrity() {
    const celebrities = await fetchCelebrity();
    const celebContainer = document.querySelector('.celeb-card');
    
    if (celebrities && celebContainer) {
        celebContainer.innerHTML = celebrities.map(celebrity => `
            <div class="celeb-item">
                <img src="${celebrity.image_url || 'https://via.placeholder.com/400x400?text=Célébrité'}" alt="${celebrity.name}">
                <div class="content-wrapper">
                    <h3>${celebrity.name}</h3>
                    <p class="occupation">${celebrity.occupation || 'Profession non spécifiée'}</p>
                    <p class="description">
                        ${celebrity.description || 
                        `${celebrity.name} est une personnalité ${celebrity.occupation ? `connue pour son travail en tant que ${celebrity.occupation}` : 'connue'}. 
                        ${celebrity.net_worth ? `Sa fortune est estimée à ${celebrity.net_worth}.` : ''} 
                        Une personnalité fascinante qui a marqué son époque.`}
                    </p>
                    ${celebrity.net_worth ? `<p class="net-worth">Fortune estimée : ${celebrity.net_worth}</p>` : ''}
                    <a href="#" class="know-more-btn" onclick="showMoreInfo('${celebrity.name}')">En savoir plus</a>
                </div>
            </div>
        `).join('');
    }
}

function showMoreInfo(celebrityName) {
    alert(`Plus d'informations sur ${celebrityName} seront bientôt disponibles !`);
}

displayCelebrity();

// Initialisation d'EmailJS
(function() {
    emailjs.init("5aowvhw4yumZjI1Ia"); // Remplacez par votre clé publique EmailJS
})();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';

            try {
                // Récupération des données du formulaire
                const formData = {
                    name: form.querySelector('#name').value,
                    email: form.querySelector('#email').value,
                    subject: form.querySelector('#subject').value,
                    message: form.querySelector('#message').value
                };

                // Envoi de l'email via EmailJS
                const response = await emailjs.send(
                    "service_cnkipng", 
                    "template_u3051y4", 
                    formData
                );

                if (response.status === 200) {
                    formStatus.style.display = 'block';
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
                    form.reset();
                } else {
                    throw new Error('Erreur lors de l\'envoi du message');
                }
            } catch (error) {
                console.error('Erreur détaillée:', error);
                formStatus.style.display = 'block';
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
            } finally {
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
        });
    }
});

