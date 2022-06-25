export const overrideSystemHandling = (e) => {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }
    }
  };
  export const uniq_fast = (a) => {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
      var item = a[i];
      if (seen[item] !== 1) {
        seen[item] = 1;
        out[j++] = item;
      }
    }
    return out;
  };
  export const checkHeldKeysRecursive = (
    shortcutKey,
    shortcutKeyRecursionIndex = 0,
    shortcutArray,
    heldKeysArray
  ) => {
    const shortcutIndexOfKey = shortcutArray.indexOf(shortcutKey);
    const keyPartOfShortCut = shortcutArray.indexOf(shortcutKey) >= 0;
    if (!keyPartOfShortCut) return false;
    const comparisonIndex = Math.max(heldKeysArray.length - 1, 0);
    if (
      heldKeysArray.length &&
      heldKeysArray[comparisonIndex] !== shortcutArray[comparisonIndex]
    ) {
      return false;
    }
    if (shortcutIndexOfKey === 0) {
      if (shortcutKeyRecursionIndex > 0)
        return heldKeysArray.indexOf(shortcutKey) >= 0;
      return true;
    }
  
    const previousShortcutKeyIndex = shortcutIndexOfKey - 1;
    const previousShortcutKey = shortcutArray[previousShortcutKeyIndex];
    const previousShortcutKeyHeld =
      heldKeysArray[previousShortcutKeyIndex] === previousShortcutKey;
    if (!previousShortcutKeyHeld) return false;
    return checkHeldKeysRecursive(
      previousShortcutKey,
      shortcutIndexOfKey,
      shortcutArray,
      heldKeysArray
    );
  };