import { useEffect, useCallback, useRef, useMemo } from "react";
import {
    overrideSystemHandling,
    checkHeldKeysRecursive,
    uniq_fast,
  } from "./utils";

const DEFAULT_OPTIONS = {
    overrideSystem: false,
    ignoreInputFields: true,
    repeatOnHold: true
};

const NOT_ALLOWED = ['TEXTAREA', 'INPUT'];


const useKeyboardShortcut = (shortcutKeys, callback, userOptions) => {
    const options = { ...DEFAULT_OPTIONS, ...userOptions };
    if (!Array.isArray(shortcutKeys))
      throw new Error(
        "The first parameter to `useKeyboardShortcut` must be an ordered array of `KeyboardEvent.key` strings."
      );
  
    if (!shortcutKeys.length)
      throw new Error(
        "The first parameter to `useKeyboardShortcut` must contain atleast one `KeyboardEvent.key` string."
      );
  
    if (!callback || typeof callback !== "function")
      throw new Error(
        "The second parameter to `useKeyboardShortcut` must be a function that will be envoked when the keys are pressed."
      );
  
    const shortcutKeysId = useMemo(() => shortcutKeys.join(), [shortcutKeys]);
    const shortcutArray = useMemo(
      () => uniq_fast(shortcutKeys).map((key) => String(key).toLowerCase()),
      [shortcutKeysId]
    );
    const heldKeys = useRef([]);
  
    const keydownListener = useCallback(
      (keydownEvent) => {
        const loweredKey = String(keydownEvent.key).toLowerCase();
        if (!(shortcutArray.indexOf(loweredKey) >= 0)) return;
  
        if (keydownEvent.repeat && !options.repeatOnHold) return;
  
        if (options.overrideSystem) {
          overrideSystemHandling(keydownEvent);
        }
  
        if (
          options.ignoreInputFields &&
          NOT_ALLOWED.indexOf(keydownEvent.target.tagName) >= 0
        ) {
          return;
        }
        const isHeldKeyCombinationValid = checkHeldKeysRecursive(
          loweredKey,
          null,
          shortcutArray,
          heldKeys.current
        );
  
        if (!isHeldKeyCombinationValid) {
          return;
        }
  
        const nextHeldKeys = [...heldKeys.current, loweredKey];
        if (nextHeldKeys.join() === shortcutArray.join()) {
          callback(shortcutKeys);
          return false;
        }
  
        heldKeys.current = nextHeldKeys;
  
        return false;
      },
      [
        shortcutKeysId,
        callback,
        options.overrideSystem,
        options.ignoreInputFields,
      ]
    );
  
    const keyupListener = useCallback(
      (keyupEvent) => {
        const raisedKey = String(keyupEvent.key).toLowerCase();
        if (!(shortcutArray.indexOf(raisedKey) >= 0)) return;
  
        const raisedKeyHeldIndex = heldKeys.current.indexOf(raisedKey);
        if (!(raisedKeyHeldIndex >= 0)) return;
  
        let nextHeldKeys = [];
        let loopIndex;
        for (loopIndex = 0; loopIndex < heldKeys.current.length; ++loopIndex) {
          if (loopIndex !== raisedKeyHeldIndex) {
            nextHeldKeys.push(heldKeys.current[loopIndex]);
          }
        }
        heldKeys.current = nextHeldKeys;
  
        return false;
      },
      [shortcutKeysId]
    );
  
    const flushHeldKeys = useCallback(() => {
      heldKeys.current = [];
    }, []);
  
    useEffect(() => {
      window.addEventListener("keydown", keydownListener);
      window.addEventListener("keyup", keyupListener);
      return () => {
        window.removeEventListener("keydown", keydownListener);
        window.removeEventListener("keyup", keyupListener);
      };
    }, [keydownListener, keyupListener, shortcutKeysId]);
  
    useEffect(() => {
      flushHeldKeys();
    }, [shortcutKeysId, flushHeldKeys]);
  
    return {
      flushHeldKeys,
    };
  };

  export default useKeyboardShortcut