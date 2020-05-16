import DataInterface from "./AbstractDataInterface";
import ISearchInterface from "../interfaces/ISearchInterface";

export default abstract class SearchInterface<D> extends DataInterface<D[]> implements ISearchInterface<D>{
    
    private searchString: string = "";
    
    protected async loadData(){
        return await this.loadSearchData(this.searchString)
    }

    protected abstract loadSearchData(searchString: string): Promise<D[]>;

    public async searchDataByString(searchString: string){
        this.searchString = searchString;
        await this.refresh(); //Reload the data with the new search string.
    }

}