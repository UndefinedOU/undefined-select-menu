import React from 'react';
import ReactDOM from 'react-dom';
//import Menu from './components/Menu/Menu';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
registerServiceWorker();