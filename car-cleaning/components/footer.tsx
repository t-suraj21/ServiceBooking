import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <LinearGradient
        colors={['#1a1f2e', '#0f1419', '#1a1f2e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.footerGradient}
      >
        <View style={styles.footerDivider} />  
        <View style={styles.footerBottom}>
          <Text style={styles.footerText}>© 2024 Car Clean App</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity activeOpacity={0.7} style={styles.socialButtonContainer}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.socialButton}
              >
                <Ionicons name="logo-facebook" size={20} color="#3b82f6" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.socialButtonContainer}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.socialButton}
              >
                <Ionicons name="logo-twitter" size={20} color="#3b82f6" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.socialButtonContainer}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.socialButton}
              >
                <Ionicons name="logo-instagram" size={20} color="#3b82f6" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  footerGradient: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  footerDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButtonContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  socialButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderRadius: 18,
  },
});
