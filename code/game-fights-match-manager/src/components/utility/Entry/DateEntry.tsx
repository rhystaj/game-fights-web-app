import React, { ChangeEvent } from 'react';

import assert from 'assert';

import Entry from "./Entry";

export default class DateEntry extends Entry<Date>{
    
    protected get EntryTypeClassName(): string {
        return "dateEntry";
    }
    
    /**
     * Render a dropdown that lists numbers between the given max and min.
     * @param min 
     * @param max 
     */
    protected renderNumberDropdown(value: number, min: number, max: number, 
        onChange: (e: ChangeEvent<HTMLSelectElement>) => void, 
        labelGenerator: (value: number) => string = (value: number) => value.toString()){
        
        //Preconditions
        assert(max >= min, "Precondition Fail: The given max value should be larger than the given min value.")


        const values = new Array<number>(max - min);
        for(let i: number = 0; i < (max - min); i++){
            values[i] = min + i;
        }
        
        return(
            <select onChange={onChange} value={value}>
                {values.map(i => (<option value={i}>{labelGenerator(i)}</option>))}
            </select>
        )
    }

    /**
     * Set the day of the day of the date being entered.
     * @param dayString 
     */
    private setEnteredDayOfMonth(dayString: string){
        const newDate = new Date(this.ValueBeingEntered);
        newDate.setDate(parseInt(dayString));

        this.setState({ valueBeingEntered: newDate });
    }

    /**
     * Set the month of the date being entered.
     * @param monthString 
     */
    private setEnteredMonth(monthString: string){
        const newDate = new Date(this.ValueBeingEntered);
        newDate.setMonth(parseInt(monthString));

        this.setState({ valueBeingEntered: newDate });
    }

    /**
     * Set the year of the date being entered.
     * @param yearString
     */
    private setEnteredYear(yearString: string){
        const newDate = new Date(this.ValueBeingEntered);
        newDate.setFullYear(parseInt(yearString));

        this.setState({ valueBeingEntered: newDate });
    }
    
    protected convertNumberToMonth(value: number): string {
        switch(value){
            case 0: return "Jan";
            case 1: return "Feb";
            case 2: return "Mar";
            case 3: return "Apr";
            case 4: return "May";
            case 5: return "Jun";
            case 6: return "Jul";
            case 7: return "Aug";
            case 8: return "Sep";
            case 9: return "Oct";
            case 10: return "Nov";
            case 11: return "Dec";

            default: return "";
        }
    }

    protected renderEntryArea(): JSX.Element {
        
        const thisYear = new Date(Date.now()).getFullYear();

        return(
            <div className="dateEntryArea">
                {this.renderNumberDropdown(this.ValueBeingEntered.getDate(), 1, 31, 
                    (e: ChangeEvent<HTMLSelectElement>) => { this.setEnteredDayOfMonth(e.target.value) }) }
                {this.renderNumberDropdown(this.ValueBeingEntered.getMonth(), 1, 12,
                    (e: ChangeEvent<HTMLSelectElement>) => { this.setEnteredMonth(e.target.value) },
                    this.convertNumberToMonth) }
                {this.renderNumberDropdown(this.ValueBeingEntered.getFullYear(), this.props.initialValue.getFullYear(), 
                    thisYear + 2, (e: ChangeEvent<HTMLSelectElement>) => { this.setEnteredYear(e.target.value) }) }
            </div>
        );

    }

}