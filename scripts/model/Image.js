import Media from "./Media.js"
export default class Image extends Media {
    constructor(data) {
        super(data);
        this._image = data.image;
        this._alt = data.alt
    }
    get image() {
        return this._image;
   }
   get alt() {
    return this._alt;
}
}