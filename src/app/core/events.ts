export class Events {

    protected eventListeners: {
        [key: string]: ((response: any) => void)[]
    } = {};


    public subscribe(event: string, listener: (data: any) => void): number {
        if (undefined === this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }

        return this.eventListeners[event].push(listener) - 1;
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