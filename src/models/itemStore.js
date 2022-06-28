import { Subject } from "rxjs";

export class ItemStore {
    value;
    subject = new Subject();
    constructor(defaultValue) {
        this.value = defaultValue;
        this.subject = new Subject();
    }
    update = (value) => {
        this.value = value;
        this.subject.next(null);
    };
}