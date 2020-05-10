import DataInterface from "../../lib/DataInterface";
import { UserMatchStatus } from "../../../enums/statusEnums";

export default abstract class UserMatchStatusInterface extends DataInterface<UserMatchStatus>{

    public abstract clear(): Promise<void>;

    public abstract setAsParticipating(): Promise<void>;

    public abstract setAsJudging(): Promise<void>;

}