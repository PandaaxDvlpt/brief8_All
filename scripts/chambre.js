async function fetchChambreJson() { 
    try {
        const response = await fetch('../json/chambres.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        return null;
    }
}

async function displayChambreJson() { 
    const chambreCard = document.querySelector('.chambre-card');
    const data = await fetchChambreJson();
    
    if (data && data.chambres) {
        chambreCard.innerHTML = data.chambres.map(chambre => `
            <div class="chambre-item">
                <img src="${chambre.image || 'assets/default-room.jpg'}" alt="${chambre.nom}">
                <div class="content-wrapper">
                    <h3>${chambre.nom}</h3>
                    <p>${chambre.description}</p>
                    <p class="price">${chambre.prix}€ / nuit</p>
                    <div class="equipements">
                        <h4>Équipements :</h4>
                        <ul>
                            ${chambre.equipements.map(equipement => `<li>${equipement}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="points-verts">
                        <h4>Points verts :</h4>
                        <ul>
                            ${chambre.points_verts.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <a href="contact.html" class="reserve-btn">Réserver cette chambre</a>
            </div>
        `).join('');
    } else {
        chambreCard.innerHTML = '<p>Erreur lors du chargement des chambres</p>';
    }
}
displayChambreJson();


