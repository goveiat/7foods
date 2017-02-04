import React from 'react';



export default class AcessoNegado extends React.Component {


    constructor(props){
        super(props);

        this.state = {

        }
    }

    static defaultProps = {
        nmSecao: '401 - Acesso Negado',
        showTitulo: true,
    }

    componentDidMount(){
        var self = this;
    }

    componentDidUpdate(){

    }

    render() {
        return (<div className="container"><h2 style={{padding: '50px', textAlign: 'center'}}>Você não tem permissão para acessar esta página.</h2></div>)
    }

}