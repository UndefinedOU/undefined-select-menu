import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/Menu/Menu';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Menu />, document.getElementById('root'));
registerServiceWorker();
