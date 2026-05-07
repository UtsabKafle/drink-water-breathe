import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { Settings } from '../models/settings';
import { parseTimeParts } from '../utils/time';

const CHANNEL_ID = 'zen-space-reminders';

export const configureNotifications = async () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Zen Space',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 200, 100, 200],
      lightColor: '#7BDFF2',
    });
  }

  const permissions = await Notifications.getPermissionsAsync();
  if (!permissions.granted) {
    await Notifications.requestPermissionsAsync();
  }
};

const scheduleDaily = async (
  title: string,
  body: string,
  time: string,
  data?: Record<string, string>
) => {
  const { hour, minute } = parseTimeParts(time);
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      channelId: CHANNEL_ID,
    },
  });
};

const scheduleInterval = async (
  title: string,
  body: string,
  intervalMinutes: number
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: intervalMinutes * 60,
      repeats: true,
      channelId: CHANNEL_ID,
    },
  });
};

export const rescheduleNotifications = async (settings: Settings) => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (settings.morningBreathEnabled) {
    await scheduleDaily(
      'Morning Breath',
      'Take four slow rounds of box breathing.',
      settings.morningBreathTime,
      { screen: 'breathing' }
    );
  }

  if (settings.hydrationEnabled) {
    await scheduleInterval(
      'Hydration Nudge',
      'Take a slow sip of water.',
      settings.hydrationIntervalMinutes
    );
  }

  if (settings.screenBreakEnabled) {
    await scheduleInterval(
      'Screen Break',
      'Look away, stretch, and reset your posture.',
      settings.screenBreakIntervalMinutes
    );
  }

  if (settings.windDownEnabled) {
    await scheduleDaily(
      'Wind Down',
      'Close your screens and ease into rest.',
      settings.windDownTime
    );
  }
};
