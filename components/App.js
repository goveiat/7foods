import React from 'react';
import { Link } from 'react-router';
import Preloader from './Preloader';
import Cabecalho from './Cabecalho';
import Secao from './Secao';
import Rodape from './Rodape';
window.$ = window.jQuery = require('materialize-css/node_modules/jquery/dist/jquery.js');
require('materialize-css/bin/materialize.css');
require('materialize-css/bin/materialize.js');


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

    static defaultProps = {

    }

    componentDidMount(){
        var self = this;

        this.getLocalData();

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/api/empresa/ligchina',
            success: function(retorno){
                if(retorno !== []){
                    self.setState({
                        empresa: retorno.empresa,
                        enderecos: retorno.enderecos,
                        h_entrega: retorno.h_entrega,
                        h_funcionamento: retorno.h_funcionamento,
                        tipo_pagamento: retorno.tipo_pagamento,
                        hasData: true
                    });
                }
            },
            error: function(e){
                self.setState({hasError: true});
            }
        })
    }

    componentDidUpdate(){

    }

    render(){
        var children = React.cloneElement(this.props.children, {
            ...this.state.empresa,
            enderecos: this.state.enderecos,
            h_entrega: this.state.h_entrega,
            h_funcionamento: this.state.h_funcionamento,
            tipo_pagamento: this.state.tipo_pagamento,
            hasData: this.state.hasData,
            setSideBarItens: this.setSideBarItens.bind(this),
            addItensPedido: this.addItensPedido.bind(this),
            removeItensPedido: this.removeItensPedido.bind(this),
            getPedido: this.getPedido.bind(this),
            getTotal: this.getTotal.bind(this),
            countPedido: this.countPedido.bind(this),
            setLogin: this.setLogin.bind(this),
            checkLogin: this.checkLogin.bind(this)
        });

        if(this.state.empresa !== null){
            return (
                <div>
                    <Cabecalho
                        titulo={this.state.empresa.Name}
                        showTitulo={children.props.showTitulo}
                        logo={this.state.empresa.Logo}
                        login={this.state.login}
                        sidebarItems={this.state.sidebarItems}
                        navStyle={children.props.navStyle} />
                    <Secao img={this.state.empresa.Background} titulo={children.props.nmSecao} />
                    {children}
                    <Rodape />
                </div>
            )
        }else{
            return (
                <Preloader hasError={this.state.hasError} />
            )
        }

    }


    getDomain(){
        var res = location.hostname.split(".");
        if(res[0] == 'www'){
            return res[1];
        }else{
            return res[0];
        }
    }

    getLocalData(){
        let pedido = localStorage.getItem('pedido');
        let total = localStorage.getItem('total');
        let login = localStorage.getItem('login');
        if(pedido != null){
            this.setState({pedido: JSON.parse(pedido)});
        }
        if(total != null){
            this.setState({total: total});
        }
        if(login != null){
            this.setState({login: login});
        }
    }


    setSideBarItens(itens){
        this.setState({sidebarItems: itens})
    }


    addItensPedido(item){
        item.total = this.calcTotalItem(item);
        let pedido = [item, ...this.state.pedido];
        let total = Number(this.state.total) + Number(item.total);
        this.setState({pedido: pedido, total: total});
        localStorage.setItem('pedido', JSON.stringify(pedido));
        localStorage.setItem('total', total);
    }


    removeItensPedido(i){
        pedido.splice(i, 1);
        this.setState({pedido: pedido})
        localStorage.setItem('pedido', JSON.stringify(pedido));
    }


    getPedido(){
        return this.state.pedido;
    }

    getTotal(){
        return Number(this.state.total).toFixed(2);
    }

    countPedido(){
        return this.state.pedido.length;
    }


    calcTotalItem(item){
        let totalItem = Number(item.qtd) * Number(item.tamanho.valor);
        let totalOp = 0;
        if(item.opcoes != null && item.opcoes.length > 0){
            item.opcoes.map((op)=>{
                totalOp += Number(op.Value);
            });
            totalOp *= Number(item.qtd);
            totalItem += Number(totalOp);
        }
        return totalItem;
    }

    setLogin(login){
        this.setState({login: login})
    }

    checkLogin(){
        return this.state.login;
    }

}