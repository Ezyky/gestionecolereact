import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class NavLinkStyle extends Component {
    render(){
        //activeStyle = {{color : 'red'}}
        return(
            <NavLink {...this.props} activeStyle = {{color : 'red'}} />
        )
    }
}

export default NavLinkStyle;