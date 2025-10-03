import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface InputFieldProps {
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  icon,
  isPassword = false,
  value,
  onChangeText,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error && styles.inputContainerError]}>
        <Ionicons name={icon} size={20} color={Colors.lightGray} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !isPasswordVisible}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.lightGray}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputContainerError: {
    borderColor: '#FF6B6B',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: Typography.sizes.medium,
    fontFamily: Typography.fontFamily.lightItalic,
    color: Colors.darkBlue,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: Typography.sizes.small,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default InputField;
