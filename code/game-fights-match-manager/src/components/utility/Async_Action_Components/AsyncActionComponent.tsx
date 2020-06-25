import React from 'react';

import OEComponent from "../OEComponent";

import UseAnimation from 'react-useanimations';

import { ComponentContents } from "../../../types/customCompositeTypes";

export interface AsyncActionComponentState{
    pending: boolean;
}

export default abstract class AsyncActionComponent<P, S extends AsyncActionComponentState = AsyncActionComponentState> 
                        extends OEComponent<P, S> {  

    protected determineComponentClassString(): string {
        return "asyncActionComponent " + this.determineAsyncActionClassString() + " " + (this.state.pending ? "pending" : "");
    }

    protected abstract determineAsyncActionClassString(): string;

    private onAsyncAction = (asyncAction: () => Promise<void>) => () => {
        this.setState({ pending: true });
        asyncAction().finally(() => this.setState({ pending: false }));
    }
    
    /**
     * [PRE] Render the controls that can be used to perform the async action.
     * @param onAsyncAction The event that calls the async action.
     */
    protected abstract renderActionControls(onAsyncAction: (asyncAction: () => Promise<void>) => () => void): ComponentContents;

    /**
     * [PRE] Render the controls as they should be when the component is waiting for the async action to be
     * performed.
     */
    protected renderActionControlsPending(): ComponentContents{
        return [ <UseAnimation animationKey="loading" className="controlsPendingAnimation" /> ]
    }

    protected renderComponentContents(){
        return this.state.pending ? this.renderActionControlsPending() : this.renderActionControls(this.onAsyncAction);
    }
    
}