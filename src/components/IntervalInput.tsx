import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { MAX_INTERVAL_MINUTES, MIN_INTERVAL_MINUTES } from '../models/settings';
import { theme } from '../theme';

type IntervalInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  helper?: string;
};

const STEP_MINUTES = 5;

const clampInterval = (value: number) =>
  Math.min(MAX_INTERVAL_MINUTES, Math.max(MIN_INTERVAL_MINUTES, value));

export const IntervalInput = ({ label, value, onChange, helper }: IntervalInputProps) => {
  const handleTextChange = (text: string) => {
    const numeric = Number(text.replace(/[^0-9]/g, ''));
    if (Number.isFinite(numeric) && numeric > 0) {
      onChange(clampInterval(numeric));
    }
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          onPress={() => onChange(clampInterval(value - STEP_MINUTES))}
          style={styles.adjustButton}
        >
          <Text style={styles.adjustText}>-</Text>
        </Pressable>
        <TextInput
          keyboardType="number-pad"
          value={String(value)}
          onChangeText={handleTextChange}
          style={styles.input}
        />
        <Text style={styles.unit}>min</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => onChange(clampInterval(value + STEP_MINUTES))}
          style={styles.adjustButton}
        >
          <Text style={styles.adjustText}>+</Text>
        </Pressable>
      </View>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginBottom: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  adjustButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111720',
  },
  adjustText: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    minWidth: 64,
    textAlign: 'center',
    color: theme.colors.textPrimary,
    fontSize: 16,
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  unit: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  helper: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    fontSize: 12,
  },
});
