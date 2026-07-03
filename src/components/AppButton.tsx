import { Pressable, StyleSheet, Text } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
};

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}: AppButtonProps) {
  const { colors } = useAppTheme();

  const backgroundColor =
    variant === 'danger'
      ? colors.danger
      : variant === 'secondary'
        ? colors.primarySoft
        : colors.primary;

  const borderColor = variant === 'secondary' ? colors.primary : backgroundColor;

  const textColor = variant === 'secondary' ? colors.primary : '#ffffff';

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor,
        },
        pressed && !disabled ? styles.pressedButton : null,
        disabled ? styles.disabledButton : null,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
  },
  pressedButton: {
    opacity: 0.75,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});