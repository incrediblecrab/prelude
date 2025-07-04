const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');

// Config paths
const CONFIG_DIR = path.join(os.homedir(), '.prelude');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

// Ensure config directory exists
if (!fs.existsSync(CONFIG_DIR)) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
}

// Load configuration
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading config:', error.message);
  }
  
  // Default config
  return {
    enabled: true,
    colorful: true,
    border: true,
    customMessage: '', // User's custom message
    borderColor: 'default', // Use terminal's default colors
    textColor: 'default' // Use terminal's default colors
  };
}

// Save configuration
function saveConfig(config) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving config:', error.message);
    return false;
  }
}


// Style options
const borderStyles = {
  cyan: chalk.cyan.bold,
  green: chalk.green.bold,
  yellow: chalk.yellow.bold,
  magenta: chalk.magenta.bold,
  blue: chalk.blue.bold,
  red: chalk.red.bold,
  white: chalk.white.bold
};

const textStyles = {
  cyan: chalk.cyan,
  green: chalk.green,
  yellow: chalk.yellow,
  magenta: chalk.magenta,
  blue: chalk.blue,
  red: chalk.red,
  white: chalk.white,
  gray: chalk.gray
};

const borderStylesArray = Object.values(borderStyles);

// Get message based on config
function getMessage() {
  const config = loadConfig();
  
  // Always use the default message unless user has set a custom one
  let message = config.customMessage || "Live where your feet are";
  
  let borderStyle;
  if (config.borderColor === 'random') {
    borderStyle = borderStylesArray[Math.floor(Math.random() * borderStylesArray.length)];
  } else if (config.borderColor === 'default') {
    borderStyle = (text) => text; // Use terminal's default color
  } else if (config.borderColor && config.borderColor.startsWith('#')) {
    borderStyle = chalk.hex(config.borderColor).bold;
  } else {
    borderStyle = borderStyles[config.borderColor] || ((text) => text);
  }
  
  let textStyle;
  if (config.textColor === 'default') {
    textStyle = (text) => text; // Use terminal's default color
  } else if (config.textColor && config.textColor.startsWith('#')) {
    textStyle = chalk.hex(config.textColor);
  } else {
    textStyle = textStyles[config.textColor] || ((text) => text);
  }
  
  return { message, borderStyle, textStyle };
}

// Display message
function displayMessage() {
  const config = loadConfig();
  
  if (!config.enabled) {
    return;
  }
  
  const { message, borderStyle, textStyle } = getMessage();
  
  if (!config.colorful) {
    console.log('\n' + message + '\n');
    return;
  }
  
  if (config.border) {
    const padding = ' '.repeat(4);
    const borderLength = message.length + 8;
    const topBorder = borderStyle('╔' + '═'.repeat(borderLength) + '╗');
    const bottomBorder = borderStyle('╚' + '═'.repeat(borderLength) + '╝');
    
    console.log('\n' + topBorder);
    console.log(borderStyle('║') + padding + textStyle(message) + padding + borderStyle('║'));
    console.log(bottomBorder + '\n');
  } else {
    console.log('\n' + textStyle(message) + '\n');
  }
}

// Enable/disable messages
function setEnabled(enabled) {
  const config = loadConfig();
  config.enabled = enabled;
  if (saveConfig(config)) {
    console.log(chalk.green(`Prelude messages ${enabled ? 'enabled' : 'disabled'} successfully!`));
  }
}

// Set custom message
function setCustomMessage(message) {
  const config = loadConfig();
  config.customMessage = message;
  if (saveConfig(config)) {
    console.log(chalk.green('Custom message set successfully!'));
    console.log(chalk.gray('Preview:'));
    displayMessage();
  }
}

// Reset to default message
function resetToDefault() {
  const config = loadConfig();
  config.customMessage = '';
  if (saveConfig(config)) {
    console.log(chalk.green('Reset to default message!'));
    console.log(chalk.gray('Preview:'));
    displayMessage();
  }
}

// Set border color
function setBorderColor(color) {
  const config = loadConfig();
  const validColors = Object.keys(borderStyles).concat(['random', 'default']);
  
  // Check if it's a hex color
  const isHexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  
  if (!validColors.includes(color) && !isHexColor) {
    console.log(chalk.red(`Invalid color. Valid options: ${validColors.join(', ')} or hex colors (e.g., #ff0000)`));
    return;
  }
  
  config.borderColor = color;
  if (saveConfig(config)) {
    console.log(chalk.green(`Border color set to ${color}!`));
    console.log(chalk.gray('Preview:'));
    displayMessage();
  }
}

// Set text color
function setTextColor(color) {
  const config = loadConfig();
  const validColors = Object.keys(textStyles).concat(['default']);
  
  // Check if it's a hex color
  const isHexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  
  if (!validColors.includes(color) && !isHexColor) {
    console.log(chalk.red(`Invalid color. Valid options: ${validColors.join(', ')} or hex colors (e.g., #ff0000)`));
    return;
  }
  
  config.textColor = color;
  if (saveConfig(config)) {
    console.log(chalk.green(`Text color set to ${color}!`));
    console.log(chalk.gray('Preview:'));
    displayMessage();
  }
}

// Show current config
function showConfig() {
  const config = loadConfig();
  console.log(chalk.blue.bold('\nCurrent Configuration:'));
  console.log(chalk.gray('━'.repeat(30)));
  console.log(`${chalk.white('Enabled:')} ${config.enabled ? chalk.green('Yes') : chalk.red('No')}`);
  console.log(`${chalk.white('Current Message:')} ${config.customMessage ? chalk.italic(config.customMessage) : chalk.gray('"Live where your feet are" (default)')}`);
  console.log(`${chalk.white('Border Color:')} ${config.borderColor}`);
  console.log(`${chalk.white('Text Color:')} ${config.textColor}`);
  console.log(`${chalk.white('Colorful:')} ${config.colorful ? 'Yes' : 'No'}`);
  console.log(`${chalk.white('Border:')} ${config.border ? 'Yes' : 'No'}`);
  console.log('');
}


module.exports = {
  getMessage,
  displayMessage,
  loadConfig,
  saveConfig,
  setEnabled,
  setCustomMessage,
  resetToDefault,
  setBorderColor,
  setTextColor,
  showConfig,
  CONFIG_DIR
};