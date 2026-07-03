import { Pressable, StyleSheet, Text } from 'react-native';

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
  const buttonVariantStyle =
    variant === 'danger'
      ? styles.dangerButton
      : variant === 'secondary'
        ? styles.secondaryButton
        : styles.primaryButton;

  const textVariantStyle =
    variant === 'secondary' ? styles.secondaryButtonText : styles.lightButtonText;

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        buttonVariantStyle,
        pressed && !disabled ? styles.pressedButton : null,
        disabled ? styles.disabledButton : null,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textVariantStyle]}>{title}</Text>
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
  },
  primaryButton: {
    backgroundColor: '#2563eb',
  },
  secondaryButton: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  dangerButton: {
    backgroundColor: '#dc2626',
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
  lightButtonText: {
    color: '#ffffff',
  },
  secondaryButtonText: {
    color: '#2563eb',
  },
});