/*RECUP DES DONNEES */
fetch('data/photographers.json')    //promise1 résolue: serveur répond
    .then(function (response) {     //promise2 résolue: data chargée
        return response.json();     //data json vers objet
    })
    .then(function ({ media, photographers }) { //resolve p2 donne data formatée 
        
        //partie photographers
        const url_object = window.location;
        let objetParam = new URL(url_object);
        const identifiant = Number(objetParam.searchParams.get('id'));
        let dataMain = photographers.filter(function(objet){
            return objet.id === identifiant
        });                        //[{name:"Keel", id: 12}]
        dataMain = dataMain[0];    //{name:"Keel", id: 12}
        const VueMain = new MainBuilderP2(dataMain);
        document.querySelector("#main").appendChild(VueMain.createMainP2());

        //partie media                       media = [{key1:'t', key2:'t'}, {...}];
        let dataMedia = media.filter(function(objet){
            return objet.photographerId === identifiant
        });
        console.log(dataMedia);

        dataMedia = media.map(function (el) {//instance Image/Video(extend Media)
            return new MediaFactory(el)    //{_key1:'t', _key2:'t'} +héritage        
        });

         /*    
        dataMedia.forEach(function (el) {
            if (el instanceof Image) {
                //console.log("Instance d'image")
            } else {
                //console.log("Instance de video")
            };
        })
        
        dataMedia.forEach(function (el) {
            const Template = new PhotographerFactory(el);
            document.querySelector(".photographer_section").appendChild(Template.createPhotographerCard());
        })
        */
    }
    );
