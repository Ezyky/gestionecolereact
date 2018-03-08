import React, {Component} from 'react'
import '../style/page.css';

class AppFooter extends Component {
    render(){
        return(
            <nav className = "navbar fixed-bottom navbar-light bg-light padding ">
                <div className = "container justify-content-center nav-tabs">
                    <span className = "navbar-brand"> <code>@seve</code></span>
                </div>
            </nav>
        )
    }
}

export default AppFooter;