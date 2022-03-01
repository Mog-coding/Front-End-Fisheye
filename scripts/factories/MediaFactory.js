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
    // Crée les Medias Images page2 dans la section containerMedias
    createImageCard() {
        const imageCardP2 = document.createElement('a');
        imageCardP2.classList.add("containerPhotoCards");
        const img = document.createElement('img');
        img.setAttribute('src', 'assets/Media/' + this.media.image);
        img.setAttribute('alt', this.media.alt);
        img.setAttribute('data-id', this.media.id);
        img.classList.add("imageMedia");
        const divSousTitre = document.createElement('div');
        divSousTitre.classList.add('sousTitre');
        const divNomImage = document.createElement('div');
        divNomImage.classList.add('sousTitreText');
        divNomImage.innerText = this.media.title;
        const divLike = document.createElement('div');
        divLike.classList.add('likeHeart');
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
    // Crée les Medias Videos page2 dans la section containerMedias
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
        divNomVideo.classList.add('sousTitreText');
        const divLike = document.createElement('div');
        divLike.classList.add('likeHeart');
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
    // Si instance = Image, return figure contenant html et lien image
    // Si instance = Video, return figure contenant html et lien video 
    createLightboxContent(){
      if(this.media instanceof Image){
          const figure = document.createElement('figure');
          figure.classList.add('figureImg');
          const img = document.createElement('img');
          img.setAttribute('src', 'assets/Media/' + this.media.image);
          const figCaption = document.createElement('figcaption');
          figCaption.innerText = this.media.title;
          figure.appendChild(img);
          figure.appendChild(figCaption);
          return figure;
      }else if(this.media instanceof Video){
         const figure = document.createElement('figure');
         figure.classList.add('figureVid');
         const vid = document.createElement('video');
         const figCaption = document.createElement('figcaption');
         figCaption.innerText = this.media.title;
         vid.setAttribute('type', 'video/mp4');
         vid.setAttribute('src', 'assets/Media/' + this.media.video);
         vid.setAttribute('controls', true);
         vid.setAttribute('autoplay', true);
         vid.setAttribute('loop', true);
         figure.appendChild(vid);
         figure.appendChild(figCaption);
         return figure;
      }
    }
 }