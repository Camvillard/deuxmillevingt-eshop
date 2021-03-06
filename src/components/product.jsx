import React from 'react';
import axios from 'axios';



class Product extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            lists: []
        }
    }
    componentDidMount() {
        axios.get('https://deuxmillevingt-data.herokuapp.com/products')
        .then(response => {
            console.log(response)
            this.setState({
                lists: response.data
            })
        })
        .catch(error => console.log(error))
    }
    render() {
        return (
            <div className="Lists-container">
                Lists
            </div>
        )
    }
}
export default Product;
