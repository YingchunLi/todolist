import React from 'react';
import {Redirect} from "react-router-dom";

import './App.css';

const App = () => <Redirect exact from="/" to="/todos" />;

export default App;
