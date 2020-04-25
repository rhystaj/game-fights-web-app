import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";
import { FighterData } from "../../../types/datatypes";
import { FighterDataEquator } from "../../../types/equators/UniquelyIndentifiableEquators";

export const FAILURE_FIGHTER_ID = 404;

const fighterSearchResults = [
    {   id: 1,     name: "Paul",        engaged: false,     profileImageURL: generateMockURL(1)  }, 
    {   id: 2,     name: "Jake",        engaged: false,     profileImageURL: generateMockURL(2)  }, 
    {   id: 3,     name: "David",       engaged: true,      profileImageURL: generateMockURL(3)  }, 
    {   id: 4,     name: "Elle",        engaged: true,      profileImageURL: generateMockURL(4)  }, 
    {   id: 5,     name: 'Jason',       engaged: false,     profileImageURL: generateMockURL(5)  }, 
    {   id: 6,     name: 'Alke',        engaged: false,     profileImageURL: generateMockURL(6)  }, 
    {   id: 7,     name: 'Collette',    engaged: false,     profileImageURL: generateMockURL(7)  }, 
    {   id: 8,     name: 'Alf',         engaged: true,      profileImageURL: generateMockURL(8)  },
    {   id: 9,     name: "Bernadette",  engaged: false,     profileImageURL: generateMockURL(9)  }, 
    {   id: 10,    name: "Dylan",       engaged: false,     profileImageURL: generateMockURL(10) }, 
    {   id: 11,    name: "Cameron",     engaged: false,     profileImageURL: generateMockURL(11) }, 
    {   id: 12,    name: "Brett",       engaged: false,     profileImageURL: generateMockURL(12) }, 
    {   id: 13,    name: "Pretzel",     engaged: true,      profileImageURL: generateMockURL(13) }, 
    {   id: 14,    name: "James",       engaged: true,      profileImageURL: generateMockURL(14) }, 
    {   id: 15,    name: "Sarah",       engaged: true,      profileImageURL: generateMockURL(15) },
    {   id: 16,    name: "Blake",       engaged: true,      profileImageURL: generateMockURL(16) },
    
    //A test fighter that if requested, the mock request will 'fail'.
    {   id: FAILURE_FIGHTER_ID,   name: "Failure",     engaged: false,     profileImageURL: ''   }
];

function generateMockURL(id: number): string{
    return "https://picsum.photos/id/" + (id + 1000) + "/100/100"
}

const testFighterDatabase = new UniquelyIdentifiableCollection<FighterData>(fighterSearchResults, 
    new FighterDataEquator)

export default testFighterDatabase;