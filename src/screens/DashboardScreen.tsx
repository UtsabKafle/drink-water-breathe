import { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { IntervalInput } from '../components/IntervalInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionCard } from '../components/SectionCard';
import { TimePickerField } from '../components/TimePickerField';
import { Settings } from '../models/settings';
import { theme } from '../theme';

type DashboardScreenProps = {
  settings: Settings;
  onSave: (settings: Settings) => void;
  onStartBreathing: () => void;
};

export const DashboardScreen = ({
  settings,
  onSave,
  onStartBreathing,
}: DashboardScreenProps) => {
  const [draft, setDraft] = useState(settings);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const hasChanges = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(settings),
    [draft, settings]
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>Zen Space</Text>
      <Text style={styles.subheading}>
        Gentle reminders to breathe, hydrate, rest your eyes, and wind down.
      </Text>

      <SectionCard
        title="🌬️ Morning Breath"
        description="A four-part box breathing cycle to center your day."
      >
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Enable reminder</Text>
          <Switch
            value={draft.morningBreathEnabled}
            onValueChange={(value) =>
              setDraft((prev) => ({ ...prev, morningBreathEnabled: value }))
            }
            trackColor={{ true: theme.colors.accent }}
          />
        </View>
        <TimePickerField
          label="Start time"
          value={draft.morningBreathTime}
          onChange={(value) =>
            setDraft((prev) => ({ ...prev, morningBreathTime: value }))
          }
        />
        <View style={styles.inlineButton}>
          <PrimaryButton label="Start breathing now" onPress={onStartBreathing} />
        </View>
      </SectionCard>

      <SectionCard
        title="💧 Hydration Nudges"
        description="Soft reminders to sip water throughout the day."
      >
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Enable reminder</Text>
          <Switch
            value={draft.hydrationEnabled}
            onValueChange={(value) =>
              setDraft((prev) => ({ ...prev, hydrationEnabled: value }))
            }
            trackColor={{ true: theme.colors.accent }}
          />
        </View>
        <IntervalInput
          label="Interval"
          value={draft.hydrationIntervalMinutes}
          onChange={(value) =>
            setDraft((prev) => ({ ...prev, hydrationIntervalMinutes: value }))
          }
          helper="Minimum 15 minutes."
        />
      </SectionCard>

      <SectionCard
        title="☕ Screen Breaks"
        description="Look away, stretch, and reset your posture."
      >
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Enable reminder</Text>
          <Switch
            value={draft.screenBreakEnabled}
            onValueChange={(value) =>
              setDraft((prev) => ({ ...prev, screenBreakEnabled: value }))
            }
            trackColor={{ true: theme.colors.accent }}
          />
        </View>
        <IntervalInput
          label="Interval"
          value={draft.screenBreakIntervalMinutes}
          onChange={(value) =>
            setDraft((prev) => ({ ...prev, screenBreakIntervalMinutes: value }))
          }
          helper="Minimum 15 minutes."
        />
      </SectionCard>

      <SectionCard
        title="🌙 Wind Down"
        description="A steady signal to close screens and rest."
      >
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Enable reminder</Text>
          <Switch
            value={draft.windDownEnabled}
            onValueChange={(value) =>
              setDraft((prev) => ({ ...prev, windDownEnabled: value }))
            }
            trackColor={{ true: theme.colors.accent }}
          />
        </View>
        <TimePickerField
          label="Wind down time"
          value={draft.windDownTime}
          onChange={(value) =>
            setDraft((prev) => ({ ...prev, windDownTime: value }))
          }
        />
      </SectionCard>

      <PrimaryButton
        label={hasChanges ? 'Apply preferences' : 'Preferences saved'}
        onPress={() => onSave(draft)}
        disabled={!hasChanges}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  heading: {
    color: theme.colors.textPrimary,
    fontSize: 32,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  subheading: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: theme.spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  rowLabel: {
    color: theme.colors.textPrimary,
    fontSize: 15,
  },
  inlineButton: {
    marginTop: theme.spacing.md,
  },
});
