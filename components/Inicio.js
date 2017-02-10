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
        <main className="r-inicio">
            <div style={this.styles.fullscreen}>
                <h1 className="r-titulo">
                    <div className={'r-t1 white-text ' + this.state.animeBemvindo}>Bem Vindo</div>
                    <div className={'r-t2 white-text ' + this.state.animeNomeEmpresa}>ao {this.props._empresa.dados.Name} </div>
                </h1>
                <img className={'r-logo z-depth-5 ' +this.state.animeLogo} src={`http://ligchina.a2${this.props._empresa.dados.Logo}`} />
                <Link
                    to="/cardapio"
                    className={"r-btn1 waves-effect waves-light btn-large " + this.state.animeBtnCardapio}>
                    Ver cardápio
                </Link>
                <Link
                    to="/empresa"
                    className={"r-btn2 waves-effect waves-light btn-large " + this.state.animeBtnEmpresa}>
                    Conhecer a Empresa
                </Link>
            </div>
        </main>
        )
    }



}