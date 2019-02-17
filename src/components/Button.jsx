import React, { Component } from 'react';
import './Button.css';

class Button extends Component{
    render() {
        return(
            <div>
                <input className="Button" type="button" value={this.props.name}
                       onClick={this.props.onClick} />
            </div>
        );
    }
}

export default Button;