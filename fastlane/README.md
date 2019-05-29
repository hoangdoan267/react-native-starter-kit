fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## Android
### android increaseVersion
```
fastlane android increaseVersion
```
Increase version name
### android build
```
fastlane android build
```
Build the Android application.
### android beta
```
fastlane android beta
```
Ship to Playstore Beta.
### android production
```
fastlane android production
```
Ship to Playstore Production.

----

## iOS
### ios certificates
```
fastlane ios certificates
```
Fetch certificates and provisioning profiles
### ios increaseVersion
```
fastlane ios increaseVersion
```
Auto snapshots
### ios screenshots
```
fastlane ios screenshots
```
Auto snapshots
### ios build
```
fastlane ios build
```
Build the iOS application.
### ios beta
```
fastlane ios beta
```
Ship to Appstore Testflight.
### ios production
```
fastlane ios production
```
Ship to Appstore Production.

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
