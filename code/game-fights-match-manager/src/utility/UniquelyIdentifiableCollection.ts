import assert from 'assert'; 

import { UniquelyIdentifiable } from "../types/datatypes";

import { Collection, List, LinkedList, ArrayList, TreeMap, MapEntry } from 'typescriptcollectionsframework';

import { isUnassigned } from '../utility/qolFunctions';

/**
 * [DES/PRE] An immutable collection of UniquelyIdentifiable objects that ensures that no two objects within it have the
 * same id.
 */
export default class UniquelyIdentifiableCollection<I extends UniquelyIdentifiable>{

    /**
     * [DES/PRE] Determines an appropriate id for the next element to be added to a
     * UniquelyIdentifiableCollection, i.e. one not already assigned to an element in 
     * the collection, from a list of elements indexed by thier ids.
     * @param elements 
     */
    public static h_determineNextAvailiableId<I extends UniquelyIdentifiable>(elements: List<I>): number{
        
        //Preconditions
        assert(UniquelyIdentifiableCollection.a_listElementsIndexedByIds(elements),
            "Precondition Fail: The items in the given list must be indexed by thier ids.")


        let i: number = elements.size() - 1;
        while(i > 0 && isUnassigned(elements.get(i))){
            i--;
        }
        
        return elements.get(i).id + 1;

    }

    private readonly elements: List<I>;

    /**
     * An apporiate id for the next element to the added to the collection, i.e. one not already assigned to an
     * element in the collection.
     */
    public readonly nextAvaliableId: number; 

    /**
     * Constructs a UniquelyIdentifiableCollection from an array of UniquelyIdentifiable objects, provided that no two
     * objects in the array have the same id.
     * @param initialElements 
     */
    constructor(initialElements: I[]){
        
        //Sort the elements by id and ensure that there are non with duplicate keys. 
        const sortedInitialElements = new TreeMap<number, I>({
            compare: (o1: number, o2: number) => {
                return o2 - o1;
            }
        });
        for(let i: number = 0; i < initialElements.length; i++){
            
            let element: I = initialElements[i];
            if(sortedInitialElements.containsKey(element.id)){
                throw Error("Can't create a UniquelyIdentifiableCollection from given elements as the elements contains " +
                "duplicate id '" + element.id + "'.");
            }
            
            sortedInitialElements.put(element.id, element);

        }

        //Add the elements to the list at the index corresponding to thier ids.
        this.elements = new ArrayList<I>();
        sortedInitialElements.entrySet().forEach({
            accept: (entry: MapEntry<number, I>) => {
                this.elements.addIndex(entry.getKey(), entry.getValue());
            }
        });

        this.nextAvaliableId = UniquelyIdentifiableCollection.h_determineNextAvailiableId(this.elements);

    }

    /**
     * Creates a new copy of the UniquelyIdentifiableCollection with the specified element added.
     * @param newElement The element to add to the new copy of the collection.
     */
    public add(newElement: I): UniquelyIdentifiableCollection<I>{

        //Ensure that an element with the id of the new element doesn't already exist in the collection.
        if(newElement.id < this.elements.size()){
            if(!isUnassigned(this.elements.get(newElement.id))){
                throw Error("The element " + newElement + " can not be added to the UniquelyIdentifiableCollection " +
                "as the UniquelyIdentifiableCollection already contains an element with the id '" + newElement.id + "'.");
            }
        }

        let newElementArray: I[] = this.asArray();
        newElementArray.push(newElement);

        return new UniquelyIdentifiableCollection(newElementArray);

    }

    /**
     * Creates a copy of the UniquelyIdentifiableCollection with the element with the sepecified id removed. If the
     * collection doen't contain an element with the specified id, it will return itself.
     * @param id The id of the element to be removed in the copy.
     */
    public removeElementWithId(id: number): UniquelyIdentifiableCollection<I>{

        let newElementArray: I[] = this.asArray();
        newElementArray = newElementArray.filter((element: I) => {
            return element.id !== id;
        });

        return new UniquelyIdentifiableCollection(newElementArray);

    }

    /**
     * Retrieve an array that contains all elements in the collection.
     */
    public asArray(): I[]{
        
        //Condense elements into a collection that contains only them and no null values.
        let condensedElements: Collection<I> = new LinkedList<I>();
        this.elements.forEach({
            accept: (element => {
                if(!isUnassigned(element)){
                    condensedElements.add(element);
                }
            })
        })


        let i: number = 0;
        let returnArray: I[] = new Array(condensedElements.size());
        condensedElements.forEach({
            accept: element => {
                returnArray[i] = element;
                i++;
            }
        });

        return returnArray;

    }


    //Assertion Methods
    
    /**
     * Determines whether all items in a list of UniquelyIdentifiable objects are indexed by thier ids. 
     * @param list 
     */
    public static a_listElementsIndexedByIds<I extends UniquelyIdentifiable>(list: List<I>){

        let result: boolean = true;
        for(let i: number = 0; i < list.size(); i++){
            if(!isUnassigned(list.get(i))){
                if(i !== list.get(i).id){
                    result = false;
                    break;
                }
            }
        }

        return result;

    }
    

} 