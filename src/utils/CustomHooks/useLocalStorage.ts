import { useEffect, useState } from "react";

const getSavedValue = (key: string, initialValue: any) => {
  const localItem = localStorage.getItem(key);

  if (localItem) {
    if (localItem === "" || localItem === "undefined") {
      return undefined;
    }
    return JSON.parse(localItem);
  }

  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
};

export default function useLocalStorage(key: string, initValue: any) {
  const [state, setState] = useState(() => {
    return getSavedValue(key, initValue);
  });

  useEffect(() => {
    console.log("user Changed!");
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}
