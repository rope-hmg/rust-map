class Entry<K, V> {
    constructor(
        private parent: RustMap<K, V>,
        private key: K,
    ) {}

    public orInsert(defaultValue: V): V {
        return this.orInsertWith(() => defaultValue);
    }

    public orInsertWith<Args extends any[]>(defaultFn: (...args: Args) => V, ...args: Args): V {
        let value = this.parent.get(this.key);

        if (!value) {
            value = defaultFn(...args);
            this.parent.set(this.key, value);
        }

        return value;
    }

    public orConstruct<Args extends any[]>(ctor: { new(...args: Args): V }, ...args: Args): V {
        let value = this.parent.get(this.key);

        if (!value) {
            value = new ctor(...args);
            this.parent.set(this.key, value);
        }

        return value;
    }
}


export class RustMap<K, V> extends Map<K, V> {
    public entry(key: K): Entry<K, V> {
        return new Entry(this, key);
    }

    /**
     * Retains only the elements specified by the predicate.
     * In other words, remove all pairs (k, v) where f(k, v) returns false.
     */
    public retain(predicate: (key: K, value: V) => boolean): void {
        for (const [key, value] of this.entries()) {
            if (!predicate(key, value)) {
                this.delete(key);
            }
        }
    }
}
