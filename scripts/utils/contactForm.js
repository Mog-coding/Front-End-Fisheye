//FORMULAIRE

// Déclaration caractéristiques des 4 objets input :
const dataInput = {
    firstName: {
        noeud: document.querySelector("#first"),
        errorMessage: "Veuillez entrer entre 2 et 30 caractères dans le champ Prénom.",
        regex: /^[a-zA-ZÀ-ÿ-]{2,30}$/,
        isValid: false
    },
    lastName: {
        noeud: document.querySelector("#last"),
        errorMessage: "Veuillez entrer entre 2 et 30 caractères dans le champ Nom.",
        regex: /^[a-zA-ZÀ-ÿ-]{2,30}$/,
        isValid: false
    },
    email: {
        noeud: document.querySelector("#email"),
        errorMessage: "Veuillez entrer une syntaxe d'email valide.",
        regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        isValid: false
    },
    textArea: {
        noeud: document.querySelector("#textArea"),
        errorMessage: "Veuillez entrer entre 5 et 500 caractères dans le champ message.",
        regex: /^[A-Za-zÀ-ÿ0-9 .'?!,@$#-_\n\r]{5,500}$/,
        isValid: false
    }
};

// Pour toutes les entrées: si regex match avec saisie -> isValid = true, sinon false
function updateInput(data) {
    for (const key in data) {
        if (data[key].regex) {
            if (data[key].noeud.value.match(data[key].regex)) {
                data[key].isValid = true;
            } else {
                data[key].isValid = false;
            }
        }
    }
}

// return true si toutes les entrées isValid sont true, sinon false
function testAllIsValid(data) {
    let result;
    for (let key in data) {
        if (!data[key].isValid) {
            result = data[key].isValid;
            break;
        } else {
            result = true;
        }
    }
    return result;
}

// Ajoute/retire message d'erreur d'une entrée en fonction de clé isValid
function afficheErrorMessage(key) {
    if (!key.isValid) {
        key.noeud.classList.add("borderError");
        key.noeud.nextElementSibling.innerHTML = key.errorMessage;
    } else {
        key.noeud.classList.remove("borderError");
        key.noeud.nextElementSibling.innerHTML = "";
    }
}

export { dataInput, updateInput, testAllIsValid, afficheErrorMessage };