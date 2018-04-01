import React, {Component} from 'react';
import Button from '../../UI/Button/Button';
class directions extends Component{
    state = {
        directions: ["jsjsj"]
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
    }
    render(){
        let liClasses = ["media", "direction-list"];
        let listItems = this.state.directions.map((step, i) => 
            <li key={i+1} className={liClasses.join(' ')}>
                <div className="direction-num">{i+1}</div>
                <div className="media-body">
                    <input type="text"className="form-control addDirections" placeholder="How to cook"/>
                    <span style={{marginTop:"8px",float:"right"}} onClick={(id) => this.deleteDirections(this.props.id)}>X</span>
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
export default directions;