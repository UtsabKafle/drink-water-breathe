import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { theme } from '../theme';

type BreathingScreenProps = {
  onDone: () => void;
};

const PHASE_DURATION = 4000;

const phases = [
  { label: 'Inhale', subtitle: 'Draw a calm breath in.' },
  { label: 'Hold', subtitle: 'Let the breath settle.' },
  { label: 'Exhale', subtitle: 'Release slowly.' },
  { label: 'Hold', subtitle: 'Rest in stillness.' },
];

export const BreathingScreen = ({ onDone }: BreathingScreenProps) => {
  const scale = useRef(new Animated.Value(0.6)).current;
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: PHASE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: PHASE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.6,
          duration: PHASE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.6,
          duration: PHASE_DURATION,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    const interval = setInterval(() => {
      setPhaseIndex((current) => (current + 1) % phases.length);
    }, PHASE_DURATION);

    return () => {
      animation.stop();
      clearInterval(interval);
    };
  }, [scale]);

  const phase = useMemo(() => phases[phaseIndex], [phaseIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Morning Breath</Text>
      <Text style={styles.subtitle}>Box breathing for clarity.</Text>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, { transform: [{ scale }] }]} />
        <View style={styles.circleText}>
          <Text style={styles.phase}>{phase.label}</Text>
          <Text style={styles.phaseSubtitle}>{phase.subtitle}</Text>
        </View>
      </View>
      <Pressable accessibilityRole="button" onPress={onDone} style={styles.button}>
        <Text style={styles.buttonText}>Back to dashboard</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: '600',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xl,
  },
  circleContainer: {
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    backgroundColor: 'rgba(123, 223, 242, 0.12)',
  },
  circleText: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  phase: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: '600',
  },
  phaseSubtitle: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  button: {
    marginTop: theme.spacing.xl,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  buttonText: {
    color: theme.colors.textPrimary,
  },
});
