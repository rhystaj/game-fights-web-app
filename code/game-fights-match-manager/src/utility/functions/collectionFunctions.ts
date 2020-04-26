import assert from 'assert';

import { Collection } from 'typescriptcollectionsframework';

import { isUnassigned } from './qolFunctions';

/**
 * [DES/PRE] Determines whether a condition holds true for all elements of a collection.
 * @param collection The collection in question.
 * @param predicate The predicate that describes the condition that should hold for all elements in the collection.
 */
export function trueForAllInCollection<T>(collection: Collection<T>, predicate: (t: T) => boolean): boolean{

    //Preconditions
    assert(!isUnassigned(collection), "Precondition Fail: The given collection should not be unassigned or null.");
    assert(!isUnassigned(predicate), "Precondition Fail: The given predicate should not be undefined or null.")


    let result: boolean = true;
    collection.forEach({
        accept: (t: T) => {
            if(!predicate(t)){
                result = false;
            }
        }
    });

    return result;

}