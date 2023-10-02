import React from 'react';
import {render} from "react-dom";
import './index.css';
import App from "./App";

const bodyForRoot = document.querySelector('body');
const div = document.createElement("div");
div.id = 'root';
div.className = 'root'

bodyForRoot.prepend(div);

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
