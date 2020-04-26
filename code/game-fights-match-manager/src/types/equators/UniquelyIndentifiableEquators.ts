import { UniquelyIdentifiable, Question, FighterData, AnswerSubmissionData } from "../datatypes";
import IEquator from "./IEquator";
import { isUnassigned } from "../../utility/functions/qolFunctions";
import UniquelyIdentifiableCollection from "../../utility/UniquelyIdentifiableCollection";

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
export class QuestionEquator extends UniquelyIdentifiableEquator<Question>{
    
    public areEqual(a: Question, b: Question){
        if(!super.areEqual(a, b)) return false;
        else return a.text.localeCompare(b.text) === 0;
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

        if(a.engaged !== b.engaged) return false;
        if(a.name.localeCompare(b.name) !== 0) return false;
        if(a.profileImageURL.localeCompare(b.profileImageURL)) return false;

        return true;
    }
}