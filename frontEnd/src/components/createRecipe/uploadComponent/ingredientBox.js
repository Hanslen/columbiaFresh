import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Axios from '../../../axios-config';
import { checkValidity } from '../../../shared/utility';
class ingredientBox extends Component{

    deleteIngredient = (id) => {
        this.props.deleteIngredients(id);
    }
    findUnit = (type) => {
        for(let i = 0; i < this.props.suggestIngredients.length; i++){
            if(this.props.suggestIngredients[i][0] == type){
                return this.props.suggestIngredients[i][1]; 
            }
        }
        return "";
    }
    initialAuto = (e, suggestions) => {
        let a = document.createElement("div");
        a.setAttribute("id", "autocomplete-list");
        a.setAttribute("class", "autocomplete-items autoIng");
        // let suggestions = this.getSuggestions(e.target.value);
        document.getElementById("parentBox"+this.props.id).appendChild(a);
        for(let i = 0; i < suggestions.length; i++){
            let b = document.createElement("div");
            b.setAttribute("class","autocomplete-activee");
            b.innerHTML = "<strong>"+suggestions[i][0].substring(0, e.target.value.length)+"</strong>";
            b.innerHTML += suggestions[i][0].substring(e.target.value.length);
            b.innerHTML += "<input type='hidden' value='"+suggestions[i][0]+"'>";
            b.addEventListener("click", (be) => {
                let updateBox = document.getElementById("ingredient"+this.props.id);
                updateBox.value = be.target.getElementsByTagName("input")[0].value;
                let updateUnit = document.getElementById("unit"+this.props.id);
                updateUnit.disabled = true;
                updateUnit.value= this.findUnit(be.target.getElementsByTagName("input")[0].value);
                this.props.updateType(this.props.id, updateBox.value, updateUnit.value);
                this.closeAllLists();
            });
            a.appendChild(b);
        }
    }
    updateType = (id, e)=>{
        let updateUnit = document.getElementById("unit"+this.props.id);

        this.props.updateType(id,e.target.value, updateUnit.value);
        updateUnit.disabled = false;
                
        let suggestions = this.getSuggestions(e.target.value);
        if(!document.getElementById("autocomplete-list")){
            this.initialAuto(e, suggestions);
        }
        else{
            let a = document.getElementsByClassName("autocomplete-items");
            for(let i = 0; i < a.length; i++){
                a[i].parentNode.removeChild(a[i]);
            }
            this.initialAuto(e, suggestions);
        }

    }
    closeAllLists = (elmt) => {
        let x = document.getElementsByClassName("autocomplete-items");
        for(let i = 0; i < x.length; i++){
            if(elmt != x[i]){
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    updateQuantity = (id, e) => {
        console.log("typing");
        if(!checkValidity(e.target.value, {isNumber: true}) && (e.target.value != "")){
            alert("Please enter a number");
            return ;
        }
        this.props.updateNum(id, e.target.value);
    }
    updateUnit = (id, e) => {
        this.props.updateUnit(id, e.target.value);
    }
    escapeRegexCharacters = (str) =>{
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    getSuggestions = (value) => {
        const escapedValue = this.escapeRegexCharacters(value.trim());
        // console.log(escapedValue);
        if (escapedValue === '') {
          return [];
        }
        const regex = new RegExp('^' + escapedValue, 'i');
        // const regex = new RegExp("^(?:(the|a)\s)?" + escapedValue, "i");
        return this.props.suggestIngredients.filter(sug => regex.test(sug[0]));
    }
    render(){
        document.addEventListener("click", (e) => {
            this.closeAllLists(e.target);
        });
        let boxId = "ingredient"+this.props.id;
        let unitId = "unit"+this.props.id;
        let parentBox = "parentBox"+this.props.id;
        return (
            <li className="list-group-item borderless">
                <div id={parentBox}>
                    <input type="text" id={boxId} className="form-control addIngredients" placeholder="Ingredient" value = {this.props.type} onChange={(e)=>this.updateType(this.props.id, e)}/>
                </div>
                <input type="text" className="form-control addIngredients" placeholder="Quantity" value={this.props.num} onChange={(e)=>this.updateQuantity(this.props.id, e)}/>
                <input type="text" id={unitId} className="form-control addIngredients" placeholder="Unit" value={this.props.unit} onChange={(e) => this.updateUnit(this.props.id, e)}/>
                <span style={{marginTop:"8px",float:"right"}} onClick={() => this.deleteIngredient(this.props.id)}>X</span>
            </li>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ingredients: state.addRecip.ingredients,
        suggestIngredients: state.addRecip.suggestIngredients
    };
}
const mapDispatchToProps = dispatch => {
    return {
        deleteIngredients: (id) => dispatch(actions.deleteIngredients(id)),
        updateType: (id, value, unit) => dispatch(actions.updateType(id, value, unit)),
        updateNum: (id, value) => dispatch(actions.updateNum(id, value)),
        updateUnit: (id, value) => dispatch(actions.updateUnit(id, value))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ingredientBox);