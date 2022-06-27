import { ItemStore } from "../models/itemStore";

export interface ObserverComponentProps<T = any> {
    store: ItemStore<T>;
    children?: ((value: T) => React.ReactNode);
}

export declare const ObserverComponentProps: React.FC<ObserverComponentProps<T>>