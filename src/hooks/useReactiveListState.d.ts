import { ItemStore } from "../models/itemStore";

export interface ReactiveListState<T = any> {
    /**
     * 取得資料，為了確保拿到的是來自ref最新的value，採用function的取法
     */
    getValues: () => T[];
    /**
     * 取得原生store內容
     */
    getOriginStore: () => React.MutableRefObject<ItemStore<T>[]>;
    /**
     * 設置資料，使用時會觸發正常的state重繪機制
     */
    setValues: (dispatch: T[] | ((pred: T[]) => T[])) => void;
    /**
     * 新增item資料，render為true時會觸發正常的state重繪機制
     */
    addItem: (item: T, render?: boolean) => void;
    /**
     * 更新item資料，react在重繪時範圍只包含對應index的render及renderWithIndex的內容
     */
    updateItem: (item: T, index: number) => void;
    /**
     * 移除item資料，使用時會觸發正常的state重繪機制
     */
    removeItem: (index: number) => void;
    /**
     * 透過此function在Component上建立觀察者機制，mapping繪製所有item
     * 當list用updateItem更新item值時，
     * 只會觸發觀察者針對該item的重繪，詳情可使用hight light update查看差異
     */
    render: (
        itemRender: (value: T, index: number) => React.ReactNode
    ) => JSX.Element[];
    /**
     * 類似render，但只繪製對應index的item
     */
    renderWithIndex: (index: number, itemRender: (value: T) => React.ReactNode) => JSX.Element;
}

/**
 * 用rxjs搭配useRef做state management，目的是在update ListItem時不要reRender其他item，節省效能
 * 以此增加使用者在更動list資料時的使用體驗
 */
export declare const useReactiveListState: <T,>(defaultValue: T) => ReactiveListState<T>;