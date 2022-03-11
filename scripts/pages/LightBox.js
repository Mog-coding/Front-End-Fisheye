import MediaFactory from "../factories/MediaFactory.js"

export default class LightBox {
    constructor(listMedia) {
        this.listMedia = listMedia;
        this.currentElement = null;
        this.mediaFactory = null;
    }
    // Affiche un objet img ou video grâce à son id 
    show(id) {
        this.currentElement = this.getElementById(id);
        // utilisation Pattern Factory pour distinguer l'instance video/img
        this.mediaFactory = new MediaFactory(this.currentElement);
        this.display();
    }
    // Retourne un objet contenu dans un tableau d'objet via un id
    getElementById(idCliqué) {
        return this.listMedia.find(element => element.id === Number(idCliqué))
    }
    // Passe au media suivant et l'affiche
    next() {
        let index = this.listMedia.findIndex(element => element.id === Number(this.currentElement.id));
        if (index + 1 === this.listMedia.length) {
            this.currentElement = this.listMedia[0];
        } else {
            this.currentElement = this.listMedia[index + 1];
        }
        this.mediaFactory = new MediaFactory(this.currentElement);
        this.display();
    }
    // Passe au media précedent et l'affiche
    previous() {
        let index = this.listMedia.findIndex(element => element.id === Number(this.currentElement.id));
        if (index === 0) {
            this.currentElement = this.listMedia[this.listMedia.length - 1];
        } else {
            this.currentElement = this.listMedia[index - 1];
        }
        this.mediaFactory = new MediaFactory(this.currentElement);
        this.display();
    }
    // Ajoute le html  
    display() {
        const mediaContain = document.querySelector("#mediaContainer");
        // Si media précédemment affiché ds lightbox: suppression
        if (mediaContain.firstElementChild) {
            mediaContain.firstElementChild.remove();
        };
        // Appel méthode Vue de la MediaFactory avec l'objet selectionné via id
        const htmlElement = this.mediaFactory.createLightboxContent();
        mediaContain.appendChild(htmlElement);
        document.querySelector("#lightbox").classList.add("show");
        setTimeout(function(){
            document.querySelector("#btnClose").focus();
        }, 1)
    }

}