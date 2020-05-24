import React, { Component } from "react";
import Entry from "../Entry/Entry";

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

export default abstract class EnterableText<D> extends Component<EnterableTextProps<D>, EnterableTextState<D>>{

    constructor(props: EnterableTextProps<D>){
        super(props);

        this.state = {
            editing: false,
            currentConfirmedValue: this.props.initialValue,
            displayingSubmissionError: false
        }
    }

    protected abstract convertValueToString(value: D): string;

    protected renderText(text: string){
        return <p>{text}</p>
    }

    private onConfirmEntry = (value: D) => {
        this.props.onSubmitValue(value)
                  .then(() => {
                        this.setState({
                            editing: false,
                            currentConfirmedValue: value,
                            displayingSubmissionError: false
                        });
                  })
                  .catch(() => {
                        this.setState({
                            displayingSubmissionError: true
                        });
                  })
    } 

    private onCancelEntry = () => {
        this.setState({editing: false})
    }

    /**
     * Render the EntryConponent used to enter the data.
     */
    protected abstract renderEntry(onConfirmEntry: (value: D) => void, onCancelEntry: () => void): JSX.Element;

    /**
     * Render an error to be shown if the entered data is failed to be submitted.
     */
    protected renderSubmissionError(){
        return(<p>There was an error submitting the data.</p>);
    }

    render(){
        
        if(!this.state.editing){
            return(
                <div className={this.props.className} onClick={() => this.setState({editing: true})}>
                    {this.renderText(this.convertValueToString(this.state.currentConfirmedValue))}
                </div>
            )
        }
        else{
            return(
                <div className={this.props.className}>
                    {this.renderEntry(this.onConfirmEntry, this.onCancelEntry)}
                    {this.state.displayingSubmissionError ? this.renderSubmissionError() : <div />}
                </div>
            )
        }

    }

}