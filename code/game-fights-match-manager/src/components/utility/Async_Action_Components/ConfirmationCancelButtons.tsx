import React from 'react';

import AsyncActionComponent, { AsyncActionComponentState } from "./AsyncActionComponent";
import { ComponentContents } from "../../../types/customCompositeTypes";

export interface ConfimationCancelButtonsProps {
    confirmationButtonText: string,
    onConfirm: () => Promise<void>,
    onCancel: () => void
}

export default class ConfirmationCancelButtons extends AsyncActionComponent<ConfimationCancelButtonsProps, 
        AsyncActionComponentState>{
    
    protected determineAsyncActionClassString(): string {
        return "confirmationCancelButtons";
    }
    
    protected determineInitialComponentState(): AsyncActionComponentState {
        return { pending: false }
    }
    
    protected async performConfirmationAsync() {
        await this.props.onConfirm();
    }

    protected renderActionControlsPending(): ComponentContents{
        return[
            <button className="cancelButton" onClick={this.props.onCancel} disabled>Cancel</button>,
            ...(super.renderActionControlsPending() as JSX.Element[])
        ]
    }

    protected renderActionControls(onAsyncAction:(asyncAction: () => Promise<void>) => () => void): ComponentContents {
        return [
            <button className="cancelButton" onClick={this.props.onCancel}>Cancel</button>,
            <button className="confirmButton" onClick={onAsyncAction(this.performConfirmationAsync)}>{this.props.confirmationButtonText}</button>
        ]
    }

}