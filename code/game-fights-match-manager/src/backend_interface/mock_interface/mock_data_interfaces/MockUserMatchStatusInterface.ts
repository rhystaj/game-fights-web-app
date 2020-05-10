import UserMatchStatusInterface from "../../game_fights_data_interface/data_interfaces/UserMatchStatusInterface";
import { UserMatchStatus } from "../../../enums/statusEnums";

export default class MockUserMatchStatusInterface extends UserMatchStatusInterface{
    
    private matchStatus: UserMatchStatus;

    constructor(matchStatus: UserMatchStatus){
        super();
        this.matchStatus = matchStatus;
    }

    protected async loadData() {
        return this.matchStatus;
    }

    public async setUserMatchStatus(newStatus: UserMatchStatus) {
        this.matchStatus = newStatus;
        this.refresh();
    }
    
}