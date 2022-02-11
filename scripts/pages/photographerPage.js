//import photographer factory html
import MediaFactory from "../factories/MediaFactory.js"
import PhotographerFactory from "../factories/PhotographerFactory.js"
import Image from "../model/Image.js"
import Video from "../model/Video.js"
let test = "bleu";

/*RECUPERATION DES DONNEES */
fetch('data/photographers.json')    // promise1 résolue: serveur répond
    .then(function (response) {     // promise2 résolue: data chargée
        return response.json();     // data json vers objet
    })
    .then(function ({ media, photographers }) { //p3 résolue: donne data formatée 
        // photographers: array contenant 6 objets photographe

        /**
         *  partie PHOTOGRAPHERS BANNIERE
         */

        // Extraction d'1 objet photographe via son id contenu dans l'url de la page
        const url_object = window.location;
        const objetParam = new URL(url_object);
        const identifiant = Number(objetParam.searchParams.get('id'));
        const foundPhotographer = photographers.find((objet) => {
            return objet.id === identifiant
        });

        // VueMain instance de class PhotographerFactory et création de bannière
        // dans <main> via méthode de class
        const VueMain = new PhotographerFactory(foundPhotographer);
        document.querySelector("#main").appendChild(VueMain.createPhotographerBanner());

        /**
         *  partie MEDIA
         */

        // filtre ds tableau d'objets les Medias du photographe via propriété 
        // photoID égale à la valeur contenue dans l'url de la page    
        const dataMedia = media.filter((el) => {
            return el.photographerId === identifiant
        });

        // function instancie objet Media en classMediaFactory et crée Vue Image ou Video
        function createImageVideoCard(dataMedia) {
            // tableau d'objet Media vers tableau d'instance de class MediaFactory 
            // contenant méthode builder Image/Video Card. Class MediaFactory contient un // objet de class Image ou Video qui sont des extensions de la class Media
            let dataMediaInstance = dataMedia.map((el) => {
                return new MediaFactory(el)
            })
            //Création Vue template Media via méthode MediaFactory dans <section> 
            dataMediaInstance.forEach((el) => {
                if (el.media instanceof Image) {
                    document.querySelector(".containerPhotos").appendChild(el.createImageCard());
                } else if (el.media instanceof Video) {
                    document.querySelector(".containerPhotos").appendChild(el.createVideoCard());
                }
            }
            );
        }
        createImageVideoCard(dataMedia);

        // Menu dropdown 
        // Trie les objets Media selon valeur du menu select et crée une vue de ces 
        // Medias en ayant supprimés les Medias précédents

        document.querySelector("#buttonDrop1").addEventListener("click", (event) => {
            //Apparition / disparition du menu dropdown
            if (event.target.parentElement.classList.contains('overflow')) {
                document.querySelector('.containerDropDown').classList.remove('overflow');
            } else {
                document.querySelector('.containerDropDown').classList.add('overflow');
            }
        })

        function trieMedia(){
            //Trie des Medias
            const menuSelect = event.target.value;
            //trie clé string title des objets dataMedia par ordre alphabétique  
            if (menuSelect === 'Titre') {
                dataMedia.sort(function (a, b) {
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0;
                })
                //supression des anciens Medias
                const nodeMedia = document.querySelector(".containerPhotos");
                while (nodeMedia.firstChild) {
                    nodeMedia.removeChild(nodeMedia.firstChild);
                }
                //creation des nouveaux Medias classés
                createImageVideoCard(dataMedia);
            }
            //trie clé like Number des objets dataMedia par ordre décroissant  
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
            //trie clé string date des objets dataMedia par ordre croissant 
            else if (menuSelect === 'Date') {
                dataMedia.sort(function (a, b) {
                    if (a.date > b.date) return 1;
                    if (a.date < b.date) return -1;
                    return 0;
                })
                const nodeMedia = document.querySelector(".containerPhotos");
                while (nodeMedia.firstChild) {
                    nodeMedia.removeChild(nodeMedia.lastChild);
                }
                createImageVideoCard(dataMedia);
            }
           }

        //Inversion des valeurs du menu DropDown lors du clic
        document.querySelector('#buttonDrop2').addEventListener('click', function (event) {
            const node1 = document.querySelector('#buttonDrop1');
            const node2 = document.querySelector('#buttonDrop2');
            const button1Value = node1.value;
            const button2Value = node2.value;
            node1.innerText = button2Value;
            node1.setAttribute('value', button2Value);
            node2.innerText = button1Value;
            node2.setAttribute('value', button1Value);
            document.querySelector('.containerDropDown').classList.add('overflow');
            trieMedia()
        })
        document.querySelector('#buttonDrop3').addEventListener('click', function (event) {
            const node1 = document.querySelector('#buttonDrop1');
            const node3 = document.querySelector('#buttonDrop3');
            const button1Value = node1.value;
            const button3Value = node3.value;
            node1.innerText = button3Value;
            node1.setAttribute('value', button3Value);
            node3.innerText = button1Value;
            node3.setAttribute('value', button1Value);
            document.querySelector('.containerDropDown').classList.add('overflow');trieMedia()
        })




        // Addition et affichage du total likes
        let arrayLike = [];
        document.querySelectorAll(".likeNumber").forEach(function (el) {
            arrayLike.push(Number(el.textContent));
        });
        let total = arrayLike.reduce((accu, el) => {
            return accu + el;
        });
        document.querySelector("#compteur").innerText = total;
        document.querySelector('#price').innerText = `${foundPhotographer.price}€ / jour`;

        // Ajout like: listener on change sur coeur
        document.querySelectorAll(".heart").forEach(function (el) {
            let inverse = 0;
            el.addEventListener("click", function (event) {
                /*if (inverse === 0) { */
                inverse = inverse === 0 ? 1 : 0;
                const spanLike = event.path[0].previousElementSibling;
                let like = Number(spanLike.textContent);
                like = inverse === 0 ? like + 1 : like - 1;
                spanLike.textContent = like;
                /* } else {
                     inverse = 0;
                     const spanLike = event.path[0].previousElementSibling;
                     let like = Number(spanLike.textContent);
                     like -= 1;
                     spanLike.textContent = like;
                 } */
            })
        });

        /*****************
         *****************  partie FORMULAIRE  ***********************
         *****************/

        /* Ouverture fermeture formulaire */
        // Ouvre ou ferme le modal avec display: block; ou none; 
        function switchModal(display) {
            document.querySelector('.background').style.display = display;
        }
        // Ouvre le modal quand click sur bouton 'contactez moi'
        document.querySelector('.contactButton').addEventListener('click', function () {
            switchModal('block');
        })
        // Ferme le modal quand click sur croix modal
        document.querySelector('.close').addEventListener('click', function () {
            switchModal('none');
        })


        //ajout nom photographe dans formulaire
        document.querySelector('.containerModal h2').innerText =
            `Contactez moi
         ${foundPhotographer.name}`;

        //sauvegarde du noeud formulaire
        let formNode = document.querySelector(".containerModal");

        // submit formulaire
        document.querySelector('[name="contactForm"]').addEventListener('submit', function (event) {
            event.preventDefault();
            updateInput(dataInput);
            if (testAllIsValid(dataInput)) {
                for (const key in dataInput) {
                    afficheErrorMessage(dataInput[key]);
                };
                document.querySelector('[name="contactForm"]').reset();
                document.querySelector(".containerModal").innerHTML = `<div> Votre message a bien été envoyé à ${foundPhotographer.name} </div>`;
            } else {
                for (const key in dataInput) {
                    afficheErrorMessage(dataInput[key]);
                };
            }
        });




    })
//FIN ASYNCHRONE
