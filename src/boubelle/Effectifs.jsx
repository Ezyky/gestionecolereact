import React, {Component} from 'react';

class Effectif extends Component {
    
    render(){
        let contener = "null";
        return(
            <div className="modal fade" id="effectifModal" role="dialog" aria-labelledby="effectifModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="effectifModalLabel">Création</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body paddingNull">
                            {contener}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Effectif;