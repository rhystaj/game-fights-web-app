import IDataInterface from "../../lib/interfaces/IDataInterface";

import { MatchResultData } from "../../../types/datatypes";

export default interface IMatchResultsDataInterface extends IDataInterface<MatchResultData[]>{

    specifyQuestionResult(resultData: MatchResultData, chosenAnswerIndex: number): Promise<void>;

    archiveMatch(): Promise<void>;

}