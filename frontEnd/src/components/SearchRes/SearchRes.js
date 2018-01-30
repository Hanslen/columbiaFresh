import React from 'react';

class Sidebar extends React.Component {
    render() {
        let menus = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
        let listItems = menus.map(menu => 
            <li key={menu} className="list-group-item borderless">{menu}</li>
        );
        return (
            <div>
                <ul className="list-group">{listItems}</ul>
            </div>
        );
    }
}

export default Sidebar;
