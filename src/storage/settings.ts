import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  MAX_INTERVAL_MINUTES,
  MIN_INTERVAL_MINUTES,
  Settings,
  defaultSettings,
} from '../models/settings';

const SETTINGS_KEY = 'zen-space-settings';

const clampInterval = (value: number) =>
  Math.min(MAX_INTERVAL_MINUTES, Math.max(MIN_INTERVAL_MINUTES, value));

const asBoolean = (value: unknown, fallback: boolean) =>
  typeof value === 'boolean' ? value : fallback;

const asNumber = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const normalizeSettings = (settings: Partial<Settings>): Settings => ({
  morningBreathEnabled: asBoolean(
    settings.morningBreathEnabled,
    defaultSettings.morningBreathEnabled
  ),
  morningBreathTime: settings.morningBreathTime ?? defaultSettings.morningBreathTime,
  hydrationEnabled: asBoolean(
    settings.hydrationEnabled,
    defaultSettings.hydrationEnabled
  ),
  hydrationIntervalMinutes: clampInterval(
    asNumber(settings.hydrationIntervalMinutes, defaultSettings.hydrationIntervalMinutes)
  ),
  screenBreakEnabled: asBoolean(
    settings.screenBreakEnabled,
    defaultSettings.screenBreakEnabled
  ),
  screenBreakIntervalMinutes: clampInterval(
    asNumber(
      settings.screenBreakIntervalMinutes,
      defaultSettings.screenBreakIntervalMinutes
    )
  ),
  windDownEnabled: asBoolean(settings.windDownEnabled, defaultSettings.windDownEnabled),
  windDownTime: settings.windDownTime ?? defaultSettings.windDownTime,
});

export const loadSettings = async () => {
  const stored = await AsyncStorage.getItem(SETTINGS_KEY);
  if (!stored) {
    return defaultSettings;
  }
  try {
    const parsed = JSON.parse(stored) as Partial<Settings>;
    return normalizeSettings(parsed);
  } catch {
    return defaultSettings;
  }
};

export const saveSettings = async (settings: Settings) =>
  AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
