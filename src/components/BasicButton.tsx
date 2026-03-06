import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import { LoaderIcon } from 'lucide-react-native';
import BasicRotatingView from './BasicRotatingView';

interface BasicButtonProps {
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const BasicButton = (props: BasicButtonProps) => {
  const { label, disabled, isLoading, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={tailwind.style(
        'items-center justify-center min-h-12 rounded-lg',
        disabled ? 'bg-gray-200' : 'bg-red-700',
      )}
    >
      {isLoading ? (
        <BasicRotatingView>
          <LoaderIcon color={'white'} />
        </BasicRotatingView>
      ) : (
        <Text style={tailwind`text-white font-bold`}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default BasicButton;
