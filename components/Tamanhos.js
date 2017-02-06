import React from 'react';


export default class Tamanhos extends React.Component {


    constructor(props){
        super(props);

        this.id = null;

        this.state = {
            checked: null,
            half: null,
        }
    }

    static defaultProps = {
        lista: [],
        id: 0
    }

    componentDidMount(){
        this.setState({checked: this.props.lista[0]});
        this.props.setTamanho(this.props.lista[0]);
    }

    componentDidUpdate(){

    }

    render() {
        return (
            <div>
                <ul className="collection z-depth-2">
                    {this.props.lista.map(this.showTamanho.bind(this))}
                </ul>
                {this.showHalf()}
            </div>
        )
    }

    showHalf(){
        if(this.state.half != null){
            if(Number(this.state.half.Additional) > 0){
                return (
                    <div className="card">
                        <div className="card-content">
                            <p>Por apenas mais <strong>R$ {this.numberFormat(this.state.half.Additional)}</strong>, escolha outro produto para o meio a meio.</p>
                        </div>
                    </div>
                )
            }else{
                return (
                    <div className="card">
                        <div className="card-content">
                            <p>Adicione grátis a metade de um outro produto!</p>
                        </div>
                    </div>
                )
            }

        }else{
            return false;
        }
    }


    showTamanho(item, k){
        this.id = this.props.id +"-"+ item.IDSize;

        return (
            <li className="collection-item"
                key={k}
                style={{cursor: 'pointer'}}
                onClick={()=> this.changeTamanho(item)}>
                  <input
                    name={"tam-"+this.props.id}
                    type="radio" id={this.id}
                    value={item.IDSize}
                    checked={this.state.checked === item}
                    onChange={() => this.changeTamanho(item)}
                    />
                  <label>{item.Name} {this.msgHalf(item.Half)}</label>
                  <span className="secondary-content">
                  R$ {item.valor.replace(".", ",")}
                  </span>
            </li>
        )
    }

    changeTamanho(item){
        this.setState({checked: item});
        this.setHalf(item);
        this.props.setTamanho(item)
    }

    setHalf(item){
        if(item.Half == '1'){
            this.setState({half: item});
        }else{
            this.setState({half: null});
        }
    }

    numberFormat(num){
        return Number(num).toFixed(2).replace(".", ",");
    }

    msgHalf(half){
        if(half == "1"){
            return (
                <span style={{fontSize: '9pt', fontStyle: 'italic'}}> Permite Meio a Meio</span>
            )
        }else{
            return false;
        }
    }

}