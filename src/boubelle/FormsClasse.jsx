import React, {Component} from 'react';

class FormClasse extends Component {

    constructor(props){
        super(props);
        this.state = {
            //initialisation des valeurs du formulaire
            id : "",
            nom : "",
            niveau : "",
            titulaire : "",
            nombre : "",
            effectif : "",

            fieldError : {
                effectif : ""
            },
            //initalisation du tableau d'erreur pour les valeurs du formulaire
            formErrors : { 
                nom : "",
                niveau : "",
                titulaire : "",
                effectif : ""
            },
            
            formValid : false,
            msgError : null,

            /**
             * initialisation des variables de validation à 'false'
             **/
            nomValid : false,
            niveauValid : false,
            titulaireValid : false,
            effectifValid : false,
            
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
            () => { this.matchField(name, value, false)}
        );
    }

    //Methode permettant de verifier les champs renseigner
    matchField(fieldName, value, deplace) {
        let fieldMatchErrors = this.state.formErrors;
        let nomValid = this.state.nomValid;
        let niveauValid = this.state.niveauValid;
        let titulaireValid = this.state.titulaireValid;
        let nombreValid = this.state.nombreValid;
        let effectifValid = this.state.effectifValid;
        let nbr = 0;

        switch(fieldName) {
            case 'nom':
                nomValid = (/^[a-zA-Z0-9_-]/).test(value) ;
                fieldMatchErrors.nom = nomValid ? ' is-valid' : ' is-invalid';
                break;
            case 'niveau':
                niveauValid =(/^[a-zA-Z0-9_-]/).test(value) ;
                fieldMatchErrors.niveau = niveauValid ? ' is-valid' : ' is-invalid';
                break;

            case 'titulaire':
                titulaireValid = value.length !== 0 ;
                fieldMatchErrors.titulaire = titulaireValid ? ' is-valid' : ' is-invalid';
                break;
            case 'effectif':
                effectifValid = (/^[0-9][0-9]$/).test(value);
                nbr = value;
                fieldMatchErrors.effectif = effectifValid ? ' is-valid': ' is-invalid';
                break;
            default:
                break;
        }
        var tmp = 0; var errorType = "";
        if( fieldMatchErrors.effectif === " is-valid"){
            if(parseInt(nbr,10)<parseInt(this.state.nombre,10)){
                errorType = "effectif"
                fieldMatchErrors.effectif = " is-invalid";
                tmp++;
            }else if(20<parseInt(nbr, 10) || parseInt(nbr, 10)<18){
                console.log()
                errorType = "nombre"
                fieldMatchErrors.effectif = " is-invalid";
                tmp++;
            }
        }

        console.log(nomValid +" "+niveauValid+ " "+ titulaireValid+" "+effectifValid);
        const resultError = this.formValidHandler(nomValid, niveauValid, titulaireValid, effectifValid);
        //mise à jour de variable
        if(tmp === 1){
            if(errorType === "effectif"){
                effectifValid = !effectifValid;
                resultError.status = false;
                resultError.message = "Nombre élève dépasse l'éffectif de la classe";
            }else if(errorType === "nombre"){
                effectifValid = !effectifValid;
                resultError.status = false;
                resultError.message = "L'éffectif de la classe doit être inferieur 20 élèves et supérieur à 18 élèves";
            }
        }
        this.setState(
            {
                formErrors: fieldMatchErrors,
                nomValid : nomValid,
                niveauValid : niveauValid,
                titulaireValid : titulaireValid,
                effectifValid : effectifValid,

                formValid : resultError.status,
                msgError : resultError.message,
            }
        );
    }

    //methode verifie si tout les champs sont valides pour retour de message d'erreur
    formValidHandler (nom, niveau, titulaire, effectif){
        let result = {
            status : true,
            message : null,
        }
        if(!(nom && niveau && titulaire && effectif)){
            result.status = false;
            result.message = "Veuillez bien renseigner tous les paramètres";
            if(nom === false && niveau === true && titulaire === true && effectif === true ){
                result.status = false;
                result.message = "Veuillez bien renseigner la valeur du paramètre NOM. ";
            }else if(nom === true && niveau === false && titulaire === true && effectif === true ){
                result.status = false;
                result.message = "Veuillez bien renseigner la valeur du paramètre NIVEAU.";
            }else if(nom === true && niveau === true && titulaire === false && effectif === true ){
                result.status = false;
                result.message = "Veuillez bien renseigner la valeur du paramètre TITULAIRE.";
            }else if(nom === true && niveau === true && titulaire === true && effectif === false ){
                result.status = false;
                result.message = "La valeur du paramètre EFFECTIF pas valide.";
            }
            return result;
        }
        return result;
    }

    //Methode pour ajouter un prof dans la base de donnée
    onClickBtnAjouter (e){
        e.preventDefault();
        let nom = this.state.nom;
        let niveau = this.state.niveau;
        let titulaire = this.state.titulaire;
        let effectif = this.state.effectif;
        let listProf = this.state.listProf;

        let infoProf = listProf.filter( (elmt) => {
            if(elmt._id === titulaire){
                return elmt;
            }
        })

        let tableTmp = {
            nom,
            niveau,
            titulaire,
            effectif
        };
        if(nom === "" || niveau === "" || titulaire === "" || effectif === ""){
            this.setState({
                formValid : false,
                msgError : "Veuillez tout les champs!!!",
            })
        }else{
            this.setState({
                formErrors : { 
                    nom : "",
                    niveau : "",
                    titulaire : "",
                    effectif : ""
                },
            });
            let table = [tableTmp, infoProf[0]];
            this.props.resultClick(table);
        }
    }

    
    //Methode pour modifier les paramètres un prof dans la base de donnée
    onClickBtnModifier(e){
        e.preventDefault();
        let id = this.state.id;
        let nom = this.state.nom;
        let niveau = this.state.niveau;
        let titulaire = this.state.titulaire;
        let nombre = this.state.nombre;
        let effectif = this.state.effectif;
        let listProf = this.state.listProf;

        let infoProf = listProf.filter( (elmt) => {
            if(elmt._id === titulaire){
                return elmt;
            }
        });
        let type = "modifier"
        let tableTmp = {
            id,
            nom,
            niveau,
            titulaire,
            nombre,
            effectif
        };

        if(id !== ""){
            this.setState({
                formErrors : { 
                    nom : "",
                    niveau : "",
                    titulaire : "",
                    nombre : "",
                    effectif : ""
                },
            });
            let table = [tableTmp, infoProf[0]];
            this.props.resultClick(type, table);
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
        let niveau = this.state.niveau;
        let titulaire = this.state.titulaire;
        let effectif = this.state.effectif;
        let nombre = this.state.nombre;
        let listProf = this.state.listProf;
        let type = "supprimer"
        let tableTmp = {
            id,
            nom,
            niveau,
            nombre,
            titulaire,
            effectif
        };
console.log(listProf);
        let infoProf = listProf.filter( (elmt) => {
            if(elmt._id === titulaire){
                return elmt;
            }
        })

        if(id !== ""){
            this.setState({
                formErrors : { 
                    nom : "",
                    niveau : "",
                    titulaire : "",
                    effectif : ""
                },
            });
            let table = [tableTmp, infoProf[0]]
            this.props.resultClick(type, table);
        }else{
            this.setState({
                formValid : false,
                msgError : "Impossible de supprimer, veuillez le créer !!!",
            });
        }
    }

    // methode invoquer lorsque fromsClasse recevra un nouveau props
    componentWillReceiveProps(nextProps){
        if(nextProps.detail._id !== null){
            this.setState({
                id : nextProps.detail._id,
                nom : nextProps.detail.nom,
                niveau : nextProps.detail.niveau,
                titulaire : nextProps.detail.titulaire,
                nombre : nextProps.detail.nombre,
                effectif : nextProps.detail.effectif,

                listProf : nextProps.listProf,

                formValid : false,
                msgError : null,

                nomValid : true,
                niveauValid : true,
                titulaireValid : true,
                effectifValid : true,

                formErrors : { 
                    nom : "",
                    niveau : "",
                    titulaire : "",
                    effectif : ""
                },
            });
        }
    }

    render(){
        const titre = this.props.titre;
        const type = this.props.type;
        let listProf = this.props.listProf;
        let bouton = null;
        let plus = "";
        if(listProf === undefined){
            listProf = [];
        }

        if(parseInt(this.state.nombre, 10)>1){
            plus = "s";
        }
        
        if(type === "detail"){
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
        return(
            <div>
                <div className="card-body text-secondary padding">
                    <div className="form-group paddingNul">
                        <h5 className="card-title padding">{titre+" la classe"} <br />
                            <span className="badge badge-secondary badge-pill fixe">
                                {this.state.id === "" ? null : "N° : "+this.state.id}
                            </span> <br />
                            <span className="badge badge-secondary badge-pill fixe">
                                {this.state.id === "" ? null : this.state.nombre+" élève"+plus}
                            </span>
                        </h5>
                    </div>
                    <form className="card-text padding">
                        <div className="form-group fixe">
                            <input className={"form-control form-control-sm"+this.state.formErrors.nom} 
                                value = {this.state.nom === "" ? "" : this.state.nom} 
                                name = "nom" type="text" placeholder={"Entrer le nom (unique)"} 
                                onChange = {this.onChangeHandler} required/>
                        </div>
                        <div className="form-group fixe">
                            <input className={"form-control form-control-sm"+this.state.formErrors.niveau} 
                                value = {this.state.niveau === "" ? "" : this.state.niveau}
                                name = "niveau" type="text" placeholder={"Entrer le niveau"} 
                                onChange = {this.onChangeHandler}/>
                        </div>
                        <div className="form-group fixe">
                            <select className={"custom-select custom-select-sm"+this.state.formErrors.titulaire} 
                                value = {this.state.titulaire === "" ? "" : this.state.titulaire}
                                onChange = {this.onChangeHandler} name = "titulaire" required = {true}>
                                <option value="">{"Choisiser le titulaire"}</option>
                                {/*'<option value="neant">néant</option>'*/}
                                {listProf.map( (profs) => {
                                        return(
                                            <div>
                                            <option key = {profs._id} value={profs._id}>{profs.nom +" "+profs.prenom}</option>
                                        </div>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group fixe">
                            <input className={"form-control form-control-sm"+this.state.formErrors.effectif} 
                                value = {this.state.effectif === "" ? "" : this.state.effectif}
                                name = "effectif" type="number" placeholder={"Entrer l'éffectif Ex : 10"}
                                onChange = {this.onChangeHandler}/>
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

export default FormClasse;