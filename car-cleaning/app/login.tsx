import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Ellipse, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    router.replace('/(tabs)');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Wavy Header with Gradient */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#1e293b', '#0f172a', '#0a0f1a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <Svg
              width={width}
              height={180}
              viewBox={`0 0 ${width} 180`}
              style={styles.wavySvg}
            >
              <Path
                d={`M 0 120 Q ${width * 0.25} 80, ${width * 0.5} 100 T ${width} 120 L ${width} 180 L 0 180 Z`}
                fill="rgba(59, 130, 246, 0.15)"
              />
              <Path
                d={`M 0 140 Q ${width * 0.3} 100, ${width * 0.6} 120 T ${width} 140 L ${width} 180 L 0 180 Z`}
                fill="rgba(99, 102, 241, 0.1)"
              />
            </Svg>
            
            {/* Character watering plant illustration */}
            <View style={styles.illustrationContainer}>
              <Svg width={180} height={160} viewBox="0 0 180 160">
                {/* Plant pot */}
                <Rect x="70" y="100" width="40" height="35" rx="3" ry="3" fill="#f1f5f9" opacity={0.9} />
                <Rect x="72" y="102" width="36" height="33" rx="2" ry="2" fill="#3b82f6" opacity={0.3} />
                
                {/* Plant stem */}
                <Path
                  d="M 90 100 Q 85 80, 90 60 Q 95 50, 90 40"
                  stroke="#f1f5f9"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                
                {/* Leaves */}
                <Ellipse cx="75" cy="55" rx="12" ry="18" fill="#f1f5f9" opacity={0.9} />
                <Ellipse cx="105" cy="50" rx="12" ry="18" fill="#f1f5f9" opacity={0.9} />
                <Ellipse cx="85" cy="45" rx="10" ry="15" fill="#f1f5f9" opacity={0.9} />
                
                {/* Character - simple flat style */}
                <Circle cx="50" cy="90" r="25" fill="#f1f5f9" opacity={0.9} />
                <Ellipse cx="50" cy="120" rx="20" ry="25" fill="#f1f5f9" opacity={0.9} />
                
                {/* Arms holding watering can */}
                <Path
                  d="M 30 100 Q 20 95, 15 105"
                  stroke="#f1f5f9"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
                <Rect x="10" y="100" width="12" height="18" rx="2" ry="2" fill="#f1f5f9" opacity={0.9} />
                <Circle cx="16" cy="108" r="2" fill="#3b82f6" />
                
                {/* Water drops */}
                <Circle cx="20" cy="125" r="2" fill="#f1f5f9" opacity={0.8} />
                <Circle cx="25" cy="130" r="1.5" fill="#f1f5f9" opacity={0.7} />
                <Circle cx="18" cy="135" r="2" fill="#f1f5f9" opacity={0.8} />
              </Svg>
            </View>
          </LinearGradient>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#3b82f6" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#64748b"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#3b82f6" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#64748b"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
              />
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Social Login Icons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={24} color="#f1f5f9" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={24} color="#f1f5f9" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={24} color="#f1f5f9" />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#3b82f6', '#2563eb', '#1d4ed8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    height: 200,
    overflow: 'hidden',
  },
  headerGradient: {
    flex: 1,
    position: 'relative',
  },
  wavySvg: {
    position: 'absolute',
    bottom: 0,
  },
  illustrationContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: 'system',
      default: 'sans-serif',
    }),
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1f2e',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#334155',
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#f1f5f9',
    fontFamily: Platform.select({
      ios: 'system',
      default: 'sans-serif',
    }),
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1a1f2e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
    fontFamily: Platform.select({
      ios: 'system',
      default: 'sans-serif',
    }),
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  registerLink: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '700',
  },
});
