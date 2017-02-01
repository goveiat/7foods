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
          <div className="navbar-fixed js-nav">
            <nav style={this.props.navStyle}>
              <div className="nav-wrapper">
                {this.getTitulo()}
                <ul className="right">
                  <li><a data-activates="slide-out" className="menuLateral"><i className="large material-icons">menu</i></a></li>
                </ul>
                <ul className="left">
                  <li><a onClick={hashHistory.goBack} ><i className="material-icons">arrow_back</i></a></li>
                </ul>
              </div>
            </nav>
          </div>
        )
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

}