import Media from "./Media.js"
export default class Image extends Media {
    constructor(data) {
        super(data);
        this._image = data.image;
    }
    get image() {
        return this._image;
    }
}