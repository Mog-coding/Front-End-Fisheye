import Photographer from "../model/Photographer.js"
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
        console.log(resp);
        const { photographers } = resp;
        console.log(photographers);
        const dataFactory = photographers.map((el) => {
            return new Photographer(el)
        })
        dataFactory.forEach((el) => {
            const Template = new PhotographerFactory(el);
            document.querySelector(".photographer_section").appendChild(Template.createPhotographerCard());
        })
    });





