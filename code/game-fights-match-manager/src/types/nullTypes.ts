import { FighterData, UniquelyIdentifiable } from './datatypes';

export const NULL_INDENTIFIABLE_ID = -Infinity;

export abstract class NullUniquelyIdentifiable implements UniquelyIdentifiable{
    public readonly id: number = NULL_INDENTIFIABLE_ID
} 

export class NullFighterData extends NullUniquelyIdentifiable implements FighterData{    
    public readonly name: string = '';
    public readonly engaged: boolean = false;
}