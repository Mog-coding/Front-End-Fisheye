class LightBox {
    constructor(listMedia){
        this.currentElement = null; //variable créee ici pour gérer pb, utilisée ds show
        this.listMedia = listMedia;
    }
    show(id){
        this.currentElement = this.getElementById(id);
        console.log(this.currentElement);
        document.querySelector("#lightbox .content .picture").src = `assets/Media/${this.currentElement.image}`;
        document.querySelector("#lightbox").classList.add("show");
      }
    getElementById(id){
        return this.listMedia.find(element => element.id === Number(id))
    }
    next(){
    }
    previous(){
    }
    manageEvent(){ 
    }
}