import React from 'react';
import Tamanhos from './Tamanhos';
import Opcoes from './Opcoes';

export default class ModalProduto extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            abaAtiva: '1',
            tamanhoSel: null,
            opcoesSel: null,
            qtd: null,
        }
    }

    static defaultProps = {

    }

    componentDidMount(){
        var self = this;
        $(`#modalTamanho-${this.props.group_id}`).modal({
            ready: function(){
                $(this).find('.tabs').first().tabs({
                    onShow: function(el){
                        self.setState({abaAtiva: el[0].dataset.index});
                    }
                });
            }
        });

    }

    componentDidUpdate(){

    }

    render() {
        return (
          <div id={"modalTamanho-"+this.props.group_id} style={{overflowX: 'hidden'}}  className="js-modalTamanho modal modal-fixed-footer">
                <ul className="tabs" style={{overflowX: 'hidden'}}>
                    <li className="tab col s4 active"><a href={"#tab1-"+this.props.group_id}>Tamanhos</a></li>
                    <li className="tab col s4"><a href={"#tab2-"+this.props.group_id}>Opções</a></li>
                    <li className="tab col s4"><a href={"#tab3-"+this.props.group_id}>Quantidade</a></li>
                  </ul>

            <div className="modal-content">
                <div id={"tab1-"+this.props.group_id} data-index="1">
                    <Tamanhos lista={this.props.tamanhos} id={this.props.group_id} setTamanho={this.setTamanho.bind(this)} />
                </div>
                <div id={"tab2-"+this.props.group_id} data-index="2">
                    <Opcoes lista={this.props.opcoes} id={this.props.group_id} setOpcoes={this.setOpcoes.bind(this)} />
                </div>
                <div id={"tab3-"+this.props.group_id} data-index="3">
                   <div className="card">
                        <div className="card-content">
                            <div className="row">
                                <div className="col s12 m4 l2 input-field">
                                      <input onChange={this.setQtd.bind(this)} id="last_name" type="text" className="validate" />
                                      <label htmlFor="last_name">Quantidade</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
              {this.showBtn()}
            </div>
          </div>
        )
    }

    showBtn(){
        switch(this.state.abaAtiva){
            case '1':
                return (<a onClick={this.goProximo.bind(this)} className=" waves-effect waves-green btn-flat">Próximo</a>);
            break;
            case '2':
                return (
                    <div>
                        <a onClick={this.goProximo.bind(this)} className=" waves-effect waves-green btn-flat">Próximo</a>
                        <a onClick={this.goAnterior.bind(this)} className=" waves-effect waves-green btn-flat">Anterior</a>
                    </div>
                );
            break;
            case '3':
                return (
                    <div>
                        <a className=" waves-effect waves-green btn-flat" onClick={this.formataItem.bind(this)}>Adicionar</a>
                        <a onClick={this.goAnterior.bind(this)} className=" waves-effect waves-green btn-flat">Anterior</a>
                    </div>
                );
            break;
        }
    }

    setQtd(e){
        this.setState({qtd: e.target.value})
    }

    setTamanho(id){
        this.setState({tamanhoSel: id})
    }

    setOpcoes(ids){
        this.setState({opcoesSel: ids})
    }


    goProximo(){
        var i = Number(this.state.abaAtiva) + 1;
        $("#modalTamanho-"+this.props.group_id +' ul.tabs').tabs('select_tab', "tab"+i+"-"+this.props.group_id);
    }

    goAnterior(){
        var i = this.state.abaAtiva - 1;
        $("#modalTamanho-"+this.props.group_id +' ul.tabs').tabs('select_tab', "tab"+i+"-"+this.props.group_id);
    }


    formataItem(){
        let dados = {
            tamanho: this.state.tamanhoSel,
            group_id: this.props.group_id,
            Image: this.props.Image,
            Name: this.props.Name,
            IDProduct: this.props.IDProduct,
            opcoes: this.state.opcoesSel,
            qtd: this.state.qtd
        }

        this.props.addItensPedido(dados);

        $(`#modalTamanho-${this.props.group_id}`).modal('close');
    }

}