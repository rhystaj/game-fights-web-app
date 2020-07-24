export default interface ISearchInterface<D>{

    searchDataByString: (searchString: string) => Promise<D[]>; 

}