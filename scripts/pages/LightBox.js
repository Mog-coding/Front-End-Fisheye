import MediaFactory from "../factories/MediaFactory.js";

export default class LightBox {
    constructor(listMedia){
        this.currentElement = null; //variable créee ici pour gérer pb, utilisée ds show
        this.listMedia = listMedia;
    }
    show(id){
        this.currentElement = this.getElementById(id); //obj img ou vid
        this.mediaFactory = new MediaFactory(this.currentElement);
        const htmlElement = this.mediaFactory.createLightboxContent();
        document.querySelector("#mediaContainer").appendChild(htmlElement);
        document.querySelector("#lightbox").classList.add("show");
      }
    getElementById(id){
        return this.listMedia.find((element, index) => {
           if (element.id === Number(id)){
               this.currentIndex = index;
               return true
           }
           return false
        })
    }
    next(){
    }
    previous(){
    }
    manageEvent(){ 
    }
}