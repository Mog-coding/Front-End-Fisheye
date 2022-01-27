/*RECUP DES DONNEES */
fetch('/data/photographers.json')// 1ere promise résolue qd serveur distant repond
    .then(function (response) {  // 2eme promise résolue qd data chargée
        return response.json();
    })
    .then(function (resp) {//2eme promis donne data format json vers objet, then
        const { media } = resp; // extraction objet photographers
        const dataMedia = media.map(function (el, index, arr) {
            if (arr[index]["image"] !== undefined) {
                return new Image(el)
            } else {
                return new Video(el)
            }
        }
        );
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
