import axios from 'axios';

const URL_PROF_API = "http://localhost:9000/ecole/prof/";

export function getProfesseur(){
    var resrequest = {status : false, reponse : []};
    return axios.get(URL_PROF_API) 
        .then(response => {
            console.log(response.data)
            resrequest = {status : true, reponse : response.data};
            return resrequest;
        })
        .catch(error => {
                return resrequest;
                console.log('Erreur lors de la recuperation des données \n', error);
            }
        );
}

export function updProfesseur(id, nom, prenom, naissance, adresse, email, telephone, responsable){
    var resrequest = {status : false};
    axios.put(URL_PROF_API+id, {
            nom : nom,
            prenom : prenom,
            naissance : naissance,
            adresse : adresse,
            email : email,
            telephone : telephone,
            responsable : responsable,
        }) 
        .then(response => {
            console.log((response));
            resrequest = {status : true};
            return resrequest;
           /* NotificationManager.success('Modification des paramètres du professeur '+nom+
                                ' '+prenom+' avec succes', 'Modification des paramètres');
            this.componentWillMount();*/
        })
        .catch(error => {
            console.log('Erreur lors de la recuperation des données', error);
            /*NotificationManager.error('Problème de connexion avec le server. \n '+
                                'Verifiez si vous êtes connectés', 'Erreur de modification');*/
        });
        return resrequest;
}

export function delProfesseur(id){
    var resrequest = {status : false};
    axios.delete(URL_PROF_API+id+'') 
        .then(response => {
            console.log(response);
            resrequest = {status : true};
            return resrequest;
            /*NotificationManager.success('Suppression du professeur '+nom+
                                ' '+prenom+' avec succes', 'Suppression de professeur');
            this.componentWillMount();*/
        })
        .catch(error => {
            console.log('Erreur lors de la recuperation des données \n', error);
            /*NotificationManager.error('Problème de connexion avec le server. \n '+
                                'Verifiez si vous êtes connectés', 'Erreur de suppression');*/
        });
        return resrequest;
}