//import photographer factory html
import MediaFactory from "../factories/MediaFactory.js"
import PhotographerFactory from "../factories/PhotographerFactory.js"
import Image from "../model/Image.js"
import Video from "../model/Video.js"


/*RECUPERATION DES DONNEES AVEC FETCH */
fetch('data/photographers.json')    // promise1 résolue: serveur répond
    .then(function (response) {     // promise2 résolue: data chargée
        return response.json();     // data json vers objet
    })
    .then(function ({ media, photographers }) { //p3 résolue: donne data formatée 
        // photographers: array contenant 6 objets photographe

        /*************
         *************     partie PHOTOGRAPHERS BANNIERE     *******************
         *************/

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

        /*************
         *************     partie MEDIA     *******************
         *************/

        // filtre ds tableau d'objets les Medias du photographe via propriété 
        // photoID égale à la valeur contenue dans l'url de la page    
        const dataMedia = media.filter((el) => {
            return el.photographerId === identifiant
        });

        // function instancie objet Media en classMediaFactory et crée Vue Image ou Video
        function createImageVideoCard(dataMedia) {
            // Tableau d'objet Media vers tableau d'instance de class MediaFactory 
            // contenant méthode builder Image/Video Card. Class MediaFactory contient  // un objet de class Image ou Video, extensions de la class Media
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

        /*************
         *************    menu DROPDOWN     *******************
         *************/

        // initialise la Vue media avec media triés via string "Popularité"
        const buttonValue = document.querySelector('#buttonDrop1').value;
        trieMedia(buttonValue);

        // Clic sur bouton1 DropDown: apparition menu DropDown + rotation FA icon 
        document.querySelector("#buttonDrop1").addEventListener("click", (even) => {
            // Apparition/disparition du menu dropdown: ajout/retrait class overflow
            if (even.target.parentElement.classList.contains('overflow')) {
                document.querySelector('.containerDropDown').classList.remove('overflow');
            } else {
                document.querySelector('.containerDropDown').classList.add('overflow');
            };
            // Rotation icon FA chevron: ajout/retrait class rotate
            if (document.querySelector('#buttonDrop1 i').classList.contains('rotate')) {
                document.querySelector('#buttonDrop1 i').classList.remove('rotate')
            } else {
                document.querySelector('#buttonDrop1 i').classList.add('rotate');
            }
        });

        // Trie les objets Media selon valeur string et crée une vue de ces 
        // Medias triés en ayant supprimés les Medias précédents
        function trieMedia(buttonValue) {
            // Si string='title' objets dataMedia.title triés par ordre alphabétique   
            if (buttonValue === 'Titre') {
                dataMedia.sort(function (a, b) {
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0;
                });
            }
            // Si string='Popularité' objets dataMedia.likes triés par ordre décroissant  
            else if (buttonValue === 'Popularité') {
                dataMedia.sort(function (a, b) {
                    return b.likes - a.likes
                });
            }
            // Si string='Date' objets dataMedia.date triés par ordre alphabétique
            else if (buttonValue === 'Date') {
                dataMedia.sort(function (a, b) {
                    if (a.date > b.date) return 1;
                    if (a.date < b.date) return -1;
                    return 0;
                });
            }
            //supression des anciens Medias
            const nodeMedia = document.querySelector(".containerPhotos");
            while (nodeMedia.firstChild) {
                nodeMedia.removeChild(nodeMedia.firstChild);
            };
            //creation d'une nouvelle Vue avec Medias classés
            createImageVideoCard(dataMedia);
        }

        // Clic button2: Inverse valeur et contenu button1/2, ferme menu Dropdown, trie médias suivant nouvelle valeur et crée une nouvelle Vue
        document.querySelector('#buttonDrop2').addEventListener('click', () => {
            const node1 = document.querySelector('#buttonDrop1');
            const node2 = document.querySelector('#buttonDrop2');
            // Clic button2: Inversion des valeurs entre button2 et button1
            const button1Value = node1.value;
            const button2Value = node2.value;
            node1.setAttribute('value', button2Value);
            node2.setAttribute('value', button1Value);
            // Inversion du contenu des balises button2 et button1
            node1.innerHTML = button2Value + "<i class='fas fa-chevron-down'></i>";
            node2.innerText = button1Value;
            // Clic button2: menu DropDown disparait
            document.querySelector('.containerDropDown').classList.add('overflow');
            // Trie les médias et construction de nouvelle Vue suivant la nouvelle valeur de bouton1
            trieMedia(button2Value)
        })

        // Clic button3: Inverse valeur et contenu button1/3, ferme menu Dropdown, trie médias suivant nouvelle valeur et crée une nouvelle Vue
        document.querySelector('#buttonDrop3').addEventListener('click', () => {
            const node1 = document.querySelector('#buttonDrop1');
            const node3 = document.querySelector('#buttonDrop3');
            const button1Value = node1.value;
            const button3Value = node3.value;
            node1.setAttribute('value', button3Value);
            node3.setAttribute('value', button1Value);
            node1.innerHTML = button3Value + "<i class='fas fa-chevron-down'></i>";
            node3.innerText = button1Value;
            document.querySelector('.containerDropDown').classList.add('overflow');
            trieMedia(button3Value)
        })

        /*************
         *************     addition des Likes     *******************
         *************/

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
                console.log(event);
                const spanLike = event.target.previousElementSibling;
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


        /*************
         *************     partie FORMULAIRE     *******************
         *************/

        /* Ouverture fermeture formulaire */
        // Ouvre ou ferme le modal avec display: block; ou none; 
        function switchModal(display) {
            document.querySelector('.background').style.display = display;
        }
        // Ouvre le modal quand click sur bouton 'contactez moi'
        document.querySelector('.buttonForm').addEventListener('click', function () {
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