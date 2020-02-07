import React, { Component } from 'react';

class TextEntry extends Component{
    
    constructor(props){
        super(props);
    }
    
    currentValue = "";

    render(){
        return(
            <div>
                <input type="textedit" onInput={e => {this.currentValue = e.target.value}}/>
                <button onClick={() => {this.props.onConfirmEntry(this.currentValue)}}>+</button>
                <button onClick={this.props.onCancelEntry}>X</button>
            </div>
        )
    }
    
}

export default TextEntry;