import DataInterface from "../../lib/DataInterface";
import { UserMatchStatus } from "../../../enums/statusEnums";

export default abstract class UserMatchStatusInterface extends DataInterface<UserMatchStatus>{

    public abstract setUserMatchStatus(newStatus: UserMatchStatus): Promise<void>

}