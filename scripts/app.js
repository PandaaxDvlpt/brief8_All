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


