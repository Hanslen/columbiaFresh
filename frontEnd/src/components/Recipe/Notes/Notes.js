import React from 'react';

class Notes extends React.Component{
    render() {        
        return (
            <div>
                <h4>Notes</h4>
                <hr />
                <p>{this.props.notes}</p>
            </div>
        );
    }
}

export default Notes;
