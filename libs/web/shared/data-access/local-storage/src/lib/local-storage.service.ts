const APP_PREFIX = 'AA_';

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

  public static setItem(key: string, value: string | object): void {
    let valueToStore: string;

    if (typeof value === 'string') {
      valueToStore = value;
    } else {
      valueToStore = JSON.stringify(value);
    }

    localStorage.setItem(`${APP_PREFIX}${key}`, valueToStore);
  }

  public static getItem(key: string): string | null {
    const value = localStorage.getItem(`${APP_PREFIX}${key}`);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  public static removeItem(key: string): void {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  }
}
