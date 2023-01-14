export interface Message<T = any> {
    code: number;
    data: T;
}
