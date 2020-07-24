import IDataInterface from "../../lib/interfaces/IDataInterface";

import { MatchData, FighterData } from "../../../types/datatypes";
import { DateType } from "../../../enums/referenceEnums";
import ISearchInterface from "../../lib/interfaces/ISearchInterface";

export default interface IMatchDataInterface extends IDataInterface<MatchData>{

    /**
     * Submit a new title to be set as the title in the match data.
     * @param title 
     */
    submitMatchTitle(title: string): Promise<MatchData>; 
    
    /**
     * Submit a new value for a date in the match data.
     * @param type The date in the match data that will be changed.
     * @param date The value the date will be changed to.
     */
    submitMatchDate(type: DateType, date: Date): Promise<MatchData>;

    /**
     * Retrieve the interface that can be used to find participants that can be invited to the match.
     */
    getPotentialParticipantSearchInterface(): ISearchInterface<FighterData>

    /**
     * Submit the list of participants that have been invited to participate in the match.
     * @param invites 
     */
    submitMatchParticipants(invites: FighterData[]): Promise<MatchData>;

}