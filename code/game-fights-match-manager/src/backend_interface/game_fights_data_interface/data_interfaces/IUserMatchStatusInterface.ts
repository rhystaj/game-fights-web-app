import IDataInterface from "../../lib/interfaces/IDataInterface";

import { UserMatchStatus } from "../../../enums/statusEnums";

export default interface IUserMatchStatusInterface extends IDataInterface<UserMatchStatus>{

    clear(): Promise<UserMatchStatus>;

    setAsParticipating(): Promise<UserMatchStatus>;

    setAsJudging(): Promise<UserMatchStatus>;

}