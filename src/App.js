import React, {useState} from 'react';
//import useKeyboardShortcut from './library/keyboardshortcutlib';
import KeypressComponent from './component/keypressComponent';
import './App.css';

function App() {
  const keys = ['Shift', 'A'];
  const keysAlternate = ['Alt', 'control', 'C'];
  let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")";

  return (
    <div className='component-wrapper' style={styles.main}>
      <KeypressComponent keyArray={keys}>
        A
      </KeypressComponent>
      <div style={{background: bgColor}} className='without-shortcut'>
        B
      </div>
      <KeypressComponent keyArray={keysAlternate} variableOptions={{ overrideSystem: true }}>
        C
      </KeypressComponent>
      <div className='details-wrap'>
      <h1>{`Press ${keys.join(' + ')} to toggle component A color.`}</h1>
      <h1>{`Press ${keysAlternate.join(' + ')} to toggle component C color.`}</h1>
      </div>
    </div>
  );
}

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  text: {
    fontFamily: 'Monaco',
    fontWeight: 400,
    opacity: 0.5,
  },
  image: {
    height: 400,
    width: 400,
    marginBottom: 128
  }
}

export default App;
