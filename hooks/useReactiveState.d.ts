export interface ReactiveState<T = any> {
    /**
     * 取得資料，為了確保拿到的是來自ref最新的value，採用function的取法
     */
    getValues: () => T;
    /**
     * 設置資料，使用時會觸發正常的state重繪機制
     */
    setValues: (values: T) => void;
    /**
     * 更新欄位資料，react在重繪時範圍只包含對應key的renderField及render的內容
     */
    updateFieldValue: (key: string, value: any) => void;
    /**
     * 更新多項欄位資料，其餘同updateFieldValue
     */
    updateFieldsValue: (object: { [field: string]: any }) => void;
    /**
     * 透過此function在Component上建立觀察者機制，當object用updateFieldValue更新欄位值時，
     * 只會觸發觀察者針對該key值的重繪，詳情可使用hight light update查看差異
     */
    renderField: (key: string, itemRender: (value: T) => React.ReactNode) => JSX.Element;
    /**
     * 類似renderField，但觀察的對象包含整個object
     */
    render: (itemRender: (value: T) => React.ReactNode) => JSX.Element;
}

/**
 * 基於useReactiveListState製作Object版本，讓使用者編輯時只更新編輯中的欄位，節省效能
 */
export declare const useReactiveState: <T,>(defaultValue: T) => ReactiveState<T>;