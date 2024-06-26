import { useCallback } from "react";

const debounce = (mainFunction: Function, delay: number) => {
  let timer: any;

  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};

export const useDebounce = (callback: Function, delay: number) => {
    return useCallback(debounce(callback, delay), [])
};
