import React, {PropTypes} from 'react';
import MediaQuery from 'react-responsive';



export default class DropDown extends React.Component {


    constructor(props){
        super(props);

        this.state = {

        }
    }

    static defaultProps = {
        labelInput: 'label',
    }


    componentDidMount(){
        $('#'+this.props.id).dropdown();
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
            <input  id={this.props.id}  type="text" data-activates={this.props.id + '-ul'} value={this.props.selecionado[this.props.label]} readOnly={true} />
            {this.showLabel(inpF)}
            <ul id={this.props.id + '-ul'} className='dropdown-content'>
              {this.props.items.map((item, k) =>
                  <li key={k} ><a onClick={() => {
                      this.props.onSelect(item);
                  }}>{item[this.props.label]}</a></li>
                )}
            </ul>
        </div>
      )
    }

    showLabel(inpF){
      if(inpF != ''){
        return (<label  htmlFor={this.props.id}>{this.props.labelInput}</label>)
      }else{
        return false;
      }
    }

}

DropDown.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array,
  onSelect: PropTypes.func,
};
