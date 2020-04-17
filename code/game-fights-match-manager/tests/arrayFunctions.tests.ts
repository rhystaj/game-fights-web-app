import { allValuesAssigned } from '../src/utility/arrayFunctions';

test('All values assigned correctly determines when all values are assigned in an array.', () => {

    const testArray: { id: number, text: string }[] = [
        { id: 1, text: "One"},
        { id: 2, text: "Two" },
        { id: 3, text: "Three"}
    ];

    expect(allValuesAssigned(testArray)).toBe(true);

});