import IEquator from './IEquator';
import { ParticipantAnswerData } from '../datatypes';
import { FighterDataEquator } from './UniquelyIndentifiableEquators';

export class ParticipantAnswerDataEquator implements IEquator<ParticipantAnswerData>{
    
    private readonly fighterDataEquator: FighterDataEquator;

    constructor(fighterDataEquator: FighterDataEquator = new FighterDataEquator()){
        this.fighterDataEquator = fighterDataEquator;
    }

    public areEqual (a: ParticipantAnswerData, b: ParticipantAnswerData){
        if(a.answer.localeCompare(b.answer) !== 0) return false;
        if(!this.fighterDataEquator.areEqual(a.participant, b.participant)) return false;
        if(a.state !== b.state) return false;

        return true;
    }

}