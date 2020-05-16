import DataInterface from "../../lib/DataInterface";

import { MatchResultData } from "../../../types/datatypes";

export default abstract class MatchResultsDataInterface extends DataInterface<MatchResultData[]>{

    public abstract specifyQuestionResult(resultData: MatchResultData, chosenAnswerIndex: number): Promise<void>;

    public abstract archiveMatch(): Promise<void>;

}