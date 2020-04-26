import { UniquelyIdentifiable } from '../../types/datatypes';

import { FetchFunction, QueryCallback } from '../../types/functionTypes';

export function fetchAndSelect<T extends UniquelyIdentifiable> (fetchFunction: FetchFunction<T[]>, selectedDataIds: number[], 
    onDataFetchedAndSelected: QueryCallback<{fetched: T[], selected: T[]}>){

    let fetchedIdentifiables: T[] = [];
    let selectedIdentifiables: T[] = [];
    
    const afterFetch = (fetchedData: T[]) => {
        
        //Sort the data into selectedIdentfiables, if they have an id that was given in the selectedDataIds array, and
        //fectchedIdentifables if they don't.
        fetchedData.forEach((i: T) => {
            if(selectedDataIds.indexOf(i.id) > -1){
                selectedIdentifiables.push(i);
            }
            else{
                fetchedIdentifiables.push(i);
            }
        });

        onDataFetchedAndSelected({fetched: fetchedIdentifiables, selected: selectedIdentifiables})

    }

    fetchFunction(afterFetch);

}