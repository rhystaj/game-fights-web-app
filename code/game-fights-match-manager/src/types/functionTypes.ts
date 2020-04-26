export type ResultCallback = () => void;

export type QueryCallback<E> = (callbackResult: E) => void;

export type FetchFunction<E> = (callback: QueryCallback<E>) => void;

export type SubmitFuction<E> = (data: E) => Promise<E>;