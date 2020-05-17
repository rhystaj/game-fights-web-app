import React, { Component } from 'react';

import IMatchProgressingDataInterface from "../../backend_interface/game_fights_data_interface/data_interfaces/IMatchProgessingDataInterface";

export interface MatchProgressingControlsProps<D, I extends IMatchProgressingDataInterface<D>>{
    dataInterface: I
}

export default abstract class MatchProgressingControls<D, I extends IMatchProgressingDataInterface<D>> extends 
        Component<MatchProgressingControlsProps<D, I>>{

    protected abstract get proceedButtonText(): string;

    private onProceedClick = () => {
        this.props.dataInterface.progressMatch();
    }

    private onCancelClick = () => {
        this.props.dataInterface.cancelMatch();
    }

    public render(){
        
        return(
            <div>
                <button onClick={() => this.onCancelClick()}>Cancel Match</button>
                <button onClick={() => this.onProceedClick()}>{this.proceedButtonText}</button>
            </div>
        )
    
    }

}