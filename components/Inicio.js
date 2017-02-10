import React from 'react';
import { Link } from 'react-router';
import Mq from 'react-responsive';


export default class Inicio extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            animeBemvindo: '',
            animeNomeEmpresa: '',
            animeLogo: '',
            animeBtnCardapio: '',
            animeBtnEmpresa: ''
        }


        this.styles = {
            logo_320 : {width: '60%', marginLeft: 'auto',  'marginRight': 'auto', display: 'block', opacity: '0',},
            fullscreen : {
                background: `url('http://ligchina.a2${this.props._empresa.dados.Background}')`,
                overflowX: 'hidden',
                overflowY: 'hidden',
                backgroundSize: 'cover',
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0},
            botaoCardapio: {
                opacity: '0',
                position: 'absolute',
                bottom: '50px',
                left: 'calc(50% - 300px)',
                width: '280px',
            },
            botaoEmpresa: {
                opacity: '0',
                position: 'absolute',
                bottom: '50px',
                width: '280px',
                right: 'calc(50% - 300px)',
            },
            btn1_320: {
                opacity: 0,
                position: 'absolute',
                bottom: 90,
                width: '90%',
                left: '5%'
            },
            btn2_320: {
                opacity: 0,
                position: 'absolute',
                bottom: 30,
                width: '90%',
                left: '5%'
            },
            tit_320 : {textAlign: 'center', paddingTop: 25, fontSize: '3.2rem'},
            titulo1: {fontWeight: 200, opacity: '0', display: 'inline-block', marginRight: 15},
            titulo2: {fontWeight: 200,  opacity: '0', display: 'inline-block'},

        }
    }

    static defaultProps = {
        navStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        showTitulo: false,
        backButton: false
    }

    componentDidMount(){

        setTimeout(()=>{
            this.setState({animeBemvindo: 'animated fadeInLeft'})
        }, 500);

        setTimeout(()=>{
            this.setState({animeNomeEmpresa: 'animated fadeInRight'})
        }, 1000);

        setTimeout(()=>{
            this.setState({animeLogo: 'animated fadeInDown'})
        }, 2000);

        setTimeout(()=>{
            this.setState({animeBtnCardapio: 'animated fadeInUp'})
        }, 2700);

        setTimeout(()=>{
            this.setState({animeBtnEmpresa: 'animated fadeInUp'})
        }, 3100);
    }

    componentDidUpdate(){

    }

    render() {
        return (
        <main>
            <div style={this.styles.fullscreen}>
                <h1 style={this.styles.tit_320}>
                    <div className={'white-text ' + this.state.animeBemvindo} style={this.styles.titulo1}>Bem Vindo</div>
                    <div className={'white-text ' + this.state.animeNomeEmpresa} style={this.styles.titulo2}>ao {this.props._empresa.dados.Name} </div>
                </h1>
                <img className={'z-depth-5 ' +this.state.animeLogo} src={`http://ligchina.a2${this.props._empresa.dados.Logo}`} style={this.styles.logo_320}  />
                <Link
                    to="/cardapio"
                    style={this.styles.btn1_320}
                    className={"waves-effect waves-light btn-large " + this.state.animeBtnCardapio}>
                    Ver cardápio
                </Link>
                <Link
                    to="/empresa"
                    style={this.styles.btn2_320}
                    className={"waves-effect waves-light btn-large " + this.state.animeBtnEmpresa}>
                    Conhecer a Empresa
                </Link>
            </div>
        </main>
        )
    }



}