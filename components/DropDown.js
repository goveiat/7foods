import React, {PropTypes} from 'react';



export default class DropDown extends React.Component {


    constructor(props){
        super(props);

        this.state = {

        }
    }


    componentDidMount(){
        $('#'+this.props.id).dropdown();
    }

    render() {
        return (
            <div>
                  <input id={this.props.id}  type="text" data-activates={this.props.id + '-ul'} value={this.props.selecionado[this.props.label]} readOnly={true} />
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

}

DropDown.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array,
  onSelect: PropTypes.func,
};
