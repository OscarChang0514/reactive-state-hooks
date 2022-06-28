import React, { useEffect } from "react";
import { useRerender } from "../hooks/useRerender";

export const ObserverComponent = (props) => {

    const { store, children } = props;

    const { forceUpdate } = useRerender();

    useEffect(() => {
        store.subject.subscribe(forceUpdate);
    }, [store.subject])

    return children(store.value)
};