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
    createImageCard() {
        const imageCardP2 = document.createElement('a');
        imageCardP2.classList.add("containerPhotoCards");
        const img = document.createElement('img');
        img.setAttribute('src', 'assets/Media/' + this.media.image);
        img.setAttribute('alt', 'assets/Media/' + this.media.title);
        const div = document.createElement('div');
        div.classList.add('sousTitre');
        const div1 = document.createElement('div');
        div1.innerText = this.media.title;
        const div2 = document.createElement('div');
        const span21 = document.createElement('span'); 
        span21.classList.add('likeNumber');
        span21.innerText = this.media.likes;
        const i21 = document.createElement('i');
        i21.classList.add('fas', 'fa-heart', 'heart');
        div2.appendChild(span21);
        div2.appendChild(i21);
        div.appendChild(div1);
        div.appendChild(div2);
        imageCardP2.appendChild(img);
        imageCardP2.appendChild(div);
        return imageCardP2
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
    }
    createVideoCard() {
        const videoCardP2 = document.createElement('a');
        videoCardP2.classList.add("containerVideoCards");
       
        const vid = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute('src', 'assets/Media/' + this.media.video);
        source.setAttribute('type', 'video/mp4');
        const div = document.createElement('div');
        div.classList.add('sousTitre');
        const div1 = document.createElement('div');
        div1.innerText = this.media.title;
        const div2 = document.createElement('div');
        const span21 = document.createElement('span'); 
        span21.classList.add('likeNumber');
        span21.innerText = this.media.likes;
        const i21 = document.createElement('i');
        i21.classList.add('fas', 'fa-heart', 'heart');
        vid.appendChild(source);
        div2.appendChild(span21);
        div2.appendChild(i21);
        div.appendChild(div1);
        div.appendChild(div2);
        videoCardP2.appendChild(vid);
        videoCardP2.appendChild(div);
        return videoCardP2
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
    }
 }