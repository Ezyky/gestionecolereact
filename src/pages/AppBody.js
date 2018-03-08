import React, {Component} from 'react'
import {Route} from 'react-router-dom';

import Professeur from './ProfPage';
import Classe from './ClassePage'
import Eleve from './ElevePage'

class AppBody extends Component {
    render(){
        return(
            <div className = "container">
                <div className = "row">
                    <div className = "col-12 col-sm-12 col-md-12">
                        <Route path = "/" exact component = {Professeur} />
                        <Route path = "/classe" component = {Classe} />
                        <Route path = "/eleve" component = {Eleve} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AppBody;