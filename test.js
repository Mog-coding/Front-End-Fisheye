class MoviesFactory {
    constructor(data, type) {
        // Si le type correspond à l'ancienne API, alors retourne-moi l'ancien formatage
        if (type === 'oldApi') {
            return new OldMovie(data)
        // Sinon retourne-moi le nouveau formatage
        } else if (type === 'newApi') {
            return new Movie(data)
        // Une bonne pratique est de déclencher une erreur si le format n'est pas reconnu
        } else {
            throw 'Unknown type format'
        }
    }
 }