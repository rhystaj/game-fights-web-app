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

    private onAsyncAction = () => {
        
        this.setState({ pending: true });

        this.performAsyncAction()
            .finally(() => this.setState({ pending: false }));
        
    }

    /**
     * [PRE] Preform the async action that will cause the component to go into a pending status while it is
     * being performed.
     */
    protected abstract performAsyncAction() : Promise<void>;
    
    /**
     * [PRE] Render the controls that can be used to perform the async action.
     * @param onAsyncAction The event that calls the async action.
     */
    protected abstract renderActionControls(onAsyncAction: () => void): ComponentContents;

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