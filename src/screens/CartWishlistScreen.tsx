import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import ProductCard from '../components/ProductCard';
import { useAppTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import type { RootStackParamList } from '../types/navigation';

type CartWishlistNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CartWishlistScreen() {
  const navigation = useNavigation<CartWishlistNavigationProp>();
  const { colors } = useAppTheme();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          Your Wishlist is empty
        </Text>
        <Text style={[styles.emptyText, { color: colors.mutedText }]}>
          Open a product and tap “Add to Wishlist” to save it here.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>
            Cart / Wishlist
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedText }]}>
            {wishlistItems.length} saved products
          </Text>
        </View>

        <Pressable
          style={[
            styles.clearButton,
            {
              backgroundColor: colors.dangerSoft,
              borderColor: colors.danger,
            },
          ]}
          onPress={clearWishlist}
        >
          <Text style={[styles.clearButtonText, { color: colors.danger }]}>
            Clear
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetail', { productId: item.id })
              }
            />

            <Pressable
              style={[
                styles.removeButton,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.danger,
                },
              ]}
              onPress={() => removeFromWishlist(item.id)}
            >
              <Text style={[styles.removeButtonText, { color: colors.danger }]}>
                Remove from Wishlist
              </Text>
            </Pressable>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
  },
  clearButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
  },
  itemWrapper: {
    marginBottom: 10,
  },
  removeButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: -6,
    marginBottom: 10,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});