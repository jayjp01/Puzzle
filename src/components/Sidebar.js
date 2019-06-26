import React, { Component } from 'react';
class Sidebar extends Component {
    render() {
        const txtClass = {
            opacity: (this.props.solving) ? `1` : `0`,
            color: `white`,
        };
        return (
            <div className="sidebar">
                <p style={txtClass}>Solving...</p>
            </div>
        )
    }
}

export default Sidebar;