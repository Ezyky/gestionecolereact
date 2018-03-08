import React, {Component} from 'react';

class AlertBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttonState: ''
        }
    }
    update(){
        this.props.onClickUpdate();
    }

    handleClick () {
        this.setState({buttonState: 'loading'})
        setTimeout(() => {
            this.setState({buttonState: 'success'})
            }, 3000
        )
    }

    render(){
        return(
            <div className = "row">
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Erreur de connexion</strong> Problème de connexion avec le server, 
                    veuillez vérifier et Actualiser <button className = "btn btn-success btn-sm" 
                    type="button" onClick = {this.update.bind(this)}>
                        <span aria-hidden="true">Actualiser</span>
                    </button>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default AlertBar;