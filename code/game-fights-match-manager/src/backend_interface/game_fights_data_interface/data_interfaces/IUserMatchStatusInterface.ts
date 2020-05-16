import IDataInterface from "../../lib/interfaces/IDataInterface";

import { UserMatchStatus } from "../../../enums/statusEnums";

export default interface IUserMatchStatusInterface extends IDataInterface<UserMatchStatus>{

    clear(): Promise<void>;

    setAsParticipating(): Promise<void>;

    setAsJudging(): Promise<void>;

}