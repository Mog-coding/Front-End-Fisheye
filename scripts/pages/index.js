//import class Photographer
import Photographer from "../model/Photographer.js"
//import photographer factory html
import IndexBuilderP1 from "../factories/IndexBuilderP1.js"

/*RECUP DES DONNEES */
fetch('data/photographers.json') //promise1 résolue: serveur répond
    .then(function (response) {   //promise2 résolue: data chargée
        return response.json();   //data json vers objet
    })
    .then(function (resp) { //promise2 donne data formaté objet, then
        const { photographers } = resp; // extraction objet photographers
        const dataFactory = photographers.map(function (el) {
            return new Photographer(el)
        })
        dataFactory.forEach(function (el) {
            const Template = new IndexBuilderP1(el);
            document.querySelector(".photographer_section").appendChild(Template.createPhotographerCard());
        })
    }
    );





