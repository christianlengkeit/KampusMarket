import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import  { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useAppTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function validateForm() {
    let isValid = true;

    setNameError('');
    setEmailError('');
    setPasswordError('');

    if (name.trim().length === 0) {
      setNameError('Name is required.');
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }

    return isValid;
  }

  function handleLogin() {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    Alert.alert('Login successful', 'Welcome to KampusMarket.', [
        {
            text: 'Continue',
            onPress: () =>
              login({
                name: name.trim(),
                email: email.trim(),
              }),
        },
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.keyboardContainer, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.card, {backgroundColor: colors.card}]}>
          <Text style={[styles.title, { color: colors.text }]}>KampusMarket</Text>
          <Text style={[styles.subtitle, { color: colors.mutedText }]}>Student Second-Hand Marketplace</Text>

          <AppInput
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            error={nameError}
          />

          <AppInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />

          <AppInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            error={passwordError}
            rightElement={
              <Pressable
                style={[styles.passwordToggle, { backgroundColor: colors.primarySoft }]}
                onPress={() => setIsPasswordVisible((currentValue) => !currentValue)}
              >
                <Text style={[styles.passwordToggleText, { color: colors.primary }]}>
                  {isPasswordVisible ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            }
          />

          <AppButton title="Login" onPress={handleLogin} />

          <Text style={[styles.footerText, { color: colors.mutedText }]}>
            Use this form to simulate account registration and login.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#eff6ff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
  passwordToggle: {
    minWidth: 58,
    height: 34,
    borderRadius: 999,
    backgroundColor: 'eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordToggleText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '800',
  },
});