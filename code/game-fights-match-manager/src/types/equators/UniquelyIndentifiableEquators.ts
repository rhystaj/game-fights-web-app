import { UniquelyIdentifiable, Question, FighterData } from "../datatypes";
import IEquator from "./IEquator";
import { isUnassigned } from "../../utility/qolFunctions";

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

export class FighterDataEquator extends UniquelyIdentifiableEquator<FighterData>{
    public areEqual(a: FighterData, b: FighterData){
        if (!super.areEqual(a, b)) return false;

        if(a.engaged !== b.engaged) return false;
        if(a.name.localeCompare(b.name) !== 0) return false;
        if(a.profileImageURL.localeCompare(b.profileImageURL)) return false;

        return true;
    }
}