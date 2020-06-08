import React, { Component } from 'react';

import { ComponentContents } from '../../types/customCompositeTypes';

/**
 * A generic react component with additional functionality.
 */
export default abstract class OEComponent<P = {}, S = {}> extends Component<P, S>{

    /**
     * The string that defines the classes that the element inherits from.
     */
    protected abstract determineComponentClassString(): string;

    /**
     * The behaviour that is to be performed when the component is clicked.
     */
    protected determineOnClickBehaviour(){
        return () => { }
    }

    /**
     * Render the elements that make up the contents of this component.
     */
    protected abstract renderComponentContents(): ComponentContents;

    public render(){

        return(
            <div 
                className={"OEComponent " + this.determineComponentClassString()}
                onClick={this.determineOnClickBehaviour()}
            >
                {this.renderComponentContents()}
            </div>
        )

    }

}