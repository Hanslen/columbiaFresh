import React, {Component} from 'react';
import Button from '../../UI/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
class directions extends Component{
    state = {
        directions: [""]
    }
    addDirections = () => {
        let oldState = this.state.directions;
        oldState.push("");
        this.setState({"directions": oldState});
    }
    deleteDirections = (id) => {
        let oldState = this.state.directions;
        if(oldState.length == 1){
            return ;
        }
        oldState.splice(id,1);
        this.setState({"directions":oldState});
        this.props.deleteDirection(id);
    }
    updateDirection = (id, e) => {
        let oldState = this.state.directions;
        oldState[id] = e.target.value;
        this.setState({"directions": oldState});
        this.props.updateDirection(id, e.target.value);
    }
    render(){
        let liClasses = ["media", "direction-list"];
        let listItems = this.state.directions.map((step, i) => 
            <li key={i+1} className={liClasses.join(' ')}>
                <div className="direction-num">{i+1}</div>
                <div className="media-body">
                    <input type="text"className="form-control addDirections" placeholder="How to cook" value={step} onChange={(e) => this.updateDirection(i, e)}/>
                    <span style={{marginTop:"8px",float:"right"}} onClick={() => this.deleteDirections(i)}>X</span>
                </div>
            </li>
        );
        return (
            <div className="mt-5">
                <div className="row">
                    <div className="col-9">
                        <h3>Directions</h3>
                    </div>
                </div>
                <hr className="mt-1 mb-1"/>
                <ul className="list-group">
                    {listItems}
                    <Button btnValue="Add more" style={{width:"30%"}} onClick={this.addDirections}/>
                </ul>
                <br/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        directions: state.addRecip.directions
    };
}
const mapDispatchToProps = dispatch => {
    return {
        addDirection: () => dispatch(actions.addDirection()),
        deleteDirection: (id) => dispatch(actions.deleteDirection(id)),
        updateDirection: (id, value) => dispatch(actions.updateDirection(id,value))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(directions);