export default class PhotographerFactory {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.alt = data.alt
        this._portrait = data.portrait;
    }
    get portrait() {
        return `assets/photographers/${this._portrait}`;
    }
    //méthode pour créer les cartes photographes de la page 1
    createPhotographerCard() {
        const lienPhotoCard = document.createElement("a");
        lienPhotoCard.setAttribute("href", "photographer.html?id=" + this.id);
        const article = document.createElement("article");
        article.classList.add("containerUserCard");
        const imgPhotographer = document.createElement("img");
        imgPhotographer.setAttribute("src", this.portrait);
        imgPhotographer.setAttribute("alt", this.alt);
        imgPhotographer.classList.add("userCards", "imgCards");
        const h2 = document.createElement("h2");
        h2.classList.add("nameCards");
        h2.innerText = this.name;
        const divCity = document.createElement("div");
        divCity.classList.add("city");
        divCity.innerText = this.city + ", " + this.country;
        const divTagline = document.createElement("div");
        divTagline.classList.add("tagline");
        divTagline.innerText = this.tagline;
        const divPrice = document.createElement("div");
        divPrice.classList.add("price");
        divPrice.innerText = this.price + "€/jour";
        article.appendChild(imgPhotographer);
        article.appendChild(h2);
        article.appendChild(divCity);
        article.appendChild(divTagline);
        article.appendChild(divPrice);
        lienPhotoCard.appendChild(article);
        return lienPhotoCard
    }

    //méthode pour créer la bannière photographe de la page 2
    createPhotographerBanner() {
        const articleP2 = document.createElement("div");
        articleP2.classList.add("containerArticle", "photograph-header");
        const divInfo = document.createElement("div");
        divInfo.classList.add("info");
        const h1 = document.createElement("h1");
        h1.classList.add("nameCards");
        h1.innerText = this.name;
        const divCity = document.createElement("div");
        divCity.classList.add("city");
        divCity.innerText = this.city + ", " + this.country;
        const divTagline = document.createElement("div");
        divTagline.classList.add("tagline");
        divTagline.innerText = this.tagline;
        const divButton = document.createElement("div");
        const buttonContact = document.createElement("button");
        buttonContact.classList.add("contact_button", "buttonContactezMoi");
        buttonContact.setAttribute("aria-label", "Contacter " + this.name);
        buttonContact.innerText = "Contactez-moi";
        const divImage = document.createElement("div");
        const imgPhotographer = document.createElement("img");
        imgPhotographer.classList.add("imgCards");
        imgPhotographer.setAttribute("src", this.portrait);
        imgPhotographer.setAttribute("alt", this.alt);
        divInfo.appendChild(h1);
        divInfo.appendChild(divCity);
        divInfo.appendChild(divTagline);
        divButton.appendChild(buttonContact);
        divImage.appendChild(imgPhotographer);
        articleP2.appendChild(divInfo);
        articleP2.appendChild(divButton);
        articleP2.appendChild(divImage);
        return articleP2;
    }
}