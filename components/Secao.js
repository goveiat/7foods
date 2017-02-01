import React from 'react';


export default class Secao extends React.Component {


    constructor(props){
        super(props);

        this.state = {

        }
    }

    static defaultProps = {
        styleParallax: {height: '250px'},
        titulo: 'Seção'
    }

    componentDidMount(){
        var self = this;
        $('.js-secao .parallax').parallax();
    }

    componentDidUpdate(){

    }

    render() {
        return (
        <div className="js-secao">
            <h1 className="center" >{this.props.titulo}</h1>
            <div className="parallax-container" style={this.props.styleParallax}>
              <div className="parallax"><img src={`http://ligchina.a2${this.props.img}`} /></div>
            </div>
        </div>
        )
    }

}