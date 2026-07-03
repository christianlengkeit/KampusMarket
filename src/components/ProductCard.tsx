import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import type { Product } from '../types/product';

type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {product.title}
        </Text>

        <Text style={[styles.category, { color: colors.primary }]}>
          {product.category}
        </Text>

        <View style={styles.row}>
          <Text style={[styles.price, { color: colors.success }]}>
            ${product.price}
          </Text>
          <Text style={[styles.rating, { color: colors.mutedText }]}>
            ⭐ {product.rating}
          </Text>
        </View>

        <Text
          style={[styles.description, { color: colors.mutedText }]}
          numberOfLines={2}
        >
          {product.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  category: {
    fontSize: 12,
    textTransform: 'capitalize',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
  },
  rating: {
    fontSize: 13,
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
  },
});