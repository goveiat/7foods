import React from 'react';


export default class Carousel extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            items: [],
        }
    }

    static defaultProps = {
        options: {},
        api: null,
        sel: 'jsx-carousel'
    }

    componentDidMount(){

        if(this.props.api !== null){
            var {origin, pathname} = this.props.api;
            $.ajax({
                url: origin + pathname,
                type: 'GET',
                dataType: 'json',
                success: (data) => {
                    this.setState({items : data});
                },
                error: (e) => {
                    console.error(e.responseText)
                }
            })
        }
    }

    componentDidUpdate(){
        $('.' + this.props.sel).carousel(this.props.options);
    }

    render() {
        if(this.hasMounted()){
            return (
                <div className={'carousel carousel-slider '+this.props.sel}>
                    {this.state.items.map((item, k) =>
                        <a className="carousel-item" key={k} ><img alt={item.alt} src={this.props.api.origin + item.src} /></a>
                    )}
                </div>
            )
        }else{
            return (<div></div>)
        }
    }

    hasMounted(){
        return this.state.items.length > 0;
    }
}