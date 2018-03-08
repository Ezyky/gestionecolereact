import React, {Component} from 'react';

import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import '../style/page.css';

import Listes from '../components/Listes.jsx';
import Details from '../components/Details.jsx';
import Modals from '../components/Modal.jsx';
import AlertBar from '../components/AlertBar.jsx';

import * as apiProf from '../api-app/api-prof';


class Professeur extends Component {
    constructor(props){
        super(props);
        this.state = {
            listProf : [],
            elmtClickProf : {
                _id : "",
                nom : "",
                prenom : "",
                naissance : "",
                adresse : "",
                email : "",
                telephone : "",
                responsable : "",
            },
            elmtAddProf : {
                _id : "",
                nom : "",
                prenom : "",
                naissance : "",
                adresse : "",
                email : "",
                telephone : "",
                responsable : "",
            }
        };
    }

    componentWillMount(){
        apiProf.getProfesseur().then( (reponse) =>{
            console.log(reponse)
            }
        );
        
        
        axios.get('http://localhost:9000/ecole/prof/') 
            .then(response => {
                var dataNew = response.data;
                var defaultAff = dataNew[dataNew.length-1];
                if(dataNew.length === 0){
                    dataNew = [];
                    defaultAff = {
                        _id : "",
                        nom : "",
                        prenom : "",
                        naissance : "",
                        adresse : "",
                        email : "",
                        telephone : "",
                        responsable : "",
                    };
                }
                this.setState({
                    errorServer : false,
                    listProf : dataNew,
                    elmtClickProf : defaultAff,
                    elmtAddProf : {
                        _id : "",
                        nom : "",
                        prenom : "",
                        naissance : "",
                        adresse : "",
                        email : "",
                        telephone : "",
                        responsable : "",
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
        
    }

    detailAffProf(elemtClickProfOut){
        this.setState({
            elmtClickProf : elemtClickProfOut,
        });
    }

    onClickResult(type, valuForms){ 
        let isexist = false;
        let msgexist = "";
        let listProf = this.state.listProf;
        listProf.map( (elmt) => {
            if(elmt.email === valuForms.email && elmt._id !== valuForms.id){
                isexist = true;
                msgexist = elmt.nom +" "+elmt.prenom;
            }
        });
        if(type === "supprimer"){
            if(valuForms.responsable !== "1"){
                if (window.confirm("Voulez-vous vraiment supprimer les informations du professeur \n"+
                    valuForms.nom+" "+valuForms.prenom+" !?")) { 
                    axios.delete('http://localhost:9000/ecole/prof/'+valuForms.id+'') 
                    .then(response => {
                        console.log(response);
                        NotificationManager.success('Suppression du professeur '+valuForms.nom+
                                            ' '+valuForms.prenom+' avec succes', 'Suppression de professeur');
                        this.componentWillMount();
                    })
                    .catch(error => {
                        console.log('Erreur lors de la recuperation des données \n', error);
                        NotificationManager.error('Problème de connexion avec le server. \n '+
                                            'Verifiez si vous êtes connectés', 'Erreur de suppression');
                    });
                }
            }else{
                NotificationManager.warning('impossible de supprimer car il est titulaire d\'une classe', 'Erreur de suppression');
            }
        }else{
            if(!isexist){
                if (window.confirm("Voulez-vous vraiment modifier les informations du professeur \n"+
                        valuForms.nom+" "+valuForms.prenom+" !?")) { 
                    axios.put('http://localhost:9000/ecole/prof/'+valuForms.id, {
                        nom : valuForms.nom,
                        prenom : valuForms.prenom,
                        naissance : valuForms.naissance,
                        adresse : valuForms.adresse,
                        email : valuForms.email,
                        telephone : valuForms.telephone,
                        responsable : valuForms.responsable,
                    }) 
                    .then(response => {
                        console.log((response));
                        NotificationManager.success('Modification des paramètres du professeur '+valuForms.nom+
                                            ' '+valuForms.prenom+' avec succes', 'Modification des paramètres');
                        this.componentWillMount();
                    })
                    .catch(error => {
                        console.log('Erreur lors de la recuperation des données', error);
                        NotificationManager.error('Problème de connexion avec le server. \n '+
                                            'Verifiez si vous êtes connectés', 'Erreur de modification');
                    });
                }
            }else{
                NotificationManager.warning('impossible d\'ajouter car l\'email existe déjà et est enrégistré sous le prof '+msgexist, 'Avertissement');
            }
        }
    }

    onClickAdd(valuForms){
        let isexist = false;
        let msgexist = "";
        let listProf = this.state.listProf;
        listProf.map( (elmt) => {
            if(elmt.email === valuForms.email){
                isexist = true;
                msgexist = elmt.nom +" "+elmt.prenom;
            }
        });

        if(!isexist){
            axios.post('http://localhost:9000/ecole/prof', {
                    nom : valuForms.nom,
                    prenom : valuForms.prenom,
                    naissance : valuForms.naissance,
                    adresse : valuForms.adresse,
                    email : valuForms.email,
                    telephone : valuForms.telephone,
                    responsable : "0"
            }) 
            .then(response => {
                console.log((response));
                NotificationManager.success('Ajout du professeur '+valuForms.nom+
                                            ' '+valuForms.prenom+' avec succes', 'Création de professeur');
                this.componentWillMount();
            })
            .catch(error => {
                console.log('Erreur lors de la récupération des données', error);
                NotificationManager.error('Problème de connexion avec le server. \n '+
                                    'Verifiez si vous êtes connectés', 'Erreur d\'enregistrement');
            });
        }else{
            NotificationManager.warning('impossible d\'ajouter car l\'email existe déjà et est enrégistré sous le prof '+msgexist, 'Avertissement');
        }
    }

    render(){
        const listProf = this.state.listProf;
        const detailElmtProf = this.state.elmtClickProf;
        const elementAffiche = ["_id","nom","prenom","email","telephone"];
        const colorAffiche = "border-info";

        const inputName = ["nom", "prenom", "naissance", "adresse", "email", "telephone"];
        const inputType = [{
            nom : "text", 
            prenom : "text", 
            naissance : "date", 
            adresse : "text", 
            email : "email", 
            telephone : "number"}];
        let errorMsg = "";
        if(this.state.errorServer){
            errorMsg = <AlertBar onClickUpdate = {()=>this.componentWillMount()} />;
        }
        return(
            <div className="container">
                {errorMsg}
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-6">
                        <span className = ""><h5>Gestion des professeurs</h5></span>
                    </div>    
                </div>
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-6">
                        {/** listes */}
                        <Listes title = "professeur" lists = {listProf}
                                colorAffiche = {colorAffiche}
                                elementAffiche = {elementAffiche}
                                elemtAffiche = {this.detailAffProf.bind(this)} 
                                selectItem = {detailElmtProf._id}/>
                        
                    </div>
                    
                    <div className="col-md-4 col-sm-6 col-6" id="myScrollspy">   
                        <div className="details">
                                {/** Detail */ }
                            <Details name = "professeur" type = "detail" border = "border-info"
                                    titleDetail = "Détail du " inputValue = {detailElmtProf} 
                                    resultClick = {this.onClickResult.bind(this)}
                                    inputName = {inputName} inputType = {inputType}/>
                            
                        </div>
                    </div>

                        {/* Modal */}
                        <Modals name = "professeur" type = "ajout" border = "border-info"
                                    titleDetail = "Ajout de " inputValue = {this.state.elmtAddProf} 
                                    resultClick = {this.onClickAdd.bind(this)}
                                    inputName = {inputName} inputType = {inputType}
                        />
                        
                </div>
                
                    <NotificationContainer/>
            </div>

        )
    }
}

export default Professeur;