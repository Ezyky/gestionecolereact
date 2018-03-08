import React, {Component} from 'react';

import '../style/page.css';
import TestListes from './TestListes';

class Listes extends Component {
    constructor(props) {
        super (props);
        this.state = {
            listes : [],
            searchListes : [],
            inputSearch : "",
            elemtClick : {}
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            listes : nextProps.lists,
        });
    }

    onClickHandler (idElmt){
        const listNew = this.state.listes;
        let elemtClickNew = this.state.elemtClick;
        elemtClickNew = listNew.filter( (elemt) => {
            if(elemt._id === idElmt){
                return listNew[listNew.indexOf(elemt)];
            }
        } )[0];
        this.props.elemtAffiche(elemtClickNew);
    }
    
    filterBar(event){
        let inputbar = this.inputRech.value;
        let tableTmp = this.state.listes;
        tableTmp = tableTmp.filter( (item) => {
            return (item.nom+" "+item.prenom+" "+item.adresse+" "+item.email+" "+item.telephone)
                    .toLowerCase().search(inputbar.toLowerCase()) !== -1;
        });

        this.setState (
            {
                inputSearch : inputbar,
                searchListes : tableTmp
            }
        );
    }

    render(){
        let inputbar = this.state.inputSearch;
        const listAffiche = this.state.listes; 
        const colorAffiche = this.props.colorAffiche;
        const elementAffiche = this.props.elementAffiche;
        const titre = this.props.title;
        const selectItem = this.props.selectItem;
        let affListes = [];
        let titreColor = null;
        if(titre === "professeur"){
            titreColor = "text-info";
        }else if(titre === "classe"){
            titreColor = "text-secondary";
        }else{
            titreColor = "text-success";
        }

        if(inputbar.length === 0){
            affListes = listAffiche;
        }else{
            affListes = this.state.searchListes;
        }
        return(
            <div className = "row">
                <div className="card border-light mb-3 text-center listes">
                    <div className="card-header paddingNul">
                        <div className = "row">
                            <div className = "col-md-6 col-sm-12 col-12">
                                    <input type = "text" className = "form-control form-control-sm"
                                    ref = { (input) => this.inputRech = input} 
                                    onChange = {this.filterBar.bind(this)}
                                    placeholder = "recherche ..." />
                            </div>
                            <br />
                            <div className = "col-md-6 col-sm-12 col-12">
                                    <button type="button" className="btn btn-info btn-block btn-sm" 
                                    data-toggle="modal" data-target="#exampleModal">
                                        Créer
                                    </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body paddingNul">
                        <span className={titreColor}>listes des {titre+"s"}</span>
                        <TestListes listAffiche = {affListes} idElement = {this.onClickHandler.bind(this)}
                                    idSelectItem = {selectItem} elementAffiche = {elementAffiche}
                                    colorAffiche = {colorAffiche}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Listes ;