import React from 'react';
import ReactDOM from 'react-dom';
//import Menu from './components/Menu/Menu';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
