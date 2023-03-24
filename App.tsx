import * as React from 'react';
import Editor from './editor';
import './style.css';

export default function App() {
  const [myValue, setMyValue] = React.useState('');

  function handleChange(val) {
    setMyValue(val);
  }

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <Editor value={myValue} onValueChange={handleChange} />
    </div>
  );
}
