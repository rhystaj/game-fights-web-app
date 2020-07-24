import React from 'react';

import AbstractModal, { ModalProps, ModalState } from "./AbstractModal"

import MultiLinedTextEntry from "../Entry/Text Entry/MultiLinedTextEntry";

import { ComponentContents } from "../../../types/customCompositeTypes";

export interface TextEntryModalProps extends ModalProps{
    onConfirmEntry: (enteredValue: string) => Promise<void>
}

export default class TextEntryModal extends AbstractModal<TextEntryModalProps, ModalState>{
    
    protected determineInitialComponentState(): ModalState {
        return { };
    }

    protected determineComponentClassString(): string {
        throw new Error("Method not implemented.");
    }
    
    protected renderModalContents(onCancel: () => void): ComponentContents {
        return[
            <MultiLinedTextEntry 
                initialValue=""
                onConfirmEntry={this.props.onConfirmEntry}
                onCancelEntry={onCancel}
            />
        ]
    }

}