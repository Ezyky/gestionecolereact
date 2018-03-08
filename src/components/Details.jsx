import React,{Component} from 'react';

import TestForm from './TestForms';

class Details extends Component {
    resultClickBtn (type, valuFroms){
        console.log(type);
        console.log(valuFroms);
        this.props.resultClick(type, valuFroms);
    }
    render(){
        const name = this.props.name;
        const titre = this.props.titleDetail;
        const type = this.props.type;
        const autreAffiche = this.props.autreAffiche;
        const autreName = this.props.autreName;
        const border = this.props.border;

        const inputName = this.props.inputName;
        const inputType = this.props.inputType;
        const inputValue = this.props.inputValue;

        return(
            <div className = "row">
                <div className={"card text-center col-md-12 col-sm-12 col-12 "+border}>
                    <TestForm titre = {titre} name = {name} pageName = {name}
                    typeForm = {type} inputName = {inputName} inputType = {inputType}
                    inputValue  = {inputValue} resultClick = {this.resultClickBtn.bind(this)}
                    autreAffiche = {autreAffiche} autreName = {autreName} />
                </div>
            </div>
        )
    }
}

export default Details;