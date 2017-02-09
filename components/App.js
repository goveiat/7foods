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
            _cliente: false,
            _produtos: false,
            hasError: false,
            sidebarItems: false,
            pedido: [],
            total: 0,

        }

        this.handlePedido = this.nsPedido();
    }

    static defaultProps = {

    }

    componentDidMount(){
        this.getLocalData();

        this.xhrEmpresa();
    }

    componentDidUpdate(){

    }

    render(){

        let view = this.getView();

        if(this.state._empresa){
            return (
                <div>
                    <Cabecalho
                        titulo={this.state._empresa.dados.Name}
                        showTitulo={view.props.showTitulo}
                        logo={this.state._empresa.dados.Logo}
                        _cliente={this.state._cliente}
                        setCliente={this.setCliente.bind(this)}
                        sidebarItems={this.state.sidebarItems}
                        navStyle={view.props.navStyle} />
                    <Secao img={this.state._empresa.dados.Background} titulo={view.props.nmSecao} />
                    {view}
                    <Rodape />
                </div>
            )
        }else{
            return (
                <Preloader hasError={this.state.hasError} />
            )
        }

    }


    getView(){
        let props = {};

        switch(this.props.children.type.name){
            case 'Inicio':
            case 'Empresa':
            case 'Login':
            case 'NotFound':
                props = {
                    _empresa: this.state._empresa,
                }; break;
            case 'Cardapio':
                props = {
                    _empresa: this.state._empresa,
                    _produtos: this.state._produtos,
                    setSideBarItens: this.setSideBarItens.bind(this),
                    handlePedido: this.handlePedido,
                    setCliente: this.setCliente.bind(this),
                    setProdutos: this.setProdutos.bind(this),
                }; break;
            case 'Carrinho':
                props = {
                    _empresa: this.state._empresa,
                    handlePedido: this.handlePedido,
                }; break;
            default:
                console.log('Tentativa de acessar: ' + this.props.children.type.name);
                return (<Preloader hasError={this.state.hasError} />)
        }

        return React.cloneElement(this.props.children, props);
    }


    xhrEmpresa(){
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/api/empresa/ligchina',
            headers: {"Authorization": localStorage.getItem('jwt')},
            success: (retorno) => {
                this.setCliente(retorno.cliente);
                this.setState({_empresa: retorno.empresa});
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



    setCliente(cliente){
        if(!cliente){
            localStorage.removeItem('jwt');
            this.setState({_cliente: false});
        }else{
            localStorage.setItem('jwt', cliente.token);
            this.setState({_cliente: cliente});
        }
    }

    setProdutos(prod){
        this.setState({_produtos: prod});
    }


    nsPedido(){
        return {
            add: (item) => {
                item.total = this.handlePedido.totalItem(item);
                let pedido = [item, ...this.state.pedido];
                let total = Number(this.state.total) + Number(item.total);
                this.setState({pedido: pedido, total: total});
                localStorage.setItem('pedido', JSON.stringify(pedido));
                localStorage.setItem('total', total);
            },

            remove: (i) => {
                pedido.splice(i, 1);
                this.setState({pedido: pedido})
                localStorage.setItem('pedido', JSON.stringify(pedido));
            },

            get: () => {
                return this.state.pedido;
            },

            total: () => {
                return Number(this.state.total).toFixed(2);
            },

            count: () => {
                return this.state.pedido.length;
            },

            totalItem: (item) => {
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
        }
    }


    handleCliente(){

    }

}