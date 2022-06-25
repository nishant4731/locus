import React, {useState, useCallback, useEffect} from "react";
import useKeyboardShortcut from '../library/keyboardshortcutlib';


function KeypressComponent(props) {
    const [randomColor, setRandomColor] = useState('#fff');
    const getRandomColor = () => {
        let x = Math.floor(Math.random() * 256);
        let y = Math.floor(Math.random() * 256);
        let z = Math.floor(Math.random() * 256);
        let bgColor = "rgb(" + x + "," + y + "," + z + ")";
        setRandomColor(bgColor);
    }
    useEffect(() => {
        getRandomColor();
    }, [])
    const { keyArray=[], variableOptions={} } = props;
    useKeyboardShortcut(keyArray, getRandomColor, variableOptions)
    return(
        <div style={{background: randomColor}}>
            {props.children}
        </div>
    )
}

export default KeypressComponent;