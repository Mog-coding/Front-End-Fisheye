class LightBox {
    constructor(listMedia){
        this.currentElement = null; //variable créee ici pour gérer pb, utilisée ds show
        this.listMedia = listMedia;
    }
    show(id){
        this.currentElement = this.getElementById(id);
        this.display();
      }
    getElementById(id){
        return this.listMedia.find(element => element.id === Number(id))
    }
    next(){
        let index = this.listMedia.findIndex( element => element.id === Number(this.currentElement.id));
        this.currentElement = this.listMedia[index +1];
        this.display();
    }
    previous(){
        let index = this.listMedia.findIndex( element => element.id === Number(this.currentElement.id));
        this.currentElement = this.listMedia[index -1];
        this.display();
    }
    display(){
        document.querySelector("#lightbox .content .picture").src = `assets/Media/${this.currentElement.image}`;
        document.querySelector("#lightbox").classList.add("show");
    }

}