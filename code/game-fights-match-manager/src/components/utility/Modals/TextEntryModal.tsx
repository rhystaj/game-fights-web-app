import React from 'react';

import AbstractModal, { ModalProps, ModalState } from "./AbstractModal"

import MultiLinedTextEntry from "../Entry/Text Entry/MultiLinedTextEntry";

import { ComponentContents } from "../../../types/customCompositeTypes";

export interface TextEntryModalProps extends ModalProps{
    promptText: string,
    defaultText: string,
    onConfirmEntry: (enteredValue: string) => Promise<void>
}

export default class TextEntryModal extends AbstractModal<TextEntryModalProps, ModalState>{
    
    protected determineModalTypeClassName(): string {
       return "textEntryModal";
    }
    
    protected determineInitialComponentState(): ModalState {
        return { };
    }
    
    protected renderModalContents(onCancel: () => void): ComponentContents {
        return[
            <p>{this.props.promptText}</p>,
            <MultiLinedTextEntry 
                initialValue={this.props.defaultText}
                onConfirmEntry={this.props.onConfirmEntry}
                onCancelEntry={onCancel}
            />
        ]
    }

}