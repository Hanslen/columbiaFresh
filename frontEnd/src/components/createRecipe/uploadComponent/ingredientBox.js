import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
class ingredientBox extends Component{
    deleteIngredient = (id) => {
        this.props.deleteIngredients(id);
    } 
    render(){
        return (
            <li className="list-group-item borderless">
                <input type="text" className="form-control addIngredients" placeholder="Ingredient" id="ingtype"/>
                <input type="text" className="form-control addIngredients" placeholder="Quantity" id="ingnum"/>
                <input type="text" className="form-control addIngredients" placeholder="Unit" id="ingunit"/>
                <span style={{marginTop:"8px",float:"right"}} onClick={(id) => this.deleteIngredient(this.props.id)}>X</span>
            </li>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ingredients: state.addRecip.ingredients
    };
}
const mapDispatchToProps = dispatch => {
    return {
        deleteIngredients: (id) => dispatch(actions.deleteIngredients(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ingredientBox);