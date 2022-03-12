import PhotographerFactory from "../factories/PhotographerFactory.js"

/*Récupération des données */
//promise résolue: serveur répond
fetch("data/photographers.json")
    // Promise résolue: data chargée
    .then(function (response) {
        return response.json();
    })
    // Promise donne data json vers objet, then
    .then(function (resp) {
        // Extraction objet photographers
        const { photographers } = resp;
        photographers.forEach((el) => {
            const Template = new PhotographerFactory(el);
            document.querySelector(".photographer_section").appendChild(Template.createPhotographerCard());
        })
    });





