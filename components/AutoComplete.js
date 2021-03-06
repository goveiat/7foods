import React, {PropTypes} from 'react';
import MediaQuery from 'react-responsive';


export default class AutoComplete extends React.Component {


    constructor(props){
        super(props);

        this.state = {

        }
    }


    componentDidMount(){
      let self = this;
        $('#' + this.props.id).autocomplete({
            data: self.props.items,
            limit: 5,
        });
        $('#' + this.props.id +' + '+ 'ul.autocomplete-content').on('click', 'li', function(){
            self.props.onSelect(this.innerText);
        })
    }

    render() {
        return (
                <MediaQuery minWidth={600}>
                  {(matches) => {
                      if(matches){
                        return this.body(600);
                      }else{
                        return this.body(480);
                      }
                  }}
                </MediaQuery>
        )
    }


    body(view){
      let inpF = '';
      let place = {placeholder: this.props.placeholder};
      if(view == 480){
          inpF = 'input-field';
          place = {}
      }
      return (
        <div className={inpF}>
            <input {...place} type="text" id={this.props.id} />
            {this.showLabel(inpF)}
        </div>
      )
    }


    showLabel(inpF){
      if(inpF != ''){
        return (<label className="active"  htmlFor={this.props.id}>{this.props.placeholder}</label>)
      }else{
        return false;
      }
    }



}

