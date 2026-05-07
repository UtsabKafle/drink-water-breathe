import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import * as Notifications from 'expo-notifications';

import { BreathingScreen } from './src/screens/BreathingScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { Settings, defaultSettings } from './src/models/settings';
import { configureNotifications, rescheduleNotifications } from './src/services/notifications';
import { loadSettings, saveSettings } from './src/storage/settings';
import { theme } from './src/theme';

export default function App() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'breathing'>(
    'dashboard'
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        await configureNotifications();
      } catch {
        // Permissions can be denied; continue to load settings.
      }

      const stored = await loadSettings();
      if (!isMounted) {
        return;
      }
      setSettings(stored);

      try {
        await rescheduleNotifications(stored);
      } catch {
        // Scheduling can fail without permissions; ignore.
      }

      setLoading(false);
    };

    init();

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const screen = response.notification.request.content.data?.screen;
        if (screen === 'breathing') {
          setActiveScreen('breathing');
        }
      }
    );

    return () => {
      isMounted = false;
      responseListener.remove();
    };
  }, []);

  const handleSave = async (nextSettings: Settings) => {
    setSettings(nextSettings);
    await saveSettings(nextSettings);
    try {
      await rescheduleNotifications(nextSettings);
    } catch {
      // Ignore scheduling failures when permissions are denied.
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator color={theme.colors.accent} />
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {activeScreen === 'dashboard' ? (
          <DashboardScreen
            settings={settings}
            onSave={handleSave}
            onStartBreathing={() => setActiveScreen('breathing')}
          />
        ) : (
          <BreathingScreen onDone={() => setActiveScreen('dashboard')} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});
