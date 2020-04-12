export default interface IEquator<T>{
    areEqual: (a: T, b: T) => boolean;
}