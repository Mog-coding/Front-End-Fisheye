class VideoCardBuilderP2 {
    constructor(data) {
        this._imageData = data
    }
    createVideoCard() {
        const photoCardP2 = document.createElement('a');
        photoCardP2.classList.add("containerVideoCards");
        const wrapperHtml = `    
        <video>
         <source src="assets/Media/${this._imageData.video}" type="video/mp4" />
        </video>
        <div class="sousTitre">
          <div>${this._imageData.title}</div>
          <div><i class="fas fa-heart"></i></div>
        </div>`
        photoCardP2.innerHTML = wrapperHtml;
        return photoCardP2
    }
}