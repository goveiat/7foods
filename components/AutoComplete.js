import React, {PropTypes} from 'react';



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
            <input placeholder={this.props.placeholder} type="text" id={this.props.id} />
        )
    }

}

