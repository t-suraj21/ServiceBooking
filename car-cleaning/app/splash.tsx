import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Full Screen Car Image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&q=80' }}
        style={styles.fullScreenImage}
        contentFit="cover"
        transition={500}
      />
      
      {/* Dark Overlay */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.overlay}
      >
        {/* Main Content */}
        <View style={styles.content}>
          {/* Top Text Section */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(800)}
            style={styles.textContainer}
          >
            <Text style={styles.mainText}>YOUR CAR</Text>
            <Text style={styles.mainText}>IS READY</Text>
            <Text style={styles.mainText}>TO GO!</Text>
          </Animated.View>

          {/* Bottom Button */}
          <Animated.View
            entering={FadeInUp.delay(900).duration(800)}
            style={styles.buttonContainer}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={handleGetStarted}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#3b82f6', '#2563eb', '#1d4ed8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Ionicons name="lock-closed" size={20} color="#ffffff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Tap To Unlock</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  fullScreenImage: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
    paddingBottom: Platform.OS === 'ios' ? 60 : 40,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginTop: 40,
  },
  mainText: {
    fontSize: 52,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 3,
    lineHeight: 64,
    fontFamily: Platform.select({
      ios: 'system',
      default: 'sans-serif',
    }),
    textShadowColor: 'rgba(59, 130, 246, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  buttonIcon: {
    marginRight: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
});
