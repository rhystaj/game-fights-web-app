import IDataInterface from "../../lib/interfaces/IDataInterface";

export default interface IMatchCancellingDataInterface<D> extends IDataInterface<D>{

    cancelMatch(): Promise<void>;

}