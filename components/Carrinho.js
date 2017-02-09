import React from 'react';
import {Link} from 'react-router';
import DropDown from './DropDown';
import SimpleCurrencyInput from 'react-simple-currency';

export default class Carrinho extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            pagamento: this.props._empresa.tipoPagamento[0],
            entrega: this.props.tipoEntrega[0],
            instantePag: false,
            dinheiro: 0,
            regiao: this.props._cliente ? this.props._cliente.enderecos[0].key : false,
            endereco: this.props._cliente ? this.props._cliente.enderecos[0] : false
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

        $('#regioes').autocomplete({
            data: self.props._empresa.regioes.autocomplete,
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
        if(this.props.pedido.count() > 0){
          return (
                <div style={{paddingTop: '50px'}} className="flow-text">
                    <ul className="collapsible" data-collapsible="expandable">
                        {this.props.pedido.get().map(this.showPedido.bind(this))}
                      </ul>

                  <div className="card z-depth-2">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s4">Total em Produtos</div>
                            <div className="col s8 secondary-content" style={{textAlign:  'right'}}>R$ {this.props.pedido.total()}</div>
                        </div>
                        <div className="row">
                            <div className="col s4">Forma de Pagamento</div>
                            <div className="col s8">
                                <DropDown
                                    id="pagamento"
                                    label="Title"
                                    items={this.props._empresa.tipoPagamento}
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


    campoCartao(){
        if(this.state.instantePag.id == 'online'){
            return (
                <div className="row">
                    <div className="col s4">Dados do Cartão</div>
                    <div className="col s8">
                        <div className="row">
                            <div className="col s8">
                                <input placeholder="Nº do Cartão" type="text"/>
                            </div>
                            <div className="col s4">
                                <input placeholder="CVC **" type="text"/>
                            </div>
                            <div className="col s6">
                                <input placeholder="Senha" type="password"/>
                            </div>
                            <div className="col s12" style={{fontSize: '1rem'}}>
                                <span style={{fontWeight: 'bold'}}>**</span> O Código de Verificação (CVC) é composto pelos 3 últimos dígitos que aparecem atrás do cartão.
                            </div>
                        </div>

                    </div>
                </div>
            )
        }else{
            return false;
        }
    }


    campoEnderecos(){
        if(this.state.entrega.id == 'delivery'){
            return (
                <div className="row">
                    <div className="col s4">Endereço de Entrega</div>
                    <div className="col s8">
                        <DropDown
                            id="enderecos"
                            label="label"
                            items={this.props._cliente.enderecos}
                            onSelect={(item) => {this.setState({endereco: item, regiao: item.key})}}
                        />
                    </div>
                </div>
            )
        }else{
            return false;
        }
    }


    showCheckout(){
        if(this.props._cliente){
            return (
                <div  className="card z-depth-2 flow-text">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s4">Valor a Pagar</div>
                            <div className="col s8 secondary-content" style={{textAlign:  'right'}}>{this.calcTotal()}</div>
                        </div>
                        {this.campoEnderecos()}
                        {this.campoCartao()}
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
            this.setState({dinheiro: 0, pagamento: item, instantePag: this.props.instantesPag[0]});
        }
    }


    setEntrega(item){
        if(item.id == 'delivery'){
            this.setState({entrega: item});
        }else{
            this.setState({regiao: false, entrega: item});
        }
    }

    campoTaxa(){
        if(this.state.regiao){
            if (this.state.regiao in this.props._empresa.regioes.valor){
                return (
                    <div className="row">
                        <div className="col s4">Taxa de Entrega</div>
                        <div className="col s5" style={{fontSize: '1rem', marginTop: '10px'}}>{this.state.regiao}</div>
                        <div className="col s3 secondary-content" style={{textAlign:  'right'}}>R$ {this.props._empresa.regioes.valor[this.state.regiao]}</div>
                    </div>
                )
            }else{
                return (
                    <div className="row">
                        <div className="col s4">Taxa de Entrega</div>
                        <div className="col s8 secondary-content">Fora da região de Entrega</div>
                    </div>
                )
            }

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
                  <div className="collapsible-header active">
                    <h4>{item.Name} <span className="secondary-content">R$ {item.total.toFixed(2)}</span></h4>

                    </div>
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
                                    {this.campoOpcionais(item)}
                                </ul>
                            </div>
                        </div>
                  </div>
                </li>
        )
    }


    campoOpcionais(prod){
        if(prod.opcoes == null || prod.opcoes.length == 0){
            return (<li className="collection-item">Não Possui</li> )
        }else{
            return prod.opcoes.map((item, k)=><li key={k} className="collection-item">{item.Title}<span className="secondary-content">{item.Value == '0.00' ? 'Grátis' : 'R$ '+item.Value}</span></li> )
        }
    }


    calcTotal(){
        let enderecos = this.props._empresa.regioes.valor;
        let val = 0;
        if(this.state.regiao){
            if(this.state.regiao in enderecos){
                val = Number(this.props.pedido.total()) + Number(enderecos[this.state.regiao]);
                return 'R$ ' + val;
            }else{
                return 'Não Entregamos'
            }
        }else{
            val = 'R$ ' + this.props.pedido.total();
            return val;
        }

    }

}