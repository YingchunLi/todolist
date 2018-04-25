import {configureMiddleWares} from '../store';

it('does not load redux-logger in prod mode', () => {
  const middlewares = configureMiddleWares('production');
  expect(middlewares.length).toBe(1);
});

it('loads redux-logger in dev mode', () => {
  const middlewares = configureMiddleWares('development');
  expect(middlewares.length).toBe(2);
});
