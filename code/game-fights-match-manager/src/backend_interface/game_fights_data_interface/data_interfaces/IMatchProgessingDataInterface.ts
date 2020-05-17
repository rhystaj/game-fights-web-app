import IDataInterface from "../../lib/interfaces/IDataInterface";

export default interface IMatchProgressingDataInterface<D> extends IDataInterface<D>{

    progressMatch(): Promise<void>;

    cancelMatch(): Promise<void>;

}