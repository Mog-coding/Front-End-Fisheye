import Image from "../model/Image.js"
import Video from "../model/Video.js"

export default class MediaFactory {
    constructor(media) {
        if (media.image) {
            this.media = new Image(media)
          } else if (media.video) {
            this.media = new Video(media)
        } else {
            throw 'Unknown type format'
        }
    }
    // Crée les Medias Images page2 dans la section containerPhotos
    createImageCard() {
        const imageCardP2 = document.createElement('a');
        imageCardP2.classList.add("containerPhotoCards");
        const img = document.createElement('img');
        img.setAttribute('src', 'assets/Media/' + this.media.image);
        img.setAttribute('alt', 'assets/Media/' + this.media.title);
        img.setAttribute('data-id', this.media.id);
        img.classList.add("imageMedia");
        const divSousTitre = document.createElement('div');
        divSousTitre.classList.add('sousTitre');
        const divNomImage = document.createElement('div');
        divNomImage.innerText = this.media.title;
        const divLike = document.createElement('div');
        const spanLike = document.createElement('span'); 
        spanLike.classList.add('likeNumber');
        spanLike.innerText = this.media.likes;
        const iHeart = document.createElement('i');
        iHeart.classList.add('fas', 'fa-heart', 'heart');
        divLike.appendChild(spanLike);
        divLike.appendChild(iHeart);
        divSousTitre.appendChild(divNomImage);
        divSousTitre.appendChild(divLike);
        imageCardP2.appendChild(img);
        imageCardP2.appendChild(divSousTitre);
        return imageCardP2
    }
    // Crée les Medias Videos page2 dans la section containerPhotos
    createVideoCard() {
        const videoCardP2 = document.createElement('a');
        videoCardP2.classList.add("containerVideoCards");
        const vid = document.createElement('video');
        vid.setAttribute('data-id', this.media.id); 
        vid.classList.add("imageMedia");
        const source = document.createElement('source');
        source.setAttribute('src', 'assets/Media/' + this.media.video);
        source.setAttribute('type', 'video/mp4');
        const divSousTitre = document.createElement('div');
        divSousTitre.classList.add('sousTitre');
        const divNomVideo = document.createElement('div');
        divNomVideo.innerText = this.media.title;
        const divLike = document.createElement('div');
        const spanLike = document.createElement('span'); 
        spanLike.classList.add('likeNumber');
        spanLike.innerText = this.media.likes;
        const iHeart = document.createElement('i');
        iHeart.classList.add('fas', 'fa-heart', 'heart');
        vid.appendChild(source);
        divLike.appendChild(spanLike);
        divLike.appendChild(iHeart);
        divSousTitre.appendChild(divNomVideo);
        divSousTitre.appendChild(divLike);
        videoCardP2.appendChild(vid);
        videoCardP2.appendChild(divSousTitre);
        return videoCardP2
    }
    //
    createLightboxContent(){
      if(this.media instanceof Image){
          const img = document.createElement('img');
          img.setAttribute('src', 'assets/Media/' + this.media.image);
          return img;
      }else if(this.media instanceof Video){
         const src = document.createElement('source');
         src.setAttribute('src', 'assets/Media/' + this.media.video);
         src.setAttribute('type', 'video/mp4');
         const vid = document.createElement('video');
         vid.setAttribute('controls', true);
         vid.setAttribute('autoplay', true);
         vid.setAttribute('loop', true);
         vid.appendChild(src);
         return vid;
      }
    }
 }















 
         /*
        const wrapperHtml = `    
        <img src="assets/Media/${this.media.image}" alt="" />
        <div class="sousTitre">
          <div>${this.media.title}</div>
          <div>
          <span>${this.media.likes}</span>
          <i class="fas fa-heart heart"></i>
          </div>
        </div>`
        photoCardP2.innerHTML = wrapperHtml;
        return photoCardP2
        */

                /*
        const wrapperHtml = `    
        <video>
         <source src="assets/Media/${this.media.video}" type="video/mp4" />
        </video>
        <div class="sousTitre">
          <div>${this.media.title}</div>
          <div><i class="fas fa-heart"></i></div>
        </div>`
        photoCardP2.innerHTML = wrapperHtml;
        return photoCardP2
        */