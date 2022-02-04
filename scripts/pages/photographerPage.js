//import photographer factory html
import MediaFactory from "../factories/MediaFactory.js"
import PhotographerFactory from "../factories/PhotographerFactory.js"
import Image from "../model/Image.js"
import Video from "../model/Video.js"

let inverse = 0;
/*RECUPERATION DES DONNEES */
fetch('data/photographers.json')    //promise1 résolue: serveur répond
    .then(function (response) {     //promise2 résolue: data chargée
        return response.json();     //data json vers objet
    })
    .then(function ({ media, photographers }) { //resolve p2 donne data formatée 

        /**
         * partie PHOTOGRAPHERS BANNIERE
         */
        const url_object = window.location;
        let objetParam = new URL(url_object);
        const identifiant = Number(objetParam.searchParams.get('id'));
        let dataMain = photographers.filter(function (objet) {
            return objet.id === identifiant
        });                        //[{name:"Keel", id: 12}]
        dataMain = dataMain[0];    //{name:"Keel", id: 12}

        //template photographers
        const VueMain = new PhotographerFactory(dataMain);
        document.querySelector("#main").appendChild(VueMain.createPhotographerBanner());


        /**
         * partie MEDIA
         */
        //function crée Vue Image ou Video en fonction de la data
        function createImageVideoCard(dataMedia) {
            // --> sortie tableau d'instances de class image ou video extension Media
            //wrappé dans la classe MediaFactory contenant méthode builder image/videoCard
            let dataMediaInstance = dataMedia.map(function (el) {
                return new MediaFactory(el)
            })
            //Création Vue template Media via méthode builder class MediaFactory 
            dataMediaInstance.forEach(function (el) {
                if (el.media instanceof Image) {
                    document.querySelector(".containerPhotos").appendChild(el.createImageCard());
                } else if (el.media instanceof Video) {
                    document.querySelector(".containerPhotos").appendChild(el.createVideoCard());
                }
            }
            );
        }

        //extrait un objet d'un tableau d'objets en fonction de son identifiant  
        let dataMedia = media.filter(function (objet) {
            return objet.photographerId === identifiant
        });

        createImageVideoCard(dataMedia);

        // Bouton dropdown 
        document.querySelector("#dropdown").addEventListener("change", function () {
            const menuSelect = document.querySelector("#dropdown").value;
            console.log(menuSelect);
            if (menuSelect === 'Titre') {
                dataMedia.sort(function (a, b) {
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0;
                })
                const nodeMedia = document.querySelector(".containerPhotos");
                while (nodeMedia.firstChild) {
                    nodeMedia.removeChild(nodeMedia.lastChild);
                }
                createImageVideoCard(dataMedia);
                //console.log(dataMedia);
            }
            else if (menuSelect === 'Popularité') {
                dataMedia.sort(function (a, b) {
                    return b.likes - a.likes
                })
                const nodeMedia = document.querySelector(".containerPhotos");
                while (nodeMedia.firstChild) {
                    nodeMedia.removeChild(nodeMedia.lastChild);
                }
                createImageVideoCard(dataMedia);
            }
            else if (menuSelect === 'Date') {
                dataMedia.sort(function (a, b) {
                    if (a.date > b.date)  return 1;		
                    if (a.date < b.date)  return -1;		
                    return 0;
                })
                const nodeMedia = document.querySelector(".containerPhotos");
                while (nodeMedia.firstChild) {
                    nodeMedia.removeChild(nodeMedia.lastChild);
                }
                createImageVideoCard(dataMedia);
            }
        })

        // Like coeur
        document.querySelectorAll(".heart").forEach(function (el) {
            el.addEventListener("click", function (event) {
                if (inverse === 0) {
                    inverse = 1;
                    const spanLike = event.path[0].previousElementSibling;
                    let like = Number(spanLike.textContent);
                    like += 1;
                    spanLike.textContent = like;
                } else {
                    inverse = 0;
                    const spanLike = event.path[0].previousElementSibling;
                    let like = Number(spanLike.textContent);
                    like -= 1;
                    spanLike.textContent = like;
                }
            })
        });
    })