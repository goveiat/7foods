import React from 'react';
import { Link } from 'react-router';


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
            logo : {width: '300px', marginLeft: 'auto',  'marginRight': 'auto', display: 'block', opacity: '0', marginTop: '25px'},
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
            titulo1: {fontWeight: 200, marginLeft: '90px', opacity: '0', marginTop: '100px'},
            titulo2: {fontWeight: 200, marginRight: '90px', opacity: '0', textAlign: 'right', marginTop: '-70px'},

        }
    }

    static defaultProps = {
        navStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        showTitulo: false,
    }

    componentDidMount(){
        this.props.setSideBarItens([])

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
                <h1>
                    <div className={'white-text ' + this.state.animeBemvindo} style={this.styles.titulo1}>Bem Vindo</div>
                    <div className={'white-text ' + this.state.animeNomeEmpresa} style={this.styles.titulo2}>ao {this.props._empresa.dados.Name} </div>
                </h1>
                <img className={'z-depth-5 ' +this.state.animeLogo} src={`http://ligchina.a2${this.props._empresa.dados.Logo}`} style={this.styles.logo}  />
                <Link to="/cardapio"><button style={this.styles.botaoCardapio} className={"waves-effect waves-light btn-large " + this.state.animeBtnCardapio}>Ver cardápio</button></Link>
                <Link to="/empresa"><button style={this.styles.botaoEmpresa} className={"waves-effect waves-light btn-large " + this.state.animeBtnEmpresa}>Conhecer a Empresa</button></Link>
            </div>
        </main>
        )
    }



}