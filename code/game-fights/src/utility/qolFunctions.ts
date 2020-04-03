/* 
    Quality of Life Functions  
*/

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