import React, {Component} from 'react';

class InterPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            listProfs : [],
            listClasses : [],
            listEleves : []
        }
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.name === "professeur"){
            this.setState({
                listProfs : nextProps.elmtSync
            });
            console.log('####');
            console.log(nextProps.elmtSync);
            console.log("####");
        }else if(nextProps.name === "classe"){
            this.setState({
                listClasses : nextProps.elmtSync
            });
        }else if(nextProps.name === "eleve"){
            this.setState({
                listEleves : nextProps.elmtSync
            });
        }
    }

    publicListe(list){
        this.props.resListe(list);
    }
    
    render(){
        const listProfs = this.state.listProfs;
        const listClasses = this.state.listClasses;
        const listEleves = this.listEleves;
        const type = this.props.type;
        let listes = [listProfs, listClasses, listEleves];
        let contener = null;
        if(type === "get"){
            contener = this.publicListe(listes);
        }
        return(
            <div>
                 {contener}
            </div>
        )
    }
}

export default InterPage ;