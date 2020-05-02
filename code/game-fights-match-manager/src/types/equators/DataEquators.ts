import IEquator from './IEquator';
import { AnswerJudgementData } from '../datatypes';
import { FighterDataEquator } from './UniquelyIndentifiableEquators';

export class AnswerJudgementDataEquator implements IEquator<AnswerJudgementData>{
    
    private readonly fighterDataEquator: FighterDataEquator;

    constructor(fighterDataEquator: FighterDataEquator){
        this.fighterDataEquator = fighterDataEquator;
    }

    public areEqual (a: AnswerJudgementData, b: AnswerJudgementData){
        if(a.answer.localeCompare(b.answer) !== 0) return false;
        if(!this.fighterDataEquator.areEqual(a.participant, b.participant)) return false;
        if(a.state !== b.state) return false;

        return true;
    }

}