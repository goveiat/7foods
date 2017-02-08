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
            _empresa: false,
            hasError: false,
            sidebarItems: false,
            pedido: [],
            total: 0,
            login: false,
            cliente: null
        }
    }

    static defaultProps = {

    }

    componentDidMount(){
        this.getLocalData();

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/api/empresa/ligchina',
            headers: {"Authorization": localStorage.getItem('jwt')},
            success: (retorno) => {
                this.setLogin(retorno.login);
                delete retorno.login;
                this.setState({_empresa: retorno});
            },
            error: (e) => {
                switch(e.status){
                    case 403:
                        this.setState({hasError: 403});
                        break;
                    default: this.setState({hasError: 500});
                }
            }
        })
    }

    componentDidUpdate(){

    }

    render(){
        var children = React.cloneElement(this.props.children, {
            _empresa: this.state._empresa,
            setSideBarItens: this.setSideBarItens.bind(this),
            addItensPedido: this.addItensPedido.bind(this),
            removeItensPedido: this.removeItensPedido.bind(this),
            getPedido: this.getPedido.bind(this),
            getTotal: this.getTotal.bind(this),
            countPedido: this.countPedido.bind(this),
            setLogin: this.setLogin.bind(this),
            login: this.state.login
        });

        if(this.state._empresa){
            return (
                <div>
                    <Cabecalho
                        titulo={this.state._empresa.dados.Name}
                        showTitulo={children.props.showTitulo}
                        logo={this.state._empresa.dados.Logo}
                        login={this.state.login}
                        setLogin={this.setLogin.bind(this)}
                        sidebarItems={this.state.sidebarItems}
                        navStyle={children.props.navStyle} />
                    <Secao img={this.state._empresa.dados.Background} titulo={children.props.nmSecao} />
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
        if(pedido != null){
            this.setState({pedido: JSON.parse(pedido)});
        }
        if(total != null){
            this.setState({total: total});
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

    setLogin(jwt){
        if(!jwt){
            localStorage.removeItem('jwt');
            this.setState({login: false});
        }else{
            localStorage.setItem('jwt', jwt);
            this.setState({login: true});
        }
    }

}