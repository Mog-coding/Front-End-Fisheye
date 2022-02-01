class ImageCardBuilderP2 {
    constructor(data) {
        this._imageData = data
    }
    createImageCard() {
        const photoCardP2 = document.createElement('a');
        photoCardP2.classList.add("containerPhotoCards");
        const wrapperHtml = `    
        <img src="assets/Media/${this._imageData.image}" alt="" />
        <div class="sousTitre">
          <div>${this._imageData.title}</div>
          <div>
          <span class="heart">${this._imageData.likes}</span>
          <i class="fas fa-heart"></i>
          </div>
        </div>`
        photoCardP2.innerHTML = wrapperHtml;
        return photoCardP2
    }
}