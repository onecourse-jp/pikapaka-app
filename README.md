## Find library
(https://reactnative.directory/?web=true)
## Installation

```sh

# copy file .env
$ cp .env.test .env
# if you previously installed this package globaly run this command first to uninstall the previous version:
$ yarn
# Run Web/Ios/Android development
# Web
$ yarn web

# IOS (simulator)
$ cd ios
$ pod install
$ cd ..
$ yarn ios

# Android (connected device)
$ yarn android

```

## Folder structure

```
myApp
├── android (When opening with Android studio, open this folder)
│   └── android project files
├── ios (When opening with Xcode, open this folder)
│   └── ios project files
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    └── project code
```


