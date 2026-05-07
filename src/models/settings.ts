export type Settings = {
  morningBreathEnabled: boolean;
  morningBreathTime: string;
  hydrationEnabled: boolean;
  hydrationIntervalMinutes: number;
  screenBreakEnabled: boolean;
  screenBreakIntervalMinutes: number;
  windDownEnabled: boolean;
  windDownTime: string;
};

export const MIN_INTERVAL_MINUTES = 15;
export const MAX_INTERVAL_MINUTES = 240;

export const defaultSettings: Settings = {
  morningBreathEnabled: true,
  morningBreathTime: '08:00',
  hydrationEnabled: true,
  hydrationIntervalMinutes: 60,
  screenBreakEnabled: true,
  screenBreakIntervalMinutes: 90,
  windDownEnabled: true,
  windDownTime: '22:00',
};
