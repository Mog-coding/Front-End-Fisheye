class MediaFactory {
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