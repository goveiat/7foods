import React from 'react';
import Clamp from 'react-clamp'


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
          <div className="r-produto card card-panel hoverable">
              <div className="r-img card-image waves-effect waves-block waves-light activator" style={{background: `url(http://ligchina.a2${this.props.item.Image})`, backgroundSize: 'cover', zIndex:0}}>
              </div>
              <div className="r-content card-content">
                  <span className="r-titulo card-title activator grey-text text-darken-4"><Clamp clamp={2}>{this.props.item.Name}</Clamp></span>
              </div>
              <div className="r-reveal card-reveal" style={{zIndex: 0}}>
                  <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i><Clamp clamp={1}>{this.props.item.Name}</Clamp></span>
                  <Clamp style={{textAlign: 'justify'}} clamp={4}>{this.props.item.Description} A partir de <strong>R$ {this.props.item.minVal.replace('.',',')}.</strong></Clamp>
                  <p style={this.styles.btnVerMais} >
                      <a className="waves-effect waves-light btn" onClick={()=>{this.props.showModal(this.props.item)}}>Ver mais</a>
                  </p>
              </div>
          </div>
        )
    }

}