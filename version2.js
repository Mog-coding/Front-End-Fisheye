class Photographer {
    constructor(data) {
        this._name = data.name;
        this._id = data.id;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = data.portrait
    }
    get name() {
        return this._name;
    }
    get id() {
        return this._id;
    }
    get city() {
        return this._city;
    }
    get country() {
        return this._country;
    }
    get tagline() {
        return this._tagline;
    }
    get price() {
        return this._price;
    }
    get portrait() {
        return `/assets/photographers/${this._portrait}`;
    }
}

/*RECUP DES DONNEES */
fetch('/data/photographers.json')   // 1ere promise résolue qd serveur distant repond
    .then(function (response) {   // 2eme promise résolue qd data chargée
        return response.json();
    })
    .then(function (resp) {//2eme promis donne data format json vers objet, then
        const { photographers } = resp; // extraction objet photographers
        const dataFac = photographers.map(function (el) {
            return new Photographer(el)
        }
        )
        dataFac.forEach(function (el) {
            const Template = new PhotographerFactory(el);
            console.log("contenu du noeud CLASS");
            console.log(Template.createPhotographerCard());
            document.querySelector(".photographer_section").appendChild(Template.createPhotographerCard());
        })
    }
    );

    
class PhotographerFactory {
    constructor(photoCarde) {
        this._photoCarde = photoCarde
    }
    createPhotographerCard() {
        const lienPhotoCard = document.createElement('a');
        lienPhotoCard.setAttribute("href", "photographer.html");
        const wrapperHtml = `    
        <article class="containerUserCard">
        <img class="userCards imgCards" src="${this._photoCarde.portrait}" alt="" />
        <h2 class="nameCards">${this._photoCarde.name}</h2>
        <div class="city">${this._photoCarde.city},${this._photoCarde.country}</div>
        <div class="tagline">${this._photoCarde.tagline}</div>
        <div class="price">${this._photoCarde.price}€/jour
        </article>`
        lienPhotoCard.innerHTML = wrapperHtml;
        console.log("contenu html CLASS: ")
        console.log(wrapperHtml);
        return lienPhotoCard
    }
}