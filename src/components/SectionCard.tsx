import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme';

type SectionCardProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export const SectionCard = ({ title, description, children }: SectionCardProps) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
    <View style={styles.content}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    marginTop: theme.spacing.md,
  },
});
