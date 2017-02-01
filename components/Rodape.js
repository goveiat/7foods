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
                © 2014 Copyright Text
                <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                </div>
              </div>
            </footer>
        )
    }




}