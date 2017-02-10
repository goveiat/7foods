import React from 'react';


export default class Rodape extends React.Component {


    constructor(props){
        super(props);

        this.state = {

        }
    }

    static defaultProps = {

    }

    componentDidMount(){
        var self = this;
    }

    componentDidUpdate(){

    }

    render() {
        return (
          <footer className="page-footer" style={{marginTop: 0}}>
              <div className="footer-copyright">
                <div className="container">
                © 2017 A2Portais
                <a className="grey-text text-lighten-4 right" href="/"><i className="material-icons">favorite</i></a>
                </div>
              </div>
            </footer>
        )
    }




}