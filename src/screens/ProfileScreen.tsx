import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { colors, isDarkMode, toggleTheme } = useAppTheme();
  const { wishlistItems, clearWishlist } = useWishlist();

  function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          clearWishlist();
          logout();
        },
      },
    ]);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>

        <Pressable
          style={[
            styles.themeToggle,
            {
              backgroundColor: colors.cardSoft,
              borderColor: colors.border,
            },
          ]}
          onPress={toggleTheme}
        >
          <Text style={[styles.themeToggleText, { color: colors.text }]}>
            {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </Text>

          <Text style={[styles.themeToggleAction, { color: colors.primary }]}>
            Switch
          </Text>
        </Pressable>

        <View style={[styles.infoBox, { backgroundColor: colors.cardSoft }]}>
          <Text style={[styles.label, { color: colors.mutedText }]}>Name</Text>
          <Text style={[styles.value, { color: colors.text }]}>{user?.name}</Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: colors.cardSoft }]}>
          <Text style={[styles.label, { color: colors.mutedText }]}>Email</Text>
          <Text style={[styles.value, { color: colors.text }]}>{user?.email}</Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: colors.cardSoft }]}>
          <Text style={[styles.label, { color: colors.mutedText }]}>
            Saved Products
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {wishlistItems.length}
          </Text>
        </View>

        <Text style={[styles.note, { color: colors.mutedText }]}>
          This profile uses simulated login data for the UAS project.
        </Text>

        <AppButton title="Logout" onPress={handleLogout} variant="danger" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 22,
    padding: 22,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 18,
  },
  themeToggle: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeToggleText: {
    fontSize: 15,
    fontWeight: '800',
  },
  themeToggleAction: {
    fontSize: 14,
    fontWeight: '800',
  },
  infoBox: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
  note: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 8,
  },
});