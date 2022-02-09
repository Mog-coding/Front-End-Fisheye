/**
 ********************* DECLARATIONS *********************
 */

// Référence des 6 éléments input radio dans array
const arrayRadio = document.querySelectorAll('[name="location"]');

// Déclaration des caractéristiques des 7 objets input dans objet dataInput
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
  birthDate: {
    noeud: document.querySelector('#birthdate'),
    errorMessage: "Veuillez entrer une date de naissance valide de type: jj/mm/aaaa",
    regex: /^(19|20)\d\d[/-](0[1-9]|1[012])[/-](0[1-9]|[12][0-9]|3[01])$/,
    isValid: false
  },
  nbTournoi: {
    noeud: document.querySelector('#quantity'),
    errorMessage: "Veuillez entrer un nombre compris entre 0 et 99",
    regex: /^([0-9]|[0-9][0-9])$/,
    isValid: false
  },
  radio: {
    noeud: document.querySelector('#location1'),
    errorMessage: "Veuillez sélectionner une ville",
    isValid: false
  },
  checkbox: {
    noeud: document.querySelector('#checkbox1'),
    errorMessage: "Veuillez accepter les conditions générales pour continuer",
    isValid: false
  },
};

/**
 ********************* FONCTIONS DE TEST *********************
 */

// test des entrées avec regex: si il y a une regex et si input match regex -> isValid = true, sinon false (entrée 1 à 5)
function testRegexInput() {
  for (const key in dataInput) {
    if (dataInput[key].regex) {
      if (dataInput[key].noeud.value.match(dataInput[key].regex)) {
        dataInput[key].isValid = true;
      } else {
        dataInput[key].isValid = false;
      }
    }
  }
}

// Test la validité d'input 6 radio: 1 radio cochée -> isValid = true sinon false
function testRadio() {
  let radioResult = false;
  for (let i = 0; i < arrayRadio.length; i++) {
    if (arrayRadio[i].checked) {
      radioResult = true;
      break;
    }
  }
  dataInput.radio.isValid = radioResult;
}

// Test la validité d'input 7 checkbox: conditions générales cochées -> isValid = true sinon false 
function testCheckbox() {
  let result = false;
  if (dataInput.checkbox.noeud.checked) {
    result = true;
  }
  dataInput.checkbox.isValid = result;
}

// Test les clés isValid des 7 objets input, si au moins une entrée false: renvoie false sinon renvoie true 
function testAllIsValid() {
  let result;
  for (let key in dataInput) {
    if (!dataInput[key].isValid) {
      result = dataInput[key].isValid;
      break;
    } else {
      result = true;
    }
  }
  return result;
}

/**
 ********************* Fonction affichage erreur *********************
 */

// Si isValid false: ajout attributs d'erreur, sinon supression attributs erreur
function afficheErrorMessage(key) {
  if (!key.isValid) {
    key.noeud.parentElement.setAttribute("data-error-visible", true);
    key.noeud.parentElement.setAttribute("data-error", key.errorMessage)
  } else {
    key.noeud.parentElement.removeAttribute("data-error-visible");
    key.noeud.parentElement.removeAttribute("data-error");
  }
}

/**
 ********************* OUVERTURE / FERMETURE MODAL *********************
 */

// Clic sur l'un des deux boutons d'inscription -> fait apparaitre le modal
document.querySelectorAll(".modal-btn").forEach(function (el) {
  el.addEventListener('click', function () {
    switchModal("block");
  })
});

// Clic sur la croix modal -> le fait disparaitre 
document.querySelector('.close').addEventListener('click', function () {
  switchModal("none");
});

// Passe le modal en display: block; ou none; 
function switchModal(display) {
  document.querySelector('.bground').style.display = display;
}

/**
 ********************* SUBMIT FORMULAIRE *********************
 */

// clic sur bouton submit soumet le formulaire, si valide => affiche message remerciement et reset formulaire, sinon affiche les messages d'erreur
document.querySelector('[name="reserve"]').addEventListener('submit', function (event) {
  event.preventDefault();
  testRegexInput();
  testRadio();
  testCheckbox();
  if (testAllIsValid()) {
    for (const key in dataInput) {
      afficheErrorMessage(dataInput[key]);
    };
    document.querySelector('[name="reserve"]').reset();
    document.querySelector("#thankMessage").classList.add('zIndex');
  } else {
    for (const key in dataInput) {
      afficheErrorMessage(dataInput[key]);
    };
  }
}
);

/**
 ********************* MESSAGE REMERCIEMENT bouton fermer *********************
 */

// Ferme le modal suite à appui sur le bouton fermer du message de remerciement
document.querySelector("#fermer").addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector("#thankMessage").classList.remove('zIndex');
  switchModal("none");
});

/**
 ********************* listener change sur 5 inputs *********************
 */

// Si regex, test regex et met à jour isValid, ensuite affiche message erreur
for (const key in dataInput) {
  dataInput[key].noeud.addEventListener('change', function (event) {
    if (dataInput[key].regex) {
      dataInput[key].isValid = dataInput[key].noeud.value.match(dataInput[key].regex);
      afficheErrorMessage(dataInput[key]);
    }
  });
};

/**
 ********************* responsive *********************
 */

// Ajoute et retire la classe responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}