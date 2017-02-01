import React from 'react';



export default class NotFound extends React.Component {


    constructor(props){
        super(props);

        this.state = {

        }
    }

    static defaultProps = {
        nmSecao: '404 - Página não Encontrada',
        showTitulo: true,
    }

    componentDidMount(){
        var self = this;
    }

    componentDidUpdate(){

    }

    render() {
        return (<div className="container"><h2 style={{padding: '50px', textAlign: 'center'}}>A página procurada não está disponível no momento.</h2></div>)
    }

}