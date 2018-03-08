import React, {Component} from 'react';

import '../style/page.css';

const type = {
    P : "professeur",
    C : "classe",
    E : "élève"
}

class ListesProfs extends Component{
    onClickHandlerElmt(id){
        this.props.idElement(id);
    }
    render(){
        const list = this.props.list;
        const idSelectItem = this.props.selectItem;
        let color = "";
        let nulDisplay = null;
        if(list.length <= 0){
            nulDisplay = (
                <div className="col-md-12 col-sm-12 col-12" >
                    <div className="card border-danger col-md-12 col-sm-12 col-12" >
                        <div className="card-body">
                            <div className="form-group row">
                                <label className="col-md-12 col-sm-12 col-12 col-form-label text-danger">Aucune occurance, listes vides !!!</label>           
                            </div>
                        </div>
                    </div>
                </div>);
        }
        return (
            <div className="row">

                    {list.map( (elprof) => {  
                        if(idSelectItem === elprof._id){
                            color = "border-danger";
                        }else{
                            color = "border-info";
                        }                      
                        return(
                            <div className={"col-md-12 col-sm-12 col-12"} key = {elprof._id}
                                    onClick = {() => this.onClickHandlerElmt(elprof._id)}>
                                <div className={"card mb-3 col-md-12 col-sm-12 col-12 text-center "+color} >
                                    <div className="card-body styleDefault">
                                        <div className="form-group row styleDefaultChild">
                                            <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" value = {elprof.nom} disabled = {true} />    
                                            <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" value = {elprof.prenom} disabled  = {true} />            
                                        </div>
                                        <div className="form-group row styleDefaultChild">
                                            <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" value = {elprof.email} disabled = {true} />    
                                            <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" value = {elprof.telephone} disabled  = {true} />            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } )}
                    {nulDisplay}
            </div>
        )
    }
}

class ListesClasses extends Component{
    onClickHandlerElmt(id){
        this.props.idElement(id);
    }
    render(){
        const list = this.props.list;
        const listProf = this.props.listProf;
        const idSelectItem = this.props.selectItem;
        let color = "";
        
        let titulaire = "néant";
        let nulDisplay = null;
        if(list.length <= 0){
            nulDisplay = (
                <div className="col-md-12 col-sm-12 col-12" >
                    <div className="card border-danger col-md-12 col-sm-12 col-12" >
                        <div className="card-body">
                            <div className="form-group row">
                                <label className="col-md-12 col-sm-12 col-12 col-form-label text-danger">Aucune occurance, listes vides !!!</label>           
                            </div>
                        </div>
                    </div>
                </div>);
        }
        return (
            <div className="row">
                    {list.map( (elClass) => {   
                        if(idSelectItem === elClass._id){
                            color = "border-danger";
                        }else{
                            color = "border-Secondary";
                        }                     
                        return(
                            <div className="col-md-12 col-sm-12 col-12" key = {elClass._id}
                                    onClick = {() => this.onClickHandlerElmt(elClass._id)}>
                                <div className={"card mb-3 col-md-12 col-sm-12 col-12 text-center "+color} >
                                    <div className="card-body styleDefault">
                                        <div className="form-group row styleDefaultChild">
                                            <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" 
                                                value = {elClass.nom} disabled = {true} />    
                                            <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" 
                                                value = {elClass.niveau} disabled  = {true} />            
                                        </div>
                                        <div className="form-group row styleDefaultChild">
                                            {listProf.filter( (elfilter) =>{
                                                if(elfilter._id === elClass.titulaire){
                                                    titulaire = elfilter.nom +" "+elfilter.prenom;
                                                }
                                            })}
                                            <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" 
                                                value = {titulaire} disabled = {true} />    
                                            <input className="form-control-plaintext selectList border-light col-md-6 col-sm-12 col-12" 
                                                value = {elClass.effectif} disabled  = {true} />            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } )}
                    {nulDisplay}
            </div>
        )
    }
}



class ListesEleves extends Component{
    onClickHandlerElmt(id){
        this.props.idElement(id);
    }
    render(){
        const list = this.props.list;
        const idSelectItem = this.props.selectItem;
        let color = "";

        let nulDisplay = null;
        if(list.length <= 0){
            nulDisplay = (
                <div className="col-md-12 col-sm-12 col-12" >
                    <div className="card border-danger col-md-12 col-sm-12 col-12" >
                        <div className="card-body">
                            <div className="form-group row">
                                <label className="col-md-12 col-sm-12 col-12 col-form-label text-danger">Aucun occurance, listes vides !!!</label>           
                            </div>
                        </div>
                    </div>
                </div>);
        }
        return (
            <div className="row">
                    {list.map( (eleleve) => {      
                        if(idSelectItem === eleleve._id){
                            color = "border-danger";
                        }else{
                            color = "border-success";
                        }                   
                        return(
                            <div className="col-md-12 col-sm-12 col-12 selectList" key = {eleleve._id}
                                    onClick = {() => this.onClickHandlerElmt(eleleve._id)}>
                                <div className={"card mb-3 col-md-12 col-sm-12 col-12 text-center "+color} >
                                    <div className="card-body styleDefault">
                                        <div className="form-group row styleDefaultChild">
                                            <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" 
                                                value = {eleleve.nom} disabled = {true} />    
                                            <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" 
                                                value = {eleleve.prenom} disabled  = {true} />            
                                        </div>
                                        <div className="form-group row styleDefaultChild">
                                            <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" 
                                                value = {eleleve.naissance} disabled = {true} />    
                                            <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" 
                                                value = {eleleve.email} disabled  = {true} />            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } )}
                    {nulDisplay}
            </div>
        )
    }
}


class ElementListe extends Component {
    elementId(id){
        this.props.idRecupere(id);
    }
    render(){
        const titre = this.props.titre;
        const list = this.props.listElement;
        const listProf = this.props.listProf;
        const selectItem = this.props.selectItem;
        let contener = null;
        if(titre === type.P){
            contener = <ListesProfs list = {list} 
                            idElement = {this.elementId.bind(this)} 
                            selectItem = {selectItem}/>;
        }else if (titre === type.C){
            contener = <ListesClasses list = {list}  
                            idElement = {this.elementId.bind(this)} 
                            listProf = {listProf}
                            selectItem = {selectItem}/>;
        }else{
            contener = <ListesEleves list = {list}  
                            idElement = {this.elementId.bind(this)} 
                            selectItem = {selectItem}/>;
        }
        return (
            <div>
                {contener}
            </div>
        )
    }
}

export default ElementListe ;