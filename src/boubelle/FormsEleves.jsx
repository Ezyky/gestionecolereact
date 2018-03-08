import React, {Component} from 'react';

import '../style/page.css';


class FormEleves extends Component {

    constructor(props){
        super(props);
        this.state = {
            //initialisation des valeurs du formulaire
            id : "",
            nom : "",
            prenom : "",
            naissance : "",
            adresse : "",
            email : "",
            telephone : "",
            classe : "",

            listClass : [],
            //initalisation du tableau d'erreur pour les valeurs du formulaire
            formErrors : { 
                nom : "",
                prenom : "",
                naissance : "",
                adresse : "",
                email : "",
                telephone : "",
                classe : ""
            },
            
            formValid : false,
            msgError : null,

            /**
             * initialisation des variables de validation à 'false'
             **/
            nomValid : false,
            prenomValid : false,
            naissanceValid : false,
            adresseValid : false,
            emailValid : false,
            telephoneValid : false,
            classeValid : false
            
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    /**
     * Methode permettant de recuperer les valeurs renseigner 
     * lors l'ajoute, suppression ou modification
     * */
    onChangeHandler(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState(
            {[name] : value},
            () => { this.matchField(name, value)}
        );
    }

    //Methode permettant de verifier les champs renseigner
    matchField(fieldName, value) {
        let fieldMatchErrors = this.state.formErrors;
        let nomValid = this.state.nomValid;
        let prenomValid = this.state.prenomValid;
        let naissanceValid = this.state.naissanceValid;
        let adresseValid = this.state.adresseValid;
        let emailValid = this.state.emailValid;
        let telephoneValid = this.state.telephoneValid;
        let classeValid = this.state.classeValid;
        let listClass = this.state.listClass;
        let nbrel =0;
        let idclasse = null;

        switch(fieldName) {
            case 'nom':
                nomValid = (/^[a-zA-Z0-9_-]/).test(value) ;
                fieldMatchErrors.nom = nomValid ? ' is-valid' : ' is-invalid';
                break;
            case 'prenom':
                prenomValid = (/^[a-zA-Z0-9_-]/).test(value) ;
                fieldMatchErrors.prenom = prenomValid ? ' is-valid' : ' is-invalid';
                break;
            case 'naissance':
                naissanceValid = value.match(/^([0-9][0-9][0-9][0-9])-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$/) ;
                fieldMatchErrors.naissance = naissanceValid ? ' is-valid' : ' is-invalid';
                break;
            case 'adresse':
                adresseValid = (/^[a-zA-Z0-9_-]/).test(value) ;
                fieldMatchErrors.adresse = adresseValid ? ' is-valid' : ' is-invalid';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldMatchErrors.email = emailValid ? ' is-valid' : ' is-invalid';
                break;
            case 'telephone':
                telephoneValid = value.match(/^(\+[0-9][0-9][0-9])?([0-9][0-9])([0-9][0-9][0-9])([0-9][0-9])([0-9][0-9])$/);
                fieldMatchErrors.telephone = telephoneValid ? ' is-valid': ' is-invalid';
                break;
            case 'classe':
                classeValid = value.length !== 0 ;
                idclasse = value
                fieldMatchErrors.classe = classeValid ? ' is-valid' : ' is-invalid';
                break;
            default:
                break;
        }
       // console.log(""+nomValid+" "+ prenomValid+" "+ naissanceValid+" " +adresseValid+" " +emailValid+" "+ telephoneValid+" "+ classeValid);

        let tmp = 0;
        let listClassNew = listClass;
        if(fieldMatchErrors.classe === ' is-valid' ){
            listClassNew = listClass.map((elemt) => {
                if(elemt._id === idclasse){
                    if((parseInt(elemt.nombre,10) + 1) > parseInt(elemt.effectif,10)){
                        fieldMatchErrors.classe = ' is-invalid';
                        tmp ++;
                    }
                }
                return elemt
            });
        }
        //console.log(fieldMatchErrors.classe+" "+ classeValid);
        //console.log(""+nomValid+" "+ prenomValid+" "+ naissanceValid+" " +adresseValid+" " +emailValid+" "+ telephoneValid+" "+ classeValid);
        const resultError = this.formValidHandler(nomValid, prenomValid, naissanceValid, adresseValid, emailValid, telephoneValid, classeValid);
        //mise à jour de variable
        if(tmp === 1){
            classeValid = !classeValid;
            resultError.status = false;
            resultError.message = "Classe pleine, impossible d'ajouter un élève";
        }
        this.setState(
            {
                formErrors: fieldMatchErrors,
                nomValid : nomValid,
                prenomValid : prenomValid,
                naissanceValid : naissanceValid,
                adresseValid : adresseValid,
                emailValid: emailValid,
                telephoneValid: telephoneValid,
                classeValid : classeValid,

                listClass : listClassNew,
                idClasse : idclasse,

                formValid : resultError.status,
                msgError : resultError.message,
            }
        );
    }

    //methode verifie si tout les champs sont valides pour retour de message d'erreur
    formValidHandler (nom, prenom, naissance, adresse, email, telephone, classe){
        let result = {
            status : true,
            message : null,
        }
        if(!(nom && prenom && naissance && adresse && email && telephone && classe)){
            result.status = false;
            result.message = "Veuillez bien renseigner tous les paramètres";
            if(nom === false && prenom === true && adresse === true && email === true && telephone === true && classe === true){
                result.status = false;
                result.message = "Veuillez bien renseigner la valeur du paramètre NOM.";
            }else if(nom === true && prenom === false && adresse === true && email === true && telephone === true && classe === true){
                result.status = false;
                result.message = "Veuillez bien renseigner la valeur du paramètre PRENOM.";
            }else if(nom === true && prenom === true && adresse === false && email === true && telephone === true && classe === true){
                result.status = false;
                result.message = "Veuillez bien renseigner la valeur du paramètre ADRESSE.";
            }else if(nom === true && prenom === true && adresse === true && email === false && telephone === true && classe === true){
                result.status = false;
                result.message = "La valeur du paramètre EMAIL.";
            }else if(nom === true && prenom === true && adresse === true && email === true && telephone === false && classe === true){
                result.status = false;
                result.message = "La valeur du TELEPHONE. Il est \n"+
                                    " doit contenir 9 chiffre ";
            }else if(nom === true && prenom === true && adresse === true && email === true && telephone === true && classe === false){
                result.status = false;
                result.message = "Veuillez choisir la classe ";
            }
            return result;
        }
        return result;
    }

    //Methode pour ajouter un prof dans la base de donnée
    onClickBtnAjouter (e){
        e.preventDefault();
        let nom = this.state.nom;
        let prenom = this.state.prenom;
        let classe = this.state.classe;
        let adresse = this.state.adresse;
        let email = this.state.email;
        let telephone = this.state.telephone;
        let naissance = this.state.naissance;
        let listClass = this.state.listClass;
        let idClasse = this.state.idClasse;

        let infoClass = listClass.filter( (elmt) => {
            if(elmt._id === idClasse){
                return elmt;
            }
        });

        let formAdd = {nom, prenom, naissance, adresse, email, telephone, classe};
        let tableTmp = [formAdd, infoClass[0]];
        
        if(nom === "" || prenom === "" || naissance === "" || email === "" || 
            telephone === "" || classe === ""){
                this.setState({
                    formValid : false,
                    msgError : "Veuillez renseigner tous les champs !!!",
                });
            }else{
                this.setState({
                    formErrors : { 
                        nom : "",
                        prenom : "",
                        naissance : "",
                        adresse : "",
                        email : "",
                        telephone : "",
                        classe : ""
                    },
                });
                this.props.resultClick(tableTmp);
            }
    }

    
    //Methode pour modifier les paramètres un prof dans la base de donnée
    onClickBtnModifier(e){
        e.preventDefault();
        let id = this.state.id;
        let nom = this.state.nom;
        let prenom = this.state.prenom;
        let classe = this.state.classe;
        let adresse = this.state.adresse;
        let email = this.state.email;
        let telephone = this.state.telephone;
        let naissance = this.state.naissance;

        let listClass = this.state.listClass;
        let infoClass = listClass.filter( (elmt) => {
            if(elmt._id === classe){
                return elmt;
            }
        })
        let type = "modifier"
        let formMod = {id, nom, prenom, naissance, adresse, email, telephone, classe};
        if(id !== undefined){
            this.setState({
                formErrors : { 
                    nom : "",
                    prenom : "",
                    naissance : "",
                    adresse : "",
                    email : "",
                    telephone : "",
                    classe : ""
                },
            });
            let tableTmp = [formMod, infoClass[0]];
            this.props.resultClick(type, tableTmp);
        }else{
            this.setState({
                formValid : false,
                msgError : "Impossible de modifier, il n'existe \n pas veuillez le créer !!!",
            });
        }
    }

    
    //Methode pour supprimer un prof dans la base de donnée
    onClickBtnSupprimer (e){
        e.preventDefault();
        let id = this.state.id;
        let nom = this.state.nom;
        let prenom = this.state.prenom;
        let classe = this.state.classe;
        let adresse = this.state.adresse;
        let email = this.state.email;
        let telephone = this.state.telephone;
        let naissance = this.state.naissance;

        
        let listClass = this.state.listClass;
        //console.log(classe);
        let infoClass = listClass.filter( (elmt) => {
            if(elmt._id === classe){
                return elmt;
            }
        })

        let type = "supprimer"
        let formSupp = {id,nom, prenom, naissance, adresse, email, telephone, classe};

        if(id !== undefined){
            this.setState({
                formErrors : { 
                    nom : "",
                    prenom : "",
                    naissance : "",
                    adresse : "",
                    email : "",
                    telephone : "",
                    classe : ""
                },
            });
            let tableTmp = [formSupp, infoClass[0]]; 
        //console.log(tableTmp);           
            this.props.resultClick(type, tableTmp);
        }else{
            this.setState({
                formValid : false,
                msgError : "Impossible de modifier, il n'existe \n pas veuillez le créer !!!",
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.detail._id !== null){
            this.setState({
                id : nextProps.detail._id,
                nom : nextProps.detail.nom,
                prenom : nextProps.detail.prenom,
                naissance : nextProps.detail.naissance,
                adresse : nextProps.detail.adresse,
                email : nextProps.detail.email,
                telephone : nextProps.detail.telephone,
                classe : nextProps.detail.classe,

                listClass : nextProps.listClass,

                formValid : false,
                msgError : null,
                
                nomValid : true,
                prenomValid : true,
                naissanceValid : true,
                adresseValid : true,
                emailValid : true,
                telephoneValid : true,
                classeValid : true,

                formErrors : { 
                    nom : "",
                    prenom : "",
                    naissance : "",
                    adresse : "",
                    email : "",
                    telephone : "",
                    classe : ""
                },
            });
        }
    }

    render(){
        const titre = this.props.titre;
        const type = this.props.type;
        let listClass = this.props.listClass;
        //console.log(listClass);
        let bouton = null;
        if(listClass === undefined){
            listClass = [];
        }
        if(type === "detail"){
            bouton = 
                    <div className = "form-row padding">
                        <div className="col-md-6 col-sm-6 col-6 padding">
                            <button type = "submit" className="btn btn-info btn-sm btn-block"
                            onClick = {this.onClickBtnModifier.bind(this)} disabled = {!this.state.formValid}>Modifier</button>
                        </div>
                        <div className="col-md-6 col-sm-6 col-6 padding">      
                            <button type = "submit" className="btn btn-danger btn-sm btn-block"
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
        return(
            <div>
                <div className="card-body text-success padding">
                    <div className="form-group paddingNull">
                        <h5 className="card-title padding">{titre+" élèves"} <br />
                            <span className="badge badge-success badge-pill fixe">
                                {this.state.id === "" ? null : "N° : "+this.state.id}
                            </span>
                        </h5>
                    </div>
                    <form className="card-text padding">
                        <div className="form-group fixe">
                            <input className={"form-control form-control-sm"+this.state.formErrors.nom} 
                                value = {this.state.nom === "" ? "": this.state.nom} 
                                name = "nom" type="text" placeholder={"Entrer le nom"} 
                                onChange = {this.onChangeHandler} required/>
                        </div>
                        <div className="form-group fixe">
                            <input className={"form-control form-control-sm"+this.state.formErrors.prenom} 
                                value = {this.state.prenom === "" ? "": this.state.prenom}
                                name = "prenom" type="text" placeholder={"Entrer le prenom"} 
                                onChange = {this.onChangeHandler}/>
                        </div>
                        <div className="form-group fixe">
                            <input className={"form-control form-control-sm"+this.state.formErrors.naissance} 
                                value = {this.state.naissance === "" ? "": this.state.naissance}
                                name = "naissance" type="date" placeholder={"Entrer la date de naissance"}
                                onChange = {this.onChangeHandler} />
                        </div>
                        <div className="form-group fixe">
                            <input className={"form-control form-control-sm"+this.state.formErrors.adresse} 
                                value = {this.state.adresse === "" ? "": this.state.adresse}
                                name = "adresse" type="text" placeholder={"Entrer l'adresse de residence"}
                                onChange = {this.onChangeHandler} />
                        </div>
                        <div className="form-group fixe">
                            <input className={"form-control form-control-sm"+this.state.formErrors.email} 
                                value = {this.state.email === "" ? "": this.state.email}
                                name = "email" type="email" placeholder={"Entrer l'adresse email (unique)"} 
                                onChange = {this.onChangeHandler} />
                        </div>
                        <div className="form-group fixe">
                            <input className={"form-control form-control-sm"+this.state.formErrors.telephone} 
                                value = {this.state.telephone === "" ? "": this.state.telephone}
                                name = "telephone" type="number" placeholder={"Entrer le n° téléphone Ex : 777777777"}
                                onChange = {this.onChangeHandler}/>
                        </div>
                        <div className="form-group fixe">
                            <select className={"custom-select custom-select-sm"+this.state.formErrors.classe} 
                                value = {this.state.classe === "" ? "": this.state.classe}
                                onChange = {this.onChangeHandler} name = "classe" required = {true}>
                                <option value="">Choisiser la classe</option>
                                {
                                    listClass.map( (elmt) => {
                                        return(
                                            <option key = {elmt._id} value={elmt._id}>
                                                {elmt.nom+" ("+elmt.nombre+"/"+elmt.effectif+")"} 
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
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

export default FormEleves;