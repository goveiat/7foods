import React from 'react';
import Preloader from './Preloader';
import Produto from './Produto';
import ModalProduto from './ModalProduto';
import { Link } from 'react-router';

export default class Cardapio extends React.Component {


    constructor(props){
        super(props);

        this.state = {
          categorias: null,
          variedades: null,
          opcoes: null,
          hasData: false,
          hasError: false,
          produtoSelecionado: null
        }

        this.styles = {
            counter: {zIndex: '10', color: '#fff', position: 'fixed', right: '25px', fontSize: '9pt', fontWeight: 'bold', bottom: '59px', background: 'black', padding: '2px 6px', borderRadius: '20px', boxShadow: '1px 1px 1px #545454'}
        }
    }

    static defaultProps = {
      nmSecao: 'Cardápio',
      showTitulo: true,
    }

    componentDidMount(){
        this.props.setSideBarItens(
            <li>
                <div className="progress">
                  <div className="indeterminate"></div>
              </div>
            </li>);


        if(!this.getLocalData()){
            this.xhrProdutos();
        }

    }

    componentWillUnmount(){
        this.props.setSideBarItens([]);
    }

    render() {
        return (
            <main className="r-cardapio">
                {this.showContainer()}
                {this.addModal()}
            </main>
        )
    }

    getLocalData(){
        let produtos = sessionStorage.getItem('produtos');
        if(produtos != null){
            produtos = JSON.parse(produtos);
            this.setState({
              categorias: produtos.categorias,
              variedades: produtos.variedades,
              opcoes: produtos.opcoes,
              hasData: true
            }, () => {this.props.setSideBarItens(this.setMenu())});

            return true;
        }else{
            return false;
        }
    }

    xhrProdutos(){

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: `api/empresa/${this.props._empresa.dados.IDCompany}/produtos`,
            headers: {"Authorization": localStorage.getItem('jwt')},
            success: (retorno) => {
                if(retorno !== []){
                    this.setState({
                      categorias: retorno.produtos.categorias,
                      variedades: retorno.produtos.variedades,
                      opcoes: retorno.produtos.opcoes,
                      hasData: true
                    }, () => {this.props.setSideBarItens(this.setMenu())});
                    this.props.setCliente(retorno.cliente);
                    sessionStorage.setItem('produtos', JSON.stringify(retorno.produtos));
                }
            },
            error: (e) => {
                console.error(e.responseText)
                this.setState({hasError: true});
            }
        });
    }

    addModal(){
        if(this.state.produtoSelecionado != null){
            return (<ModalProduto {...this.state.produtoSelecionado}  handlePedido={this.props.handlePedido} opcoes={this.state.opcoes[this.state.produtoSelecionado.IDProduct]} />);
        }else{
            return false;
        }
    }

    showContainer(){
        if(this.state.hasData){
          return (
              <div className="container">
                    {Object.keys(this.state.categorias).map(this.showCateg.bind(this)) }
                    <div style={{position: 'fixed', bottom: '20px', right: '20px'}}>
                        <Link to="/carrinho" className="btn-floating btn-large waves-effect waves-light"  >
                            <i className="material-icons">shopping_cart</i>
                        </Link>
                        <span style={this.styles.counter}>{this.props.handlePedido.count()}</span>
                    </div>

              </div>
          )
        }else{
          return (<Preloader hasError={this.state.hasError} styleContainer={{position: 'static', textAlign: 'center'}} />)
        }
    }


    showCateg(item, k){
        return (
            <div key={k} className="section scrollspy" id={this.seo(item)}>
                <h2 className="r-h2" style={{fontWeight: '200'}} >{item}</h2>
                {this.state.categorias[item].produtos.map(this.showProduto.bind(this))}
            </div>
        )
    }

    showProduto(item, k){
        if(!(item.IDProduct in this.state.variedades)){
            return false;
        }

        return (
            <div key={k}>
                <h3 className="r-h3">{item.Name}</h3>
                <div className="row">
                {this.state.variedades[item.IDProduct].map(this.showVariedade.bind(this))}
                </div>
            </div>
        )
    }



    showVariedade(item, k){
        return (
            <div key={k} className="r-blcProduto col l3 m4 s6">
                <Produto item={item} showModal={this.showModal.bind(this)} />
            </div>
        )
    }


    seo(str) {
          str = str.toString().toLowerCase();
          str = str.split(/\&+/).join("-and-")
          str = str.split(/[^a-z0-9]/).join("-");
          str = str.split(/-+/).join("-");
          str = str.trim('-');

          return str;
    }

    getSpy(item, k){
        return (
            <li key={k} ><a href={'#'+this.seo(item)}>{item}</a></li>
        )
    }


    setMenu(){
        let self = this;
        let li = [];
        Object.keys(this.state.categorias).map((categ, k)=>{
            li.push(<li key={k}><a className="subheader">{categ}</a></li>);
            self.state.categorias[categ].produtos.map((prod, k2)=>{
                li.push(<li key={'c'+k+'p'+k2}><a className="waves-effect" href="#!">{prod.Name}</a></li>)
            })
        })
        return li;
    }


    showModal(item){
        this.setState({produtoSelecionado: item}, ()=>{
            $('#modalTamanho').modal('open');
        })
    }

}