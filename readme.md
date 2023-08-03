### [Click here to visit](https://expo.dev/accounts/ravi2611gupta/projects/CameraApp/builds/024c4291-23a8-4415-8fcd-85d65bf27c6b).


## deployment chages:-

# run these commands
npm install -g eas-cli
eas login
eas build:configure

# update in eas.json file
"build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "distribution": "internal",
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


# run these commands
for .abb file => 
eas build --platform android 
# or
for .apk file => 
eas build --platform android --profile preview