import React, {Component} from 'react';

import TestForm from './TestForms';

class Modals extends Component {
    resultClickBtn (valuFroms){
        this.props.resultClick(valuFroms);
    }

    resultEleveModal (valuFroms){
        this.props.result(valuFroms);
    }

    render(){
        const name = this.props.name;
        const titre = this.props.titleDetail;
        const type = this.props.type;
        const autreAffiche = this.props.autreAffiche;
        const autreName = this.props.autreName;

        const inputName = this.props.inputName;
        const inputType = this.props.inputType;
        const inputValue = this.props.inputValue;
        
        return(
            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">Création</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body paddingNull">
                            <TestForm titre = {titre} name = {name} pageName = {name}
                                typeForm = {type} inputName = {inputName} inputType = {inputType}
                                inputValue  = {inputValue} resultClick = {this.resultClickBtn.bind(this)}
                                autreAffiche = {autreAffiche} autreName = {autreName} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Modals;