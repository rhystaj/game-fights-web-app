import DataInterface from "../../lib/DataInterface";
import { MatchData } from "../../../types/datatypes";

export default abstract class MatchInvitationinterface extends DataInterface<MatchData>{

    public abstract acceptInvite(): Promise<void>

    public abstract declineInvite(): Promise<void>

}