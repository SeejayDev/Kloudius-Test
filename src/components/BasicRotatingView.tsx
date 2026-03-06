import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface BasicRotatingViewProps {
  children: any;
  style?: ViewStyle;
}

const BasicRotatingView = ({ children, style }: BasicRotatingViewProps) => {
  const rotateValue = useSharedValue(0);
  const rotationStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(rotateValue.value, [0, 1], [0, 360])}deg` },
    ],
  }));

  useEffect(() => {
    rotateValue.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.linear }),
      -1,
    );

    return () => cancelAnimation(rotateValue);
  }, [rotateValue]);

  return (
    <Animated.View style={[style, rotationStyle]}>{children}</Animated.View>
  );
};

export default BasicRotatingView;
