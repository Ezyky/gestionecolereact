import React, {Component} from 'react';
import '../style/page.css';

import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import Listes from '../components/Listes.jsx';
import Details from '../components/Details.jsx';
import Modals from '../components/Modal.jsx';
import AlertBar from '../components/AlertBar.jsx';

class Eleve extends Component {
    constructor(props){
        super(props);
        this.state = {
            listEleves : [],
            listClasses : [],

            elmtClickEleve : {
                _id : "",
                nom : "",
                prenom : "",
                naissance : "",
                adresse : "",
                email : "",
                telephone : "",
                classe : ""
            },
            elmtAddEleve : {
                _id : "",
                nom : "",
                prenom : "",
                naissance : "",
                adresse : "",
                email : "",
                telephone : "",
                classe : ""
            }
        };
    }

    componentWillMount(){ 
        axios.get('http://localhost:9000/ecole/eleve',) 
            .then(response => {
                var dataNew = response.data;
                var defaultAff = dataNew[dataNew.length - 1];
                if(dataNew.length === 0){
                    dataNew=[];
                    defaultAff = {
                        _id : "",
                        nom : "",
                        prenom : "",
                        naissance : "",
                        adresse : "",
                        email : "",
                        telephone : "",
                        classe : ""
                    };
                }
                this.setState({
                    errorServer : false,
                    listEleves : dataNew,
                    elmtClickEleve : defaultAff,
                    elmtAddEleve : {
                        _id : "",
                        nom : "",
                        prenom : "",
                        naissance : "",
                        adresse : "",
                        email : "",
                        telephone : "",
                        classe : ""
                    }
                });
            })
            .catch(error => {
                console.log('Erreur lors de la recuperation des données \n', error);
                this.setState({
                    errorServer : true
                })
            }
        );

        axios.get('http://localhost:9000/ecole/classe') 
            .then(response => {
                var dataNew = response.data;
                this.setState({
                    listClasses : dataNew
                });
            })
            .catch(error => {
                console.log('Erreur lors de la recuperation des données \n', error);
            }
        );
    }

    detailAffEleve(elemtClickEleveOut){
        this.setState({
            elmtClickEleve : elemtClickEleveOut,
        });
    }

    updateClasse(valuForms, nbre){
        let id = "";
        if(valuForms._id !== undefined){
            id = valuForms._id;
        }else if(valuForms.id !== undefined){
            id = valuForms.id;
        }
        if(parseInt(valuForms.nombre, 10) - parseInt(nbre, 10) < 0){
            valuForms.nombre = String(0);
        }else{
            valuForms.nombre = String(parseInt(valuForms.nombre, 10)-parseInt(nbre, 10))
        }
        axios.put('http://localhost:9000/ecole/classe/'+id, {
            nom : valuForms.nom,
            niveau : valuForms.niveau,
            titulaire : valuForms.titulaire,
            nombre : valuForms.nombre,
            effectif : valuForms.effectif
        }) 
        .then(response => {
            console.log((response));
            NotificationManager.success('Modification des paramètres de la classe '+valuForms.nom+
                                        ' avec succes', 'Modification des paramètres');
            this.componentWillMount();
        })
        .catch(error => {
            console.log('Erreur lors de la recuperation des données', error);
            NotificationManager.error('Problème de connexion avec le server. \n '+
                                'Verifiez que vous êtes connectés', 'Erreur de modification');
        });
    }

    onClickResult(type, valuForms){
        if(type === "supprimer"){
            
            if (window.confirm("Voulez-vous vraiment supprimer les informations de l'élève \n"+
                    valuForms[0].nom+" "+valuForms[0].prenom+" !?")) { 
                axios.delete('http://localhost:9000/ecole/eleve/'+valuForms[0].id+'') 
                .then(response => {
                    console.log(response);
                    NotificationManager.success('Suppression de l\'élève '+valuForms[0].nom+
                        ' '+valuForms.prenom+' avec succes', 'Suppression de l\'élève');
                    this.componentWillMount();
                })
                .catch(error => {
                    console.log('Erreur lors de la recuperation des données \n', error);
                    NotificationManager.error('Problème de connexion avec le server. \n '+
                                        'Verifiez que vous êtes connectés', 'Erreur de suppression');
                });
                    this.updateClasse(valuForms[1],1);
            }
            
        }else{
            let eleve = this.state.elmtClickEleve;
            let listClasses =  this.state.listClasses;
            let valueFromsOld = {};
            let isexist = false;
            let msgexist = "";
            let listEleve = this.state.listEleves;

            listClasses.forEach( (elemt)=> {
                if(elemt._id === eleve.classe){
                    valueFromsOld = elemt;
                }
            });

            listEleve.forEach( (elmt) => {
                if(valuForms[0].email === elmt.email && elmt._id !== valuForms[0].id){
                    isexist = true;
                    msgexist = elmt.nom +" "+elmt.prenom;
                }
            });

            if(!isexist){
                if((parseInt(valuForms[1].nombre, 10)+1)<=parseInt(valuForms[1].effectif, 10)){
                    if (window.confirm("Voulez-vous vraiment modifier les informations de l'élève \n"+
                            valuForms[0].nom+" "+valuForms[0].prenom+" !?")) { 
                        axios.put('http://localhost:9000/ecole/eleve/'+valuForms[0].id, {
                            nom: valuForms[0].nom, 
                            prenom: valuForms[0].prenom,
                            naissance : valuForms[0].naissance,
                            adresse: valuForms[0].adresse, 
                            email: valuForms[0].email, 
                            telephone: valuForms[0].telephone,
                            classe : valuForms[0].classe
                        }) 
                        .then(response => {
                            console.log((response));
                            NotificationManager.success('Modification des paramètres d l\'élève '+valuForms[0].nom+
                                                ' '+valuForms[0].prenom+' avec succes', 'Modification des paramètres');
                            this.componentWillMount();
                        })
                        .catch(error => {
                            console.log('Erreur lors de la recuperation des données', error);
                            NotificationManager.error('Problème de connexion avec le server. \n '+
                                                'Verifiez que vous êtes connectés', 'Erreur de modification');
                        });
                        
                        if((valuForms[0].classe !== eleve.classe)){
                            this.updateClasse(valueFromsOld, +1);
                            this.updateClasse(valuForms[1], -1);
                            
                        }
                    }
                }else{
                    NotificationManager.warning('impossible de modifier car l\'éffectif est inférieur au nombre d\'élèves déjà présent', 'Avertissement');
                }
            }else{
                NotificationManager.warning('impossible de modifier car l\'email existe déjà et est enrégistré sous l\'élève '+msgexist, 'Avertissement');
            }
        }
    }

    onClickAdd(valuForms){
        let isexist = false;
        let msgexist = "";
        let listEleve = this.state.listEleves;
        listEleve.forEach( (elmt) => {
            if(valuForms[0].email === elmt.email){
                isexist = true;
                msgexist = elmt.nom +" "+elmt.prenom;
            }
        });
        if(!isexist){
            axios.post('http://localhost:9000/ecole/eleve', {
                nom: valuForms[0].nom, 
                prenom: valuForms[0].prenom,
                naissance : valuForms[0].naissance,
                adresse: valuForms[0].adresse, 
                email: valuForms[0].email, 
                telephone: valuForms[0].telephone,
                classe : valuForms[0].classe
            }) 
            .then(response => {
                console.log((response));
                NotificationManager.success('Ajout de l\'élève '+valuForms[0].nom+
                                            ' '+valuForms[0].prenom+' avec succes', 'Création d\'élève');
                this.componentWillMount();
            })
            .catch(error => {
                console.log('Erreur lors de la recuperation des données', error);
                        NotificationManager.error('Problème de connexion avec le server. \n '+
                                            'Verifiez que vous êtes connectés', 'Erreur d\'ajout');
            });

            this.updateClasse(valuForms[1],-1);
        }else{
            NotificationManager.warning('impossible d\'ajouter car l\'email existe déjà et est enrégistré sous l\'élève '+msgexist, 'Avertissement');
        }
    }

    render(){
        const list = this.state.listEleves;
        const listClasses = this.state.listClasses;
        const detailElmtEleve = this.state.elmtClickEleve;
        const elementAffiche = ["_id","nom","prenom","naissance","email"];
        const colorAffiche = "border-success";

        const inputName = ["nom", "prenom", "naissance", "adresse", "email", "telephone"];
        const autreName = ["_id","nom","nombre","effectif"]
        const inputType = [{
            nom : "text", 
            prenom : "text", 
            naissance : "date", 
            adresse : "text", 
            email : "email", 
            telephone : "number",
        }];

        let errorMsg = "";
        if(this.state.errorServer){
            errorMsg = <AlertBar onClickUpdate = {()=>this.componentWillMount()} />;
        }
        return(
            <div className="container">
                {errorMsg}
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-6">
                        <span className = ""><h5>Gestion des élèves</h5></span>
                    </div>    
                </div>
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-6">
                        {/** listes */}
                        <Listes title = "eleve" lists = {list} 
                            elemtAffiche = {this.detailAffEleve.bind(this)}
                            elementAffiche = {elementAffiche} 
                            listClass = {listClasses} 
                            selectItem = {detailElmtEleve._id}
                            colorAffiche = {colorAffiche} />
                        
                    </div>
                    
                    <div className="col-md-4 col-sm-6 col-6" id="myScrollspy">   
                        <div className="details">
                                {/** Detail */}
                            <Details name = "élève" type = "detail" border = "border-success"
                                    titleDetail = "Détail de l'" inputValue = {detailElmtEleve} 
                                    resultClick = {this.onClickResult.bind(this)} autreName = {autreName}
                                    autreAffiche = {[{type: "select", name : "classe", value : listClasses}]}
                                    inputName = {inputName} inputType = {inputType} />
                            
                        </div>
                    </div>

                        {/* Modal 
                            titre = "eleve" value = {this.state.elmtAddEleve} 
                                result = {this.onClickAdd.bind(this)}
                                listClass = {listClasses}
                        */}
                        <Modals name = "élève" type = "ajout" border = "border-success"
                                    titleDetail = "Ajout de l'" inputValue = {this.state.elmtAddEleve} 
                                    resultClick = {this.onClickAdd.bind(this) } autreName = {autreName}
                                    autreAffiche = {[{type: "select", name : "classe", value : listClasses}]}
                                    inputName = {inputName} inputType = {inputType}
                        />
                        
                </div>
                <NotificationContainer/>
            </div>

        )
    }
}

export default Eleve;