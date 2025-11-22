import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  Modal,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  action?: () => void;
  isDestructive?: boolean;
  badge?: number;
}

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
  const router = useRouter();
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const notificationCount = 2;

  const menuItems: MenuItem[] = [
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'notifications',
      action: () => setNotificationsVisible(true),
      badge: notificationCount,
    },
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      route: '/(tabs)',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'person',
      route: '/profile',
    },
    {
      id: 'bookings',
      label: 'My Bookings',
      icon: 'calendar',
      route: '/my-bookings',
    },
    {
      id: 'car-tips',
      label: 'Car Care Tips',
      icon: 'bulb',
      route: '/car-care-tips',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      route: '/settings',
    },
    {
      id: 'about',
      label: 'About',
      icon: 'information-circle',
      route: '/about',
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: 'log-out',
      action: () => {
        handleLogout();
      },
      isDestructive: true,
    },
  ];

  const notifications = [
    { id: '1', title: 'Booking Confirmed', message: 'Your car wash appointment is confirmed for tomorrow at 2:00 PM', time: '2 hours ago' },
    { id: '2', title: 'Special Offer', message: 'Get 20% off on premium detailing this weekend!', time: '1 day ago' },
  ];

  const handleNavigation = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route as any);
      onClose();
    } else if (item.action) {
      item.action();
    }
  };

  const handleLogout = () => {
    router.replace('/login');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Drawer */}
        <View style={styles.drawer}>
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

          <View style={styles.drawerGradient}>
            {/* Header */}
            <View style={styles.drawerHeader}>
              <View style={styles.headerGradient}>
                <View style={styles.headerContent}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="close" size={24} color="#f1f5f9" />
                  </TouchableOpacity>
                  <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={32} color="#f1f5f9" />
                  </View>
                  <Text style={styles.userName}>John Doe</Text>
                  <Text style={styles.userEmail}>john.doe@example.com</Text>
                </View>
              </View>
            </View>

            {/* Menu Items */}
            <ScrollView
              style={styles.menuContainer}
              showsVerticalScrollIndicator={false}
            >
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    item.isDestructive && styles.menuItemDestructive,
                  ]}
                  onPress={() => handleNavigation(item)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.menuIconContainer,
                      item.isDestructive && styles.menuIconContainerDestructive,
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color={item.isDestructive ? '#ef4444' : '#3b82f6'}
                    />
                    {item.badge && item.badge > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.menuLabel,
                      item.isDestructive && styles.menuLabelDestructive,
                    ]}
                  >
                    {item.label}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={item.isDestructive ? '#ff4444' : 'rgba(255, 255, 255, 0.4)'}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Footer */}
            <View style={styles.drawerFooter}>
              <Text style={styles.footerText}>Car Clean App</Text>
              <Text style={styles.footerVersion}>Version 1.0.0</Text>
            </View>
          </View>
        </View>

        {/* Notifications Modal */}
        {notificationsVisible && (
          <Modal
            visible={notificationsVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setNotificationsVisible(false)}
          >
            <View style={styles.notificationContainer}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>Notifications</Text>
                <TouchableOpacity
                  onPress={() => setNotificationsVisible(false)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="close" size={24} color="#f1f5f9" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.notificationList}>
                {notifications.map((notification) => (
                  <TouchableOpacity
                    key={notification.id}
                    style={styles.notificationItem}
                    activeOpacity={0.7}
                  >
                    <View style={styles.notificationIcon}>
                      <Ionicons name="notifications" size={24} color="#3b82f6" />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationItemTitle}>
                        {notification.title}
                      </Text>
                      <Text style={styles.notificationItemMessage}>
                        {notification.message}
                      </Text>
                      <Text style={styles.notificationItemTime}>
                        {notification.time}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    width: DRAWER_WIDTH,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
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
  drawerGradient: {
    flex: 1,
    zIndex: 1,
  },
  drawerHeader: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    overflow: 'hidden',
  },
  headerGradient: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  headerContent: {
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(26, 31, 46, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 2,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#94a3b8',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemDestructive: {
    borderBottomColor: 'rgba(255, 68, 68, 0.2)',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  menuIconContainerDestructive: {
    backgroundColor: 'rgba(255, 68, 68, 0.15)',
    borderColor: 'rgba(255, 68, 68, 0.3)',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  menuLabelDestructive: {
    color: '#ff4444',
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  notificationContainer: {
    flex: 1,
    backgroundColor: '#1a1f2e',
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  notificationTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  notificationList: {
    flex: 1,
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1a1f2e',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  notificationContent: {
    flex: 1,
  },
  notificationItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  notificationItemMessage: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationItemTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});
