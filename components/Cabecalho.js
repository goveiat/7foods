import React from 'react';
import {Link, IndexLink, hashHistory} from 'react-router';


export default class Cabecalho extends React.Component {


    constructor(props){
        super(props);

        this.state = {

        }

    }

    static defaultProps = {
      titulo: '',
      navStyle: {},
      showTitulo: false
    }

    componentDidMount(){
          $('.js-nav .menuLateral').sideNav({
              edge: 'right',
              draggable: true
            }
          );
    }

    componentDidUpdate(){

    }

    render() {
        return (
          <div>
          <div className="navbar-fixed js-nav">
            <nav style={this.props.navStyle}>
              <div className="nav-wrapper">
                {this.getTitulo()}
                <ul className="right">
                  <li><a data-activates="slide-out" className="menuLateral"><i className="large material-icons">person</i></a></li>
                  <li><a data-activates="slide-out" className="menuLateral"><i className="large material-icons">menu</i></a></li>
                </ul>
                <ul className="left">
                  <li><a onClick={hashHistory.goBack} ><i className="material-icons">arrow_back</i></a></li>
                </ul>
              </div>
            </nav>
          </div>
            <ul id="slide-out" className="side-nav">
                <li style={{textAlign: 'center'}}><img src={`http://ligchina.a2${this.props.logo}`} style={{width: '200px'}} /></li>
                <li><div className="divider"></div></li>
                <li><Link onClick={()=>{$('.menuLateral').sideNav('hide')}} to="/"><i className="material-icons">home</i>Início</Link></li>
                <li><Link onClick={()=>{$('.menuLateral').sideNav('hide')}} to="/entrega"><i className="material-icons">local_shipping</i>Regiões de Entrega</Link></li>
                <li><Link onClick={()=>{$('.menuLateral').sideNav('hide')}} to="/cardapio"><i className="material-icons">restaurant</i>Cardápio</Link></li>
                <li><Link onClick={()=>{$('.menuLateral').sideNav('hide')}} to="/carrinho"><i className="material-icons">shopping_cart</i>Carrinho</Link></li>
                <li><Link onClick={()=>{$('.menuLateral').sideNav('hide')}} to="/empresa"><i className="material-icons">people</i>Sobre a Empresa</Link></li>
                <li>{this.getLinkConta()}</li>
                <li>{this.getLinkLogin()}</li>
                <li><div className="divider"></div></li>
                {this.props.sidebarItems}
            </ul>
          </div>
        )
    }


    getLinkLogin(){
        if(this.props.login){
            return (<Link onClick={()=>{$('.menuLateral').sideNav('hide')}} to="/cardapio"><i className="material-icons">close</i>Sair</Link>);
        }else{
            return (<Link onClick={()=>{$('.menuLateral').sideNav('hide')}} to="/entrar"><i className="material-icons">vpn_key</i>Entrar</Link>)
        }
    }

    getLinkConta(){
        if(this.props.login || true){
            return (<Link onClick={()=>{this.conta();$('.menuLateral').sideNav('hide')}}><i className="material-icons">person</i>Minha Conta</Link>);
        }else{
            return false;
        }
    }


    getTitulo(){
      if(this.props.titulo.length > 0 && this.props.showTitulo){
        return (
          <a href="#" className="brand-logo center" style={{fontWeight: 300}}>{this.props.titulo}</a>
        )
      }else{
        return false;
      }
    }


    conta(){
        $.ajax({
            url: '/api/conta',
            type: 'get',
            dataType: 'json',
            headers: {"Authorization": 'Bearer '+ localStorage.getItem('jwt')},
            success: (retorno) => {
              console.log(retorno)
            },
            error: (e) => {
                console.log(e)
            }
        });
    }

}