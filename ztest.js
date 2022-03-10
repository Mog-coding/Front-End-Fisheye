
        // Initialisation likes
        runHeartLikes();

        /* Listener sur bouton coeur médias: si 1er enter: like +1, compteur total like +1, si 2eme enter: like -1 et compteur total like -1 */
        document.querySelectorAll(".buttonHeart").forEach(function (el) {
            // Ajout Listener sur chaque bouton coeur des médias
            el.addEventListener("keydown", function (event) {
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

        function runHeartLikes() {
            // Tableau arrayLike contenant tous les likes de chaque média
            const arrayLike = [];
            document.querySelectorAll(".likeNumber").forEach(function (el) {
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
            document.querySelectorAll(".heart").forEach(function (el) {
                // Ajout Listener sur chaque coeur des médias
                el.addEventListener("click", function (event) {
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
        }