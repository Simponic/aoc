export class JSONSet<T extends Object> {
  private items: Set<string>;

  constructor() {
    this.items = new Set<string>();
  }

  add(item: T): void {
    const itemJson = JSON.stringify(item, Object.keys(item).sort());
    this.items.add(itemJson);
  }

  has(item: T): boolean {
    const itemJson = JSON.stringify(item, Object.keys(item).sort());
    return this.items.has(itemJson);
  }

  delete(item: T): boolean {
    const itemJson = JSON.stringify(item, Object.keys(item).sort());
    return this.items.delete(itemJson);
  }

  clear(): void {
    this.items.clear();
  }

  get size(): number {
    return this.items.size;
  }
}

export class JSONHashMap<T extends Object, R extends Object> {
  private map: Map<string, R>;

  constructor() {
    this.map = new Map<string, R>();
  }

  set(key: T, value: R): void {
    const keyJson = JSON.stringify(key, Object.keys(key).sort());
    this.map.set(keyJson, value);
  }

  get(key: T): R | undefined {
    const keyJson = JSON.stringify(key, Object.keys(key).sort());
    return this.map.get(keyJson);
  }

  has(key: T): boolean {
    const keyJson = JSON.stringify(key, Object.keys(key).sort());
    return this.map.has(keyJson);
  }

  keys(): T[] {
    return Array.from(this.map.keys()).map((x) => JSON.parse(x) as T);
  }

  delete(key: T): boolean {
    const keyJson = JSON.stringify(key, Object.keys(key).sort());
    return this.map.delete(keyJson);
  }

  clear(): void {
    this.map.clear();
  }

  get size(): number {
    return this.map.size;
  }
}
