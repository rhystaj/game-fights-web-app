import { TestElementEquator } from './mockTypes';

import UniquelyIdentifiableCollection from '../src/utility/UniquelyIdentifiableCollection'

test('h_determineNextAvaliableId determines the next id for an array of correctly indexed elements.', () => {

    const array = [
        undefined,
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"},
        undefined,
        { id: 5, text: "Five"}
    ]

    expect(UniquelyIdentifiableCollection.h_determineNextAvailiableId(array)).toBe(6);

});

test('h_elementCollectionsEqual determines when two element collections are equal regardless of padding', () => {
    
    const arrayA = [
        undefined,
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"},
        undefined,
        { id: 5, text: "Five"}
    ]

    const arrayB = [
        undefined,
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"},
        undefined,
        { id: 5, text: "Five"},
        undefined,
        undefined,
    ]

    expect(UniquelyIdentifiableCollection.h_elementCollectionsEqual(arrayA, arrayB, new TestElementEquator()))
        .toBe(true);

});


test('h_elementCollectionsEqual determines when two element collections are not equal regardless of padding', () => {
    
    const arrayA = [
        undefined,
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"},
        undefined,
        { id: 5, text: "Five"}
    ]

    const arrayB = [
        undefined,
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"},
        undefined,
        undefined,
        { id: 6, text: "Six"},
        undefined,
    ]

    expect(UniquelyIdentifiableCollection.h_elementCollectionsEqual(arrayA, arrayB, new TestElementEquator()))
        .toBe(false);

});
