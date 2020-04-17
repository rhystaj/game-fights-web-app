import assert from 'assert'; 

import { UniquelyIdentifiable } from "../types/datatypes";
import { NullFighterData } from '../types/nullTypes';

import { Collection, List, LinkedList, ArrayList, TreeMap, MapEntry } from 'typescriptcollectionsframework';

import { isUnassigned } from '../utility/qolFunctions';
import { allValuesAssigned, numberOfElementsThat, shareElementsExactly } from './arrayFunctions';
import IFactory from '../types/factories/IFactory';
import UniquelyIdentifiableFactory, { UniquelyIdentifiableGenerator } from '../types/factories/UniquelyIdentifiableFactories/UniquelyIdentifiableFactory';
import IEquator from '../types/equators/IEquator';
import { UniquelyIdentifiableEquator } from '../types/equators/UniquelyIndentifiableEquators';

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


        let result: number = 1;

        if(!elements.isEmpty()){
            
            let i: number = elements.size() - 1;
            while(i > 0 && isUnassigned(elements.get(i))){
                i--;
            }
        
            result = elements.get(i).id + 1;
            
        }

        
        assert(result > 0, "Postcondition Fail: The id returned should be positive.");

        return result;

    }

    public static a_elementListsEqual<I extends UniquelyIdentifiable>(a: List<I>, b: List<I>, equator: IEquator<I>): boolean {

        //Preconditions
        assert(UniquelyIdentifiableCollection.a_listElementsIndexedByIds(a),
            "Precondition Fail: The elements in given list a should be indexed by their ids.");
        assert(UniquelyIdentifiableCollection.a_listElementsIndexedByIds(b),
            "Precondition Fail: The elements in given list b should be indexed by their ids.")


        let result: boolean = true;
        if(a.size() !== b.size()){
            //There is no way two collections can be equal if they don't have the same number of elements.
            result = false;
        }
        else{
            for(let i: number = 0; i < b.size(); i++){
                if(equator.areEqual(a.get(i), b.get(i))){
                    result = false;
                    break;
                }
            }
        }

        return result;
        
    }

    private readonly elements: List<I>;

    private readonly equator: UniquelyIdentifiableEquator<I>;

    private readonly nullValue: I;

    /**
     * An apporiate id for the next element to the added to the collection, i.e. one not already assigned to an
     * element in the collection.
     */
    public readonly nextAvaliableId: number; 

    /**
     * Constructs a UniquelyIdentifiableCollection from an array of UniquelyIdentifiable objects, provided that no two
     * objects in the array have the same id.
     * @param elements The elements that will be contained within the collection.
     * @param comparator The comparator used to compare objects within the collection.
     * @param nullValue The value of I that represnents a null value.
     */
    constructor(elements: I[], equator: UniquelyIdentifiableEquator<I>, nullValue: I){
        
        //Preconditions
        assert(!isUnassigned(elements),
            "Precondition Fail: The given initialElements should not be null or undefined.");
        assert(!isUnassigned(equator), "Precondition Fail: The given equator should not be null or undefined.");
        assert(!isUnassigned(nullValue), "The given nullValue should be null or undefined");
        assert(elements.filter((e: I) => !equator.areEqual(e, nullValue)).length === 0,
            "Precondition Fail: There should be no null value in the inital elements.")

        
        this.equator = equator;
        this.nullValue = nullValue;

        //Sort the elements by id and ensure that there are non with duplicate keys. 
        const sortedInitialElements = new TreeMap<number, I>({
            compare: (o1: number, o2: number) => {
                return o2 - o1;
            }
        });
        for(let i: number = 0; i < elements.length; i++){
            
            let element: I = elements[i];
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

        //Assign null value to all remaining spots in the array.
        for(let i: number = 0; i < this.elements.size(); i++){
            if(isUnassigned(this.elements.get(i))){
                this.elements.set(i, this.nullValue);
            }
        }

        this.nextAvaliableId = UniquelyIdentifiableCollection.h_determineNextAvailiableId(this.elements);


        //Postconditions
        assert(!this.containsElementWithId(this.nextAvaliableId),
            "Postcondition fail: The value for nextAvaliableId, '" + this.nextAvaliableId + ", is an id " +
            "of an element already contained within the collection.");
        assert(this.classInvariantsHold());
        

    }

    public retrieveElementWithId(id: number): I{
        
        //Preconditions
        assert(this.classInvariantsHold())

        let result: I;
        if(id < 0 || id >= this.elements.size()){
            //The id given is outside the bounds of elements, so it is not valid. Return the null value. 
            result = this.nullValue;
        }
        else{
            result = this.elements.get(id);
        }


        //Postconditions
        assert(this.classInvariantsHold());

        return result; 

    }

    /**
     * Determines whether an element with a specified id exists in the collection.
     * @param id The id being checked for.
     */
    public containsElementWithId(id: number): boolean{
        
        //Preconditions
        assert(this.classInvariantsHold())


        let result: boolean = false;
        if(id >= 0 && id < this.elements.size()){
            result = !isUnassigned(this.elements.get(id));
        }

        //Postconditions
        assert(this.classInvariantsHold)

        return result;

    }

    /**
     * Determines wheteher two UniquelyIdentifiableCollections holding the same type of elements are equal.
     * @param otherCollection 
     */
    public equalsOtherCollection(otherCollection: UniquelyIdentifiableCollection<I>): boolean{

        //Preconditions
        assert(this.classInvariantsHold());
        assert(!isUnassigned(otherCollection), "Precondition Fail: The given other collection should not be " +
            "null or undefined.");

        
        let result: boolean = 
            UniquelyIdentifiableCollection.a_elementListsEqual(this.elements, otherCollection.elements, this.equator);
        

        //Postconditions
        assert(this.classInvariantsHold());

        return result;

    }

    /**
     * Creates a new copy of the UniquelyIdentifiableCollection with the specified element added.
     * @param newElement The element to add to the new copy of the collection.
     */
    public add(newElement: I): UniquelyIdentifiableCollection<I>{

        //Preconditions
        assert(this.classInvariantsHold());
        

        //Ensure that an element with the id of the new element doesn't already exist in the collection.
        if(this.containsElementWithId(newElement.id)){
            this.throwDuplicateIdError(newElement.id)
        }

        let newElementArray: I[] = this.asArray();
        newElementArray.push(newElement);

        let result: UniquelyIdentifiableCollection<I> = 
            new UniquelyIdentifiableCollection<I>(newElementArray, this.equator, this.nullValue);


        //Postconditions
        assert(result.elements.contains(newElement),
            "Postcondition Fail: The new collection could contain the specified newElement.");
        

        //Postconditions
        assert(this.equalsOtherCollection(result.removeElementWithId(newElement.id)),
            "Postcondition Fail: Aside from the new element, this collection and the new collection should otherwise " +
            "be equal.");
        assert(this.classInvariantsHold());

        return result;

    }

    public addAll(newElements: I[]): UniquelyIdentifiableCollection<I>{

        //Preconditions
        assert(this.classInvariantsHold());
        assert(!isUnassigned(newElements), "Precondition Fail: The given new elements should not be null or undefined.");

        newElements.forEach((element: I) => {
            if(this.containsElementWithId(element.id)){
                this.throwDuplicateIdError(element.id);
            }
        });

        let currentElementArray = this.asArray();
        let newCollectionElementsArray = new Array(currentElementArray.length + newElements.length);

        //Add all the elements in the current collection to the array of elements for the new collection.
        for(let i: number = 0; i < currentElementArray.length; i++){
            newCollectionElementsArray[i] = currentElementArray[i];
        }

        //Add all the new elements to the array of the elements for the new collection.
        for(let i: number = 0; i < newElements.length; i++){
            newCollectionElementsArray[currentElementArray.length + i] = newElements[i];
        }

        let result = new UniquelyIdentifiableCollection<I>(newCollectionElementsArray, this.equator, this.nullValue);


        //Postconditions
        assert(this.classInvariantsHold());

        return result;

    }

    /**
     * [DES/PRE] Throws an error specifying that the specified id already exists in the collection and therefore can't
     * be added.
     * @param duplicateId The id mentioned in the error message.
     */
    protected throwDuplicateIdError(duplicateId: number){
        
        //Preconditions
        assert(this.containsElementWithId(duplicateId),
            "Precondition Fail: The collection should contain an element with the given id " + duplicateId + ".");

        
        throw Error("The element " + duplicateId + " can not be added to the UniquelyIdentifiableCollection " +
            " as the UniquelyIdentifiableCollection already contains an element with the id '" + duplicateId + "'.");
            
    }

    /**
     * Creates a copy of the UniquelyIdentifiableCollection with the element with the sepecified id removed. If the
     * collection doen't contain an element with the specified id, it will return itself.
     * @param id The id of the element to be removed in the copy.
     */
    public removeElementWithId(id: number): UniquelyIdentifiableCollection<I>{

        //Preconditions
        assert(this.classInvariantsHold())


        let newElementArray: I[] = this.asArray();
        newElementArray = newElementArray.filter((element: I) => {
            return element.id !== id;
        });

        let result: UniquelyIdentifiableCollection<I> = 
            new UniquelyIdentifiableCollection<I>(newElementArray, this.equator, this.nullValue);
        
        
        //Postconditions
        assert(() => {
            let newListClone = new ArrayList(undefined, result.elements.immutableCollection());
            newListClone.addIndex(id, this.retrieveElementWithId(id));

            return UniquelyIdentifiableCollection.a_elementListsEqual(this.elements, newListClone, this.equator);
        },
        "Poscondition Fail: Aside from the element that has been removed, the result and the current collection should " +
            "be equal.");
        assert(this.classInvariantsHold())

        return result;
         
    }

    /**
     * Retrieve an array that contains all elements in the collection.
     */
    public asArray(): I[]{
        
        //Preconditions
        assert(this.classInvariantsHold());


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


        //Postconditions
        assert(allValuesAssigned(returnArray), 
            "Postcondition Fail: The resulting array should not contain any null or undefined values.");
        assert(returnArray.forEach((element: I) => {
                this.elements.contains(element);
            }), 
            "Postcondition Fail: All elements in the new array should be contained within the collection.");
        assert(this.elements.forEach({
                accept: (element: I) => {
                    returnArray.includes(element);
                }
            }), 
            "Postcondition Fail: All elements in the collection should be contained within the new array.");


        //Postconditions
        assert(this.classInvariantsHold());

        return returnArray;

    }

    //Assertion Methods

    private classInvariantsHold(): boolean{

        assert(UniquelyIdentifiableCollection.a_listElementsIndexedByIds(this.elements),
            "Postcondition Fail: The items in the elements list should be indexed by thier ids.")

        return true;

    }

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