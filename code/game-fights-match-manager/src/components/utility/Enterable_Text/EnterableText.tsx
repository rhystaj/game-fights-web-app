import React from "react";

import '../../../style/main.css'
import OEComponent from "../OEComponent";

type EnterableTextProps<D> = {
    className: string,
    initialValue: D,
    onSubmitValue: (value: D) => Promise<void>
}

type EnterableTextState<D> = {
    editing: boolean,
    currentConfirmedValue: D,
    displayingSubmissionError: boolean
}

export default abstract class EnterableText<D> extends OEComponent<EnterableTextProps<D>, EnterableTextState<D>>{

    constructor(props: EnterableTextProps<D>){
        super(props);
    }

    determineComponentClassString(){
        return "enterableText " + (this.state.editing ? "editing " : "") + this.props.className;
    }

    determineInitialComponentState(){
        return {
            editing: false,
            currentConfirmedValue: this.props.initialValue,
            displayingSubmissionError: false
        }
    }

    protected determineOnClickBehaviour(){
        return this.state.editing ? super.determineOnClickBehaviour() : () => this.setState({editing: true})
    }

    protected abstract convertValueToString(value: D): string;

    protected renderText(text: string){
        return <p>{text}</p>
    }

    private onConfirmEntry = async (value: D) => {
        
        try{

            await this.props.onSubmitValue(value);

            this.setState({
                editing: false,
                currentConfirmedValue: value,
                displayingSubmissionError: false
            });

        }
        catch{
            this.setState({ displayingSubmissionError: true });
        }

    } 

    private onCancelEntry = () => {
        this.setState({ editing: false });
    }

    /**
     * Render the EntryComponent used to enter the data.
     */
    protected abstract renderEntry(onConfirmEntry: (value: D) => Promise<void>, onCancelEntry: () => void): JSX.Element;

    /**
     * Render an error to be shown if the entered data is failed to be submitted.
     */
    protected renderSubmissionError(){
        return(<p>There was an error submitting the data.</p>);
    }

    renderComponentContents(){

        if(!this.state.editing){
            return this.renderText(this.convertValueToString(this.state.currentConfirmedValue))
        }
        else{
            return[
                this.renderEntry(this.onConfirmEntry, this.onCancelEntry),
                (this.state.displayingSubmissionError ? this.renderSubmissionError() : null)
            ]
        }

    }

}