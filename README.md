# Music Products - Code Challenge

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

- Install project dependencies
  - `yarn`
- Run the app in the development mode
  - `yarn start`
  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- Launch the test runner in the interactive watch mode
  - `yarn test`
- Build the app for production to the `build` folder.
  - `yarn build`

## House keeping

This project uses:

- [Conventional commits convention](conventionalcommits.org)
  - Enforced with [commitlint](https://commitlint.js.org/) via [husky](https://typicode.github.io/husky/)
- Static typing with [TypeScript](https://www.typescriptlang.org/)
- Linting & formatting with [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

### Unit / integration test conventions

#### Component tests

- Describe the component's various render states, primarily snapshot test; \*they're are cheap to write **but must be treated like component code ... with TLC\***

```ts
describe('@renders', () => {
  test('with all required props - default state'); // i.e
  test('with optional props'); // i.e check conditional renders
  test('with multiples'); // i.e lists
});
```

- Describe the component's actions/events (if any)

```ts
describe('@actions', () => {
  test('clicking x does y'); // i.e fire event, let things happen, assert
  describe('on x event', () => {
    test('');
  });
});
```
