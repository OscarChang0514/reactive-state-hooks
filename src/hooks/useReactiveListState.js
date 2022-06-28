import React, { useRef } from 'react';
import { ObserverComponent } from '../components/ObserverComponent';
import { ItemStore } from '../models/itemStore';
import { useRerender } from './useRerender';

export const useReactiveListState = (defaultList) => {

    const listStore = useRef(initListStore(defaultList));

    const { forceUpdate } = useRerender();

    return {
        getValues: () => listStore.current.map((item) => item.value),
        getOriginStore: () => listStore,
        setValues: (dispatch) => {
            if (Array.isArray(dispatch)) {
                listStore.current = initListStore(dispatch);
            } else {
                let newList = dispatch(listStore.current.map((item) => item.value));
                listStore.current = initListStore(newList);
            }
            forceUpdate();
        },
        addItem: (item, render = true) => {
            listStore.current.push(new ItemStore(item));
            render && forceUpdate();
        },
        updateItem: (item, index) => {
            listStore.current[index]?.update(item);
        },
        removeItem: (index) => {
            listStore.current = listStore.current.filter((item, tempIndex) => tempIndex !== index);
            forceUpdate();
        },
        render: (itemRender) => {
            return listStore.current.map((store, index) => (
                React.createElement(ObserverComponent, { store: store }, value => itemRender(value, index))
            ));
        },
        renderWithIndex: (index, itemRender) => {
            return index >= 0 &&
                React.createElement(ObserverComponent, { store: listStore.current[index] }, value => itemRender(value))
        },
    };
};

/**
 * 當整個list有被初始化或重新設置時，重新產生對應的ListStore
 */
const initListStore = (list) => {
    return list.map((item) => new ItemStore(item))
}