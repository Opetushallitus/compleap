require('dotenv').config()

module.exports = {
  preset: 'jest-puppeteer',
  moduleDirectories: [
    'node_modules',
    'src',
    'resources'
  ],
  'moduleNameMapper': {
    'test/(.*)$': '<rootDir>/test/$1'
  }
}
