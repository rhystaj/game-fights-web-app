import { UniquelyIdentifiable } from '../src/types/datatypes';
import { UniquelyIdentifiableEquator } from '../src/types/equators/UniquelyIndentifiableEquators';

export interface TestElement extends UniquelyIdentifiable  { text: string }

export const testElementEquatorFunction = (a: TestElement, b: TestElement) => {
    return a.id === b.id && a.text.localeCompare(b.text) === 0
}

export class TestElementEquator extends UniquelyIdentifiableEquator<TestElement>{

    public areEqual(a: TestElement, b: TestElement){
        if(!super.areEqual(a, b)) return false;
        else return a.text.localeCompare(b.text) === 0;
    }

}