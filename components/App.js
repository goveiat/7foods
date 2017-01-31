import React from 'react';
import $ from 'jquery';

export default class App extends React.Component {

    constructor(props){
        super(props);


        this.state = {
            empresa: null,
            hasError: false,
            sidebarItems: false,
            pedido: [],
            total: 0,
            enderecos: null,
            h_entrega: null,
            h_funcionamento: null,
            tipo_pagamento: null,
            hasData: false,
            login: false
        }
    }

    componentDidMount(){
        this.buscaEmpresa();
    }

    render() {
        return (
            <div {...{id: 'a', 'className': 'ii'}} >ok</div>
        );
    }

    buscaEmpresa(){
        $.ajax({
            type: 'GET',
            dataType: 'json',
            //url: `${location.origin}/json/empresa/api_get_empresa/${this.getDomain()}`,
            url: `http://www.ligchina.a2/json/empresa/api_get_empresa/ligchina`,
            success: (retorno) => {
                if(retorno !== []){
                    console.log(retorno)
                    this.setState({
                        empresa: retorno.empresa,
                        enderecos: retorno.enderecos,
                        h_entrega: retorno.h_entrega,
                        h_funcionamento: retorno.h_funcionamento,
                        tipo_pagamento: retorno.tipo_pagamento,
                        hasData: true
                    });
                }
            },
            error: (e) => {
                this.setState({hasError: true});
            }
        })
    }

    getDomain(){
        let res = location.hostname.split(".");
        if(res[0] == 'www'){
            return res[1];
        }else{
            return res[0];
        }
    }

}


App.defaultProps = {

}