import { useReducer, useEffect, type Dispatch } from "react";

export const usePersistedReducer = <S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S,
  storageKey: string,
  keysToPersist: (keyof S)[]
): [S, Dispatch<A>] => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    try {
      const storedItem = localStorage.getItem(storageKey);
      if (storedItem) {
        return { ...initial, ...JSON.parse(storedItem) };
      }
    } catch (error) {
      console.error(
        `Error reading from localStorage key “${storageKey}”:`,
        error
      );
    }
    return initial;
  });

  useEffect(() => {
    try {
      const stateToPersist = keysToPersist.reduce((obj, key) => {
        obj[key] = state[key];
        return obj;
      }, {} as Partial<S>);

      localStorage.setItem(storageKey, JSON.stringify(stateToPersist));
    } catch (error) {
      console.error(
        `Error writing to localStorage key “${storageKey}”:`,
        error
      );
    }
  }, [state, storageKey, keysToPersist]);

  return [state, dispatch];
};
