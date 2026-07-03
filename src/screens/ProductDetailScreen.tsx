import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppButton from '../components/AppButton';
import { useWishlist } from '../context/WishlistContext';
import { getProductById } from '../services/api';
import type { Product } from '../types/product';
import type { RootStackParamList } from '../types/navigation';

type ProductDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

export default function ProductDetailScreen({ route }: ProductDetailScreenProps) {
  const { productId } = route.params;

  const { addToWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  async function loadProductDetails() {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await getProductById(productId);
      setProduct(data);
    } catch (error) {
      setErrorMessage('Failed to load product details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProductDetails();
  }, [productId]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (errorMessage || !product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <AppButton title="Try Again" onPress={loadProductDetails} />
      </View>
    );
  }

  const productIsSaved = isInWishlist(product.id);

  function handleWishlistPress() {
    if (!product) {
      return;
    }

    if (productIsSaved) {
      Alert.alert('Already saved', 'This product is already in your wishlist.');
      return;
    }

    addToWishlist(product);
    Alert.alert('Added to Wishlist', `${product.title} has been saved.`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.category}>{product.category}</Text>

        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.row}>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Stock: {product.stock}</Text>
          <Text style={styles.infoText}>
            Discount: {product.discountPercentage}%
          </Text>
          <Text style={styles.infoText}>
            Brand: {product.brand ? product.brand : 'No brand information'}
          </Text>
        </View>

        <AppButton
          title={productIsSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}
          onPress={handleWishlistPress}
          variant={productIsSaved ? 'secondary' : 'primary'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  category: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '700',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: '#16a34a',
  },
  rating: {
    fontSize: 15,
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
    marginBottom: 18,
  },
  infoBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    padding: 14,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 12,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 12,
  },
});