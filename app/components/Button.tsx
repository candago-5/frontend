import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.button, styles.primaryButton, disabled && styles.disabledButton, style];
      case 'secondary':
        return [styles.button, styles.secondaryButton, disabled && styles.disabledButton, style];
      case 'outline':
        return [styles.button, styles.outlineButton, disabled && styles.disabledButton, style];
      default:
        return [styles.button, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.buttonText, styles.primaryButtonText, disabled && styles.disabledText, textStyle];
      case 'secondary':
        return [styles.buttonText, styles.secondaryButtonText, disabled && styles.disabledText, textStyle];
      case 'outline':
        return [styles.buttonText, styles.outlineButtonText, disabled && styles.disabledText, textStyle];
      default:
        return [styles.buttonText, textStyle];
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={variant === 'primary' ? Colors.white : Colors.darkBlue}
          style={styles.buttonIcon}
        />
      )}
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minHeight: 56,
  },
  primaryButton: {
    backgroundColor: Colors.darkBlue,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.darkBlue,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: Typography.sizes.large,
    fontFamily: Typography.fontFamily.medium,
    textAlign: 'center',
  },
  primaryButtonText: {
    color: Colors.white,
  },
  secondaryButtonText: {
    color: Colors.darkBlue,
  },
  outlineButtonText: {
    color: Colors.darkBlue,
  },
  disabledText: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default Button;
