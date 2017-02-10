import React from 'react';
import {Link} from 'react-router';
import DropDown from './DropDown';
import AutoComplete from './AutoComplete';
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
            endereco: this.props._cliente ? this.props._cliente.enderecos[0] : false,
            numeroCartao: '',
            cvcCartao: '',
            senhaCartao: '',
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

        this.getLocalData();

        $('.js-carrinho .collapsible').collapsible();
        $('.js-carrinho select').material_select();

    }


    render() {
        return (
            <main className="js-carrinho">
                <div className="container">
                    {this.showData()}
                </div>
            </main>
        )
    }

    getLocalData(){
        let pagamento = localStorage.getItem('pagamento');
        let entrega = localStorage.getItem('entrega');
        let instantePag = localStorage.getItem('instantePag');
        let dinheiro = localStorage.getItem('dinheiro');
        let regiao = localStorage.getItem('regiao');
        let endereco = localStorage.getItem('endereco');

        if(pagamento != null){
            this.setState({pagamento: JSON.parse(pagamento)});
        }
        if(entrega != null){
            this.setState({entrega: JSON.parse(entrega)});
        }
        if(instantePag != null){
            this.setState({instantePag: JSON.parse(instantePag)});
        }
        if(dinheiro != null){
            this.setState({dinheiro: JSON.parse(dinheiro)});
        }
        if(regiao != null){
            this.setState({regiao: JSON.parse(regiao)});
        }
        if(endereco != null){
            this.setState({endereco: JSON.parse(endereco)});
        }
    }

    showData(){
        if(this.props.handlePedido.count() > 0){
          return (
                <div style={{paddingTop: '50px'}} className="flow-text">
                    <ul className="collapsible" data-collapsible="expandable">
                        {this.props.handlePedido.get().map(this.showPedido.bind(this))}
                      </ul>

                  <div className="card z-depth-2">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s4">Total em Produtos</div>
                            <div className="col s8 secondary-content" style={{textAlign:  'right'}}>R$ {this.props.handlePedido.total()}</div>
                        </div>
                        <div className="row">
                            <div className="col s4">Forma de Pagamento</div>
                            <div className="col s8">
                                <DropDown
                                    selecionado={this.state.pagamento}
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
                                    selecionado={this.state.entrega}
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
                  {this.showCheckout()}
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
                                <input value={this.state.numeroCartao} onChange={(e) => {this.setState({numeroCartao: e.target.value})}} placeholder="Nº do Cartão" type="text"/>
                            </div>
                            <div className="col s4">
                                <input value={this.state.cvcCartao} onChange={(e) => {this.setState({cvcCartao: e.target.value})}} placeholder="CVC **" type="text"/>
                            </div>
                            <div className="col s6">
                                <input value={this.state.senhaCartao} onChange={(e) => {this.setState({senhaCartao: e.target.value})}} placeholder="Senha" type="password"/>
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
                            selecionado={this.state.endereco}
                            id="enderecos"
                            label="label"
                            items={this.props._cliente.enderecos}
                            onSelect={(item) => {
                                this.setState({endereco: item, regiao: item.key});
                                localStorage.setItem('endereco', JSON.stringify(item));
                                localStorage.setItem('regiao', JSON.stringify(item.key));
                            }}
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
                        <div className="row" style={{textAlign: 'center'}}>
                            <button onClick={() => {this.submit()}} className="waves-effect waves-light btn green darken-2 btn-large">Finalizar</button>
                        </div>
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


    submit(){
        let dados = {
            pagamento: this.state.pagamento.IDPaymenttype,
            dinheiro: this.state.dinheiro,
            endereco: this.state.endereco.id,
            entrega: this.state.entrega.id,
            instantePag: this.state.instantePag.id,
            taxa: this.props._empresa.regioes.valor[this.state.endereco.id],
            numeroCartao: this.state.numeroCartao,
            cvcCartao: this.state.cvcCartao,
            senhaCartao: this.state.senhaCartao,
            pedido: this.props.handlePedido.get()
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: `api/comprar`,
            data: dados,
            headers: {"Authorization": 'Bearer ' +localStorage.getItem('jwt')},
            success: (retorno) => {
                console.log(retorno)
            },
            error: (e) => {
                console.error(e.responseText)
                this.setState({hasError: true});
            }
        });

    }


    setPagamento(item){
        if(item.IDPaymenttype == 1){
            this.setState({pagamento: item, instantePag: this.props.instantesPag[1]});
            localStorage.setItem('pagamento', JSON.stringify(item));
            localStorage.setItem('instantePag', JSON.stringify(this.props.instantesPag[1]));
        }else{
            this.setState({dinheiro: 0, pagamento: item, instantePag: this.props.instantesPag[0]});
            localStorage.setItem('dinheiro', JSON.stringify(0));
            localStorage.setItem('pagamento', JSON.stringify(item));
            localStorage.setItem('instantePag', JSON.stringify(this.props.instantesPag[0]));
        }
    }


    setEntrega(item){
        if(item.id == 'delivery'){
            this.setState({entrega: item});
            localStorage.setItem('entrega', JSON.stringify(item));
        }else{
            this.setState({regiao: false, entrega: item});
            localStorage.setItem('entrega', JSON.stringify(item));
            localStorage.setItem('regiao', JSON.stringify(false));
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
                    <AutoComplete
                        id="regioes"
                        placeholder="Informe o Bairro"
                        items={this.props._empresa.regioes.autocomplete}
                        onSelect={(sel) => {
                            this.setState({regiao: sel});
                            localStorage.setItem('regiao', JSON.stringify(sel));
                        }}
                    />

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
                          onInputChange={(raw, display) => {
                            this.setState({dinheiro: raw});
                            localStorage.setItem('dinheiro', JSON.stringify(raw));
                        }}
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
                        selecionado={this.state.instantePag}
                        id="instPag"
                        label="label"
                        items={this.props.instantesPag}
                        onSelect={(item) => {
                            this.setState({instantePag: item});
                            localStorage.setItem('instantePag', JSON.stringify(item));
                        }}
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
                            <div className="col s3" style={{textAlign: 'center'}}>
                                <img src={`http://ligchina.a2${item.Image}`} style={{width: '100%'}} alt=""/>
                                <button onClick={() => {this.props.handlePedido.remove(k)}} className="waves-effect waves-light btn" style={{fontSize: '1rem'}}>Remover</button>
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
                val = Number(this.props.handlePedido.total()) + Number(enderecos[this.state.regiao]);
                return 'R$ ' + val.toFixed(2);
            }else{
                return 'Não Entregamos'
            }
        }else{
            val = Number(this.props.handlePedido.total()).toFixed(2);
            return 'R$ ' + val;
        }

    }

}