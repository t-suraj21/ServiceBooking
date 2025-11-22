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
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInRight,
} from 'react-native-reanimated';
import Footer from '@/components/footer';
import { useBookings } from '@/contexts/BookingContext';

const { width } = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function BookCarWashScreen() {
  const router = useRouter();
  const { addBooking } = useBookings();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handlePackageToggle = (packageId: string) => {
    if (selectedPackage === packageId) {
      setSelectedPackage(null);
    } else {
      setSelectedPackage(packageId);
    }
  };

  const handleDateToggle = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const handleTimeToggle = (time: string) => {
    if (selectedTime === time) {
      setSelectedTime(null);
    } else {
      setSelectedTime(time);
    }
  };

  const packages = [
    { id: 'basic', name: 'Basic Wash', price: '₹299', duration: '30 min', features: ['Exterior wash', 'Tire shine', 'Window cleaning'] },
    { id: 'premium', name: 'Premium Wash', price: '₹599', duration: '45 min', features: ['Exterior wash', 'Interior vacuum', 'Tire shine', 'Window cleaning', 'Dashboard polish'] },
    { id: 'deluxe', name: 'Deluxe Wash', price: '₹999', duration: '60 min', features: ['Everything in Premium', 'Wax treatment', 'Interior detailing', 'Leather conditioning', 'Air freshener'] },
  ];

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

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
            <Text style={styles.headerTitle}>Book Car Wash</Text>
            <Text style={styles.headerSubtitle}>Choose your perfect package</Text>
          </Animated.View>
        </View>

        <View style={styles.content}>
          {/* Packages */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <Text style={styles.sectionTitle}>Select Package</Text>
            <View style={styles.packagesContainer}>
              {packages.map((pkg, index) => (
                <AnimatedTouchable
                  key={pkg.id}
                  entering={SlideInRight.delay(300 + index * 100).duration(500)}
                  style={[
                    styles.packageCard,
                    selectedPackage === pkg.id && styles.packageCardSelected,
                  ]}
                  onPress={() => handlePackageToggle(pkg.id)}
                  activeOpacity={0.9}
                >
                  <View style={styles.packageHeader}>
                    <View>
                      <Text style={styles.packageName}>{pkg.name}</Text>
                      <Text style={styles.packageDuration}>{pkg.duration}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.packagePrice}>{pkg.price}</Text>
                    </View>
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
                        <Ionicons name="checkmark-circle" size={18} color="#3b82f6" />
                        <Text style={styles.selectedText}>Selected</Text>
                      </View>
                    ) : (
                      <View style={styles.unselectedBadge}>
                        <Ionicons name="ellipse-outline" size={18} color="#64748b" />
                        <Text style={styles.unselectedText}>Tap to Select</Text>
                      </View>
                    )}
                  </View>
                </AnimatedTouchable>
              ))}
            </View>
          </Animated.View>

          {/* Date Selection */}
          <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
              {['Today', 'Tomorrow', 'Day After'].map((date, index) => (
                <AnimatedTouchable
                  key={date}
                  entering={SlideInRight.delay(500 + index * 100).duration(500)}
                  style={[
                    styles.dateCard,
                    selectedDate === date && styles.dateCardSelected,
                  ]}
                  onPress={() => handleDateToggle(date)}
                  activeOpacity={0.9}
                >
                  {selectedDate === date ? (
                    <View style={styles.dateSelectedContent}>
                      <Ionicons name="checkmark-circle" size={18} color="#3b82f6" />
                      <Text style={styles.dateTextSelected}>{date}</Text>
                    </View>
                  ) : (
                    <Text style={styles.dateText}>{date}</Text>
                  )}
                </AnimatedTouchable>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Time Selection */}
          <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.timeGrid}>
              {timeSlots.map((time, index) => (
                <AnimatedTouchable
                  key={time}
                  entering={FadeInDown.delay(700 + index * 50).duration(400)}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.timeSlotSelected,
                  ]}
                  onPress={() => handleTimeToggle(time)}
                  activeOpacity={0.9}
                >
                  {selectedTime === time ? (
                    <View style={styles.timeSelectedContent}>
                      <Ionicons name="checkmark-circle" size={16} color="#3b82f6" />
                      <Text style={styles.timeTextSelected}>{time}</Text>
                    </View>
                  ) : (
                    <Text style={styles.timeText}>{time}</Text>
                  )}
                </AnimatedTouchable>
              ))}
            </View>
          </Animated.View>

          {/* Book Button */}
          <Animated.View entering={FadeInUp.delay(800).duration(600)}>
            <TouchableOpacity
              style={[
                styles.bookButton,
                (!selectedPackage || !selectedDate || !selectedTime) && styles.bookButtonDisabled,
              ]}
              onPress={() => {
                if (selectedPackage && selectedDate && selectedTime) {
                  const selectedPkg = packages.find(p => p.id === selectedPackage);
                  if (selectedPkg) {
                    addBooking({
                      service: selectedPkg.name,
                      date: selectedDate,
                      time: selectedTime,
                      price: selectedPkg.price,
                      status: 'confirmed',
                      icon: 'water',
                      packageName: selectedPkg.name,
                    });
                    router.push('/my-bookings');
                  }
                }
              }}
              disabled={!selectedPackage || !selectedDate || !selectedTime}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={selectedPackage && selectedDate && selectedTime
                  ? ['#3b82f6', '#2563eb', '#1d4ed8']
                  : ['#475569', '#334155']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bookButtonGradient}
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" />
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 16,
    fontFamily: Platform.select({
      ios: 'ui-rounded',
      default: 'sans-serif',
    }),
  },
  packagesContainer: {
    gap: 16,
  },
  packageCard: {
    backgroundColor: 'rgba(26, 31, 46, 0.85)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#334155',
    position: 'relative',
    backdropFilter: 'blur(10px)',
  },
  packageCardSelected: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  packageName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  packageDuration: {
    fontSize: 14,
    color: '#94a3b8',
  },
  priceContainer: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  packagePrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  featuresContainer: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#94a3b8',
    flex: 1,
  },
  selectIndicator: {
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
  },
  selectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  selectedText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3b82f6',
  },
  unselectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(100, 116, 139, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(100, 116, 139, 0.3)',
  },
  unselectedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  dateScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  dateCard: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(26, 31, 46, 0.85)',
    borderWidth: 2,
    borderColor: '#334155',
    marginRight: 12,
    backdropFilter: 'blur(10px)',
  },
  dateCardSelected: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  dateTextSelected: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3b82f6',
    marginLeft: 6,
  },
  dateSelectedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(26, 31, 46, 0.85)',
    borderWidth: 2,
    borderColor: '#334155',
    minWidth: 100,
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  timeSlotSelected: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  timeTextSelected: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3b82f6',
    marginLeft: 6,
  },
  timeSelectedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bookButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
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
    color: '#ffffff',
    fontFamily: Platform.select({
      ios: 'ui-rounded',
      default: 'sans-serif',
    }),
  },
});

