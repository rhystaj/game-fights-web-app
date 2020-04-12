import { UniquelyIdentifiable, Question } from "../datatypes";
import IEquator from "./IEquator";
import { isUnassigned } from "../../utility/qolFunctions";

/**
 * [DES/PRE] Determines whether two UniquelyIdetifiable objects are equal.
 */
export abstract class UniquelyIdentifiableEquator<I extends UniquelyIdentifiable> implements IEquator<I>{
    
    areEqual(a: I, b: I): boolean{

        if(isUnassigned(a) || isUnassigned(b)){
            //If one values is unAssigned, the values can only be equal if both are.
            return isUnassigned(a) && isUnassigned(b);
        }

        return a.id === b.id;

    }
    
}

/**
 * Determines whether two questions are equal.
 */
export default class QuestionEquator extends UniquelyIdentifiableEquator<Question>{
    
    public areEqual(a: Question, b: Question){
        if(!super.areEqual(a, b)) return false;
        else return a.text.localeCompare(b.text) === 0;
    }

}