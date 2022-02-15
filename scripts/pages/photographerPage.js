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
            // Apparition/disparition du menu dropdown: ajout/retrait class noverflow
            if (even.target.parentElement.classList.contains('noverflow')) {
                document.querySelector('.containerDropDown').classList.remove('noverflow');
            } else {
                document.querySelector('.containerDropDown').classList.add('noverflow');
            };
            // Rotation icon FA chevron: ajout/retrait class rotate
            if (document.querySelector('#buttonDrop1 i').classList.contains('rotate')) {
                document.querySelector('#buttonDrop1 i').classList.remove('rotate')
            } else {
                document.querySelector('#buttonDrop1 i').classList.add('rotate');
            }
        });

        // si clic en dehors menu dropDown quand ouvert: le fermer
        window.addEventListener("click", (event) => {
            if (!(event.target.id === 'buttonDrop1'
                || event.target.id === 'buttonDrop2'
                || event.target.id === 'buttonDrop3')
                &&
                (!document.querySelector('.containerDropDown').classList.contains('noverflow'))) {
                document.querySelector('.containerDropDown').classList.add('noverflow');
                document.querySelector('#buttonDrop1 i').classList.remove('rotate');
            }
        })

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
            document.querySelector('.containerDropDown').classList.add('noverflow');
            // Trie les médias et construction de nouvelle Vue suivant la nouvelle valeur de bouton1
            trieMedia(button2Value);
            heartLikes();
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
            document.querySelector('.containerDropDown').classList.add('noverflow');
            trieMedia(button3Value);
            heartLikes();
        })

        /*************
         *************     Likes     *******************
         *************/

        function heartLikes() {
            // Tableau arrayLike contenant tous les likes de chaque média
            const arrayLike = [];
            document.querySelectorAll(".likeNumber").forEach(function (el) {
                arrayLike.push(Number(el.textContent));
            });
            // Addition de tous les likes du tableau ds total
            let total = 0;
            for (let i = 0; i < arrayLike.length; i++) {
                total += arrayLike[i];
            };
            // Ajout dans compteur aside du total des like et du prix du photographe
            document.querySelector("#compteur").innerText = total;
            document.querySelector('#price').innerText = `${foundPhotographer.price}€ / jour`;

            // Listener sur coeur médias: si 1er clic: like +1, compteur total like +1
            // si 2eme clic: like -1 et compteur total like -1
            document.querySelectorAll(".heart").forEach(function (el) {
                let inverse = 0;
                // Ajout Listener sur chaque coeur des médias
                el.addEventListener("click", function (event) {
                    inverse = (inverse === 0) ? 1 : 0;
                    // Récupération du nombre de like du média
                    const spanLike = event.target.previousElementSibling;
                    let like = Number(spanLike.textContent);
                    // Si 1er clic like +1 et compteur +1, si 2 eme clic: -1
                    if (inverse === 1) {
                        like++;
                        total++;
                        event.target.classList.add("heartColor");
                    } else {
                        like--;
                        total--;
                        event.target.classList.remove("heartColor");
                    };
                    // Mise à jour du nombre de like et du compteur
                    spanLike.textContent = like;
                    document.querySelector("#compteur").innerText = total;
                })
            });
        }
        heartLikes();

        /*************
         *************     partie FORMULAIRE     *******************
         *************/

        // function ouvre / ferme le modal avec display: block; ou none; 
        function switchModal(display) {
            document.querySelector('.background').style.display = display;
        }
        // Ouvre le modal quand click sur bouton 'contactez moi'
        document.querySelector('.buttonContactezMoi').addEventListener('click', function () {
            switchModal('block');
        })
        // Ferme le modal quand click sur croix modal
        // Recharge la page si le formulaire a été validé
        document.querySelector('.close').addEventListener('click', function () {
            switchModal('none');
            if (formValid) {
                location.reload()
            };
        })
        // Formulaire valide ou non
        let formValid = false;

        // Ajout nom photographe dans entête formulaire
        document.querySelector('.containerModal h2').innerText =
            `Contactez moi
         ${foundPhotographer.name}`;


        /* Submit formulaire
        Si saisies valides: efface errorMessage, reset form, affiche thankMessage,
        sinon, affiche erreurs message + empêche soumission form
        */
        document.querySelector('#contactForm').addEventListener('submit', function (event) {
            formValid = false;
            updateInput(dataInput);
            //si formulaire valide
            if (testAllIsValid(dataInput)) {
                for (const key in dataInput) {
                    afficheErrorMessage(dataInput[key]);
                    console.log(`${key}: ${dataInput[key].noeud.value}`);
                };
                // Reset formulaire
                document.querySelector('#contactForm').reset();
                // Affichage message remerciement
                document.querySelector(".modal").classList.add('thankMessage');
                document.querySelector(".containerModal").innerHTML = `<div> Votre message a bien été envoyé à ${foundPhotographer.name}. </div>`;
                formValid = true;
            } else {
                //sinon empêche submit formulaire et affiche message erreur
                event.preventDefault();
                for (const key in dataInput) {
                    afficheErrorMessage(dataInput[key]);
                };
            }
        });




    })
//FIN ASYNCHRONE