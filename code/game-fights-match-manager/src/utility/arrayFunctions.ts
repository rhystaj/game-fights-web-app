import { isUnassigned } from "./qolFunctions";

/**
 * Determines whether all values in an array have been assigned, i.e. are not null or undefined.
 * @param array 
 */
export function allValuesAssigned<T>(array: T[]): boolean{

    let result: boolean = true;
    array.forEach((t: T) => {
        if(isUnassigned(t)){
            result = false;
        }
    })

    return result;

}

/**
 * Creates a shallow clone of an array.
 * @param array The array to clone.
 */
export function shallowCloneArray<I>(array: I[]): I[]{
    return array.filter((e: I) => true);
}

/**
 * Determines whenther two arrays contain the same number of the same elements, regardless of the order they are in.
 * @param arrayA The first array.
 * @param arrayB The second array.
 * @param equalityChecker The function used to determine whether two elements of the arrays are equal.
 */
export function shareElementsExactly<I>(arrayA: I[], arrayB: I[], equalityChecker: (a: I, b : I) => boolean): boolean{

    if(arrayA.length !== arrayB.length){
        //If two elements are not the same size, then there is no way they contain the same elements.
        return false;
    }

    let result: boolean = true;

    let arrayAFiltered = shallowCloneArray(arrayA);
    let arrayBFiltered = shallowCloneArray(arrayB);

    arrayA.forEach((currentElement: I) => {
        
        arrayAFiltered = arrayAFiltered.filter((elementInA: I) => !equalityChecker(currentElement, elementInA));
        arrayBFiltered = arrayBFiltered.filter((elementInB: I) => !equalityChecker(currentElement, elementInB));

        if(arrayA.length !== arrayB.length){
            //If the arrays are not the same size after the removal of an element, it means that they did not contain
            //the same number of instances of that element, so they are not the same.
            result = false;
        }

    });

    return result;

}

/**
 * Determine the number of elements in an array that fulfill a certain condition.
 * @param array The array being checked.
 * @param predicate The condition being checked.
 */
export function numberOfElementsThat<T>(array: T[], predicate: (t: T) => boolean): number{
    return array.filter((element: T) => !predicate(element)).length;
}

/**
 * Determine whether a condition holds for all elements in an array.
 * @param array The array in question.
 * @param predicate The predicate that describes the condition that should hold for all elements in the array.
 */
export function trueForAllInArray<T>(array: T[], predicate: (t: T) => boolean): boolean{
    return array.map<boolean>((t: T) => predicate(t))
                .reduce((prevValue: boolean, currentValue: boolean) => prevValue && currentValue, true);
}