import DataInterface from "../../lib/DataInterface";
import { MatchData, FighterData } from "../../../types/datatypes";

export default abstract class MatchDataInterface extends DataInterface<MatchData>{

    /**
     * Submit a new title to be set as the title in the match data.
     * @param title 
     */
    public abstract submitMatchTitle(title: string): Promise<void>; 
    
    /**
     * Submit the list of participants that have been invited to participate in the match.
     * @param invites 
     */
    public abstract submitMatchParticipants(invites: FighterData[]): Promise<void>;

}