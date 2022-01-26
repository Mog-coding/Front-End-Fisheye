/*RECUP DES DONNEES */
fetch('/data/photographers.json')// 1ere promise résolue qd serveur distant repond
    .then(function (response) {  // 2eme promise résolue qd data chargée
        return response.json();
    })
    .then(function (resp) {//2eme promis donne data format json vers objet, then
        const { media } = resp; // extraction objet photographers
        const dataMedia = media.map(function (el) {
            return new Media(el)
        }
        )
        console.log(dataMedia);
        /*
        dataMedia.forEach(function (el) {
            const Template = new PhotographerFactory(el);
            document.querySelector(".photographer_section").appendChild(Template.createPhotographerCard());
        })
        */
    }
    );
