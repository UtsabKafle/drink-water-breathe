import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { theme } from '../theme';
import { formatTime, parseTimeString } from '../utils/time';

type TimePickerFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export const TimePickerField = ({ label, value, onChange }: TimePickerFieldProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const selectedDate = parseTimeString(value);

  const handleChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (date) {
      onChange(formatTime(date));
    }
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => setShowPicker(true)}
        style={styles.valueButton}
      >
        <Text style={styles.valueText}>{value}</Text>
      </Pressable>
      {showPicker ? (
        <View style={styles.pickerWrapper}>
          <DateTimePicker
            mode="time"
            value={selectedDate}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
          />
          {Platform.OS === 'ios' ? (
            <Pressable onPress={() => setShowPicker(false)} style={styles.doneButton}>
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginBottom: theme.spacing.xs,
  },
  valueButton: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: '#111720',
  },
  valueText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  pickerWrapper: {
    marginTop: theme.spacing.sm,
    backgroundColor: '#111720',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.sm,
  },
  doneButton: {
    alignSelf: 'flex-end',
    marginTop: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  },
  doneText: {
    color: theme.colors.accent,
    fontWeight: '600',
  },
});
