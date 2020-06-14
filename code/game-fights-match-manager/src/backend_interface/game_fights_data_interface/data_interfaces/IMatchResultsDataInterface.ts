import IDataInterface from "../../lib/interfaces/IDataInterface";

import { MatchResultData } from "../../../types/datatypes";
import IMatchProgressingDataInterface from "./IMatchProgessingDataInterface";

export default interface IMatchResultsDataInterface extends IDataInterface<MatchResultData[]>,
                                                            IMatchProgressingDataInterface<MatchResultData[]>{

    specifyQuestionResult(resultData: MatchResultData, chosenAnswerIndex: number): Promise<MatchResultData[]>;

}