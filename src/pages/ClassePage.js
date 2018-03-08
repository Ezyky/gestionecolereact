import React, {Component} from 'react';
import '../style/page.css';

import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import Listes from '../components/Listes.jsx';
import Details from '../components/Details.jsx';
import Modals from '../components/Modal.jsx';
import AlertBar from '../components/AlertBar.jsx';

class Classe extends Component {
    constructor(props){
        super(props);
        this.state = {
            listClasses : [],
            listProf : [],
            elmtClickClasse : {
                _id : "",
                nom : "",
                niveau : "",
                titulaire : "",
                nombre : "",
                effectif : ""
            },
            elmtAddClasse : {
                _id : "",
                nom : "",
                niveau : "",
                titulaire : "",
                effectif : ""
            }
        };
    }


    componentWillMount(){
        axios.get('http://localhost:9000/ecole/classe') 
            .then(response => {
                var dataNew = response.data;
                var defaultAff = dataNew[dataNew.length-1];
                if(dataNew.length === 0){
                    dataNew = [];
                    defaultAff = {
                        _id : "",
                        nom : "",
                        niveau : "",
                        titulaire : "",
                        nombre : "",
                        effectif : ""
                    }
                }
                this.setState({
                    errorServer : false,
                    listClasses : dataNew,
                    elmtClickClasse : defaultAff,
                    elmtAddClasse : {
                        _id : "",
                        nom : "",
                        niveau : "",
                        titulaire : "",
                        nombre : "",
                        effectif : ""
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

        /* A deplacer */
        axios.get('http://localhost:9000/ecole/prof') 
            .then(response => {
                var dataNew = response.data;
                console.log(response.data);
                this.setState({
                    listProf : dataNew,
                });
            })
            .catch(error => {
                console.log('Erreur lors de la recuperation des données \n', error);
            }
        );
    }

    detailAffClasse(elemtClickClassOut){
        this.setState({
            elmtClickClasse : elemtClickClassOut,
        });
    }

    updateClasse(valuForms){
        let id = "";
        if(valuForms._id !== undefined){
            id = valuForms._id;
        }else if(valuForms.id !== undefined){
            id = valuForms.id;
        }
        if (window.confirm("Voulez-vous vraiment modifier les informations de la classe \n"+
                        valuForms.nom+" !?")) { 
                            /* A deplacer */
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
    }

    updateProf(valuForms, res){
        let id = "";
        res = String(res);
        if(valuForms._id !== undefined){
            id = valuForms._id;
        }else if(valuForms.id !== undefined){
            id = valuForms.id;
        }
        /* A deplacer */
        axios.put('http://localhost:9000/ecole/prof/'+id, {
            nom : valuForms.nom,
            prenom : valuForms.prenom,
            adresse : valuForms.adresse,
            email : valuForms.email,
            telephone : valuForms.telephone,
            responsable : res,
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

    onClickResult(type, valuForms){
        if(type === "supprimer"){ 
            if(parseInt(valuForms[0].nombre, 10) === parseInt(0, 10)){
                if (window.confirm("Voulez-vous vraiment supprimer les informations de la classe \n"+
                        valuForms[0].nom+" !?")) { 
                            /* A deplacer */
                    axios.delete('http://localhost:9000/ecole/classe/'+valuForms[0].id+'') 
                    .then(response => {
                        console.log(response);
                        NotificationManager.success('Suppression de la classe '+valuForms[0].nom+
                                                ' avec succes', 'Suppression de classe');
                        this.componentWillMount();
                    })
                    .catch(error => {
                        console.log('Erreur lors de la recuperation des données \n', error);
                        NotificationManager.error('Problème de connexion avec le server. \n '+
                                            'Verifiez que vous êtes connectés', 'Erreur de suppression');
                    });
                        this.updateProf(valuForms[1], parseInt(0, 10));
                }
            }else{
                NotificationManager.warning('impossible de supprimer car la classe '+valuForms[0].nom+' contient des élèves', 'Avertissement');
            }
        }else{
            let exist = false;
            let niveauExist = "";
            let listClasses = this.state.listClasses;
            //Objet classes initiale qui contient l'élément cliquer
            let classe = this.state.elmtClickClasse;
            //liste des prof initiale
            let listProf =  this.state.listProf;
            //Objet contenant un objet (initiale, avant tout mofication) de la liste prof
            let valueProfOld = {};
            listProf.forEach( (elemt)=> {
                if(elemt._id === classe.titulaire){
                    valueProfOld = elemt;
                }
            });

            listClasses.forEach( (elemt) => {
                if(valuForms[0].nom === elemt.nom && elemt._id !== valuForms[0].id){
                    exist = true;
                    niveauExist = elemt.niveau;
                }
            });
            
            if(!exist){
                //comparaison de l'éffectif renseigner avec le nombre initiale de l'objet
                if(parseInt(valuForms[0].effectif,10) >= parseInt(classe.nombre,10)){
                    if((valuForms[0].titulaire !== classe.titulaire)){
                            if((parseInt(valueProfOld.responsable, 10) === parseInt(1, 10)) && (parseInt(valuForms[1].responsable,10) === parseInt(0, 10))){
                                this.updateClasse(valuForms[0]);
                                this.updateProf(valueProfOld, parseInt(0, 10));
                                this.updateProf(valuForms[1], parseInt(1, 10));
                            }else{
                                NotificationManager.warning('impossible de modifier car le prof '+valuForms[1].nom+' est déjà titulaire d\'une classe', 'Avertissement'); 
                            }
                    }else{
                        this.updateClasse(valuForms[0]);
                        this.componentWillMount();
                    }
                }else{
                    NotificationManager.warning('impossible de modifier car l\'éffectif est inférieur au nombre d\'élèves déjà présent en '+valuForms[0].nom, 'Avertissement');
                } 
            }else{
                NotificationManager.warning('impossible de modifier car cette classe existe déjà et présent dans le niveau de formation '+niveauExist+
                                            ' le nom de la classe doit être unique ', 'Avertissement');            
            }  
        }
    }

    onClickAdd(valuForms){
        let exist = false;
        let niveauExist = "";
        let listClasses = this.state.listClasses;
        listClasses.forEach( (elemt) => {
            if(valuForms[0].nom === elemt.nom){
                exist = true;
                niveauExist = elemt.niveau;
            }
        });
        if(!exist){
            if(parseInt(valuForms[1].responsable, 10) === parseInt(0, 10)){
                /* A deplacer */
                axios.post('http://localhost:9000/ecole/classe', {
                        nom : valuForms[0].nom,
                        niveau : valuForms[0].niveau,
                        titulaire : valuForms[0].titulaire,
                        nombre : "0",
                        effectif : valuForms[0].effectif
                }) 
                .then(response => {
                    console.log((response));
                    NotificationManager.success('Ajout de la classe '+valuForms.nom+' avec succes', 'Création de classe');
                    this.componentWillMount();
                })
                .catch(error => {
                    console.log('Erreur lors de la recuperation des données', error);
                    NotificationManager.error('Problème de connexion avec le server. \n '+
                                        'Verifiez que vous êtes connectés', 'Erreur d\'ajout');
                }); 
                this.updateProf(valuForms[1], "1");
            }else{
                NotificationManager.warning('impossible d\'ajouter car le prof '+valuForms[1].nom+' est titulaire d\'une classe ', 'Avertissement');
            }
        }else{
            NotificationManager.warning('impossible d\'ajouter car cette classe existe déjà et présent dans le niveau de formation '+niveauExist+
                                        ' le nom de la classe doit être unique ', 'Avertissement');            
        }
    }

    render(){
        const listClasse = this.state.listClasses;
        const listProf = this.state.listProf;
        const detailElmtClasse = this.state.elmtClickClasse;

        const elementAffiche = ["_id","nom","niveau","titulaire","effectif"];
        const colorAffiche = "border-secondary";

        const inputName = ["nom", "niveau", "effectif"];
        const autreName = ["_id", "nom", "prenom"];
        const inputType = [{
            nom : "text", 
            niveau : "text", 
            effectif : "number", 
            adresse : "text"
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
                        <span className = ""><h5>Gestion des classes</h5></span>
                    </div>    
                </div>
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-6">
                        {/** listes */}
                        <Listes title = "classe" lists = {listClasse} 
                                elementAffiche = {elementAffiche}
                                elemtAffiche = {this.detailAffClasse.bind(this)} 
                                listProf = {this.state.listProf} 
                                selectItem = {detailElmtClasse._id}
                                colorAffiche = {colorAffiche} />
                        
                    </div>
                    
                    <div className="col-md-4 col-sm-6 col-6" id="myScrollspy">   
                        <div className="details">
                                {/** Detail */ }
                            <Details name = "classe" type = "detail" border = "border-secondary"
                                    titleDetail = "Détail sur "  inputValue = {detailElmtClasse} 
                                    resultClick = {this.onClickResult.bind(this)} autreName = {autreName}
                                    autreAffiche = {[{type: "select", name : "titulaire", value : listProf}]}
                                    inputName = {inputName} inputType = {inputType} />
                            
                        </div>
                    </div>

                        {/* Modal 
                            titre = "classe" value = {this.state.elmtAddClasse} 
                                result = {this.onClickAdd.bind(this)} 
                                listProf = {this.state.listProf}
                        */}
                        <Modals name = "classe" type = "ajout" border = "border-secondary"
                                    titleDetail = "Ajout de "  inputValue = {this.state.elmtAddClasse} 
                                    resultClick = {this.onClickAdd.bind(this)} autreName = {autreName}
                                    autreAffiche = {[{type: "select", name : "titulaire", value : listProf}]}
                                    inputName = {inputName} inputType = {inputType}
                        />
                        
                </div>

                <NotificationContainer/>
            </div>

        )
    }
}

export default Classe;