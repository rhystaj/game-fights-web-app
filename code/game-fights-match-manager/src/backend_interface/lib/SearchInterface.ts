import DataInterface from "./DataInterface";

export default abstract class SearchInterface<D> extends DataInterface<D[]>{
    
    private searchString: string = "";
    
    protected async loadData(){
        return await this.loadSearchData(this.searchString)
    }

    protected abstract loadSearchData(searchString: string): Promise<D[]>;

    public searchDataByString(fighterName: string){
        this.searchString = fighterName;
        this.refresh(); //Reload the data with the new search string.
    }

}