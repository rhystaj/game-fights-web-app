import React from 'react';

import OEComponent from "../OEComponent";

import { ComponentContents } from '../../../types/customCompositeTypes';

export interface ModalProps{
     onCancel: () => void
}

export interface ModalState{}

export default abstract class AbstractModal<P extends ModalProps, S extends ModalState> extends OEComponent<P, S>{

    protected abstract determineModalTypeClassName(): string;

    determineComponentClassString(){
        return "modal " + this.determineModalTypeClassName();
    }

    private onCancel = () => {
        this.props.onCancel();
    }

    protected abstract renderModalContents(onCancel: () => void): ComponentContents;

    renderComponentContents(){
        return[
            <div className="searchModalContent">
                {this.renderModalContents(this.onCancel)}
            </div>
        ]
    }

}