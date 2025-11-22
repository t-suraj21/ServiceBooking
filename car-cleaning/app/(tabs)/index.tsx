import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import DrawerMenu from '@/components/drawer-menu';
import Footer from '@/components/footer';
import Animated, {
  FadeInDown,
  FadeIn,
  FadeInUp,
  ZoomIn,
  SlideInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories = ['All', 'Offers', 'Premium', 'Express', 'Detailing'];
  
  const services = [
    {
      id: '1',
      title: 'Premium Car Wash',
      rating: 4.9,
      price: '₹899',
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80',
      specs: {
        seats: '5',
        duration: '45min',
        service: 'Premium',
      },
    },
    {
      id: '2',
      title: 'Express Wash',
      rating: 4.7,
      price: '₹499',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80',
      specs: {
        seats: '4',
        duration: '30min',
        service: 'Express',
      },
    },
    {
      id: '3',
      title: 'Full Detailing',
      rating: 4.9,
      price: '₹1,499',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80',
      specs: {
        seats: '5',
        duration: '90min',
        service: 'Deluxe',
      },
    },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleServicePress = (service: any) => {
    switch (service.title) {
      case 'Premium Car Wash':
        router.push('/book-car-wash');
        break;
      case 'Express Wash':
        router.push('/book-car-wash');
        break;
      case 'Full Detailing':
        router.push('/exterior-detailing');
        break;
      default:
        router.push('/book-car-wash');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Drawer Menu */}
      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Section */}
        <View style={styles.topHeader}>
          {/* Profile Picture */}
          <TouchableOpacity
            style={styles.profileButton}
            activeOpacity={0.8}
          >
            <View style={styles.profileImage}>
              <Ionicons name="person" size={24} color="#3b82f6" />
            </View>
          </TouchableOpacity>

          {/* Location */}
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Location</Text>
            <TouchableOpacity style={styles.locationRow} activeOpacity={0.8}>
              <Ionicons name="location" size={16} color="#3b82f6" />
              <Text style={styles.locationText}>Mumbai, India</Text>
              <Ionicons name="chevron-down" size={16} color="#b0b0b0" />
            </TouchableOpacity>
          </View>

          {/* Hamburger Menu Button */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setDrawerVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="menu" size={28} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#b0b0b0" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Type of service, location..."
              placeholderTextColor="#666"
            />
          </View>
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
            <Ionicons name="options-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Category Section */}
        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>Category</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.categoryButtonTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Service Cards */}
        <View style={styles.servicesSection}>
          {services.map((service, index) => {
            const scale = useSharedValue(1);
            const opacity = useSharedValue(1);

            const animatedCardStyle = useAnimatedStyle(() => {
              return {
                transform: [{ scale: scale.value }],
                opacity: opacity.value,
              };
            });

            const handlePressIn = () => {
              scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
              opacity.value = withTiming(0.9, { duration: 100 });
            };

            const handlePressOut = () => {
              scale.value = withSpring(1, { damping: 15, stiffness: 300 });
              opacity.value = withTiming(1, { duration: 100 });
            };

            return (
              <Animated.View
                key={service.id}
                entering={ZoomIn.delay(index * 150).duration(600).springify()}
              >
                <Animated.View style={animatedCardStyle}>
                  <TouchableOpacity
                    style={styles.serviceCard}
                    onPress={() => handleServicePress(service)}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={1}
                  >
                    {/* Full Box Car Image */}
                    <View style={styles.cardImageContainer}>
                    <Image
                      source={{ uri: service.image }}
                      style={styles.cardImage}
                      contentFit="cover"
                      transition={300}
                    />
                    
                    {/* Blur Overlay for all details */}
                    <LinearGradient
                      colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.blurOverlay}
                    />
                    
                    {/* Top Section - Title, Price, Rating, Favorite */}
                    <View style={styles.cardHeader}>
                      <View style={styles.cardHeaderLeft}>
                        <Text style={styles.cardTitle}>{service.title}</Text>
                        <Text style={styles.cardPrice}>{service.price}</Text>
                        <View style={styles.ratingRow}>
                          <Ionicons name="star" size={16} color="#FFD700" />
                          <Text style={styles.ratingText}>{service.rating}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => toggleFavorite(service.id)}
                        activeOpacity={0.8}
                        style={styles.favoriteButtonContainer}
                      >
                        <LinearGradient
                          colors={['rgba(26, 31, 46, 0.6)', 'rgba(15, 20, 25, 0.8)']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.favoriteButton}
                        >
                          <Ionicons
                            name={favorites.has(service.id) ? 'heart' : 'heart-outline'}
                            size={22}
                            color={favorites.has(service.id) ? '#FFD700' : '#ffffff'}
                          />
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>

                    {/* Bottom Specifications */}
                    <View style={styles.cardSpecs}>
                      <TouchableOpacity activeOpacity={0.8} style={styles.specButtonContainer}>
                        <LinearGradient
                          colors={['rgba(15, 20, 25, 0.6)', 'rgba(26, 31, 46, 0.8)']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.specButton}
                        >
                          <Ionicons name="people-outline" size={20} color="#ffffff" />
                          <Text style={styles.specText}>{service.specs.seats} Seat</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.8} style={styles.specButtonContainer}>
                        <LinearGradient
                          colors={['rgba(15, 20, 25, 0.6)', 'rgba(26, 31, 46, 0.8)']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.specButton}
                        >
                          <Ionicons name="time-outline" size={20} color="#ffffff" />
                          <Text style={styles.specText}>{service.specs.duration}</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.8} style={styles.specButtonContainer}>
                        <LinearGradient
                          colors={['rgba(15, 20, 25, 0.6)', 'rgba(26, 31, 46, 0.8)']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.specButton}
                        >
                          <Ionicons name="sparkles-outline" size={20} color="#ffffff" />
                          <Text style={styles.specText}>{service.specs.service}</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
      
      {/* Footer - Fixed at bottom */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
  },
  scrollContent: {
    paddingBottom: 120,
    flexGrow: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: '#0f1419',
  },
  profileButton: {
    marginRight: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0f1419',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#b0b0b0',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#0f1419',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f1419',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#3a3f4e',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categorySection: {
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: '#0f1419',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#0f1419',
    borderWidth: 1,
    borderColor: '#3a3f4e',
  },
  categoryButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#b0b0b0',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  servicesSection: {
    padding: 20,
    gap: 20,
  },
  serviceCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#0f1419',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  cardImageContainer: {
    height: 400,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  cardHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    zIndex: 2,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: 'system',
      default: 'sans-serif',
    }),
  },
  cardPrice: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 12,
    fontFamily: Platform.select({
      ios: 'system',
      default: 'sans-serif',
    }),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  favoriteButtonContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  favoriteButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22,
  },
  cardSpecs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    gap: 8,
    zIndex: 2,
  },
  specButtonContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  specButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 8,
    minHeight: 80,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  specText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});
