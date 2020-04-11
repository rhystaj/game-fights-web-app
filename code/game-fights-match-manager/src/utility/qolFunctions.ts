/* 
    Quality of Life Functions  
*/

/**
 * Determines if a variable has not been assigned a value, i.e. is null or undefined.
 * @param x The value being checked.
 */
export function isUnassigned<T>(x: T){
    return x === null || x === undefined;
}

/**
 * Handles a null value by returning a specified alternative value instead.
 * @param potentiallyUnassignedValue The value that could be null
 * @param valueWhenUnassigned The value that will be returned in place of the potentiallyNullValue if it is null.
 * @returns potentiallyNull value if it is not null, and valueWhenNull if it is.
 */
export function whenUnassigned<T>(potentiallyUnassignedValue: T, valueWhenUnassigned: T){
    
    if (potentiallyUnassignedValue === null || potentiallyUnassignedValue === undefined){
        return valueWhenUnassigned; 
    }
    else {
        return potentiallyUnassignedValue;
    }
    
}