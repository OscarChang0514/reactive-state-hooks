import { Subject } from "rxjs";

export declare class ItemStore<T = any> {
    value: T;
    subject: Subject<null> = new Subject<null>();
    constructor(defaultValue: T) {
        this.value = defaultValue;
        this.subject = new Subject<null>();
    }
    update = (value: T) => {
        this.value = value;
        this.subject.next(null);
    };
}