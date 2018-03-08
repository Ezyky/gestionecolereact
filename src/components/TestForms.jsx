import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import {valueVerifie} from '../Service';

import '../style/page.css';

class TestForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            pageName : "",
            //initialisation des valeurs du formulaire
            id : "",
            nom : "",
            prenom : "",
            naissance : "",
            adresse : "",
            email : "",
            telephone : "",
            responsable : "",

            classe : "",

            niveau : "",
            titulaire : "",
            nombre : "",
            effectif : "",
            list : [],

            formValid : false,
            msgError : null,

            fieldValid : {},
            formErrors : {}
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    /**
     * Methode permettant de recuperer les valeurs renseigner 
     * lors l'ajoute, suppression ou modification
     * */
    /* A deplacer */
    onChangeHandler(e){
        const name = e.target.name;
        const value = e.target.value;
        const type = e.target.type;
        const field = [name, type];
        this.setState(
            {[name] : value},
            () => this.matchField(name, value, field)
        );
    }

    matchField(fieldName, value, field){
        let inputName = this.props.inputName;
        let formErrors = this.state.formErrors
        let fieldValid = this.state.fieldValid;
        let verifValue = valueVerifie(fieldName, value, field, inputName);
        let fieldMatchErrors = verifValue.fieldMatchErrors;
        formErrors[fieldName] = verifValue.fieldMatchErrors;
        fieldValid[fieldName] = verifValue.objetValid;
        /*
        console.log(fieldName+" -1- "+value+" -2- "+verifValue.fieldMatchErrors+" -3- "+verifValue.objetValid);
        console.log(verifValue.formValid+" "+verifValue.msgError);
        */
        this.setState ({
            formErrors : formErrors ,
            fieldValid : fieldValid,
            formValid : verifValue.formValid,
            msgError : verifValue.msgError
        });
    }
    
    onClickBtnAjouter (e){
        e.preventDefault();
        let pageName = this.state.pageName;
        let id = this.state.id;
        let nom = this.state.nom;
        let prenom = this.state.prenom;
        let naissance = this.state.naissance;
        let adresse = this.state.adresse;
        let email = this.state.email;
        let telephone = this.state.telephone;
        let responsable = this.state.responsable;
        let classe = this.state.classe;
        let niveau = this.state.niveau;
        let titulaire = this.state.titulaire;
        let nombre = this.state.nombre;
        let effectif = this.state.effectif;
        let list = this.state.list;
        let tableTmp = {};
        if (pageName === "professeur"){
            tableTmp = {id, nom, prenom, naissance, adresse, email, telephone, responsable};
            if(nom === "" || prenom === "" || naissance === "" || adresse === "" || email === "" || telephone === ""){
                this.setState({
                    formValid : false,
                    msgError : "Veuillez renseigner tous les champs !!!",
                });
            }else{
                this.setState({
                    formErrors : {},
                });
                this.props.resultClick(tableTmp);
            }
        }else if (pageName === "élève"){
            let formAdd = {nom, prenom, naissance, adresse, email, telephone, classe};
            let infoClass = list.filter( (elmt) => {
                if(elmt._id === classe){
                    return elmt;
                }
            });
            
            if(nom === "" || prenom === "" || naissance === "" || email === "" || 
                telephone === "" || classe === ""){
                this.setState({
                    formValid : false,
                    msgError : "Veuillez renseigner tous les champs !!!",
                });
            }else{
                this.setState({
                    formErrors : {},
                });
                let tableTmp = [formAdd, infoClass[0]];
                this.props.resultClick(tableTmp);
            }
        }else{
            tableTmp = {id, nom, niveau, titulaire, nombre, effectif};
            let infoProf = list.filter( (elmt) => {
                if(elmt._id === titulaire){
                    return elmt;
                }
            });
            if(nom === "" || niveau === "" || titulaire === "" || effectif === ""){
                this.setState({
                    formValid : false,
                    msgError : "Veuillez renseigner tout les champs!!!",
                })
            }else{
                this.setState({
                    formErrors : {},
                });
                let table = [tableTmp, infoProf[0]];
                this.props.resultClick(table);
            }    
        }
    }
    //Methode pour modifier les paramètres un prof dans la base de donnée
    onClickBtnModifier(e){
        e.preventDefault();
        let pageName = this.state.pageName;
        let id = this.state.id;
        let nom = this.state.nom;
        let prenom = this.state.prenom;
        let naissance = this.state.naissance;
        let adresse = this.state.adresse;
        let email = this.state.email;
        let telephone = this.state.telephone;
        let responsable = this.state.responsable;
        let classe = this.state.classe;
        let niveau = this.state.niveau;
        let titulaire = this.state.titulaire;
        let nombre = this.state.nombre;
        let effectif = this.state.effectif;
        let list = this.state.list;
        let tableTmp = {};
        let type = "modifier"
        if (pageName === "professeur"){
            tableTmp = {id, nom, prenom, naissance, adresse, email, telephone, responsable};
            if(id === ""){
                this.setState({
                    formValid : false,
                    msgError : "Impossible de modifier, il n'existe \n pas veuillez le créer !!!",
                });
            }else{
                this.setState({
                    formErrors : {},
                });
                this.props.resultClick(type, tableTmp);
            }
        }else if (pageName === "élève"){
            let formMod = {id, nom, prenom, naissance, adresse, email, telephone, classe};
            let infoClass = list.filter( (elmt) => {
                if(elmt._id === classe){
                    return elmt;
                }
            });
            
            if(id === ""){
                this.setState({
                    formValid : false,
                    msgError : "Impossible de modifier, il n'existe \n pas veuillez le créer !!!",
                });
            }else{
                this.setState({
                    formErrors : {},
                });
                let tableTmp = [formMod, infoClass[0]];
                this.props.resultClick(type, tableTmp);
            }
        }else{
            let formMod = {id, nom, niveau, titulaire, nombre, effectif};
            let infoProf = list.filter( (elmt) => {
                if(elmt._id === titulaire){
                    return elmt;
                }
            });
            if(id === ""){
                this.setState({
                    formValid : false,
                    msgError : "Impossible de modifier, il n'existe \n pas veuillez le créer !!!",
                })
            }else{
                this.setState({
                    formErrors : {},
                });
                let tableTmp = [formMod, infoProf[0]];
                this.props.resultClick(type, tableTmp);
            }    
        }
    }

    
    //Methode pour supprimer un prof dans la base de donnée
    onClickBtnSupprimer (e){
        e.preventDefault();
        let pageName = this.state.pageName;
        let id = this.state.id;
        let nom = this.state.nom;
        let prenom = this.state.prenom;
        let naissance = this.state.naissance;
        let adresse = this.state.adresse;
        let email = this.state.email;
        let telephone = this.state.telephone;
        let responsable = this.state.responsable;
        let classe = this.state.classe;
        let niveau = this.state.niveau;
        let titulaire = this.state.titulaire;
        let nombre = this.state.nombre;
        let effectif = this.state.effectif;
        let list = this.state.list;
        let tableTmp = {};
        let type = "supprimer";
        if (pageName === "professeur"){
            tableTmp = {id, nom, prenom, naissance, adresse, email, telephone, responsable};
            if(id === ""){
                this.setState({
                    formValid : false,
                    msgError : "Impossible de supprimer, il n'existe \n pas veuillez le créer !!!",
                });
            }else{
                this.setState({
                    formErrors : {},
                });
                this.props.resultClick(type, tableTmp);
            }
        }else if (pageName === "élève"){
            let formDel = {id, nom, prenom, naissance, adresse, email, telephone, classe};
            let infoClass = list.filter( (elmt) => {
                if(elmt._id === classe){
                    return elmt;
                }
            });
            
            if(id === ""){
                this.setState({
                    formValid : false,
                    msgError : "Impossible de supprimer, il n'existe \n pas veuillez le créer !!!",
                });
            }else{
                this.setState({
                    formErrors : {},
                });
                let tableTmp = [formDel, infoClass[0]];
                this.props.resultClick(type, tableTmp);
            }
        }else{
            let formDel = {id, nom, niveau, titulaire, nombre, effectif};
            let infoProf = list.filter( (elmt) => {
                if(elmt._id === titulaire){
                    return elmt;
                }
            });
            if(id === ""){
                this.setState({
                    formValid : false,
                    msgError : "Impossible de supprimer, il n'existe \n pas veuillez le créer !!!",
                })
            }else{
                this.setState({
                    formErrors : {},
                });
                let tableTmp = [formDel, infoProf[0]];
                this.props.resultClick(type, tableTmp);
            }    
        }
    }

    componentWillReceiveProps(nextProps){
        let list = null;
        if(nextProps.autreAffiche !== undefined){
            nextProps.autreAffiche.forEach( (element) => {
                list = element.value;
            });
        }
        if(nextProps.inputValue !== undefined || nextProps.inputValue>0){
            this.setState({
                pageName : nextProps.pageName,
                id : nextProps.inputValue._id,
                nom : nextProps.inputValue.nom,
                prenom : nextProps.inputValue.prenom,
                naissance : nextProps.inputValue.naissance,
                adresse : nextProps.inputValue.adresse,
                email : nextProps.inputValue.email,
                telephone : nextProps.inputValue.telephone,
                responsable : nextProps.inputValue.responsable,
                classe : nextProps.inputValue.classe,

                list : list,

                niveau : nextProps.inputValue.niveau,
                titulaire : nextProps.inputValue.titulaire,
                nombre : nextProps.inputValue.nombre,
                effectif : nextProps.inputValue.effectif,
            });
        }
    }

    render(){
        const inputName = this.props.inputName;
        const inputType = this.props.inputType;
        //const autreType = this.props.autreType;
        const autreAffiche = this.props.autreAffiche;
        const autreName = this.props.autreName;
        
        const type = this.props.type;
        const typeForm = this.props.typeForm;

        const titre = this.props.titre;
        const name = this.props.name;
        let autre = "";
        let input = "";
        let bouton = "";
        if(inputName !== undefined && inputName.length > 0){
            inputName.forEach( (Name) => {
                let Value = this.state[Name];
                let FromError = this.state.formErrors[Name];
                let text = "text";
                inputType.forEach((el) => {
                    input = <div>
                                {input}
                                <div className="form-group fixe">
                                    <input className={"form-control form-control-sm "+FromError} 
                                        value = {Value} name = {Name} type={el[Name]} 
                                        placeholder={"Entrer la valeur " +Name} 
                                        onChange = {this.onChangeHandler} required/>
                                </div>
                            </div>;
                });
            });
        }

        if(autreAffiche !== undefined && autreAffiche.length >0 && autreName !== undefined && autreName.length >0){
    
            autreAffiche.forEach( (element) => {
                let elementValue = element.value;
                if(element.type === "select"){
                    let option = "";
                    let optionOld = [];
                    elementValue.forEach( (elementAffiche) => {
                        if(autreName.length <= 3){
                            option = (<option key = {elementAffiche[autreName[0]]} value={elementAffiche[autreName[0]]}>
                                        {elementAffiche[autreName[1]]+" "+elementAffiche[autreName[2]]} 
                                    </option>);

                        }else{
                            option = (<option key = {elementAffiche[autreName[0]]} value={elementAffiche[autreName[0]]}>
                                        {elementAffiche[autreName[1]]+" ("+elementAffiche[autreName[2]]+"/"+elementAffiche[autreName[3]]+")"} 
                                    </option>);
                        }
                        optionOld.push(option);
                    })
                    autre = (
                        <select className={"custom-select custom-select-sm "+this.state.formErrors[element.name]} 
                                value = {this.state[element.name] === "" ? "" : this.state[element.name]} type = {element.type}
                                onChange = {this.onChangeHandler} name = {element.name} required = {true}>
                                <option value="">{"Choix de "+element.name}</option>
                                {optionOld.map( (elemt) => {
                                    return elemt;
                                })}
                        </select>
                    );
                }
            });
        }

        /* A extraire Bouton */
        if(typeForm === "detail"){
            bouton = <div className = "form-row padding">
                        <div className="col-md-6 col-sm-6 col-6 padding">
                            <button type = "submit" className="btn btn-info btn-block btn-sm"
                            onClick = {this.onClickBtnModifier.bind(this)} disabled = {!this.state.formValid}>Modifier</button>
                        </div>
                        <div className="col-md-6 col-sm-6 col-6 padding">      
                            <button type = "submit" className="btn btn-danger btn-block btn-sm"
                            onClick = {this.onClickBtnSupprimer.bind(this)} >Supprimer</button>
                        </div>
                        <br />
                        <br />
                    </div>;
        }else{
            bouton = <div className="col-md-12 col-sm-12 col-12 padding">
                            <button type = "submit" className="btn btn-info btn-block btn-sm"
                            onClick = {this.onClickBtnAjouter.bind(this)} disabled = {!this.state.formValid} >Ajouter</button>
                     </div>;
        }
        /*  */
        return(
            <div>
                <div className="card-body text-info padding">
                    <div className="form-group paddingNul">
                        <h5 className="card-title padding">{titre+" "+name} <br />
                            <span className="badge badge-info badge-pill fixe">
                                {this.state.id === "" ? "" : "N° : "+this.state.id}
                            </span><br />
                            <span className="badge badge-info badge-pill fixe">
                                {this.state.nombre === "" || this.state.nombre === undefined ? null : this.state.nombre+" élève"}
                            </span>
                        </h5>
                    </div>
                    <form className="card-text padding">
                        {input}
                        {autre}
                        <div className="form-group padding">
                            <label className = "col-12 col-sm-12 col-sm-12 form-label form-label-sm text-danger padding">
                                <h6>{this.state.msgError}</h6>
                            </label> 
                        </div>
                        {bouton}
                    </form>
                </div>
            </div>
        )
    }
}
/*
Test.propTypes = {

}
*/
export default TestForm;