import React from 'react';


export default class Preloader extends React.Component {


    constructor(props){
        super(props);

        this.sto = {msg2: null, msg3: null, msg4: null, msgErro: null};

        this.state = {
          msg: '',
        }
    }

    static defaultProps = {
        msg1: 'Por favor, aguarde...',
        msg2: 'Só mais alguns instantes...',
        msg3: 'Já está quase pronto...',
        msg4: 'Está demorando mais que o esperado...',
        msgErro: 'Ocorreu um erro, mas já estamos trabalhando nisso!',
        hasError: false,
        styleContainer: {textAlign: 'center', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, background: '#fff'},
        styleSpin: {marginTop: '100px'},
        styleText: {marginTop: '10px'}
    }

    componentDidMount(){
        this.setState({msg: this.props.msg1});

        this.sto.msg2 = setTimeout(() => {
          this.setState({msg: this.props.msg2});
        }, 1500);

        this.sto.msg3 = setTimeout(() => {
          this.setState({msg: this.props.msg3});
        }, 3000);

        this.sto.msg4 = setTimeout(() => {
          this.setState({msg: this.props.msg4});
        }, 5000);

    }

    componentDidUpdate(){
        if(this.props.hasError){
          this.sto.msgErro = setTimeout(() => {
            this.setState({msg: this.props.msgErro});
          }, 6000);
        }
    }

    componentWillUnmount(){
      for (var k in this.sto) {
        clearTimeout(this.sto[k]);
      }
    }

    render() {
        return (
          <div style={this.props.styleContainer}>
          <div style={this.props.styleSpin}>
              <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>

                <div className="spinner-layer spinner-red">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>

                <div className="spinner-layer spinner-yellow">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>

                <div className="spinner-layer spinner-green">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
          </div>
          <p style={this.props.styleText} className="flow-text grey-text text-darken-4">{this.state.msg}</p>
          </div>
        )
    }

}