import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";
import { FighterData } from "../../../types/datatypes";
import { FighterDataEquator } from "../../../types/equators/UniquelyIndentifiableEquators";
import { FighterMatchStatus } from "../../../enums/statusEnums";

export const FAILURE_FIGHTER_ID = 404;

const fighterSearchResults = [
    {   id: 1,     name: "Paul",        status: FighterMatchStatus.AVAILABLE,       profileImageURL: generateMockURL(1)  }, 
    {   id: 2,     name: "Jake",        status: FighterMatchStatus.AVAILABLE,       profileImageURL: generateMockURL(2)  }, 
    {   id: 3,     name: "David",       status: FighterMatchStatus.DECLINED,        profileImageURL: generateMockURL(3)  }, 
    {   id: 4,     name: "Elle",        status: FighterMatchStatus.ENGAGED,         profileImageURL: generateMockURL(4)  }, 
    {   id: 5,     name: 'Jason',       status: FighterMatchStatus.AVAILABLE,       profileImageURL: generateMockURL(5)  }, 
    {   id: 6,     name: 'Alke',        status: FighterMatchStatus.AVAILABLE,       profileImageURL: generateMockURL(6)  }, 
    {   id: 7,     name: 'Collette',    status: FighterMatchStatus.AVAILABLE,       profileImageURL: generateMockURL(7)  }, 
    {   id: 8,     name: 'Alf',         status: FighterMatchStatus.INVITED,         profileImageURL: generateMockURL(8)  },
    {   id: 9,     name: "Bernadette",  status: FighterMatchStatus.ENGAGED,         profileImageURL: generateMockURL(9)  }, 
    {   id: 10,    name: "Dylan",       status: FighterMatchStatus.AVAILABLE,       profileImageURL: generateMockURL(10) }, 
    {   id: 11,    name: "Cameron",     status: FighterMatchStatus.AVAILABLE,       profileImageURL: generateMockURL(11) }, 
    {   id: 12,    name: "Brett",       status: FighterMatchStatus.AVAILABLE,       profileImageURL: generateMockURL(12) }, 
    {   id: 13,    name: "Pretzel",     status: FighterMatchStatus.ENGAGED,         profileImageURL: generateMockURL(13) }, 
    {   id: 14,    name: "James",       status: FighterMatchStatus.AVAILABLE,       profileImageURL: generateMockURL(14) }, 
    {   id: 15,    name: "Sarah",       status: FighterMatchStatus.PARTCIPATING,    profileImageURL: generateMockURL(15) },
    {   id: 16,    name: "Blake",       status: FighterMatchStatus.AVAILABLE,       profileImageURL: generateMockURL(16) },
    
    //A test fighter that if requested, the mock request will 'fail'.
    {   id: FAILURE_FIGHTER_ID,   name: "Failure",     status: FighterMatchStatus.AVAILABLE,     profileImageURL: ''   }

];

function generateMockURL(id: number): string{
    return "https://picsum.photos/id/" + (id + 1000) + "/100/100"
}

const testFighterDatabase = new UniquelyIdentifiableCollection<FighterData>(fighterSearchResults, 
    new FighterDataEquator)

export default testFighterDatabase;