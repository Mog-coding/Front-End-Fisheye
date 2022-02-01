/*RECUP DES DONNEES */
fetch('data/photographers.json')    //promise1 résolue: serveur répond
    .then(function (response) {     //promise2 résolue: data chargée
        return response.json();     //data json vers objet
    })
    .then(function ({ media, photographers }) { //resolve p2 donne data formatée 

        //partie PHOTOGRAPHERS
        const url_object = window.location;
        let objetParam = new URL(url_object);
        const identifiant = Number(objetParam.searchParams.get('id'));
        let dataMain = photographers.filter(function (objet) {
            return objet.id === identifiant
        });                        //[{name:"Keel", id: 12}]
        dataMain = dataMain[0];    //{name:"Keel", id: 12}
        //template photographers
        const VueMain = new MainBuilderP2(dataMain);
        document.querySelector("#main").appendChild(VueMain.createMainP2());

        //partie MEDIA                 media = [{key1:'t', key2:'t'}, {...}];
        let dataMedia = media.filter(function (objet) {   //trie medias
            return objet.photographerId === identifiant
        });        //media = [{key1:'t', key2:'t'}, {...}];
        dataMedia = dataMedia.map(function (el) {//instance Image/Video
            return new MediaFactory(el)  //{_key1:'t', _key2:'t'} +héritage 
        });
        //template Media
        dataMedia.forEach(function (el) {
            console.log(el);
            if (el instanceof Image) {
                const VuePhoto = new ImageCardBuilderP2(el);
                document.querySelector(".containerPhotos").appendChild(VuePhoto.createImageCard());
            } else if (el instanceof Video) {
                const VueVideo = new VideoCardBuilderP2(el);
                document.querySelector(".containerPhotos").appendChild(VueVideo.createVideoCard());
            }
        }
        );
        /*
        document.querySelectorAll(".heart").forEach(addEventListener("click", function () {
            console.log("truc");;
        }
        ));
        */
    });