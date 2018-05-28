# palmservicebridge-mock

Utility for mocking `PalmServiceBridge`.

Tested with NodeJS and karma

PalmServiceBridge is for webOS

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)

## <a name="installation">Installation</a>

If you are using a bundler like [Webpack](https://www.npmjs.com/package/webpack) or [Browserify](https://www.npmjs.com/package/browserify) then install `palmservicebridge-mock` using `yarn` or `npm`:

```bash
npm install --save-dev palmservicebridge-mock
```

Now import `xhr-mock` and start using it in your scripts:

```js
import palmServiceBridgeMock from 'palmservicebridge-mock';
```

## <a name="usage">Usage</a>

Example code to get palmServiceBridges
```js
it('+++ AI Nudge click should change settings service', () => {
	const switchItem = wrapper.find({id: 'aiNudge'}).filter('SwitchItem');
	switchItem.props().onToggle({selected: true});
	const palmServiceBridges = palmServiceBridgeMock.getPalmServiceBridges();
	expect(palmServiceBridges[palmServiceBridges.length - 1].uri).to.equal('luna://com.webos.settingsservice/setSystemSettings');
	expect(palmServiceBridges[palmServiceBridges.length - 1].params).to.equal('{"category":"general","settings":{"aiNudge":"on"}}');
});
```

Example code to get palmServiceBridges
```js
it('+++ Reset to Initial Settings click should call proper luna api when parentalControl is true', () => {
	palmServiceBridgeMock.send('luna://com.webos.notification/createPincodePrompt', {
			matched: true
	});
	const settingsItem = wrapper.find({id: 'resetSettings'}).filter('SettingsItem');
	settingsItem.props().onClick({type: ''});
	const palmServiceBridges = palmServiceBridgeMock.getPalmServiceBridges();
	expect(palmServiceBridges[palmServiceBridges.length - 1].uri).to.equal('luna://com.webos.notification/createPincodePrompt');
	expect(palmServiceBridges[palmServiceBridges.length - 1].params).to.equal( '{"promptType":"parental"}');
});
```

## <a name="api">API</a>

### palmservicebridge-mock

#### .setup()

Replace the global `PalmServiceBridges` object with the `MockPalmServiceBridges`.

#### .teardown()

Restore the global `PalmServiceBridges` object to its original state.

#### .reset()

Forget all the request handlers.

#### .send(api, mock)

Register a factory function to create mock responses for each SEND request to a specific API.
