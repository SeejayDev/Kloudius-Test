import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import tailwind from 'twrnc';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import BasicTextInput from '../components/BasicTextInput';
import BasicButton from '../components/BasicButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext, UserData } from '../contexts/AuthContext';
import { sleep } from '../helpers/sleep';

const SignupScreen = () => {
  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { signup } = useContext(AuthContext);

  const [signupError, setSignupError] = useState('');

  async function handleSignup(values: UserData) {
    setSignupError('');

    try {
      await sleep(1000);
      const result = await signup(values);

      if (result) {
        navigation.popTo('Login');
      } else {
        throw new Error(
          'This email is already registered, please log in instead.',
        );
      }
    } catch (error: any) {
      setSignupError(error.message);
    }
  }

  return (
    <View style={[tailwind`bg-white px-4 flex-1`, { paddingBottom: bottom }]}>
      <Text style={tailwind`mt-8 text-lg font-medium`}>
        Create a new account
      </Text>

      <Formik
        validateOnMount
        initialValues={{ email: '', password: '', name: '' }}
        onSubmit={handleSignup}
        validationSchema={yup.object().shape({
          name: yup.string().required('Please enter your name'),
          email: yup
            .string()
            .email('Invalid email address')
            .required('Please enter your email'),
          password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Please enter a password'),
        })}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          handleBlur,
          errors,
          touched,
          isSubmitting,
        }) => (
          <KeyboardAvoidingView
            keyboardVerticalOffset={headerHeight}
            style={tailwind`mt-4 flex-1`}
            behavior="padding"
          >
            <ScrollView contentContainerStyle={tailwind`gap-4 flex-grow pb-4`}>
              <BasicTextInput
                label="Name"
                placeholder="Enter your name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                errorMessage={errors.name}
                touched={touched.name}
              />

              <BasicTextInput
                label="Email"
                placeholder="Enter your email address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                errorMessage={errors.email}
                touched={touched.email}
              />

              <BasicTextInput
                label="Password"
                placeholder="Create a password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                errorMessage={errors.password}
                touched={touched.password}
                isPassword
              />
            </ScrollView>

            <View style={tailwind`pb-4 mt-4`}>
              {signupError && (
                <Text
                  style={tailwind`text-sm text-center text-red-600 mt-0.5 py-3`}
                >
                  {signupError}
                </Text>
              )}

              <BasicButton
                label="Sign Up"
                onPress={handleSubmit}
                isLoading={isSubmitting}
              />

              <TouchableOpacity
                onPress={() => navigation.popTo('Login')}
                style={tailwind`items-center justify-center mt-4`}
              >
                <Text style={tailwind`text-xs text-blue-600 underline `}>
                  Back to Login
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

export default SignupScreen;
