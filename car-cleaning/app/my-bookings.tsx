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
  SlideInRight,
} from 'react-native-reanimated';
import Footer from '@/components/footer';
import { useBookings } from '@/contexts/BookingContext';

const { width } = Dimensions.get('window');

const AnimatedView = Animated.createAnimatedComponent(View);

export default function MyBookingsScreen() {
  const router = useRouter();
  const { getUpcomingBookings, getPastBookings, cancelBooking, updateBookingStatus } = useBookings();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings = getUpcomingBookings();
  const pastBookings = getPastBookings();
  const bookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  const handleCancel = (bookingId: string) => {
    cancelBooking(bookingId);
  };

  const handleComplete = (bookingId: string) => {
    updateBookingStatus(bookingId, 'completed');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#3b82f6';
      case 'completed':
        return '#94a3b8';
      case 'cancelled':
        return '#ff4444';
      default:
        return '#94a3b8';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'rgba(59, 130, 246, 0.15)';
      case 'completed':
        return '#1a1f2e';
      case 'cancelled':
        return '#fff5f5';
      default:
        return '#1a1f2e';
    }
  };

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
            <Text style={styles.headerTitle}>My Bookings</Text>
            <Text style={styles.headerSubtitle}>Manage your appointments</Text>
          </Animated.View>
        </View>

        <View style={styles.content}>
          {/* Tabs */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.tabContainer}
          >
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'upcoming' && styles.tabActive,
              ]}
              onPress={() => setActiveTab('upcoming')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'upcoming' && styles.tabTextActive,
                ]}
              >
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'past' && styles.tabActive,
              ]}
              onPress={() => setActiveTab('past')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'past' && styles.tabTextActive,
                ]}
              >
                Past
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Bookings List */}
          {bookings.length > 0 ? (
            <View style={styles.bookingsContainer}>
              {bookings.map((booking, index) => (
                <AnimatedView
                  key={booking.id}
                  entering={SlideInRight.delay(300 + index * 100).duration(500)}
                  style={styles.bookingCard}
                >
                  <View style={styles.bookingHeader}>
                    <View style={styles.bookingIconContainer}>
                      <Ionicons
                        name={booking.icon as any}
                        size={28}
                        color="#3b82f6"
                      />
                    </View>
                    <View style={styles.bookingInfo}>
                      <Text style={styles.bookingService}>{booking.service}</Text>
                      <View style={styles.bookingDateTime}>
                        <Ionicons name="calendar-outline" size={14} color="#94a3b8" />
                        <Text style={styles.bookingDate}>{booking.date}</Text>
                        <Ionicons name="time-outline" size={14} color="#94a3b8" style={styles.timeIcon} />
                        <Text style={styles.bookingTime}>{booking.time}</Text>
                      </View>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.bookingPrice}>{booking.price}</Text>
                    </View>
                  </View>
                  <View style={styles.bookingFooter}>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: getStatusBg(booking.status),
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.statusDot,
                          { backgroundColor: getStatusColor(booking.status) },
                        ]}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(booking.status) },
                        ]}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Text>
                    </View>
                    {activeTab === 'upcoming' && (
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => handleCancel(booking.id)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    )}
                    {activeTab === 'past' && booking.status === 'confirmed' && (
                      <TouchableOpacity
                        style={styles.completeButton}
                        onPress={() => handleComplete(booking.id)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.completeButtonText}>Mark Complete</Text>
                      </TouchableOpacity>
                    )}
                    {activeTab === 'past' && booking.status === 'completed' && (
                      <TouchableOpacity
                        style={styles.rebookButton}
                        onPress={() => router.push('/book-car-wash')}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.rebookButtonText}>Book Again</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </AnimatedView>
              ))}
            </View>
          ) : (
            <Animated.View
              entering={FadeInDown.delay(400).duration(600)}
              style={styles.emptyContainer}
            >
              <Ionicons name="calendar-outline" size={64} color="#64748b" />
              <Text style={styles.emptyText}>No {activeTab} bookings</Text>
              <Text style={styles.emptySubtext}>
                {activeTab === 'upcoming'
                  ? 'Book a service to get started'
                  : 'Your past bookings will appear here'}
              </Text>
              {activeTab === 'upcoming' && (
                <TouchableOpacity
                  style={styles.bookNowButton}
                  onPress={() => router.push('/book-car-wash')}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#3b82f6', '#3b82f6', '#1d4ed8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.bookNowButtonGradient}
                  >
                    <Text style={styles.bookNowButtonText}>Book Now</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </Animated.View>
          )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 31, 46, 0.85)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  tabTextActive: {
    color: '#3b82f6',
    fontWeight: '700',
  },
  bookingsContainer: {
    gap: 16,
  },
  bookingCard: {
    backgroundColor: 'rgba(26, 31, 46, 0.85)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    backdropFilter: 'blur(10px)',
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bookingIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  bookingInfo: {
    flex: 1,
  },
  bookingService: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  bookingDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bookingDate: {
    fontSize: 14,
    color: '#94a3b8',
    marginRight: 12,
  },
  timeIcon: {
    marginLeft: 4,
  },
  bookingTime: {
    fontSize: 14,
    color: '#94a3b8',
  },
  priceContainer: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  bookingPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#f1f5f9',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff4444',
  },
  completeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#10b981',
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  rebookButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
  },
  rebookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f1f5f9',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 24,
  },
  bookNowButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  bookNowButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  bookNowButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f1f5f9',
  },
});

