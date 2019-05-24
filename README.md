# skohub-deck

The [SkoHub](https://skohub.io) [deck](https://test.skohub.io/deck/) is a proof of concept to show that the technologies developed actually work. It enables people to subscribe to notifications for specific subjects in the browser. The incoming notifications will be shown in a Tweetdeck-like interface.

## Install

```
git clone https://github.com/hbz/skohub-deck.git
cd skohub-deck
npm install
```

## Development

```
npm run dev
```

Open [localhost:8080](http://localhost:8080)

## Build

```
npm run build
```

A build will be generated inside `dist/`

## Tests

Runs all tests
```
npm test
```

### Optional Tests

Runs all tests and watch for changes, (Can also be limited to run a single test)
```
test:watch
```

Runs all tests and shows the coverage of code
```
test:coverage
```

Runs [Storybook](https://github.com/storybooks/storybook) to visually test the components in diffrent states
```
npm run storybook
```
