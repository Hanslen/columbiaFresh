import React from 'react';

import styles from './Sidebar.css';

class Sidebar extends React.Component {
    render() {
        let liClasses = ["list-group-item", "borderless", styles.small_item];
        let menus = ['Menu1', 'Menu2', 'Menu3', 'Menu4', 'Menu5'];
        let listItems = menus.map(menu => 
            <li key={menu} className={liClasses.join(' ')}>{menu}</li>
        );
        return (
            <div>
                <ul className="list-group">{listItems}</ul>
            </div>
        );
    }
}

export default Sidebar;
