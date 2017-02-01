import React from 'react';


export default class Produto extends React.Component {


    constructor(props){
        super(props);

        this.state = {

        }

        this.styles = {
            btnVerMais: {position: 'absolute', bottom: '0', textAlign: 'center', right: '0', left: '0', marginBottom: '20px',}
        }
    }

    static defaultProps = {
        Image: 'http://ligchina.a2/template/material/imgs/vazio.png',
        Name: 'Sem Nome',
    }

    componentDidMount(){
        var self = this;
    }

    componentDidUpdate(){

    }

    render() {
        return (
          <div className="card" style={{height: '300px'}}>
            <div className="card-image waves-effect waves-block waves-light activator" style={{height: '170px', background: `url(http://ligchina.a2${this.props.item.Image})`, backgroundSize: 'cover'}}>
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">{this.props.item.Name}</span>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i>{this.props.item.Name}</span>
              <p style={{textAlign: 'justify'}}>{this.props.item.Description} A partir de <strong>R$ {this.props.item.minVal.replace('.',',')}.</strong></p>
              <p style={this.styles.btnVerMais} >
                  <a className="waves-effect waves-light btn" onClick={()=>{this.props.showModal(this.props.item)}}>Ver mais</a>
              </p>
            </div>
          </div>
        )
    }

}