import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Animated, {
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated';
import Footer from '@/components/footer';
import { useBookings } from '@/contexts/BookingContext';

const { width } = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function ExteriorDetailingScreen() {
  const router = useRouter();
  const { addBooking } = useBookings();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handlePackageToggle = (packageId: string) => {
    if (selectedPackage === packageId) {
      setSelectedPackage(null);
    } else {
      setSelectedPackage(packageId);
    }
  };

  const packages = [
    {
      id: 'standard',
      name: 'Standard Detailing',
      price: '₹799',
      duration: '90 min',
      icon: 'sparkles',
      features: [
        'Hand wash & dry',
        'Wheel & tire cleaning',
        'Clay bar treatment',
        'Wax application',
        'Window cleaning',
      ],
      popular: false,
    },
    {
      id: 'premium',
      name: 'Premium Detailing',
      price: '₹1,499',
      duration: '120 min',
      icon: 'diamond',
      features: [
        'Everything in Standard',
        'Paint correction',
        'Ceramic coating',
        'Headlight restoration',
        'Trim restoration',
        'Interior vacuum',
      ],
      popular: true,
    },
    {
      id: 'ultimate',
      name: 'Ultimate Detailing',
      price: '₹2,499',
      duration: '180 min',
      icon: 'star',
      features: [
        'Everything in Premium',
        'Full paint correction',
        'Premium ceramic coating',
        'Engine bay cleaning',
        'Undercarriage wash',
        'Interior deep clean',
        'Leather conditioning',
      ],
      popular: false,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background Image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80' }}
        style={styles.backgroundImage}
        contentFit="cover"
        transition={500}
      />
      
      {/* Dark Overlay */}
      <LinearGradient
        colors={['rgba(15, 20, 25, 0.85)', 'rgba(15, 20, 25, 0.95)', 'rgba(15, 20, 25, 0.98)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.overlay}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#f1f5f9" />
          </TouchableOpacity>
          <Animated.View entering={FadeInUp.duration(600)}>
            <Text style={styles.headerTitle}>Exterior Detailing</Text>
            <Text style={styles.headerSubtitle}>Premium exterior care packages</Text>
          </Animated.View>
        </View>

        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <Text style={styles.sectionTitle}>Choose Your Package</Text>
            <Text style={styles.sectionSubtitle}>Professional detailing services</Text>
          </Animated.View>

          <View style={styles.packagesContainer}>
            {packages.map((pkg, index) => (
              <AnimatedTouchable
                key={pkg.id}
                entering={ZoomIn.delay(300 + index * 150).duration(600)}
                style={[
                  styles.packageCard,
                  selectedPackage === pkg.id && styles.packageCardSelected,
                  pkg.popular && styles.packageCardPopular,
                ]}
                onPress={() => handlePackageToggle(pkg.id)}
                activeOpacity={0.9}
              >
                {pkg.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>MOST POPULAR</Text>
                  </View>
                )}
                <View style={styles.packageIconContainer}>
                  <Ionicons name={pkg.icon as any} size={40} color="#3b82f6" />
                </View>
                <Text style={styles.packageName}>{pkg.name}</Text>
                <View style={styles.priceDurationContainer}>
                  <Text style={styles.packagePrice}>{pkg.price}</Text>
                  <Text style={styles.packageDuration}>{pkg.duration}</Text>
                </View>
                <View style={styles.featuresContainer}>
                  {pkg.features.map((feature, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <Ionicons name="checkmark-circle" size={16} color="#3b82f6" />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.selectIndicator}>
                  {selectedPackage === pkg.id ? (
                    <View style={styles.selectedBadge}>
                      <Ionicons name="checkmark-circle" size={20} color="#3b82f6" />
                      <Text style={styles.selectedText}>Selected</Text>
                    </View>
                  ) : (
                    <View style={styles.unselectedBadge}>
                      <Ionicons name="ellipse-outline" size={20} color="#64748b" />
                      <Text style={styles.unselectedText}>Tap to Select</Text>
                    </View>
                  )}
                </View>
              </AnimatedTouchable>
            ))}
          </View>

          {/* Book Button */}
          <Animated.View entering={FadeInUp.delay(800).duration(600)}>
            <TouchableOpacity
              style={[
                styles.bookButton,
                !selectedPackage && styles.bookButtonDisabled,
              ]}
              onPress={() => {
                if (selectedPackage) {
                  const selectedPkg = packages.find(p => p.id === selectedPackage);
                  if (selectedPkg) {
                    // Get next available time (2 hours from now)
                    const now = new Date();
                    const nextHour = new Date(now.getTime() + 2 * 60 * 60 * 1000);
                    const hours = nextHour.getHours();
                    const minutes = nextHour.getMinutes();
                    const timeString = `${hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
                    
                    addBooking({
                      service: selectedPkg.name,
                      date: 'Today',
                      time: timeString,
                      price: selectedPkg.price,
                      status: 'confirmed',
                      icon: 'sparkles',
                      packageName: selectedPkg.name,
                    });
                    router.push('/my-bookings');
                  }
                }
              }}
              disabled={!selectedPackage}
              activeOpacity={0.8}
            >
                <LinearGradient
                colors={selectedPackage
                  ? ['#3b82f6', '#2563eb', '#1d4ed8']
                  : ['#475569', '#334155']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bookButtonGradient}
              >
                <Text style={[
                  styles.bookButtonText,
                  { color: selectedPackage ? '#f1f5f9' : '#94a3b8' }
                ]}>
                  {selectedPackage
                    ? `Book ${packages.find(p => p.id === selectedPackage)?.name}`
                    : 'Select a Package'}
                </Text>
                {selectedPackage && (
                  <Ionicons name="arrow-forward" size={20} color="#f1f5f9" />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
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
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    paddingBottom: 120,
    zIndex: 1,
    flexGrow: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 31, 46, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: 'system',
      default: 'sans-serif',
    }),
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 4,
    fontFamily: Platform.select({
      ios: 'ui-rounded',
      default: 'sans-serif',
    }),
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
  },
  packagesContainer: {
    gap: 20,
    marginBottom: 20,
  },
  packageCard: {
    backgroundColor: 'rgba(26, 31, 46, 0.85)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: '#334155',
    position: 'relative',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  packageCardSelected: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  packageCardPopular: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  popularText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f1419',
    letterSpacing: 1,
  },
  packageIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  packageName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 12,
    textAlign: 'center',
  },
  priceDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  packagePrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#3b82f6',
  },
  packageDuration: {
    fontSize: 14,
    color: '#94a3b8',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  featuresContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#94a3b8',
    flex: 1,
  },
  selectIndicator: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  selectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3b82f6',
  },
  unselectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(100, 116, 139, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(100, 116, 139, 0.3)',
  },
  unselectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  bookButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  bookButtonDisabled: {
    shadowOpacity: 0.1,
  },
  bookButtonGradient: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
    fontFamily: Platform.select({
      ios: 'system',
      default: 'sans-serif',
    }),
  },
});

