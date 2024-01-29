const APP_PREFIX = 'AA-';

export class LocalStorageService {
  public static get initialState(): Record<string, unknown> {
    return Object.keys(localStorage).reduce(
      (state: Record<string, unknown>, storageKey) => {
        if (storageKey.startsWith(APP_PREFIX)) {
          const stateKeys = storageKey
            .replace(APP_PREFIX, '')
            .toLowerCase()
            .split('.')
            .map((key) =>
              key
                .split('-')
                .map((token, index) =>
                  index === 0
                    ? token
                    : token.charAt(0).toUpperCase() + token.slice(1)
                )
                .join('')
            );

          let currentStateRef = state;

          stateKeys.forEach((key, index) => {
            if (index === stateKeys.length - 1) {
              currentStateRef[key] = JSON.parse(
                localStorage.getItem(storageKey) as string
              );
              return;
            }

            currentStateRef[key] =
              (currentStateRef[key] as Record<string, unknown>) || {};
            currentStateRef = currentStateRef[key] as Record<string, unknown>;
          });
        }

        return state;
      },
      {}
    );
  }

  public static setItem(key: string, value: unknown): void {
    let valueToStore: unknown;

    try {
      valueToStore = JSON.stringify(value);
    } catch (error) {
      valueToStore = value;
    }

    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(valueToStore));
  }

  public static getItem(key: string): unknown {
    const value = localStorage.getItem(`${APP_PREFIX}${key}`);

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  }

  public static removeItem(key: string): void {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  }
}
