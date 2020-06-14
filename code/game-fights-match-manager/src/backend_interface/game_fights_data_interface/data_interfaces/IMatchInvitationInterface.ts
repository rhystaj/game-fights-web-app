import IDataInterface from "../../lib/interfaces/IDataInterface";

import { MatchData } from "../../../types/datatypes";

export default interface IMatchInvitationInterface extends IDataInterface<MatchData>{

    acceptInvite(): Promise<MatchData>

    declineInvite(): Promise<MatchData>

}