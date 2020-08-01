import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

  test('App', () => {
	  const app = render(<App />);
	  console.log(app.state);
  });
