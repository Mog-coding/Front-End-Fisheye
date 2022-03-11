//import photographer factory html
import MediaFactory from "../factories/MediaFactory.js";
import PhotographerFactory from "../factories/PhotographerFactory.js";
import Image from "../model/Image.js";
import Video from "../model/Video.js";
import LightBox from "./LightBox.js";
import { dataInput, updateInput, testAllIsValid, afficheErrorMessage } from "../utils/contactForm.js"


/* Récupération des données avec fetch */
// Promise résolue: serveur répond
fetch("data/photographers.json")
    // Promise résolue: data chargée   
    .then(function (response) {
        return response.json();
    })
    // Promise résolue: donne data json vers objet
    .then(function ({ media, photographers }) {
        // photographers: array contenant 6 objets photographe

        /*************
         *************     partie PHOTOGRAPHERS BANNIERE     *******************
         *************/

        // Extraction d'1 objet photographe via son id contenu dans l'url de la page
        const url_object = window.location;
        const objetParam = new URL(url_object);
        const identifiant = Number(objetParam.searchParams.get("id"));
        const foundPhotographer = photographers.find((objet) => {
            return objet.id === identifiant
        });

        /* VueArticle instance de class PhotographerFactory et création de bannière dans <article> via méthode de class */
        const VueArticle = new PhotographerFactory(foundPhotographer);
        document.querySelector("#article").appendChild(VueArticle.createPhotographerBanner());

        /*************
         *************     partie MEDIA     *******************
         *************/

        /* filtre ds tableau d'objets les Medias du photographe via propriété photoID égale à la valeur contenue dans l'url de la page */
        const dataMedia = media.filter((el) => {
            return el.photographerId === identifiant
        });

        /* function instancie objet Media en classMediaFactory et crée Vue Image ou Video */
        function createImageVideoCard(dataMedia) {
            /* Tableau d'objet Media vers tableau d'instance de class MediaFactory contenant méthode builder Image/Video Card. Class MediaFactory contient un objet de class Image ou Video, extensions de la class Media */
            let dataMediaInstance = dataMedia.map((el) => {
                return new MediaFactory(el)
            })
            //Création Vue template Media via méthode MediaFactory dans <section> 
            dataMediaInstance.forEach((el) => {
                if (el.media instanceof Image) {
                    document.querySelector(".containerMedias").appendChild(el.createImageCard());
                } else if (el.media instanceof Video) {
                    document.querySelector(".containerMedias").appendChild(el.createVideoCard());
                }
            }
            );
        }

        /*************
         *************    menu DROPDOWN     *******************
         *************/

        // initialise la Vue media avec media triés via string "Popularité"
        const buttonValue = document.querySelector("#buttonDrop1").value;
        trieMedia(buttonValue);

        // Clic sur bouton1 DropDown: apparition menu DropDown + rotation FA icon 
        document.querySelector("#buttonDrop1").addEventListener("click", (event) => {
            const buttonDrop2 = document.querySelector("#buttonDrop2");
            const buttonDrop3 = document.querySelector("#buttonDrop3");
            /* Déselection focus bouton1 suite au click (sinon 2 boutons sélectionnés si focus :hover sur un autre bouton) */
            document.querySelector("#buttonDrop1").blur();
            // Apparition/disparition du menu dropdown: ajout/retrait class disappear
            if (buttonDrop2.classList.contains("disappear")) {
                buttonDrop2.classList.remove("disappear");
                buttonDrop3.classList.remove("disappear");
                event.target.parentElement.setAttribute("aria-expanded", "true");
            } else {
                buttonDrop2.classList.add("disappear");
                buttonDrop3.classList.add("disappear");
                event.target.parentElement.setAttribute("aria-expanded", "false");
            }
            // Rotation icon FA chevron: ajout/retrait class rotate
            if (document.querySelector("#buttonDrop1 .fas").classList.contains("rotate")) {
                document.querySelector("#buttonDrop1 .fas").classList.remove("rotate")
            } else {
                document.querySelector("#buttonDrop1 .fas").classList.add("rotate");
            }
        });

        // si clic en dehors menu dropDown ET menu ouvert: fermer menu
        window.addEventListener("click", (event) => {
            if (!(event.target.parentElement.id === "containerDrop")
                &&
                (!document.querySelector("#buttonDrop2").classList.contains("disappear"))) {
                document.querySelector("#buttonDrop2").classList.add("disappear");
                document.querySelector("#buttonDrop3").classList.add("disappear");
                document.querySelector("#buttonDrop1 .fas").classList.remove("rotate");
            }
        })

        // si focus en dehors menu dropDown ET menu ouvert: fermer menu
        document.addEventListener('focusin', () => {
            if (!(document.activeElement.parentElement.id === "containerDrop")
                &&
                (!document.querySelector("#buttonDrop2").classList.contains("disappear"))) {
                document.querySelector("#buttonDrop2").classList.add("disappear");
                document.querySelector("#buttonDrop3").classList.add("disappear");
                document.querySelector("#buttonDrop1 .fas").classList.remove("rotate");
            }
        });

        /* Trie les objets Media selon valeur string et crée une vue de ces Medias triés en ayant supprimés les Medias précédents */
        function trieMedia(buttonValue) {
            // Si string='title' objets dataMedia.title triés par ordre alphabétique   
            if (buttonValue === "Titre") {
                dataMedia.sort(function (a, b) {
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0;
                });
            }
            // Si string='Popularité' objets dataMedia.likes triés par ordre décroissant  
            else if (buttonValue === "Popularité") {
                dataMedia.sort(function (a, b) {
                    return b.likes - a.likes
                });
            }
            // Si string='Date' objets dataMedia.date triés par ordre alphabétique
            else if (buttonValue === "Date") {
                dataMedia.sort(function (a, b) {
                    if (a.date > b.date) return 1;
                    if (a.date < b.date) return -1;
                    return 0;
                });
            }
            //supression des anciens Medias
            const nodeMedia = document.querySelector(".containerMedias");
            while (nodeMedia.firstChild) {
                nodeMedia.removeChild(nodeMedia.firstChild);
            }
            //creation d'une nouvelle Vue avec Medias classés
            createImageVideoCard(dataMedia);
        }

        /* Clic button2: Inverse valeur et contenu button1/2, ferme menu Dropdown, trie médias suivant nouvelle valeur et crée une nouvelle Vue */
        document.querySelector("#buttonDrop2").addEventListener("click", () => {
            const node1 = document.querySelector("#buttonDrop1");
            const node2 = document.querySelector("#buttonDrop2");
            // Clic button2: Inversion des valeurs entre button2 et button1
            const button1Value = node1.value;
            const button2Value = node2.value;
            node1.setAttribute("value", button2Value);
            node2.setAttribute("value", button1Value);
            // Inversion du contenu des balises button2 et button1
            node1.innerHTML = button2Value + "<span class='fas fa-chevron-down'></span>";
            node2.innerText = button1Value;
            // Clic button2: menu DropDown disparait
            document.querySelector("#buttonDrop2").classList.add("disappear");
            document.querySelector("#buttonDrop3").classList.add("disappear");
            // Trie les médias et construction de nouvelle Vue suivant la nouvelle valeur de bouton1
            trieMedia(button2Value);
            runHeartLikes();
            runLightBox()
        })

        /* Clic button3: Inverse valeur et contenu button1/3, ferme menu Dropdown, trie médias suivant nouvelle valeur et crée une nouvelle Vue */
        document.querySelector("#buttonDrop3").addEventListener("click", () => {
            const node1 = document.querySelector("#buttonDrop1");
            const node3 = document.querySelector("#buttonDrop3");
            const button1Value = node1.value;
            const button3Value = node3.value;
            node1.setAttribute("value", button3Value);
            node3.setAttribute("value", button1Value);
            node1.innerHTML = button3Value + "<span class='fas fa-chevron-down'></span>";
            node3.innerText = button1Value;
            document.querySelector("#buttonDrop2").classList.add("disappear");
            document.querySelector("#buttonDrop3").classList.add("disappear");
            trieMedia(button3Value);
            runHeartLikes();
            runLightBox()
        })

        /*************
         *************     Likes     *******************
         *************/

        // Initialisation likes
        runHeartLikes();

        function runHeartLikes() {
            // Tableau arrayLike contenant tous les likes de chaque média
            const arrayLike = [];
            document.querySelectorAll(".likeNumber").forEach((el) => {
                arrayLike.push(Number(el.textContent));
            });
            // Addition de tous les likes du tableau ds total
            let total = arrayLike.reduce(function (accu, el) {
                return accu + el
            })

            // Ajout dans compteur aside du total des like et du prix du photographe
            document.querySelector("#compteur").innerText = total;
            document.querySelector("#price").innerText = `${foundPhotographer.price}€ / jour`;

            /* Listener sur coeur médias: si 1er clic: like +1, compteur total like +1, si 2eme clic: like -1 et compteur total like -1 */
            document.querySelectorAll(".heart").forEach((el) => {
                // Ajout Listener sur chaque coeur des médias
                el.addEventListener("click", (event) => {
                    // Récupération du nombre de like du média
                    const spanLike = event.target.parentElement.previousElementSibling;
                    let like = Number(spanLike.textContent);
                    // Si 1er clic like +1 et compteur +1, si 2 eme clic: -1
                    if (!event.target.classList.contains("heartColor")) {
                        like++;
                        total++;
                        event.target.classList.add("heartColor");
                    } else {
                        like--;
                        total--;
                        event.target.classList.remove("heartColor");
                    }
                    // Mise à jour du nombre de like et du compteur
                    spanLike.textContent = like;
                    document.querySelector("#compteur").innerText = total;
                });
            });

            /* Listener sur bouton coeur médias: si 1er enter: like +1, compteur total like +1, si 2eme enter: like -1 et compteur total like -1 */
            document.querySelectorAll(".buttonHeart").forEach((el) => {
                // Ajout Listener sur chaque bouton coeur des médias
                el.addEventListener("keydown", (event) => {
                    if (event.key === "Enter" || event.keyCode === 13) {
                        // Récupération du nombre de like du média
                        const spanLike = event.target.previousElementSibling;
                        let like = Number(spanLike.textContent);
                        // Si 1er clic like +1 et compteur +1, si 2 eme clic: -1
                        if (!event.target.firstChild.classList.contains("heartColor")) {
                            like++;
                            total++;
                            event.target.firstChild.classList.add("heartColor");
                        } else {
                            like--;
                            total--;
                            event.target.firstChild.classList.remove("heartColor");
                        }
                        // Mise à jour du nombre de like et du compteur
                        spanLike.textContent = like;
                        document.querySelector("#compteur").innerText = total;
                    }
                })
            });
        }

        /*************
         *************     partie LIGHTBOX     *******************
         *************/

        // Initialisation lightbox
        let lightBox = new LightBox(dataMedia);
        lightBoxInit();
        runLightBox();

        // Ferme la lightbox et supprime le media crée + gestion accessibilité 
        function closeLightbox() {
            document.querySelector("#lightbox").classList.remove("show");
            // Supression du media précédemment affiché ds lightbox
            if (document.querySelector("#mediaContainer").firstElementChild) {
                document.querySelector("#mediaContainer").firstElementChild.remove();
            }
            ariaHidden(".wrapper", false, "#lightbox", true);
        }

        // Lance lightbox quand clic sur medias, gère focus, aria-hidden,
        function runLightBox() {
            // Clic media lance lightbox + gestion accessibilité et focus
            document.querySelectorAll(".clickLightbox").forEach((el) => {
                el.addEventListener("click", (event) => {
                    // Appel méthode show() avec id de l'élément cliqué
                    lightBox.show(event.currentTarget.dataset.id);
                    // Focus sur next, wrapper aria hidden
                    ariaHidden(".wrapper", true, "#lightbox", false);
                    document.querySelector(".next").focus();
                })
            });
            // Clic icone lecture media video: lance lightbox
            document.querySelectorAll(".playIcon").forEach((el) => {
                el.addEventListener("click", (event) => {
                    // Appel méthode show() avec id de l'élément cliqué
                    lightBox.show(event.currentTarget.previousElementSibling.dataset.id);
                    // Focus sur next, wrapper aria hidden
                    ariaHidden(".wrapper", true, "#lightbox", false);
                    document.querySelector(".next").focus();
                })
            });
            // Appuie touche Entrée sur media: lance lightbox
            document.querySelectorAll(".enterLight").forEach((el) => {
                el.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.keyCode === 13) {
                        lightBox.show(e.currentTarget.firstElementChild.dataset.id);
                        ariaHidden(".wrapper", true, "#lightbox", false);

                    }
                })
            });
        }

        // Gère les clics et appuis touches sur menu lightbox  
        function lightBoxInit() {
            // Clic croix: fermeture LightBox
            document.querySelector(".cross").addEventListener("click", () => {
                closeLightbox();
            })
            // Clic icone next: media suivant
            document.querySelector("#lightbox .next img").addEventListener("click", () => {
                lightBox.next();
            })
            // Clic icone previous: media précédent
            document.querySelector("#lightbox .previous img").addEventListener("click", () => {
                lightBox.previous();
            })
            // Touche entrée et touches flèches gauche/droite: change media
            document.querySelector("#lightbox").addEventListener("keydown", (e) => {
                // Si touche -> appuyée: media suivant
                if (e.key === "ArrowRight" || e.keyCode === 39) {
                    lightBox.next();
                    document.querySelector(".cross").focus();
                }
                // Si touche <- appuyée: media précédent
                if (e.key === "ArrowLeft" || e.keyCode === 37) {
                    lightBox.previous();
                    document.querySelector(".cross").focus();
                }
                /* Si touche enter appuyée sur icone next ou previous: media next/prev */
                if (e.key === "Enter" || e.keyCode === 13) {
                    if (document.activeElement.classList.contains("next")) {
                        lightBox.next();
                    } else if (document.activeElement.classList.contains("previous")) {
                        lightBox.previous();
                    }
                }
            });
        }

        /*************
         *************     partie FORMULAIRE     *******************
         *************/

        // Ouvre le modal quand click sur bouton 'contactez moi'
        document.querySelector(".buttonContactezMoi").addEventListener("click", () => {
            switchModal("block");
        })

        // Formulaire valide ou non
        let formValid = false;

        /* Ferme le modal quand click sur croix modal + gère accessibilité formulaire
        Recharge la page si le formulaire a été validé */
        document.querySelector(".closeForm").addEventListener("click", () => {
            switchModal("none");
            if (formValid) {
                location.reload()
            }
        })

        // Ajout nom photographe dans entête formulaire
        document.querySelector(".containerModal h2").innerText =
            `Contactez moi
         ${foundPhotographer.name}`;

        /* Submit formulaire
        Si saisies valides: efface errorMessage, reset form, affiche thankMessage,
        sinon, affiche erreurs message + empêche soumission form */
        document.querySelector("#contactForm").addEventListener("submit", (event) => {
            event.preventDefault();
            formValid = false;
            updateInput(dataInput);
            //si formulaire valide
            if (testAllIsValid(dataInput)) {
                for (const key in dataInput) {
                    afficheErrorMessage(dataInput[key]);
                    console.log(`${key}: ${dataInput[key].noeud.value}`);
                }
                // Reset formulaire
                document.querySelector("#contactForm").reset();
                // Affichage message remerciement
                document.querySelector(".modal").classList.add("thankMessage");
                document.querySelector(".containerModal").innerHTML = `<div> Votre message a bien été envoyé à ${foundPhotographer.name}. </div>`;
                formValid = true;
            } else {
                //sinon empêche submit formulaire et affiche message erreur
                for (const key in dataInput) {
                    afficheErrorMessage(dataInput[key]);
                }
            }
        });

        // Empêche la technologie d'assistance d'accéder au contenu aria-hidden
        function ariaHidden(ele1, boole, ele2, boole2) {
            document.querySelector(ele1).setAttribute("aria-hidden", boole);
            document.querySelector(ele2).setAttribute("aria-hidden", boole2);
        }

        // Ouvre/ferme le modal avec display: block; ou none; + gère accessibilité 
        function switchModal(display) {
            document.querySelector(".background").style.display = display;
            // Si display block,focus sur croix modal, aria-hidden activé sur form
            if (display === "block") {
                ariaHidden(".wrapper", true, ".modal", false);
                document.querySelector(".closeForm").focus();
                // Supression barre défilement
                document.querySelector("body").classList.add("overflo");
                // Si display none, aria-hidden activé sur wrapper
            } else if (display === "none") {
                ariaHidden(".wrapper", false, ".modal", true);
                document.querySelector("body").classList.remove("overflo");
            }
        }

        /*************
         *************     Focus trap      *******************
         *************/

        /* Initialise le focus trap sur formulaire et lightbox */
        focusTrap(document.querySelector(".modal"));
        focusTrap(document.querySelector("#lightbox"));

        /* Exécute un focusTrap sur tab et shift + tab, implémente touche escape et touche enter sur croix lightbox/formulaire */
        function focusTrap(el) {
            // Sélectionne les élements focusables de l'élément passé en argument
            const focusEls = el.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
            const firstFocusEl = focusEls[0];
            const lastFocusEl = focusEls[focusEls.length - 1];

            /* Listener de touche appuyée sur l'élément passé en argument */
            el.addEventListener("keydown", (e) => {
                // Si tab appuyé 
                if (e.key === "Tab" || e.keyCode === 9) {
                    // Si tab + shift appuyé sur 1 élement -> focus dernier élément
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusEl) {
                            e.preventDefault();
                            lastFocusEl.focus();
                        }
                        // Si tab est appuyé sur dernier élément -> focus 1er élément
                    } else {
                        if (document.activeElement === lastFocusEl) {
                            e.preventDefault();
                            firstFocusEl.focus();
                        }
                    }
                }

                /* Si Escape appuyé -> ferme la lightbox si ouverte, sinon ferme formulaire */
                if (e.key === "Escape" || e.keyCode === 27) {
                    if (document.querySelector("#lightbox").classList.contains("show")) {
                        closeLightbox();
                    } else {
                        switchModal("none");
                    }
                }
                /* Si Enter appuyé sur croix -> ferme la lightbox si ouverte, sinon ferme formulaire */
                // Si Enter appuyé
                if (e.key === "Enter" || e.keyCode === 13) {
                    if (document.activeElement.classList.contains("enterClose")) {
                        if (document.querySelector("#lightbox").classList.contains("show")) {
                            closeLightbox();
                        } else {
                            switchModal("none");
                        }
                    }
                }
            });
        }

    }).catch((error) => {
        console.log("catch error: " + error)
    })


