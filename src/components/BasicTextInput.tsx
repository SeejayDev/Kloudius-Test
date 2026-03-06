import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import tailwind from 'twrnc';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';

interface BasicTextInputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  touched?: boolean;
  isPassword?: boolean;
}

const BasicTextInput = (props: BasicTextInputProps) => {
  const { label, errorMessage, touched, isPassword, ...otherProps } = props;

  const [isHidden, setIsHidden] = useState(true);

  return (
    <View>
      {label && <Text style={tailwind`font-medium`}>{label}</Text>}

      <View
        style={tailwind`flex-row items-center border border-zinc-300 rounded-md min-h-10 mt-1.5 px-3`}
      >
        <TextInput
          value="testinput"
          style={tailwind`flex-1`}
          placeholderTextColor={tailwind.color('gray-300')}
          secureTextEntry={isPassword ? isHidden : false}
          {...otherProps}
        />

        {isPassword && (
          <TouchableOpacity hitSlop={15} onPress={() => setIsHidden(!isHidden)}>
            {isHidden ? <EyeIcon size={22} /> : <EyeOffIcon size={22} />}
          </TouchableOpacity>
        )}
      </View>

      {touched && errorMessage && (
        <Text style={tailwind`text-xs text-red-600 mt-0.5 italic`}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default BasicTextInput;
