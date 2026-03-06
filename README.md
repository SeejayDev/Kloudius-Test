# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

This project is a basic React-Native CLI application. After cloning the repository, run `yarn install` to install the packages required by the app. From there, just follow the usual steps to run the app as shown below.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

# Implemented Features

Four screens in total are implemented.

1. Splash Screen: To represent the initial loading of the app while the app is checking if there was previously a logged in user.
2. Login Screen: For the user to log in.
3. Signup Screen: For the user to create a new account.
4. Home Screen: For the user to view their email address and name.

## Authentication with Context API

The user's state is stored in the `AuthContext` along with the other helper functions such as `login`, `logout`, and `signup`. These functions are used by the different screens in the navigation stack via the `useContext` hook.

## Storage with AsyncStorage

The list of users who have signed up are stored via AsyncStorage, as well as the previously logged in user. The functions in the `AuthContext` are a wrapper for the AsyncStorage actions, as they handle the parsing and formatting of the stored values before passing it back to the app.

## Form validation and errors with Formik/Yup

Validation is done via Formik, which serves as the central source of truth for the form's values and error messages. The validation rules are written with Yup, which allow error messages for each violation to be specified easily. It is particularly useful because it handles the validation of the form regardless of how the user interacts with it through the `touched` property it exposes. It also saves me from having to write multiple `useState`s in the app, which improves readability.

## Navigation via React Navigation

Navigating between screens is done with React Navigation's Native Stack navigator. The React-Native edge-to-edge library was also installed to make the navigation header occupy the space behind the status bar.

## Animation with Reanimated

A basic animation wrapper was created to make elements spin in place, such as the loading animation of the buttons. It is also used by the `keyboard-controller` package to provide a smoother keyboard experience than the regular React-Native keyboard handling.
