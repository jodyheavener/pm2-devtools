# pm2-devtools

A browser developer tools extension for PM2.

**Still in beta**

## Installation & usage

- The [PM2 WebSocket](https://www.npmjs.com/package/pm2-ws) needs to be set up and running in order to receive new PM2 logs.
- Head to the [Releases page](https://github.com/jodyheavener/pm2-devtools/releases) and download the extension for your desired browser.
- Once installed you'll see a new Developer Tools tab. Open that and you're good to go.
- Start setting up Settings > Scripts to be executed when PM2 events occur.

## Settings > General

The extension comes with a few options to tailor your experience.

### WebSocket URL

The URL that the PM2 WebSocket is being served from.

Default: `ws://localhost:7821` (the same default as `pm2-ws`)

### Log Output Count

How many PM2 logs should be rendered? There can be quite a few depending on the activity, and too many may lead to poor performance. Note all logs are kept in memory until the panel is closed.

Default: `100`

### Theme

Which theme would you like to use? Note "Light" is not the best at this time.

Default: `Dark`

## Settings > Scripts

Use scripts to perform actions in the context of your current page. Scripts are injected when the provided script URL exactly matches the active tab's URL (this will likely be expanded in the future to allow for fuzzy URL matching).

When PM2 logs occur, an event for `pm2:logs`, as well as `pm2:logs:[process name]` is emitted to the `window`. Add listeners for these events to perform page actions. The log's message is attached to the event's `details` property.

Example:

```javascript
window.addEventListener('pm2:log', (event) => {
  console.log('PM2 Log:', event.details)
});
```

## Commands

Refer to [pm2-ws commands](https://www.npmjs.com/package/pm2-ws#commands). There are not many right now.

## Development

- Clone the package
- `yarn install` to install dependencies
- `yarn dev:firefox|chrome|opera` to start developing
- `yarn build` or `yarn build:firefox|chrome|opera` to build extension packages

## License

MPL-2.0
