import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
class ingredientBox extends Component{
    deleteIngredient = (id) => {
        this.props.deleteIngredients(id);
    }
    updateType = (id, e)=>{
        this.props.updateType(id,e.target.value);
    }
    updateQuantity = (id, e) => {
        this.props.updateNum(id, e.target.value);
    }
    updateUnit = (id, e) => {
        this.props.updateUnit(id, e.target.value);
    }
    render(){
        return (
            <li className="list-group-item borderless">
                <input type="text" className="form-control addIngredients" placeholder="Ingredient" value = {this.props.type} onChange={(e)=>this.updateType(this.props.id, e)}/>
                <input type="text" className="form-control addIngredients" placeholder="Quantity" value={this.props.num} onChange={(e)=>this.updateQuantity(this.props.id, e)}/>
                <input type="text" className="form-control addIngredients" placeholder="Unit" value={this.props.unit} onChange={(e) => this.updateUnit(this.props.id, e)}/>
                <span style={{marginTop:"8px",float:"right"}} onClick={() => this.deleteIngredient(this.props.id)}>X</span>
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
        deleteIngredients: (id) => dispatch(actions.deleteIngredients(id)),
        updateType: (id, value) => dispatch(actions.updateType(id, value)),
        updateNum: (id, value) => dispatch(actions.updateNum(id, value)),
        updateUnit: (id, value) => dispatch(actions.updateUnit(id, value))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ingredientBox);