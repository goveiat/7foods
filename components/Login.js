import React from 'react';
import {browserHistory} from 'react-router';


export default class Login extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            user: '',
            password: '',
            enviando: false
        }
    }

    static defaultProps = {
        nmSecao: 'Entrar',
        showTitulo: true,
        listaErro: false
    }

    componentDidMount(){
        var self = this;
    }

    componentDidUpdate(){

    }

    render() {
        return (
            <div className="container">
                <div className="card z-depth-2" style={{margin: '50px 0'}}>
                    <div className="card-content flow-text">
                        <div className="row">
                            <div className="col s12" style={{textAlign: 'center'}}>
                                Faça o Login com o Facebook
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12" style={{textAlign: 'center'}}>
                                <a className="waves-effect waves-light btn blue darken-2 disabled">Entrar com o Facebook</a>
                            </div>
                        </div>
                        <div className="row" style={{paddingTop: '20px'}}>
                            <div className="col s12" style={{textAlign: 'center'}}>
                                Ou informe suas credenciais abaixo
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m6 offset-m3">
                                <div className="input-field">
                                  <i className="material-icons prefix">account_circle</i>
                                  <input type="text"  value={this.state.user} onChange={(e) => {this.setState({user: e.target.value})}} />
                                  <label htmlFor="icon_prefix">Usuário</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m6 offset-m3">
                                <div className="input-field">
                                  <i className="material-icons prefix">vpn_key</i>
                                  <input  type="password" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} />
                                  <label htmlFor="icon_prefix">Senha</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12" style={{textAlign: 'center'}}>
                                <a onClick={this.login.bind(this)} className={`waves-effect waves-light btn green darken-2 ${this.state.enviando ? 'disabled' : ''}`}>Entrar</a>
                            </div>
                        </div>
                        {this.showErro()}
                    </div>
                    {this.showLoading()}
                </div>
            </div>)
    }


    showErro(){
        let erros = [];
        if(this.state.listaErro){
            $(this.state.listaErro).each(function(){
                if(this.nodeType !== 3){
                    erros.push($(this).text());
                }
            })
            return (
                <div className="row">
                    <div className="col s12 red-text text-darken-2" style={{textAlign: 'center'}}>
                        <ul >
                          {erros.map((item, k)=><li key={k}>{item}</li>)}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return false;
        }
    }

    showLoading(){
        if(this.state.enviando){
                return(
                    <div className="progress">
                      <div className="indeterminate"></div>
                  </div>
                )
          }else{
            return false;
          }
    }


    login(){
        let self = this;
        this.setState({enviando: true});
        $.ajax({
            url: 'http://ligchina.a2/login/api_post_login',
            type: 'post',
            dataType: 'json',
            data: {user: this.state.user, password: this.state.password},
            success: function(retorno){
                self.setState({enviando: false});
                if(retorno.status){
                    self.setState({listaErro: false});
                    self.props.setLogin(true);
                    browserHistory.replace({pathname: '/cardapio'});
                }else{
                    self.setState({listaErro: retorno.lista});
                }
            },
            error: function(e){
                self.setState({enviando: false});
                console.log(e.responseText)
            }
        });
    }

}