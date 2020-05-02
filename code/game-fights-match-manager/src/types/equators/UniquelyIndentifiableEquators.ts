import { UniquelyIdentifiable, Question, QuestionAnswersJudgementData, FighterData, AnswerSubmissionData } from "../datatypes";
import IEquator from "./IEquator";
import { isUnassigned } from "../../utility/functions/qolFunctions";
import UniquelyIdentifiableCollection from "../../utility/UniquelyIdentifiableCollection";
import { AnswerJudgementDataEquator } from "./DataEquators";

/**
 * [DES/PRE] Determines whether two UniquelyIdetifiable objects are equal.
 */
export abstract class UniquelyIdentifiableEquator<I extends UniquelyIdentifiable> implements IEquator<I>{
    
    areEqual(a: I, b: I): boolean{

        if(isUnassigned(a) || isUnassigned(b)) return false;

        return a.id === b.id;

    }
    
}

/**
 * Determines whether two questions are equal.
 */
export abstract class AbstractQuestionEquator<Q extends Question> extends UniquelyIdentifiableEquator<Q>{
    
    public areEqual(a: Q, b: Q){
        if(!super.areEqual(a, b)) return false;
        else return a.text.localeCompare(b.text) === 0;
    }

}

export class QuestionEquator extends AbstractQuestionEquator<Question> { }

export class QuestionAnswersJudgementEquator extends AbstractQuestionEquator<QuestionAnswersJudgementData>{

    private readonly answerJudgementDataEquator: AnswerJudgementDataEquator;

    constructor(answerJudgementDataEquator: AnswerJudgementDataEquator){
        super();
        this.answerJudgementDataEquator = answerJudgementDataEquator;
    }

    public areEqual(a: QuestionAnswersJudgementData , b: QuestionAnswersJudgementData){
        if(!super.areEqual(a, b)) return false;

        if(a.answerJudgements.length != b.answerJudgements.length) return false;
        for(let i = 0; i < a.answerJudgements.length; i++){
            if(!this.answerJudgementDataEquator.areEqual(a.answerJudgements[i], b.answerJudgements[i])){
                return false;
            }
        }

        return true;
    }

}

export class AnswerSubmissionDataEquator extends UniquelyIdentifiableEquator<AnswerSubmissionData>{

    public areEqual(a: AnswerSubmissionData, b: AnswerSubmissionData){
        if(!super.areEqual(a, b)) return false;

        if(a.question.localeCompare(b.question) !== 0) return false;
        if(a.answer.localeCompare(b.answer) !== 0) return false;
        if(a.state !== b.state) return false;
        if(a.validatedByUser !== b.validatedByUser) return false;

        return true;
    }

}

export class FighterDataEquator extends UniquelyIdentifiableEquator<FighterData>{
    public areEqual(a: FighterData, b: FighterData){
        if (!super.areEqual(a, b)) return false;

        if(a.status !== b.status) return false;
        if(a.name.localeCompare(b.name) !== 0) return false;
        if(a.profileImageURL.localeCompare(b.profileImageURL)) return false;

        return true;
    }
}