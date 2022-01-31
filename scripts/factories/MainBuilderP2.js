class MainBuilderP2 {
    constructor(data) {
        this._mainData = data
    }
    createMainP2() {
        const mainP2 = document.createElement('div');
        mainP2.classList.add("containerMain", "photograph-header");
        const wrapperHtml = `    
        <div>
          <h1 class="nameCards">${this._mainData.name}</h1>
          <div class="city">${this._mainData.city}, ${this._mainData.country}</div>
          <div class="tagline">${this._mainData.tagline}</div>
        </div>
        <div>
          <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>
        <div>
          <img class="userCards imgCards" src="assets/photographers/${this._mainData.portrait}" alt="" />
        </div>`
        mainP2.innerHTML = wrapperHtml;
        return mainP2
    }
}