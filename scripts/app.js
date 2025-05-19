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

function createStars() {
    return '★'.repeat(5);
}

const avisTexts = [
    "Super hôtel, très propre et très confortable. Les équipes sont très attentionnées et disponibles. Je recommande vivement !",
    "Un séjour magnifique dans un cadre idyllique. Le personnel est aux petits soins et la vue est imprenable. À refaire !",
    "Une expérience inoubliable ! L'hôtel est parfaitement situé, les chambres sont spacieuses et le service est impeccable."
];

async function displayData() {
    const avisContent = document.querySelector('.avis-content');
    const data = await fetchData();

    if (!data) return;

    data.results.forEach((user, index) => {
        const avisItem = document.createElement('div');
        avisItem.classList.add('avis-item');
        avisItem.innerHTML = `
            <img class="pdp" src="${user.picture.large}" alt="Photo de profil">
            <h3 class="name">${user.name.first} ${user.name.last}</h3>
            <p class="location">${user.location.city}, ${user.location.country}</p>
            <p class="email">${user.email}</p>
            <div class="stars">${createStars()}</div>
            <p class="avis-text">${avisTexts[index]}</p>
        `;
        avisContent.appendChild(avisItem);
    });
}

displayData();




