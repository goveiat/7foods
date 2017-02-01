import React from 'react';


export default class Opcoes extends React.Component {


    constructor(props){
        super(props);

        this.id = null;

        this.state = {
            checked: []
        }
    }

    static defaultProps = {
        lista: [],
        id: 0
    }

    componentWillMount(){
        let self = this;
        let checked = [];
        if(this.props.lista.length > 0){
            this.props.lista.map((item)=>{
                if(item.ISRequired == "1"){
                    checked.push(item);
                }
            });
            self.setState({checked: checked});
            self.props.setOpcoes(checked)
        }
    }

    componentDidMount(){
        var self = this;
    }

    componentDidUpdate(){

    }

    render() {
        return (
        <div>
            {this.showOpcionais()}
        </div>)
    }


    showOpcionais(){
        if(this.props.lista.length > 0){
            return (
                <ul className="collection z-depth-2">
                    {this.props.lista.map(this.showOpcao.bind(this))}
                </ul>
            )
        }else{
            return (
                <div className="card">
                    <div className="card-content">
                        Não há ingredientes opcionais para este produto.
                    </div>
                </div>
            )
        }
    }



    showOpcao(item, k){
        this.id = this.props.id +"-"+ item.IDProductoption;

        return (
            <li className="collection-item"
                key={k}
                style={{cursor: 'pointer'}}
                onClick={()=>this.changeOpcao(item)}>
                  <input  name={"tam-"+this.props.id} type="checkbox" id={this.id} value={item.IDProductoption} checked={this.isChecked(item)} onChange={()=>this.changeOpcao(item)} />
                  <label>{item.Title} {this.msgRequired(item.ISRequired)}</label>
                  <span href="#!" className="secondary-content">
                  {this.showValue(item.Value)}
                  </span>
            </li>
        )
    }

    changeOpcao(item){
        if(item.ISRequired == "1"){
            return ;
        }
        console.log(this.state.checked)
        var checked = this.state.checked;
        var i = checked.indexOf(item);
        if(i !== -1){
            checked.splice(i, 1);
        }else{
            checked = [item, ...checked];
        }
        this.setState({checked: checked});
        this.props.setOpcoes(checked)
    }


    isChecked(item){
        if(item.ISRequired == "1"){
            return true;
        }

        if(this.state.checked.indexOf(item) !== -1){
            return true;
        }else{
            return false;
        }
    }


    msgRequired(req){
        if(req == "1"){
            return (
                <span style={{fontSize: '9pt', fontStyle: 'italic'}}> Obrigatório</span>
            )
        }else{
            return false;
        }
    }

    showValue(value){
        if(value === "0.00"){
            return "Grátis"
        }else{
            return `R$ ${value.replace(".", ",")}`;
        }

    }

}