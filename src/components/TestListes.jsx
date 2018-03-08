import React, {Component} from 'react';

import '../style/page.css';

class TestListes extends Component{
    onClickHandlerElmt(id){
        this.props.idElement(id);
    }
    render(){
        const listAffiche = this.props.listAffiche;
        const elementAffiche = this.props.elementAffiche;
        const idSelectItem = this.props.idSelectItem;
        let colorDefault = this.props.colorAffiche;
        let color = colorDefault;
        let containerAffiche = null;

        if(listAffiche !== undefined && elementAffiche !== undefined){
            if(listAffiche.length <= 0){
                containerAffiche = (
                    <div className="col-md-12 col-sm-12 col-12" >
                        <div className="card border-danger col-md-12 col-sm-12 col-12" >
                            <div className="card-body">
                                <div className="form-group row">
                                    <label className="col-md-12 col-sm-12 col-12 col-form-label text-danger">Aucune occurance, listes vides !!!</label>           
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }else{
                if(elementAffiche.length <= 5){
                    listAffiche.forEach( (elementObjet) => {
                        if(idSelectItem === elementObjet[elementAffiche[0]]){
                            color = "border-danger";
                        }else{
                            color = colorDefault;
                        }
                        containerAffiche = (
                            <div >
                                {containerAffiche}
                                <div className={"col-md-12 col-sm-12 col-12"} key = {elementObjet[elementAffiche[0]]}
                                    onClick = {() => this.onClickHandlerElmt(elementObjet[elementAffiche[0]])}>
                                    <div className={"card mb-3 col-md-12 col-sm-12 col-12 text-center "+color} >
                                        <div className="card-body styleDefault">
                                            <div className="form-group row styleDefaultChild">
                                                <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" value = {elementObjet[elementAffiche[1]]} disabled = {true} />    
                                                <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" value = {elementObjet[elementAffiche[2]]} disabled  = {true} />            
                                            </div>
                                            <div className="form-group row styleDefaultChild">
                                                <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" value = {elementObjet[elementAffiche[3]]} disabled = {true} />    
                                                <input className="form-control-plaintext selectList form-control-sm border-light col-md-6 col-sm-12 col-12" value = {elementObjet[elementAffiche[4]]} disabled  = {true} />            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    });   
                }else{
                    containerAffiche = (
                        <div className="col-md-12 col-sm-12 col-12" >
                            <div className="card border-danger col-md-12 col-sm-12 col-12" >
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label className="col-md-12 col-sm-12 col-12 col-form-label text-danger">Aucune occurance, veuillez vous assurer que l'attribut contenant le tableau est une longueur (4) éléments à afficher  !!!</label>           
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            }
        }else{
            containerAffiche = (
                <div className="col-md-12 col-sm-12 col-12" >
                    <div className="card border-danger col-md-12 col-sm-12 col-12" >
                        <div className="card-body">
                            <div className="form-group row">
                                <label className="col-md-12 col-sm-12 col-12 col-form-label text-danger">Aucune occurance, veuillez renseigner les valeurs des attributs  !!!</label>           
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div >
                {containerAffiche}
            </div>
        )
    }
}

export default TestListes;