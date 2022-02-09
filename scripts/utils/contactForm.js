//FORMULAIRE
/* Déclaration caractéristiques des 3 objets input :*/
const dataInput = {
    firstName: {
        noeud: document.querySelector('#first'),
        errorMessage: "Veuillez entrer entre 2 et 30 caractères dans le champ Prénom.",
        regex: /^[a-zA-ZÀ-ÿ-]{2,30}$/,
        isValid: false
    },
    lastName: {
        noeud: document.querySelector('#last'),
        errorMessage: "Veuillez entrer entre 2 et 30 caractères dans le champ Nom.",
        regex: /^[a-zA-ZÀ-ÿ-]{2,30}$/,
        isValid: false
    },
    email: {
        noeud: document.querySelector('#email'),
        errorMessage: "Veuillez entrer une syntaxe d'email valide",
        regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        isValid: false
    },
    textArea: {
        noeud: document.querySelector('#textArea'),
        errorMessage: "Veuillez entrer entre 5 et 150 caractères dans le champ Message.",
        regex: /^[a-zA-ZÀ-ÿ-]{5,150}$/,
        isValid: false
    }
};

function updateInput(data) {
    for (const key in data) {
        if (data[key].regex) {
            if (data[key].noeud.value.match(data[key].regex)) {
                data[key].isValid = true;
                console.log('true')
            } else {
                data[key].isValid = false;
                console.log('false')
            }
        }
    }
}

function afficheErrorMessage(key) {
    if (!key.isValid) {
        key.noeud.parentElement.classList.add('error');
        key.noeud.nextElementSibling.innerHTML = key.errorMessage;
    } else {
        key.noeud.parentElement.classList.remove('error');
        key.noeud.nextElementSibling.innerHTML = '';
    }
}

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


let test2 = "vert";