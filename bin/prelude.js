#!/usr/bin/env node

const { 
  displayMessage, 
  setEnabled, 
  setCustomMessage, 
  resetToDefault, 
  setBorderColor, 
  setTextColor, 
  showConfig 
} = require('../index.js');

const args = process.argv.slice(2);
const command = args[0];
const value = args.slice(1).join(' ');

switch (command) {
  case 'disable':
    setEnabled(false);
    break;
    
  case 'enable':
    setEnabled(true);
    break;
    
  case 'set':
    if (!value) {
      console.log('Usage: prelude set "Your custom message here"');
      break;
    }
    setCustomMessage(value);
    break;
    
  case 'reset':
    resetToDefault();
    break;
    
  case 'border':
    if (!value) {
      console.log('Usage: prelude border <color>');
      console.log('Colors: cyan, green, yellow, magenta, blue, red, white, random, default');
      console.log('Hex colors: #ff0000, #00ff00, #0000ff, etc.');
      break;
    }
    setBorderColor(value);
    break;
    
  case 'text':
    if (!value) {
      console.log('Usage: prelude text <color>');
      console.log('Colors: cyan, green, yellow, magenta, blue, red, white, gray, default');
      console.log('Hex colors: #ff0000, #00ff00, #0000ff, etc.');
      break;
    }
    setTextColor(value);
    break;
    
  case 'config':
    showConfig();
    break;
    
  case 'help':
  case '--help':
  case '-h':
    console.log(`
CLI Prelude - Personalized inspiring messages for your terminal

Usage:
  prelude                            Display your message
  prelude set "message"              Set your custom message
  prelude reset                      Reset to default message
  prelude border <color>             Set border color
  prelude text <color>               Set text color
  prelude config                     Show current settings
  prelude enable                     Enable messages on startup
  prelude disable                    Disable messages on startup
  prelude help                       Show this help

Colors:
  Border: cyan, green, yellow, magenta, blue, red, white, random, default
  Text: cyan, green, yellow, magenta, blue, red, white, gray, default
  Hex colors: #ff0000, #00ff00, #0000ff, etc.
  
  'default' uses your terminal's theme colors

Examples:
  prelude set "Code with confidence"
  prelude border cyan
  prelude border #ff0000
  prelude text white
  prelude text #00ff00
  prelude reset

Configuration stored in: ~/.prelude/
`);
    break;
    
  default:
    displayMessage();
}