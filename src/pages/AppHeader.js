import React, {Component} from 'react';

import '../style/page.css';
import {NavLink} from 'react-router-dom'
import NavLinkStyle from './NavLinkStyle';


class AppHeader extends Component {
    render(){
        return(
            <div className = "container">
                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light padding">
                    <a className="navbar-brand">Gestion Ecole</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" 
                            data-target="#navbarNav" aria-controls="navbarNav" 
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ">
                            <li className="nav-item active">
                                <NavLink className="nav-link text-info" to = "/" > 
                                Professeur 
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLinkStyle className="nav-link text-secondary" to = "/classe"
                                         > 
                                Classe 
                                </NavLinkStyle>
                            </li>
                            <li className="nav-item">
                                <NavLinkStyle className="nav-link text-success" to = "/eleve" > 
                                Elèves 
                                </NavLinkStyle>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default AppHeader;