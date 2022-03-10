import Photographer from "../model/Photographer.js"
import PhotographerFactory from "../factories/PhotographerFactory.js"

/*Récupération des données */
fetch("data/photographers.json") //promise1 résolue: serveur répond
    // Promise2 résolue: data chargée
    .then(function (response) {  
        return response.json();  
    })
    // Promise donne data json vers objet, then
    .then(function (resp) { 
        // Extraction objet photographers
        const { photographers } = resp; 
        const dataFactory = photographers.map(function (el) {
            return new Photographer(el)
        })
        dataFactory.forEach(function (el) {
            const Template = new PhotographerFactory(el);
            document.querySelector(".photographer_section").appendChild(Template.createPhotographerCard());
        })
    }
    );





