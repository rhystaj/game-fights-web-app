import testFighterDatabase from './testFighterDatabase';
import { FighterDataEquator } from '../../../types/equators/UniquelyIndentifiableEquators';
import { FighterData } from '../../../types/datatypes';

const soloMatchData = {
    title: "Test Match",
    teamMatch: false,
    dates: {
        match: '11/12/1996',
        open: '12/12/1996',
        close: '13/12/1996'
    },
    participants: [
        testFighterDatabase.retrieveElementWithId(15) as FighterData,
        testFighterDatabase.retrieveElementWithId(3) as FighterData,
        testFighterDatabase.retrieveElementWithId(8) as FighterData
    ]
}

export default soloMatchData