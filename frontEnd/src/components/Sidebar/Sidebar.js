import React from 'react';

import styles from './Sidebar.css';

class Sidebar extends React.Component {
    render() {
        let liClasses = ["list-group-item", "borderless", styles.small_item];
        let menus = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
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
