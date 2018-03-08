let message = (field, objetValid) => {
    let result = {
        status : true,
        message : null
    }
    if(!objetValid){
        result.status = false;
        result.message = "Veuillez bien renseigner la valeur du champ "+field+".";
    }
    return result;
}

let valueVerifie = (fieldName, value, field, inputName) =>{
    let fieldMatchErrors = {};
    let objetValid = {};
    inputName.forEach( (elemnt) => {
        objetValid[elemnt] = false;
        fieldMatchErrors[elemnt] = "";
    });
    if(field[1]==="text"){
            objetValid[fieldName] = (/^[a-zA-Z0-9_-]/).test(value) ;
            fieldMatchErrors[fieldName] = objetValid[fieldName] ? ' is-valid' : ' is-invalid';
    }else if (field[1]==="select-one"){
        objetValid[fieldName] = value.length !== 0 ;
        fieldMatchErrors[fieldName] = objetValid[fieldName] ? ' is-valid' : ' is-invalid';
    }else{
        switch(fieldName) {
            case 'naissance':
                objetValid[fieldName] = (/^([0-9][0-9][0-9][0-9])-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$/).test(value) ;
                fieldMatchErrors[fieldName] = objetValid[fieldName] ? ' is-valid' : ' is-invalid';
                break;
            case 'email':
                objetValid[fieldName] = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value);
                fieldMatchErrors[fieldName] = objetValid[fieldName] ? ' is-valid' : ' is-invalid';
                break;
            case 'effectif':
                objetValid[fieldName] = (/^[0-9][0-9]$/).test(value);
                fieldMatchErrors[fieldName] = objetValid[fieldName] ? ' is-valid': ' is-invalid';
                break;
            case 'telephone':
                const regTel =  /^(\+[0-9][0-9][0-9])?([0-9][0-9])([0-9][0-9][0-9])([0-9][0-9])([0-9][0-9])$/;
                objetValid[fieldName] = regTel.test(value);
                fieldMatchErrors[fieldName] = objetValid[fieldName] ? ' is-valid': ' is-invalid';
                break;
            default:
                break;
        }
    }
    const resultError = message(fieldName, objetValid[fieldName]);
    if(fieldName === "effectif" && fieldMatchErrors[fieldName] === " is-valid" && resultError.status){
        if(20<parseInt(value, 10) || parseInt(value, 10)<18){
            fieldMatchErrors[fieldName] = " is-invalid";
            resultError.message = "L'éffectif de la classe doit être inferieur 20 élèves et supérieur à 18 élèves";
        }
    }

    let retouReponse = {fieldMatchErrors : fieldMatchErrors[fieldName], 
                        objetValid : objetValid[fieldName],
                        formValid : resultError.status,
                        msgError : resultError.message}
    return retouReponse;
}

export {valueVerifie};