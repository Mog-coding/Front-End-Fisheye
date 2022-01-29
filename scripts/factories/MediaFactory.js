import Image from "../model/Image.js";
import Video from "../model/Video.js";

export default class MediaFactory {
    constructor(media) {
        if (media.image) {
            return new Image(media)
          } else if (media.video) {
            return new Video(media)
        } else {
            throw 'Unknown type format'
        }
    }
 }