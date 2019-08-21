import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './components/presentational/App';
import { safariFix } from './helpers/ios';

ReactDOM.render(<App />, document.getElementById('root'));
safariFix();
