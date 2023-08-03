### [Click here to visit](https://expo.dev/accounts/ravi2611gupta/projects/CameraApp/builds/024c4291-23a8-4415-8fcd-85d65bf27c6b).


### deployment chages:-

#### run these commands
```shell
npm install -g eas-cli
```
```shell
eas login
```
```shell
eas build:configure
```


#### update in eas.json file
```js
 "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "production": {}
  },
  ```


#### run these commands
- for .abb file 
```shell
eas build --platform android 
```
#### or
- for .apk file 
```shell 
eas build --platform android --profile preview
```