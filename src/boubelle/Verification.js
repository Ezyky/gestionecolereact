//function pour colorier le champs au cas ou ce n'est pas valide
function surligne(champ, erreur){
    if(erreur){
        champ.style.backgroundColor = "#fba";
    }else{
        champ.style.backgroundColor = "";
    }
}
//Fonction pour verification du format numero de téléphone  = +221 77 777 77 77 
function formatTel(champ){
    var regex = /^(\+[0-9][0-9][0-9])?([0-9][0-9])([0-9][0-9][0-9])([0-9][0-9])([0-9][0-9])$/;
    if(!regex.test(champ)){
        surligne(champ, true);
        return false;
    }else{
        surligne(champ, false);
        return true;
    }
}
//Fonction pour verification du format date = aaaa-mm-dd
function formatDate(champ){
    var regex = /^([0-9][0-9][0-9][0-9])-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;
    if(!regex.test(champ.value)){
        surligne(champ, true);
        return false;
    }else{
        surligne(champ, false);
        return true;
    }
}



function matchFieldProf(fieldName, value) {
    let fieldMatchErrors = { 
        nom : "",
        prenom : "",
        adresse : "",
        email : "",
        telephone : ""
    };

    let fieldVadid = {
        nomValid : false,
        prenomValid : false,
        adresseValid : false,
        emailValid : false,
        telephoneValid : false
    }

    let match = {
        fieldMatchErrors,
        fieldVadid
    };

    switch(fieldName) {
        case 'nom':
            fieldVadid.nomValid = value.length !== 0 ;
            fieldMatchErrors.nom = fieldVadid.nomValid ? ' is-valid' : ' is-invalid';
            break;
        case 'prenom':
            fieldVadid.prenomValid = value.length !== 0 ;
            fieldMatchErrors.prenom = fieldVadid.prenomValid ? ' is-valid' : ' is-invalid';
            break;
        case 'adresse':
            fieldVadid.adresseValid = value.length !== 0 ;
            fieldMatchErrors.adresse = fieldVadid.adresseValid ? ' is-valid' : ' is-invalid';
            break;
        case 'email':
            fieldVadid.emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldMatchErrors.email = fieldVadid.emailValid ? ' is-valid' : ' is-invalid';
            break;
        case 'telephone':
            fieldVadid.telephoneValid = value.match(/^(\+[0-9][0-9][0-9])?([0-9][0-9])([0-9][0-9][0-9])([0-9][0-9])([0-9][0-9])$/);
            fieldMatchErrors.telephone = fieldVadid.telephoneValid ? ' is-valid': ' is-invalid';
            break;
        default:
            break;
    }
    return match;
}

export {formatTel, formatDate};



