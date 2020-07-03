import { Interface } from "readline";
import IDataInterface from "../../lib/interfaces/IDataInterface";
import { MatchStatusData } from "../../../types/datatypes";
import { MatchStage } from "../../../enums/statusEnums";

export default interface IMatchStatusDataInterface extends IDataInterface<MatchStatusData>{

    clearUserStatus(): Promise<MatchStatusData>;

    participateInMatch(): Promise<MatchStatusData>;

    judgeMatch(): Promise<MatchStatusData>;

    progressMatchStage(): Promise<MatchStatusData>;

}