import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { AuthContext, LoginActionData } from '../contexts/AuthContext';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import BasicTextInput from '../components/BasicTextInput';
import BasicButton from '../components/BasicButton';
import { sleep } from '../helpers/sleep';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [loginError, setLoginError] = useState('');

  async function handleLogin({ email, password }: LoginActionData) {
    setLoginError('');
    await sleep(1000);

    try {
      const result = await login({ email, password });
      if (!result) {
        throw new Error('Invalid credentials, please try again.');
      }
    } catch (error: any) {
      setLoginError(error.message);
    }
  }

  return (
    <SafeAreaView style={tailwind`px-4 flex-1 bg-white`}>
      <Text style={tailwind`font-bold text-2xl mt-4`}>Login</Text>

      <Formik
        validateOnMount
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('Invalid email address')
            .required('Please enter your email'),
          password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Please enter your password'),
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
            style={tailwind`gap-4 mt-8 flex-1`}
            behavior="padding"
          >
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
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              errorMessage={errors.password}
              touched={touched.password}
              isPassword
            />

            <View style={tailwind`flex-row items-center`}>
              <Text>No account yet?&nbsp;</Text>

              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={tailwind`text-blue-600 underline`}>
                  Go to sign up.
                </Text>
              </TouchableOpacity>
            </View>

            <View style={tailwind`flex-1 justify-end pb-4`}>
              {loginError && (
                <Text
                  style={tailwind`text-sm text-center text-red-600 mt-0.5 py-3`}
                >
                  {loginError}
                </Text>
              )}

              <BasicButton
                label="Login"
                onPress={handleSubmit}
                isLoading={isSubmitting}
              />
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginScreen;
