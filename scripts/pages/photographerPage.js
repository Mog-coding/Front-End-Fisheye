//recup id param navigation photographer id

/*RECUP DES DONNEES */
import MediaFactory from "../factories/MediaFactory.js";
import Image from "../model/Image.js";
import Video from "../model/Video.js";

fetch('data/photographers.json')// 1ere promise résolue qd serveur distant repond
    .then(function (response) {  // 2eme promise résolue qd data chargée
        return response.json();
    })
    .then(function ({ media, photographers }) {
        //partie photographers
        

        //partie media OK
        const dataMedia = media.map(function (el) {
            return new MediaFactory(el)
        });
        console.log(dataMedia[0]);
        dataMedia.forEach(function (el) {
            if (el instanceof Image) {
                console.log("Instance d'image")
            } else {
                console.log("Instance de video")
            };
        })


        /*
        dataMedia.forEach(function (el) {
            const Template = new PhotographerFactory(el);
            document.querySelector(".photographer_section").appendChild(Template.createPhotographerCard());
        })
        */
    }
    );
