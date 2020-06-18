import React from 'react';
import OEComponent from '../utility/OEComponent';

import IMatchProgressingDataInterface from "../../backend_interface/game_fights_data_interface/data_interfaces/IMatchProgessingDataInterface";

export interface MatchProgressingControlsProps<D, I extends IMatchProgressingDataInterface<D>>{
    dataInterface: I
}

export default abstract class MatchProgressingControls<D, I extends IMatchProgressingDataInterface<D>> extends 
        OEComponent<MatchProgressingControlsProps<D, I>>{

    protected determineComponentClassString(){
        return "matchProgressingControls " + this.controlsTypeClassName;
    }

    protected determineInitialComponentState(){
        return {}
    }

    /**
     * The class name for the type of MatchProgressingControl this component is.
     */
    protected abstract get controlsTypeClassName(): string;
    
    protected abstract get proceedButtonText(): string;

    private onProceedClick = () => {
        this.props.dataInterface.progressMatch();
    }

    private onCancelClick = () => {
        this.props.dataInterface.cancelMatch();
    }

    public renderComponentContents(){
        
        return[
            <button className="cancelMatchButton" onClick={() => this.onCancelClick()}>Cancel Match</button>,
            <button className="proceedMatchButton" onClick={() => this.onProceedClick()}>{this.proceedButtonText}</button>
        ]
        
    }

}