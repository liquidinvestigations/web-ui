export class LiEvents {

    protected eventListeners: {
        [key: string]: ((response: any) => void)[]
    } = {};


    public removeListeners(event: string) {
        if (this.eventListeners[event]) {
            delete this.eventListeners[event];
        }
    }

    public subscribe(event: string | string[], listener: (data: any) => void): number | number[] {

        if (event instanceof Array) {
            let evIds = [];
            for (let e of event) {

                if (undefined === this.eventListeners[e]) {
                    this.eventListeners[e] = [];
                }

                evIds.push(
                    this.eventListeners[e].push(listener) - 1
                );
            }
            return evIds;
        } else {
            if (undefined === this.eventListeners[event]) {
                this.eventListeners[event] = [];
            }

            return this.eventListeners[event].push(listener) - 1;
        }
    }


    public unsubscribe(event: string, index: number): void {
        if (this.eventListeners[event]
            && this.eventListeners[event][index]) {
            this.eventListeners[event].splice(index, 1);
        }
    }

    public notifySubscribers(event: string, data: any = null): void {
        if (event in this.eventListeners && undefined !== this.eventListeners[event]) {
            for (let listener of
                this.eventListeners[event]) {
                listener(data);
            }
        }
    }
}