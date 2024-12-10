import { useEffect, useState } from "react";

type LocalStorageInitialState = string | number | boolean | object | null;

export const useLocalStorageState = (initialState: LocalStorageInitialState, key: string) => {
  const [value, setValue] = useState( () => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}