
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
        return lienPhotoCard
    }
}