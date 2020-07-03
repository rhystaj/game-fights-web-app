import IDataInterface from "../../lib/interfaces/IDataInterface";

import { UserMatchStatus } from "../../../enums/statusEnums";

export default interface IUserMatchStatusInterface extends IDataInterface<UserMatchStatus>{

    clearStatus(): Promise<void>;

    participateInMatch(): Promise<void>;

    judgeMatch(): Promise<void>;

}