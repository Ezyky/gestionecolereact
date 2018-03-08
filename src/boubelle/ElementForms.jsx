import React, {Component} from 'react';

const type = {
    P : "professeur",
    C : "classe",
    E : "élève"
}

class FormProfs extends Component {

    constructor(props){
        super(props);
        this.state = {
            //initialisation des valeurs du formulaire
            id : this.props.detail.id,
            nom : this.props.detail.nom,
            prenom : this.props.detail.prenom,
            adresse : this.props.detail.adresse,
            email : this.props.detail.email,
            telephone : this.props.detail.telephone,

            //initalisation du tableau d'erreur pour les valeurs du formulaire
            formErrors : { 
                nom : "",
                prenom : "",
                adresse : "",
                email : "",
                telephone : ""
            },

            /**
             * initialisation des variables de validation à 'false'
             **/
            nomValid : false,
            prenomValid : false,
            adresseValid : false,
            emailValid : false,
            telephoneValid : false,
            
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
        let adresseValid = this.state.adresseValid;
        let emailValid = this.state.emailValid;
        let telephoneValid = this.state.telephoneValid;

        switch(fieldName) {
            case 'nom':
                nomValid = value.length !== 0 ;
                fieldMatchErrors.nom = nomValid ? ' is-valid' : ' is-invalid';
                break;
            case 'prenom':
                prenomValid = value.length !== 0 ;
                fieldMatchErrors.prenom = prenomValid ? ' is-valid' : ' is-invalid';
                break;
            case 'adresse':
                adresseValid = value.length !== 0 ;
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
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldMatchErrors,
                nomValid : nomValid,
                prenomValid : prenomValid,
                adresseValid : adresseValid,
                emailValid: emailValid,
                telephoneValid: telephoneValid
            }
        );
    }

    //Methode pour ajouter un prof dans la base de donnée
    onClickBtnAjouter (e){
        e.preventDefault();
        console.log(
            "Supprimer \n"+
            this.state.id+" "+
            this.state.nom+" "+
            this.state.prenom+" "+
            this.state.adresse+" "+
            this.state.email+" "+
            this.state.telephone
        );
    }

    
    //Methode pour modifier les paramètres un prof dans la base de donnée
    onClickBtnModifier(e){
        e.preventDefault();
        console.log(
            "Modifier \n"+
            this.state.id+" "+
            this.state.nom+" "+
            this.state.prenom+" "+
            this.state.adresse+" "+
            this.state.email+" "+
            this.state.telephone
        );
    }

    
    //Methode pour supprimer un prof dans la base de donnée
    onClickBtnSupprimer (e){
        e.preventDefault();
        console.log(
            "Supprimer \n"+
            this.state.id+" "+
            this.state.nom+" "+
            this.state.prenom+" "+
            this.state.adresse+" "+
            this.state.email+" "+
            this.state.telephone
        );
    }

    render(){
        const titre = this.props.titre;
        const detail = this.props.detail;
        const type = this.props.type;
        let bouton = null;
        if(type === "detail"){
            bouton = <div className="col-auto my-1">
                            <button type = "submit" className="btn btn-info"
                            onClick = {this.onClickBtnModifier.bind(this)} >Modifier</button>
                            <button type = "submit" className="btn btn-danger"
                            onClick = {this.onClickBtnSupprimer.bind(this)}>Supprimer</button>
                        </div>;
        }else{
            bouton = <div className="col-auto my-1">
                            <button type = "submit" className="btn btn-info"
                            onClick = {this.onClickBtnAjouter.bind(this)} >Ajouter</button>
                     </div>;
        }
        return(
            <div>
                <div className="card-header">
                    <h5 className="card-title">{titre+" professeur"} <br />
                        <span className="badge badge-info badge-pill">
                            {detail.id === null ? undefined : "N° : "+detail.id}
                        </span>
                    </h5>
                </div>
                <div className="card-body text-info ">
                    <h5 className="card-title">{null}</h5>
                    <form className="card-text">
                        <div className="form-group">
                            <input className={"form-control"+this.state.formErrors.nom} 
                                value = {detail.id === null ? undefined : detail.nom} 
                                name = "nom" type="text" placeholder={"Entrer " +detail.nom} 
                                onChange = {this.onChangeHandler}/>
                        </div>
                        <div className="form-group">
                            <input className={"form-control"+this.state.formErrors.prenom} 
                                value = {detail.id === null ? undefined : detail.prenom}
                                name = "prenom" type="text" placeholder={"Entrer "+detail.prenom} 
                                onChange = {this.onChangeHandler}/>
                        </div>
                        <div className="form-group">
                            <input className={"form-control"+this.state.formErrors.adresse} 
                                value = {detail.id === null ? undefined : detail.adresse}
                                name = "adresse" type="text" placeholder={"Entrer l'"+detail.adresse+" residence"}
                                onChange = {this.onChangeHandler} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control"+this.state.formErrors.email} 
                                value = {detail.id === null ? undefined : detail.email}
                                name = "email" type="email" placeholder={"Entrer l'adresse "+detail.email} 
                                onChange = {this.onChangeHandler} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control"+this.state.formErrors.telephone} 
                                value = {detail.id === null ? undefined : detail.telephone}
                                name = "telephone" type="number" placeholder={"Entrer numero Ex : "+detail.telephone}
                                onChange = {this.onChangeHandler}/>
                        </div>
                            {bouton}
                    </form>
                </div>
            </div>
        )
    }
}

class ElementForms extends Component {
    elementId(id){
        this.props.idRecupere(id);
    }
    render(){
        const titre = this.props.titre;
        const detail = this.props.detail;
        const type = this.props.type;//details ou ajouter
        let contener = null;

        if(titre === type.P){
            contener = <FormProfs titre = {titre} detail = {detail} type = {type}/>;
        }
        return(
            <div>
                {contener}
            </div>
        )
    }
}

export {ElementForms} ;