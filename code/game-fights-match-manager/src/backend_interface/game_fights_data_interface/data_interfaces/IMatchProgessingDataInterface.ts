import IDataInterface from "../../lib/interfaces/IDataInterface";
import IMatchCancellingDataInterface from "./IMatchCancellingDataInterface";

export default interface IMatchProgressingDataInterface<D> extends IMatchCancellingDataInterface<D>{

    progressMatch(): Promise<void>;

}