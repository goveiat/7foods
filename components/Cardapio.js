import React from 'react';
import Preloader from './Preloader';
import Produto from './Produto';
import ModalProduto from './ModalProduto';
import { Link } from 'react-router';

export default class Cardapio extends React.Component {


    constructor(props){
        super(props);

        this.state = {
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

        if(!this.props._produtos){
            this.xhrProdutos();
        }
    }

    componentWillUnmount(){
        this.props.setSideBarItens([]);
    }

    render() {
        return (
            <main className="js-cardapio">
                {this.showContainer()}
                {this.addModal()}
            </main>
        )
    }

    xhrProdutos(){
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: `api/empresa/${this.props._empresa.dados.IDCompany}/produtos`,
            headers: {"Authorization": localStorage.getItem('jwt')},
            success: (retorno) => {
                if(retorno !== []){
                    this.props.setProdutos(retorno.produtos);
                    this.props.setCliente(retorno.cliente);
                    this.props.setSideBarItens(this.setMenu());
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
            return (<ModalProduto {...this.state.produtoSelecionado}  handlePedido={this.props.handlePedido} opcoes={this.props._produtos.variedades[this.state.produtoSelecionado.IDProduct]} />);
        }else{
            return false;
        }
    }

    showContainer(){
        if(this.props._produtos){
          return (
              <div className="container">
                    {Object.keys(this.props._produtos.categorias).map(this.showCateg.bind(this)) }
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
                <h2  style={{fontWeight: '200'}} >{item}</h2>
                {this.props._produtos.categorias[item].produtos.map(this.showProduto.bind(this))}
            </div>
        )
    }

    showProduto(item, k){
        if(!(item.IDProduct in this.props._produtos.variedades)){
            return false;
        }

        return (
            <div key={k}>
                <h3>{item.Name}</h3>
                <div className="row">
                {this.props._produtos.variedades[item.IDProduct].map(this.showVariedade.bind(this))}
                </div>
            </div>
        )
    }



    showVariedade(item, k){
        return (
            <div key={k} className="col l3 m4 s6 ">
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
        Object.keys(this.props._produtos.categorias).map((categ, k)=>{
            li.push(<li key={k}><a className="subheader">{categ}</a></li>);
            self.props._produtos.categorias[categ].produtos.map((prod, k2)=>{
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