import testFighterDatabase from './testFighterDatabase';
import { FighterDataEquator } from '../../../types/equators/UniquelyIndentifiableEquators';
import { FighterData } from '../../../types/datatypes';

const soloMatchData = {
    title: "Test Match",
    teamMatch: false,
    dates: {
        match: new Date("1996-12-11"),
        open: new Date("1996-12-11"),
        close: new Date("1996-12-11")
    },
    judge: testFighterDatabase.retrieveElementWithId(12),
    participants: [
        testFighterDatabase.retrieveElementWithId(15) as FighterData,
        testFighterDatabase.retrieveElementWithId(3) as FighterData,
        testFighterDatabase.retrieveElementWithId(8) as FighterData
    ]
}

export default soloMatchData