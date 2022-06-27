import React, { useRef } from 'react';
import { ObserverComponent } from '../components/ObserverComponent';
import { ItemStore } from '../models/itemStore';
import { useReactiveListState } from './useReactiveListState';

export const useReactiveState = defaultValue => {

    const originState = useReactiveListState(initValue(defaultValue));

    //TODO: 為了給render有隨時更新的value而用此class存值，未來看能不能僅用originState實現
    const storeRef = useRef(new ItemStore(defaultValue))

    // 更新欄位資料，沒有對應key值時直接建立
    const updateFieldValue = (key, value) => {
        const index = originState.getValues().findIndex(item => item.key === key);
        index === -1 ? originState.addItem({ key, value }, false) : originState.updateItem({ key, value }, index);
    };

    return {
        getValues: () => storeRef.current.value,
        setValues: (value) => {
            originState.setValues(initValue(value));
            storeRef.current.update(value);
        },
        updateFieldValue: (key, value) => {
            updateFieldValue(key, value)
            storeRef.current.update({ ...storeRef.current.value, [key]: value })
        },
        updateFieldsValue: (object) => {
            Object.keys(object).forEach(key => updateFieldValue(key, object[key]));
            storeRef.current.update({ ...storeRef.current.value, ...object })
        },
        renderField: (key, itemRender) => {
            let index = originState.getValues().findIndex(item => item.key === key);
            if (index === -1) {
                // 若發現沒有該key則直接建立，且不觸發重繪
                originState.addItem({ key: key, value: null }, false);
                index = originState.getValues().length - 1;
            }
            return originState.renderWithIndex(index, (item) => itemRender(item.value));
        },
        render: (itemRender) => {
            return <ObserverComponent store={storeRef.current}>{itemRender}</ObserverComponent>
        },
    };
};

//初始化值用的
const initValue = (value) => {
    return isObject(value) ? parseObjectToList(value) : [{ key: 'init', value: value }]
}

//把資料轉成ListState能吃的格式
const parseObjectToList = (object) => {
    return Object.keys(object).map(key => ({ key, value: object[key] }))
}

//確認value是object型態
const isObject = (data) => {
    return typeof data === 'object' && !Array.isArray(data) && data !== null
};