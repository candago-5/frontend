import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
  position: 'left' | 'right';
}

export const TabButton: React.FC<TabButtonProps> = ({
  title,
  isActive,
  onPress,
  position,
}) => {
  const getButtonStyle = () => {
    return [
      styles.tabButton,
      position === 'left' ? styles.leftTab : styles.rightTab,
      isActive ? styles.activeTab : styles.inactiveTab,
    ];
  };

  const getTextStyle = () => {
    return [
      styles.tabText,
      isActive ? styles.activeTabText : styles.inactiveTabText,
    ];
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress} activeOpacity={0.8}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftTab: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  rightTab: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  activeTab: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  inactiveTab: {
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  tabText: {
    fontSize: Typography.sizes.medium,
    fontFamily: Typography.fontFamily.medium,
  },
  activeTabText: {
    color: Colors.darkBlue,
  },
  inactiveTabText: {
    color: Colors.gray,
  },
});

export default TabButton;
