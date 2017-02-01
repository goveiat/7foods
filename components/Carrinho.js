import React from 'react';


export default class Carrinho extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            pagamento: 0,
        }
    }

    static defaultProps = {
        nmSecao: 'Carrinho',
        showTitulo: true,
    }

    componentDidMount(){
        var self = this;
        $('.js-carrinho .collapsible').collapsible();
        $('.js-carrinho  select').material_select();
    }

    componentDidUpdate(){

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

    showData(){
        if(this.props.countPedido() > 0){
          return (
                <div style={{padding: '50px 0'}} className="flow-text">
                    <ul className="collapsible" data-collapsible="expandable">
                    {this.props.getPedido().map(this.showPedido.bind(this))}
                  </ul>

                  <div className="card z-depth-2">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s4">Valor a Pagar</div>
                            <div className="col s8 secondary-content" style={{textAlign:  'right'}}>R$ {this.props.getTotal()}</div>
                        </div>
                        <div className="row">
                            <div className="col s4">Forma de Pagamento</div>
                            <div className="col s8">
                                <select value={this.state.pagamento} onChange={()=>this.setState({pagamento: item.IDPaymenttype})}>
                                  <option value={0} disabled>Selecione</option>
                                  {this.props.tipo_pagamento.map((item, k) =>
                                    <option key={k} value={item.IDPaymenttype}>{item.Title}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        {this.campoTroco()}
                        <div className="row">
                            <div className="col s4">Entrega</div>
                            <div className="col s8">
                                <select value="0" onChange={()=>{console.log('ooo')}}>
                                  <option value="0" disabled>Selecione</option>
                                  <option value="1">Option 1</option>
                                  <option value="2">Option 2</option>
                                  <option value="3">Option 3</option>
                                </select>
                            </div>
                        </div>

                    </div>
                  </div>
                </div>
            )
        }else{
            return (<h2 style={{padding: '50px', textAlign: 'center'}} >Seu Carrinho está Vazio</h2>)
        }
    }


    campoTroco(){
        if(this.state.pagamento == 1){
            return (
                <div className="row">
                    <div className="col s4">Troco para</div>
                    <div className="col s8">
                        <div className="input-field col s6">
                          <input type="text" className="validate" />
                        </div>
                    </div>
                </div>
            )
        }else{
            return false;
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