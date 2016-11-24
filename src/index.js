import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';

anychart.onDocumentReady(function () {
  const el = document.getElementById('app');
  if (el) ReactDOM.render(<Map />, el);
});
