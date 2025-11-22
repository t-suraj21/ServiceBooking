# Car Cleaning Service App 🚗✨

A modern, feature-rich mobile application for booking car cleaning services. Built with React Native and Expo, featuring a beautiful dark theme UI with smooth animations and a complete booking management system.

## 📱 Features

- **Splash Screen**: Animated welcome screen with car imagery
- **Authentication**: Login and Registration screens with social login options
- **Home Screen**: Browse car cleaning services with favorites functionality
- **Service Booking**: 
  - Book Car Wash (Basic, Premium, Deluxe packages)
  - Interior Cleaning (Multiple service selection)
  - Exterior Detailing (Standard, Premium, Ultimate packages)
- **My Bookings**: View and manage upcoming and past bookings
- **Car Care Tips**: Educational content for car maintenance
- **Profile & Settings**: User profile management
- **Drawer Menu**: Hamburger menu with navigation options
- **Dark Theme**: Consistent dark theme throughout the app
- **Real-time Booking Management**: Context-based state management for bookings

## 🚀 Steps to Run the Project

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Expo CLI (will be installed globally or via npx)
- iOS Simulator (for iOS) or Android Emulator (for Android) or Expo Go app on your device

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-cleaning
   ```

2. **Navigate to the project directory**
   ```bash
   cd car-cleaning
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the Expo development server**
   ```bash
   npx expo start
   ```

5. **Run on your preferred platform**
   - **iOS Simulator**: Press `i` in the terminal or scan QR code with Expo Go
   - **Android Emulator**: Press `a` in the terminal or scan QR code with Expo Go
   - **Physical Device**: Install Expo Go app and scan the QR code
   - **Web**: Press `w` in the terminal

### Alternative Commands

```bash
# Start with specific platform
npm run ios        # iOS Simulator
npm run android    # Android Emulator
npm run web        # Web browser

# Lint the code
npm run lint
```

## 📚 Libraries Used

### Core Framework
- **expo**: ~54.0.25 - Expo SDK for React Native development
- **react**: 19.1.0 - React library
- **react-native**: 0.81.5 - React Native framework
- **expo-router**: ~6.0.15 - File-based routing for navigation

### Navigation
- **@react-navigation/native**: ^7.1.21 - Core navigation library
- **@react-navigation/native-stack**: ^7.7.0 - Stack navigator
- **@react-navigation/bottom-tabs**: ^7.8.6 - Bottom tab navigator
- **react-native-screens**: ~4.16.0 - Native screen components
- **react-native-safe-area-context**: ~5.6.0 - Safe area handling

### UI & Styling
- **expo-linear-gradient**: ^15.0.7 - Gradient backgrounds
- **expo-image**: ~3.0.10 - Optimized image component
- **react-native-svg**: ^15.15.0 - SVG support
- **@expo/vector-icons**: ^15.0.3 - Icon library (Ionicons)

### Animations
- **react-native-reanimated**: ~4.1.1 - High-performance animations
- **react-native-gesture-handler**: ~2.28.0 - Gesture handling

### Utilities
- **@react-native-async-storage/async-storage**: 2.2.0 - Local storage
- **expo-status-bar**: ~3.0.8 - Status bar management
- **expo-constants**: ~18.0.10 - App constants
- **uuid**: ^13.0.0 - Unique ID generation

### Development Tools
- **typescript**: ~5.9.2 - TypeScript support
- **eslint**: ^9.25.0 - Code linting
- **eslint-config-expo**: ~10.0.0 - Expo ESLint configuration

## 🔧 Assumptions Made

1. **Authentication**: 
   - Login/Register screens are implemented but actual authentication backend is not connected
   - Users can navigate directly to home screen without authentication for demo purposes

2. **Booking System**:
   - Bookings are stored in React Context (in-memory) and will be lost on app restart
   - No persistent storage (AsyncStorage) is implemented for bookings
   - Booking dates use simple strings ("Today", "Tomorrow") rather than actual date parsing

3. **Pricing & Currency**:
   - All prices are in Indian Rupees (₹) as per Indian market
   - Prices are hardcoded and not fetched from a backend

4. **Images**:
   - Car images are loaded from Unsplash URLs
   - No local image assets are used for car images
   - Images require internet connection to load

5. **Location**:
   - Location is hardcoded as "Mumbai, India"
   - No actual GPS/location services are implemented

6. **Time Slots**:
   - Time slots are predefined and not dynamically generated based on availability
   - No backend validation for booking availability

7. **Social Login**:
   - Social login buttons (Google, Apple, Facebook) are UI-only and not functional
   - No actual OAuth integration is implemented

8. **Notifications**:
   - Notification button in drawer menu is UI-only
   - No push notification service is integrated

9. **Payment**:
   - No payment gateway integration
   - Booking confirmation happens without payment processing

10. **User Profile**:
    - User profile data is not persisted
    - No user authentication state management

## 📁 Project Structure

```
car-cleaning/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab navigation screens
│   ├── splash.tsx         # Splash screen
│   ├── login.tsx          # Login screen
│   ├── register.tsx        # Registration screen
│   ├── book-car-wash.tsx  # Car wash booking
│   ├── interior-cleaning.tsx
│   ├── exterior-detailing.tsx
│   ├── my-bookings.tsx    # Booking management
│   ├── car-care-tips.tsx
│   └── _layout.tsx          # Root layout
├── components/            # Reusable components
│   ├── drawer-menu.tsx   # Hamburger menu
│   └── footer.tsx        # App footer
├── contexts/             # React Context providers
│   └── BookingContext.tsx # Booking state management
├── hooks/                # Custom React hooks
├── constants/            # App constants
└── package.json         # Dependencies
```

## 🎨 Design Features

- **Dark Theme**: Consistent dark color scheme (#0f1419, #1a1f2e)
- **Glassmorphism**: Blur overlay effects on buttons and cards
- **Smooth Animations**: Reanimated animations for transitions
- **Gradient Backgrounds**: Linear gradients for visual appeal
- **Responsive Design**: Adapts to different screen sizes
- **Modern UI/UX**: Clean, minimal, and user-friendly interface

## 📝 Notes

- The app is optimized for mobile devices (iOS and Android)
- Internet connection is required for loading car images from Unsplash
- All booking data is stored in memory and will be cleared on app restart
- The app uses Expo Router for file-based routing

## 🔗 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

---

**Version**: 1.0.0  
**Last Updated**: 2024
