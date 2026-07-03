import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import type { Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CartWishlistScreen from '../screens/CartWishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider, useAppTheme } from '../context/ThemeContext';
import { WishlistProvider } from '../context/WishlistContext';
import type { MainTabParamList, RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconProps = {
  icon: string;
};

function TabIcon({ icon }: TabIconProps) {
  return <Text style={styles.tabIcon}>{icon}</Text>;
}

function MainTabs() {
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '800',
          color: colors.text,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={focused ? '🏠' : '⌂'} />
          ),
        }}
      />

      <Tab.Screen
        name="CartWishlist"
        component={CartWishlistScreen}
        options={{
          title: 'Cart / Wishlist',
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={focused ? '💙' : '♡'} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={focused ? '👤' : '♙'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { isLoggedIn } = useAuth();
  const { colors } = useAppTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTitleStyle: {
          color: colors.text,
          fontWeight: '800',
        },
        headerTintColor: colors.primary,
      }}
    >
      {!isLoggedIn ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{ title: 'Product Details' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function NavigationShell() {
  const { colors, isDarkMode } = useAppTheme();

  const navigationTheme: Theme = {
    dark: isDarkMode,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.danger,
    },
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '800',
      },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <AuthProvider>
        <WishlistProvider>
          <RootNavigator />
        </WishlistProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return (
    <ThemeProvider>
      <NavigationShell />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 20,
  },
});