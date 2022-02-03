export default class PhotographerFactory {
    constructor(data) {
        this.photographer = data;
    }
    createPhotographerCard() {
        const lienPhotoCard = document.createElement('a');
        lienPhotoCard.setAttribute("href", "photographer.html?id=" + this.photographer.id);
        const article = document.createElement("article");
        article.classList.add("containerUserCard");
        const img = document.createElement("img");
        img.setAttribute("src", this.photographer.portrait);
        img.setAttribute("alt", this.photographer.name);
        img.classList.add("userCards","imgCards");
        const h2 = document.createElement("h2");
        h2.classList.add("nameCards");
        h2.innerText = this.photographer.name;
        const div1 = document.createElement('div');
        div1.classList.add("city");
        div1.innerText = this.photographer.city + ', ' + this.photographer.country;
        const div2 = document.createElement('div');
        div2.classList.add('tagline');
        div2.innerText = this.photographer.tagline;
        const div3 = document.createElement('div');
        div3.classList.add('price');
        div3.innerText = this.photographer.price + '€/jour';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(div1);
        article.appendChild(div2);
        article.appendChild(div3);
        lienPhotoCard.appendChild(article);
        return lienPhotoCard
        /*
        const wrapperHtml = `    
        <article class="containerUserCard">
        <img class="userCards imgCards" src="${this.photographer.portrait}" alt="" />
        <h2 class="nameCards">${this.photographer.name}</h2>
        <div class="city">${this.photographer.city},${this.photographer.country}</div>
        <div class="tagline">${this.photographer.tagline}</div>
        <div class="price">${this.photographer.price}€/jour
        </article>`
        */
    }
    createPhotographerBanner() {
        const mainP2 = document.createElement('div');
        mainP2.classList.add("containerMain", "photograph-header");
        const div1 = document.createElement('div');
        const h11 = document.createElement('h1');
        h11.classList.add('nameCards');
        h11.innerText = this.photographer.name;
        const div11 = document.createElement('div');
        div11.classList.add('city');
        div11.innerText = this.photographer.city + ', ' + this.photographer.country; 
        const div12 = document.createElement('div');
        div12.classList.add('tagline');
        div12.innerText = this.photographer.tagline;
        const div2 = document.createElement('div');
        const button2 = document.createElement('button');
        button2.classList.add('contact_button');
        button2.setAttribute("onclick", 'displayModal()');
        button2.innerText = 'Contactez-moi';
        const div3 = document.createElement('div');
        const img3 = document.createElement('img');
        img3.classList.add('userCards', 'imgCards');
        img3.setAttribute('src', 'assets/photographers/' + this.photographer.portrait);
        img3.setAttribute("alt", this.photographer.name);
        div1.appendChild(h11);
        div1.appendChild(div11);
        div1.appendChild(div12);
        div2.appendChild(button2);
        div3.appendChild(img3);
        mainP2.appendChild(div1);
        mainP2.appendChild(div2);
        mainP2.appendChild(div3);
        return mainP2;
        /*
        const wrapperHtml = `    
        <div>
          <h1 class="nameCards">${this.photographer.name}</h1>
          <div class="city">${this.photographer.city}, ${this.photographer.country}</div>
          <div class="tagline">${this.photographer.tagline}</div>
        </div>
        <div>
          <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>
        <div>
          <img class="userCards imgCards" src="assets/photographers/${this.photographer.portrait}" alt="" />
        </div>`
        mainP2.innerHTML = wrapperHtml;
        return mainP2
        */
    }
}