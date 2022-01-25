/* fichier INDEX */
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers = [
        {
            "name": "Marcel Nikolic",
            "id": 195,
            "city": "Berlin",
            "country": "France",
            "tagline": "Toujours à la recherche de LA photo",
            "price": 300,
            "portrait": "MarcelNikolic.jpg"
        },
        {
            "name": "Ellie-Rose Wilkens",
            "id": 930,
            "city": "Paris",
            "country": "France",
            "tagline": "Capturer des compositions complexes",
            "price": 250,
            "portrait": "EllieRoseWilkens.jpg"
        },
    ]
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers, ...photographers, ...photographers]})
}

function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();