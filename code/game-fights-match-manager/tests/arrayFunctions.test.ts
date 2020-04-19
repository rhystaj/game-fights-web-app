import { TestElement, testElementEquatorFunction } from './mockTypes';

import { allValuesAssigned, shareElementsExactly, shallowCloneArray, numberOfElementsThat, trueForAllInArray } from '../src/utility/arrayFunctions';

test('allValuesAssigned correctly determines when all values are assigned in an array.', () => {
    const testArray = [
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"}
    ];

    expect(allValuesAssigned(testArray)).toBe(true);

});

test('allValuesAssigned correctly determines when there is an unassigned value in the array.', () => {
    
    const testArrayA = [
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        null,
        { id: 3, text: "Three"}
    ]

    const testArrayB = [
        { id: 1, text: "One"},
        undefined,
        { id: 2, text: "Two" },
        { id: 3, text: "Three"}
    ]

    expect(allValuesAssigned(testArrayA)).toBe(false);
    expect(allValuesAssigned(testArrayB)).toBe(false);

});

test('shallowCloneArray correctly creates a shallow clone of an array', () => {

    const array = [
        { id: 1, text: "One"},
        null,
        { id: 2, text: "Two" },
        undefined,
        { id: 3, text: "Three"}
    ]    

    const clonedArray = shallowCloneArray(array);

    expect(clonedArray.length).toBe(array.length);
    for(let i: number = 0; i < array.length; i++){
        expect(array[i]).toBe(clonedArray[i]);
    }

});

test('shareElementsExactly determines when two arrays share elements regardless of order', () => {

    const arrayA = [
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"}
    ]

    const arrayB = [
        { id: 3, text: "Three"},
        { id: 1, text: "One"},
        { id: 2, text: "Two" }
    ] 

    expect(shareElementsExactly(arrayA, arrayB, testElementEquatorFunction)).toBe(true);

})

test("shareElementsExactly determines when two arrays don't share elements.", () => {

    const arrayA = [
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"},
        { id: 4, text: "Four"}
    ]

    const arrayB = [
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"},
        { id: 5, text: "Five"}
    ]

    expect(shareElementsExactly(arrayA, arrayB, testElementEquatorFunction)).toBe(false);

});

test('numberOfElementsThat returns the correct number of elements in an array they meet a condition,', () => {

    const array = [
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"},
        { id: 4, text: "Four"}
    ]

    expect(numberOfElementsThat(array, (i: TestElement) => i.text.startsWith("T"))).toBe(2);

});

test('trueForAllInArray determines when all elements in an array meet a condition.', () => {

    const array = [
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"},
        { id: 4, text: "Four"}
    ];

    expect(trueForAllInArray(array, (i: TestElement) => i.id <= 4)).toBe(true);

});

test('trueForAllInArray determines when not all elements in an array meet a condition.', () => {

    const array = [
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"},
        { id: 4, text: "Four"}
    ];

    expect(trueForAllInArray(array, (i: TestElement) => i.id != 4)).toBe(false);

});