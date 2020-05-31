import MatchProgressingControls from "./MatchProgressingContols";
import { MatchResultData } from "../../types/datatypes";
import IMatchResultsDataInterface from "../../backend_interface/game_fights_data_interface/data_interfaces/IMatchResultsDataInterface";

export default class MatchResultProgressingControls extends MatchProgressingControls<MatchResultData[], 
        IMatchResultsDataInterface>{
    
    protected get controlsTypeClassName(){
        return "matchResultProgressingControls";
    }
    
    protected get proceedButtonText(): string {
        return "Finish and Archive Match"
    }

}