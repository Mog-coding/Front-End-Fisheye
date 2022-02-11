import Media from "./Media.js"
export default class Video extends Media {
    constructor(data) {
        super(data);
        this._video = data.video;
    }
    get video() {
        return this._video;
   }
}