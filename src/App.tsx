import React, {useId, useState} from 'react';
import './second.module.scss'
import logo from './logo.png'

const App = () => {
    const [state,setState] = useState<number>(7)
    const id = useId()
    const id2 = useId()
    const onBtnClick = () => {
        setState(p=> p + 1)
    }
    return (
        <div className="container">
            <img width='150' height='150' src={logo} alt=''/>
            <h1>{state}-${id}-${id2}</h1>
            <button onClick={onBtnClick}>Click Me</button>
        </div>
    );
};

export default App;