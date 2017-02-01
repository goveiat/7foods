import React from 'react';


export default class Empresa extends React.Component {


    constructor(props){
        super(props);

        this.state = {
        }

        this.styles = {

        }
    }

    static defaultProps = {
      nmSecao: 'Sobre Nós',
      showTitulo: true,
    }

    componentDidMount(){
        var self = this;
    }

    componentDidUpdate(){

    }

    render() {
      return (
        <main className="js-empresa">
            {this.showContainer()}
        </main>
      )
    }

    showContainer(){
        if(this.props.hasData){
          return (
              <div className="container flow-text">
                <div className="row">
                  <div className="col l12 s12" style={{margin: '50px 0', textAlign: 'justify'}}>
                    {this.props.Description}
                  </div>
                  <div className="col l6 s12">
                    <ul className="collection with-header ">
                        <li className="collection-header"><h4>Entregas</h4></li>
                        {this.getAgendaSemana(this.props.h_entrega, 'Não Entrega')}
                    </ul>
                  </div>
                  <div className="col l6 s12">
                    <ul className="collection with-header">
                        <li className="collection-header"><h4>Funcionamento</h4></li>
                        {this.getAgendaSemana(this.props.h_funcionamento, 'Não Abrimos')}
                    </ul>
                  </div>
                  <div className="col l12 s12">
                    <ul className="collection with-header">
                        <li className="collection-header"><h4>Fale Conosco</h4></li>
                        <li className="collection-item">
                            E-mail
                            <div className="secondary-content">{this.props.Email}</div>
                        </li>
                        {this.getEndereco()}
                    </ul>
                  </div>
                </div>
              </div>
          )
        }else{
          return (<Preloader styleContainer={{position: 'static', textAlign: 'center'}} />)
        }
    }


    getEndereco(){
      var {enderecos} = this.props;
      return (
          Object.keys(enderecos).map((k, i) =>
               <li className="collection-item" key={i}>
                  {enderecos[k].Nickname}
                  <div className="secondary-content">
                    {enderecos[k].Address +', ' + enderecos[k].Number +', '+ enderecos[k].Address2 + ', '+ enderecos[k].City+ " - "+ enderecos[k].State}
                    <br /><br />
                    {enderecos[k].Telephone}
                  </div>
                </li>
            )
      );
    }


    getAgendaSemana(horario, msg){
        var self = this;
        var dias =  {'1': 'Seg', '2':'Ter', '3':'Qua', '4':'Qui', '5':'Sex', '6':'Sab', '7':'Dom'};
        return (
          Object.keys(dias).map((k, i) =>
               <li className="collection-item" key={i}>
                    <div>
                      {dias[k]}
                      <div className="secondary-content">{self.getAgendaDia(horario, k, msg)}</div>
                    </div>
                </li>
            )
        )
    }

    getAgendaDia(horario, dia, msg){
      if(horario[dia].length > 0){
        return (
            horario[dia].map((item, k) =>
              <span className="right" key={k} style={{marginRight: '10px'}}>{item.Opens +' - '+ item.Closes}</span>
            )
          )
      }else{
        return (<span className="f7-err"  style={{marginRight: '10px'}}>{msg}</span>)
      }
    }

}