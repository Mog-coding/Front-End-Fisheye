export default class IndexBuilderP1 {
    constructor(data) {
        this._dataCard = data;
    }
    createPhotographerCard() {
        const lienPhotoCard = document.createElement('a');
        lienPhotoCard.setAttribute("href", "photographer.html?id=" + this._dataCard.id);
        const wrapperHtml = `    
        <article class="containerUserCard">
        <img class="userCards imgCards" src="${this._dataCard.portrait}" alt="" />
        <h2 class="nameCards">${this._dataCard.name}</h2>
        <div class="city">${this._dataCard.city},${this._dataCard.country}</div>
        <div class="tagline">${this._dataCard.tagline}</div>
        <div class="price">${this._dataCard.price}€/jour
        </article>`
        lienPhotoCard.innerHTML = wrapperHtml;
        return lienPhotoCard
    }
}