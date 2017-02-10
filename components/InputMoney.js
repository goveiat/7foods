import React, {PropTypes} from 'react';
import MediaQuery from 'react-responsive';
import SimpleCurrencyInput from 'react-simple-currency';


export default class InputMoney extends React.Component {


    constructor(props){
        super(props);

        this.state = {

        }
    }

    static defaultProps = {
        labelInput: 'label',
    }


    componentDidMount(){
        Materialize.updateTextFields()
    }

    render() {
        return (
            <div>
                <MediaQuery minWidth={600}>
                  {(matches) => {
                      if(matches){
                        return this.body(600);
                      }else{
                        return this.body(480);
                      }
                  }}
                </MediaQuery>
            </div>
        )
    }

    body(view){
      let inpF = '';
      if(view == 480){
          inpF = 'input-field';
      }
      return (
        <div className={inpF}>
            <SimpleCurrencyInput
                id={this.props.id}
                value={this.props.value}
                precision={2}
                separator=','
                delimiter='.'
                unit='R$'
                onInputChange={(raw, display) => {this.props.onChange(raw, display)}}
            />
            {this.showLabel(inpF)}
        </div>
      )
    }

    showLabel(inpF){
      if(inpF != ''){
        return (<label className="active"  htmlFor={this.props.id}>{this.props.labelInput}</label>)
      }else{
        return false;
      }
    }

}

InputMoney.propTypes = {

};
