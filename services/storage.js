export class Storage {
  constructor(keyPrefix = '') {
    this.keyPrefix = keyPrefix;
  }

  get(key, fallbackValue = undefined) {
    if (!process.browser) {
      return fallbackValue;
    }

    key = this._normalizeKey(key);

    let value;
    try {
      value = localStorage.getItem(key);
    } catch (err) {
      console.error(`storage.get: error getting ${key}`, err);
    }

    if (value) {
      return this._deserialize(value);
    }
    return fallbackValue;
  }

  set(key, value) {
    if (!process.browser) {
      return;
    }

    key = this._normalizeKey(key);
    value = this._serialize(value);

    localStorage.setItem(key, value);
  }

  _normalizeKey(key) {
    return this.keyPrefix + key;
  }

  _serialize(value) {
    return JSON.stringify(value);
  }

  _deserialize(value) {
    return JSON.parse(value);
  }
}

export default new Storage('mb.');
