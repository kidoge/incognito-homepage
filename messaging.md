# background.js Messages

Incognito Homepage uses the messaging mechanism provided by the [Chrome Extensions API](https://developer.chrome.com/extensions/messaging) to communicate between screens and the background script.

## Message Format
The messages are in the form of a dictionary. See below for the description of each field:

* Action
* Data

## Actions
### setSettings
data: options
response: saved options (sanitized) on success, or null

### getSettings
data: none
response: cached options
