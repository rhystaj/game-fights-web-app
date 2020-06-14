import IDataInterface from "../../lib/interfaces/IDataInterface";

import { MatchData, FighterData } from "../../../types/datatypes";

export default interface IMatchDataInterface extends IDataInterface<MatchData>{

    /**
     * Submit a new title to be set as the title in the match data.
     * @param title 
     */
    submitMatchTitle(title: string): Promise<MatchData>; 
    
    /**
     * Submit the list of participants that have been invited to participate in the match.
     * @param invites 
     */
    submitMatchParticipants(invites: FighterData[]): Promise<MatchData>;

}