import React from 'react';
import {Link} from 'react-router';
import DropDown from './DropDown';
import SimpleCurrencyInput from 'react-simple-currency';

export default class Carrinho extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            pagamento: this.props.tipo_pagamento[0],
            entrega: this.props.tipoEntrega[0],
            instantePag: this.props.instantesPag[0],
            dinheiro: 0,
            regiao: null,
        }
    }

    static defaultProps = {
        nmSecao: 'Carrinho',
        showTitulo: true,
        tipoEntrega: [
            {id: 'delivery', label: 'Em Domicílio (Delivery)'},
            {id: 'retirada', label: 'Retirar no Estabelecimento'}
        ],
        instantesPag: [
            {id: 'online', label: 'Pagar agora mesmo'},
            {id: 'offline', label: 'Pagar para o entregador'}
        ],
    }

    componentDidMount(){
        var self = this;
        $('.js-carrinho .collapsible').collapsible();
        $('.js-carrinho select').material_select();
        $('.js-carrinho .dropdown-button').dropdown();

        $('#regioes').autocomplete({
            data: self.props.regioes.autocomplete,
            limit: 20,
        });
        $('.autocomplete-content').on('click', 'li', function(){
            self.setState({regiao: this.innerText});
        })

    }


    render() {
        return (
            <main className="js-carrinho">
                <div className="container">
                    {this.showData()}
                    {this.showCheckout()}
                </div>
            </main>
        )
    }

    showData(){
        if(this.props.countPedido() > 0){
          return (
                <div style={{paddingTop: '50px'}} className="flow-text">
                    <ul className="collapsible" data-collapsible="expandable">
                        {this.props.getPedido().map(this.showPedido.bind(this))}
                      </ul>

                  <div className="card z-depth-2">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s4">Total em Produtos</div>
                            <div className="col s8 secondary-content" style={{textAlign:  'right'}}>R$ {this.props.getTotal()}</div>
                        </div>
                        <div className="row">
                            <div className="col s4">Forma de Pagamento</div>
                            <div className="col s8">
                                <DropDown
                                    id="pagamento"
                                    label="Title"
                                    items={this.props.tipo_pagamento}
                                    onSelect={(item) => {this.setPagamento(item)}}
                                />
                            </div>
                        </div>
                        {this.campoTroco()}
                        <div className="row">
                            <div className="col s4">Forma de Entrega</div>
                            <div className="col s8">
                                <DropDown
                                    id="entrega"
                                    label="label"
                                    items={this.props.tipoEntrega}
                                    onSelect={(item) => {this.setEntrega(item)}}
                                />
                            </div>
                        </div>
                        {this.campoRegioes()}
                        {this.campoTaxa()}
                    </div>
                  </div>
                </div>
            )
        }else{
            return (<h2 style={{padding: '50px', textAlign: 'center'}} >Seu Carrinho está Vazio</h2>)
        }
    }


    showCheckout(){
        if(this.props.login){
            return (
                <div  className="card z-depth-2 flow-text">
                    <div className="card-content">

                    </div>
                </div>
            )
        }else{
            return (
            <div className="flow-text" style={{textAlign: 'center', marginBottom: 50}}>
                <div className="col s12 red-text text-darken-2">
                    Faça o Login para finalizar o Pedido.
                </div>
                <Link style={{marginTop: 15}} to="/entrar" className="waves-effect waves-light darken-2 btn-large green">Entrar</Link>
            </div>);
        }
    }


    setPagamento(item){
        if(item.IDPaymenttype == 1){
            this.setState({pagamento: item});
        }else{
            this.setState({dinheiro: 0, pagamento: item});
        }
    }


    setEntrega(item){
        if(item.id == 'delivery'){
            this.setState({entrega: item});
        }else{
            this.setState({regiao: null, entrega: item});
        }
    }

    campoTaxa(){
        if(this.state.regiao != null){
            return (
                <div className="row">
                    <div className="col s4">Taxa de Entrega</div>
                    <div className="col s5" style={{fontSize: '1rem', marginTop: '10px'}}>{this.state.regiao}</div>
                    <div className="col s3 secondary-content" style={{textAlign:  'right'}}>R$ {this.props.regioes.valor[this.state.regiao]}</div>
                </div>
            )
        }else{
            return false;
        }
    }


    campoRegioes(){
        if(this.state.entrega.id == 'delivery'){
            return (
                <div className="row">
                    <div className="col s4">Regiões de Entrega</div>
                    <div className="col s8">
                          <input placeholder="Informe o Bairro" type="text" id="regioes" />
                    </div>
                </div>
            )
        }else{
            return false;
        }
    }

    campoTroco(){
        var self = this;
        if(this.state.pagamento.IDPaymenttype == 1){
            return (
                <div className="row">
                    <div className="col s4">Troco para</div>
                    <div className="col s8">
                        <SimpleCurrencyInput
                          value={this.state.dinheiro}
                          precision={2}
                          separator=','
                          delimiter='.'
                          unit='R$'
                          onInputChange={(raw, display) => {this.setState({dinheiro: raw})}}
                        />
                    </div>
                </div>
            )
        }else{
            return (
                <div className="row">
                    <div className="col s4">Instante do Pagamento</div>
                    <div className="col s8">
                    <DropDown
                        id="instPag"
                        label="label"
                        items={this.props.instantesPag}
                        onSelect={(item) => {this.setState({instantePag: item})}}
                    />
                    </div>
                </div>
            );
        }
    }





    showPedido(item, k){
        return (
                <li key={k}>
                  <div className="collapsible-header active"><h4>{item.Name}</h4></div>
                  <div className="collapsible-body">
                        <div className="row">
                            <div className="col s3">
                                <img src={`http://ligchina.a2${item.Image}`} style={{width: '100%'}} alt=""/>
                            </div>
                            <div className="col s9">
                                <ul className="collection">
                                    <li className="collection-item">Quantidade <span className="secondary-content">{item.qtd}</span></li>
                                    <li className="collection-item">Tamanho <span className="secondary-content">{item.tamanho.Name}</span></li>
                                    <li className="collection-item">Valor Unitário<span className="secondary-content">R$ {item.tamanho.valor}</span></li>
                                </ul>
                                <ul className="collection">
                                    <li className="collection-header"><h4>Opcionais</h4></li>
                                    {this.showOpcionais(item)}
                                </ul>
                            </div>
                        </div>
                  </div>
                </li>
        )
    }


    showOpcionais(prod){
        if(prod.opcoes == null || prod.opcoes.length == 0){
            return (<li className="collection-item">Não Possui</li> )
        }else{
            return prod.opcoes.map((item, k)=><li key={k} className="collection-item">{item.Title}<span className="secondary-content">{item.Value == '0.00' ? 'Grátis' : 'R$ '+item.Value}</span></li> )
        }
    }

}