import Photographer from "../model/Photographer.js"
import PhotographerFactory from "../factories/PhotographerFactory.js"

/*RECUP DES DONNEES */
fetch('data/photographers.json')   // 1ere promise résolue qd serveur distant repond
    .then(function (response) {   // 2eme promise résolue qd data chargée
        return response.json();
    })
    .then(function (resp) {//2eme promis donne data format json vers objet, then
        const { photographers } = resp; // extraction objet photographers
        const dataFac = photographers.map(function (el) {
            return new Photographer(el)
        }
        )
        dataFac.forEach(function (el) {
            const Template = new PhotographerFactory(el);
            document.querySelector(".photographer_section").appendChild(Template.createPhotographerCard());
        })
    }
    );





