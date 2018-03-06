const Expo = require.requireActual('expo')

Expo.Font.loadAsync = jest.fn()

module.exports = Expo
