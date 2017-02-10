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
      showTitulo: false,
      backButton: true,
      width: 250
    }

    componentDidMount(){
          $('.js-nav .menuLateral').sideNav({
              menuWidth: this.props.width,
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
                  {this.getMenuLogin()}
                  <li><a data-activates="slide-out" className="menuLateral"><i className="large material-icons">menu</i></a></li>
                </ul>
                <ul className="left">
                  {this.showBackButton()}
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


    showBackButton(){
      if(this.props.backButton){
        return (<li><a onClick={hashHistory.goBack} ><i className="material-icons">arrow_back</i></a></li>)
      }else{
        return false;
      }
    }


    getLinkLogin(){
        if(this.props._cliente){
            return (<Link onClick={()=>{this.logout()}} to="/cardapio"><i className="material-icons">close</i>Sair</Link>);
        }else{
            return (<Link onClick={()=>{$('.menuLateral').sideNav('hide')}} to="/entrar"><i className="material-icons">vpn_key</i>Entrar</Link>)
        }
    }

    getLinkConta(){
        if(this.props._cliente){
            return (<Link onClick={()=>{this.conta()}}><i className="material-icons">person</i>Minha Conta</Link>);
        }else{
            return false;
        }
    }

    getMenuLogin(){
      if(this.props._cliente){
          return(<li><a data-activates="slide-out" className="menuLateral"><i className="large material-icons">person</i></a></li>);
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


    logout(){
      $('.menuLateral').sideNav('hide');
      this.props.setCliente(false);
    }


    conta(){
        $('.menuLateral').sideNav('hide')
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