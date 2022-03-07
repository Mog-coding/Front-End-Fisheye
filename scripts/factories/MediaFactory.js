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
        const imageCardP2 = document.createElement('article');
        /* Création éléments image */
        imageCardP2.classList.add("containerPhotoCards");
        const imgLink = document.createElement('a');          
        imgLink.setAttribute('tabindex', '0');
        imgLink.classList.add("enterLight");
        const img = document.createElement('img');
        img.setAttribute('src', 'assets/Media/' + this.media.image);
        img.setAttribute('alt', this.media.alt);
        img.setAttribute('data-id', this.media.id);
        img.classList.add("clickLightbox");
        /* Création éléments sous titre */
        const divSousTitre = document.createElement('div');
        divSousTitre.classList.add('sousTitre');
        const h2 = document.createElement('h2');
        h2.classList.add('sousTitreText');
        h2.innerText = this.media.title;
        const divLike = document.createElement('div');
        divLike.classList.add('likeHeart');
        const spanLike = document.createElement('span');
        spanLike.classList.add('likeNumber');
        spanLike.innerText = this.media.likes;
        const iButton = document.createElement('button');
        const iHeart = document.createElement('i');
        iHeart.classList.add('fas', 'fa-heart', 'heart');
        /* Ajout enfants image */
        imgLink.appendChild(img);
        iButton.appendChild(iHeart);
        iButton.classList.add("buttonHeart");
        divLike.appendChild(spanLike);
        divLike.appendChild(iButton);
        /* Ajout enfants sous titre */
        divSousTitre.appendChild(h2);
        divSousTitre.appendChild(divLike);
        /* Ajout enfant video et sous titre */
        imageCardP2.appendChild(imgLink);
        imageCardP2.appendChild(divSousTitre);
        return imageCardP2
    }

    // Crée les Medias Videos page2 dans la section containerMedias
    createVideoCard() {
        const videoCardP2 = document.createElement('article');
        /* Création éléments video */
        videoCardP2.classList.add("containerVideoCards");
        const videoLink = document.createElement('a');
        videoLink.classList.add("enterLight");
        videoLink.setAttribute('tabindex', '0');
        const vid = document.createElement('video');
        vid.setAttribute('data-id', this.media.id);
        vid.classList.add("clickLightbox");
        const source = document.createElement('source');
        source.setAttribute('src', 'assets/Media/' + this.media.video);
        source.setAttribute('type', 'video/mp4');
        /* Création éléments sous titre */
        const divSousTitre = document.createElement('div');
        divSousTitre.classList.add('sousTitre');
        const h2 = document.createElement('h2');
        h2.classList.add('sousTitreText');
        h2.innerText = this.media.title;
        const divLike = document.createElement('div');
        divLike.classList.add('likeHeart');
        const spanLike = document.createElement('span');
        spanLike.classList.add('likeNumber');
        spanLike.innerText = this.media.likes;
        const iButton = document.createElement('button');
        const iHeart = document.createElement('i');
        iHeart.classList.add('fas', 'fa-heart', 'heart');
        /* Ajout enfants video */
        vid.appendChild(source);
        videoLink.appendChild(vid);
        /* Ajout enfants sous titre */
        iButton.appendChild(iHeart);
        iButton.classList.add("buttonHeart");
        divLike.appendChild(spanLike);
        divLike.appendChild(iButton);
        divSousTitre.appendChild(h2);
        divSousTitre.appendChild(divLike);
        /* Ajout enfant video et sous titre */
        videoCardP2.appendChild(videoLink);
        videoCardP2.appendChild(divSousTitre);
        return videoCardP2
    }

    // Si instance = Image, return figure contenant html et lien image
    // Si instance = Video, return figure contenant html et lien video 
    createLightboxContent() {
        if (this.media instanceof Image) {
            const figure = document.createElement('figure');
            figure.classList.add('figureImg');
            const img = document.createElement('img');
            img.setAttribute('src', 'assets/Media/' + this.media.image);
            const figCaption = document.createElement('figcaption');
            figCaption.innerText = this.media.title;
            figure.appendChild(img);
            figure.appendChild(figCaption);
            return figure;
        } else if (this.media instanceof Video) {
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