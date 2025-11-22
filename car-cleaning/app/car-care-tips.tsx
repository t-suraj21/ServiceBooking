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
  Layout,
} from 'react-native-reanimated';
import Footer from '@/components/footer';

const { width } = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface Tip {
  id: string;
  title: string;
  category: string;
  icon: string;
  content: string;
  tips: string[];
}

export default function CarCareTipsScreen() {
  const router = useRouter();
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const tips: Tip[] = [
    {
      id: '1',
      title: 'Regular Washing Schedule',
      category: 'Maintenance',
      icon: 'water',
      content: 'Maintain your car\'s shine with regular washing',
      tips: [
        'Wash your car every 2 weeks to prevent dirt buildup',
        'Use pH-balanced car shampoo, not dish soap',
        'Wash in the shade to prevent water spots',
        'Use microfiber towels to avoid scratches',
        'Dry thoroughly to prevent water marks',
      ],
    },
    {
      id: '2',
      title: 'Interior Care',
      category: 'Interior',
      icon: 'car-sport',
      content: 'Keep your car interior fresh and clean',
      tips: [
        'Vacuum carpets and seats weekly',
        'Use leather conditioner for leather seats',
        'Clean dashboard with appropriate cleaners',
        'Remove trash and clutter regularly',
        'Use air fresheners sparingly',
      ],
    },
    {
      id: '3',
      title: 'Waxing & Protection',
      category: 'Exterior',
      icon: 'sparkles',
      content: 'Protect your car\'s paint with proper waxing',
      tips: [
        'Wax every 3-4 months for best protection',
        'Apply wax in circular motions',
        'Use quality carnauba or synthetic wax',
        'Avoid waxing in direct sunlight',
        'Remove excess wax with clean microfiber',
      ],
    },
    {
      id: '4',
      title: 'Tire Maintenance',
      category: 'Tires',
      icon: 'disc',
      content: 'Keep your tires in top condition',
      tips: [
        'Check tire pressure monthly',
        'Rotate tires every 6,000-8,000 miles',
        'Clean tires with tire cleaner regularly',
        'Apply tire shine for protection',
        'Inspect for wear and damage',
      ],
    },
    {
      id: '5',
      title: 'Window Care',
      category: 'Windows',
      icon: 'sunny',
      content: 'Crystal clear windows for better visibility',
      tips: [
        'Clean windows inside and out',
        'Use glass cleaner, not ammonia-based',
        'Use microfiber cloths for streak-free finish',
        'Clean in circular motions',
        'Check wiper blades regularly',
      ],
    },
    {
      id: '6',
      title: 'Seasonal Care',
      category: 'Seasonal',
      icon: 'snow',
      content: 'Adapt your care routine to the seasons',
      tips: [
        'Wash more frequently in winter (salt removal)',
        'Protect from sun in summer (use car covers)',
        'Remove leaves and debris in fall',
        'Check for rust after winter',
        'Apply extra protection before harsh weather',
      ],
    },
  ];

  const toggleTip = (id: string) => {
    setExpandedTip(expandedTip === id ? null : id);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Maintenance: '#3b82f6',
      Interior: '#3b82f6',
      Exterior: '#1d4ed8',
      Tires: '#94a3b8',
      Windows: '#3b82f6',
      Seasonal: '#3b82f6',
    };
    return colors[category] || '#3b82f6';
  };

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
            Car Care Tips
          </Animated.Text>
          <Text style={styles.headerSubtitle}>Expert advice for your vehicle</Text>
        </LinearGradient>

        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <Text style={styles.sectionTitle}>Expert Tips</Text>
            <Text style={styles.sectionSubtitle}>
              Learn how to keep your car in perfect condition
            </Text>
          </Animated.View>

          <View style={styles.tipsContainer}>
            {tips.map((tip, index) => {
              const isExpanded = expandedTip === tip.id;
              const categoryColor = getCategoryColor(tip.category);
              return (
                <AnimatedTouchable
                  key={tip.id}
                  entering={FadeInDown.delay(300 + index * 100).duration(500)}
                  layout={Layout.springify()}
                  style={[
                    styles.tipCard,
                    isExpanded && styles.tipCardExpanded,
                  ]}
                  onPress={() => toggleTip(tip.id)}
                  activeOpacity={0.9}
                >
                  <View style={styles.tipHeader}>
                    <View style={[
                      styles.tipIconContainer,
                      { backgroundColor: `${categoryColor}20` },
                    ]}>
                      <Ionicons
                        name={tip.icon as any}
                        size={28}
                        color={categoryColor}
                      />
                    </View>
                    <View style={styles.tipHeaderContent}>
                      <View style={styles.tipCategoryContainer}>
                        <View
                          style={[
                            styles.tipCategoryBadge,
                            { backgroundColor: `${categoryColor}20` },
                          ]}
                        >
                          <Text
                            style={[
                              styles.tipCategoryText,
                              { color: categoryColor },
                            ]}
                          >
                            {tip.category}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.tipTitle}>{tip.title}</Text>
                      <Text style={styles.tipContent}>{tip.content}</Text>
                    </View>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="#3b82f6"
                    />
                  </View>

                  {isExpanded && (
                    <Animated.View
                      entering={FadeInDown.duration(400)}
                      style={styles.tipDetails}
                    >
                      <View style={styles.tipsList}>
                        {tip.tips.map((tipItem, idx) => (
                          <View key={idx} style={styles.tipItem}>
                            <View style={styles.tipBullet}>
                              <Ionicons
                                name="checkmark-circle"
                                size={18}
                                color={categoryColor}
                              />
                            </View>
                            <Text style={styles.tipItemText}>{tipItem}</Text>
                          </View>
                        ))}
                      </View>
                    </Animated.View>
                  )}
                </AnimatedTouchable>
              );
            })}
          </View>

          {/* Call to Action */}
          <Animated.View entering={FadeInUp.delay(800).duration(600)}>
            <View style={styles.ctaCard}>
              <LinearGradient
                colors={['rgba(59, 130, 246, 0.15)', '#0f1419']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ctaGradient}
              >
                <Ionicons name="sparkles" size={40} color="#3b82f6" />
                <Text style={styles.ctaTitle}>Need Professional Help?</Text>
                <Text style={styles.ctaSubtitle}>
                  Book our expert services for premium car care
                </Text>
                <TouchableOpacity
                  style={styles.ctaButton}
                  onPress={() => router.push('/book-car-wash')}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#3b82f6', '#3b82f6', '#1d4ed8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.ctaButtonGradient}
                  >
                    <Text style={styles.ctaButtonText}>Book Service</Text>
                    <Ionicons name="arrow-forward" size={20} color="#0f1419" />
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </View>
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
    marginBottom: 24,
  },
  tipsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  tipCard: {
    backgroundColor: '#1a1f2e',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tipCardExpanded: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  tipIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipHeaderContent: {
    flex: 1,
  },
  tipCategoryContainer: {
    marginBottom: 8,
  },
  tipCategoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  tipCategoryText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  tipContent: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  tipDetails: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipBullet: {
    marginTop: 2,
  },
  tipItemText: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
    flex: 1,
  },
  ctaCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  ctaGradient: {
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f1f5f9',
    marginTop: 12,
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  ctaButtonGradient: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f1419',
  },
});

