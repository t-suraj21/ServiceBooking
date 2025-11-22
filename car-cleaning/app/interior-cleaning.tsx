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
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInLeft,
} from 'react-native-reanimated';
import Footer from '@/components/footer';
import { useBookings } from '@/contexts/BookingContext';

const { width } = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function InteriorCleaningScreen() {
  const router = useRouter();
  const { addBooking } = useBookings();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    { id: 'vacuum', name: 'Deep Vacuum', icon: 'snow', price: '₹249', description: 'Complete interior vacuuming' },
    { id: 'seats', name: 'Seat Cleaning', icon: 'car-sport', price: '₹399', description: 'Fabric/leather seat deep clean' },
    { id: 'dashboard', name: 'Dashboard Polish', icon: 'sparkles', price: '₹199', description: 'Dashboard & console cleaning' },
    { id: 'carpet', name: 'Carpet Shampoo', icon: 'water', price: '₹449', description: 'Deep carpet cleaning' },
    { id: 'vents', name: 'Vent Cleaning', icon: 'airplane', price: '₹149', description: 'AC vent deep cleaning' },
    { id: 'windows', name: 'Window Cleaning', icon: 'sunny', price: '₹179', description: 'Interior window polish' },
  ];

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const totalPrice = services
    .filter(s => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + parseInt(s.price.replace('₹', '').replace(',', '')), 0);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={['#3b82f6', '#3b82f6', '#1d4ed8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#0f1419" />
          </TouchableOpacity>
          <Animated.Text
            entering={FadeInUp.duration(600)}
            style={styles.headerTitle}
          >
            Interior Cleaning
          </Animated.Text>
          <Text style={styles.headerSubtitle}>Customize your interior care</Text>
        </LinearGradient>

        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <Text style={styles.sectionTitle}>Select Services</Text>
            <Text style={styles.sectionSubtitle}>Choose the services you need</Text>
          </Animated.View>

          <View style={styles.servicesGrid}>
            {services.map((service, index) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <AnimatedTouchable
                  key={service.id}
                  entering={SlideInLeft.delay(300 + index * 100).duration(500)}
                  style={[
                    styles.serviceCard,
                    isSelected && styles.serviceCardSelected,
                  ]}
                  onPress={() => toggleService(service.id)}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.iconContainer,
                    isSelected && styles.iconContainerSelected,
                  ]}>
                    <Ionicons
                      name={service.icon as any}
                      size={32}
                      color={isSelected ? '#0f1419' : '#3b82f6'}
                    />
                  </View>
                  <Text style={[
                    styles.serviceName,
                    isSelected && styles.serviceNameSelected,
                  ]}>
                    {service.name}
                  </Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                  </View>
                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={16} color="#0f1419" />
                    </View>
                  )}
                </AnimatedTouchable>
              );
            })}
          </View>

          {/* Summary */}
          {selectedServices.length > 0 && (
            <Animated.View
              entering={FadeInUp.delay(600).duration(600)}
              style={styles.summaryCard}
            >
              <Text style={styles.summaryTitle}>Selected Services</Text>
              <View style={styles.summaryList}>
                {services
                  .filter(s => selectedServices.includes(s.id))
                  .map(service => (
                    <View key={service.id} style={styles.summaryItem}>
                      <Text style={styles.summaryItemText}>{service.name}</Text>
                      <Text style={styles.summaryItemPrice}>{service.price}</Text>
                    </View>
                  ))}
              </View>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>₹{totalPrice.toLocaleString('en-IN')}</Text>
              </View>
            </Animated.View>
          )}

          {/* Book Button */}
          <Animated.View entering={FadeInUp.delay(800).duration(600)}>
            <TouchableOpacity
              style={[
                styles.bookButton,
                selectedServices.length === 0 && styles.bookButtonDisabled,
              ]}
              onPress={() => {
                if (selectedServices.length > 0) {
                  const selectedServiceNames = services
                    .filter(s => selectedServices.includes(s.id))
                    .map(s => s.name);
                  
                  // Get next available time (2 hours from now)
                  const now = new Date();
                  const nextHour = new Date(now.getTime() + 2 * 60 * 60 * 1000);
                  const hours = nextHour.getHours();
                  const minutes = nextHour.getMinutes();
                  const timeString = `${hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
                  
                  addBooking({
                    service: 'Interior Cleaning',
                    date: 'Today',
                    time: timeString,
                    price: `₹${totalPrice.toLocaleString('en-IN')}`,
                    status: 'confirmed',
                    icon: 'car-sport',
                    services: selectedServiceNames,
                  });
                  router.push('/my-bookings');
                }
              }}
              disabled={selectedServices.length === 0}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={selectedServices.length > 0
                  ? ['#3b82f6', '#3b82f6', '#1d4ed8']
                  : ['#cccccc', '#aaaaaa']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bookButtonGradient}
              >
                <Text style={styles.bookButtonText}>
                  {selectedServices.length > 0
                    ? `Book for ₹${totalPrice.toLocaleString('en-IN')}`
                    : 'Select Services'}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#0f1419" />
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
  scrollContent: {
    paddingBottom: 120,
    flexGrow: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f1419',
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: 'ui-rounded',
      default: 'sans-serif',
    }),
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
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
    marginBottom: 20,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  serviceCard: {
    width: (width - 52) / 2,
    backgroundColor: '#1a1f2e',
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: '#334155',
    position: 'relative',
    alignItems: 'center',
  },
  serviceCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#e8f5f3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconContainerSelected: {
    backgroundColor: '#3b82f6',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 4,
    textAlign: 'center',
  },
  serviceNameSelected: {
    color: '#3b82f6',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 'auto',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f1419',
  },
  checkBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCard: {
    backgroundColor: '#1a1f2e',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  summaryList: {
    gap: 12,
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItemText: {
    fontSize: 14,
    color: '#94a3b8',
    flex: 1,
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#334155',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3b82f6',
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
    color: '#0f1419',
    fontFamily: Platform.select({
      ios: 'ui-rounded',
      default: 'sans-serif',
    }),
  },
});

