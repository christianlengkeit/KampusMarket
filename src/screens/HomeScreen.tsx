import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import ProductCard from '../components/ProductCard';
import { useAppTheme } from '../context/ThemeContext';
import { getProducts } from '../services/api';
import type { Product } from '../types/product';
import type { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

function formatCategoryName(category: string) {
  if (category === 'All') {
    return 'All';
  }

  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors } = useAppTheme();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  async function loadProducts() {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      setErrorMessage('Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = products.map((product) => product.category);
    return ['All', ...Array.from(new Set(uniqueCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.toLowerCase().trim();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesSearch =
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategory]);

  if (isLoading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.mutedText }]}>
          Loading products...
        </Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorTitle, { color: colors.text }]}>
          Something went wrong
        </Text>
        <Text style={[styles.errorText, { color: colors.mutedText }]}>
          {errorMessage}
        </Text>
        <AppButton title="Try Again" onPress={loadProducts} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.screenTitle, { color: colors.text }]}>
        Product Catalog
      </Text>
      <Text style={[styles.screenSubtitle, { color: colors.mutedText }]}>
        Browse second-hand products for students.
      </Text>

      <AppInput
        label="Search"
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={[styles.filterTitle, { color: colors.text }]}>Categories</Text>

      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <Pressable
                key={category}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: isActive ? colors.primary : colors.card,
                    borderColor: isActive ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    {
                      color: isActive ? '#ffffff' : colors.text,
                    },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {formatCategoryName(category)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <Text style={[styles.resultText, { color: colors.mutedText }]}>
        {filteredProducts.length} products found
      </Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetail', { productId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <View
            style={[
              styles.emptyContainer,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No products found
            </Text>
            <Text style={[styles.emptyText, { color: colors.mutedText }]}>
              Try another search keyword or category.
            </Text>
          </View>
        }
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
  screenTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  categoryWrapper: {
    height: 50,
    marginBottom: 12,
  },
  categoryList: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 16,
  },
  categoryButton: {
    height: 38,
    minWidth: 86,
    maxWidth: 150,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: '800',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  resultText: {
    fontSize: 13,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    fontSize: 15,
    marginTop: 12,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyContainer: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});