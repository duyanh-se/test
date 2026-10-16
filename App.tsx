import { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const colors = { background: '#F6F5F0', card: '#FFFFFF', ink: '#171717', muted: '#475569', accent: '#A16207', border: '#E5E5E5' };

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.content}>
            <Text style={styles.eyebrow}>BẢN THỬ NGHIỆM · 01</Text>
            <Text style={styles.title}>Xin chào, iPad.</Text>
            <Text style={styles.description}>Một ứng dụng React Native nhỏ để kiểm tra cài đặt và tương tác trên thiết bị của bạn.</Text>
            <View style={styles.card}>
              <Text style={styles.label}>Số lần chạm</Text>
              <Text accessibilityLiveRegion="polite" style={styles.count}>{count}</Text>
              <Pressable accessibilityRole="button" onPress={() => setCount(value => value + 1)} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
                <Text style={styles.buttonText}>Chạm để tăng +1</Text>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={() => setCount(0)} style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}>
                <Text style={styles.secondaryText}>Đặt lại bộ đếm</Text>
              </Pressable>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Môi trường đang chạy</Text>
              <Text style={styles.detail}>{Platform.OS} · {String(Platform.Version)}</Text>
              <Text style={styles.description}>Phiên bản app 1.0.0. Bộ đếm chỉ lưu trong phiên mở app này.</Text>
              <Pressable accessibilityRole="button" onPress={() => Alert.alert('Chào bạn!', 'Hộp thoại native đã mở. Hãy thử đóng app, bật chế độ máy bay và mở lại bản Release.')} style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}>
                <Text style={styles.secondaryText}>Thử hộp thoại native</Text>
              </Pressable>
            </View>
            <Text style={styles.footer}>Bản Release đóng gói sẵn mã ứng dụng, không cần máy tính chạy máy chủ phát triển.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, padding: 24, alignItems: 'center' },
  content: { width: '100%', maxWidth: 620, gap: 20, paddingVertical: 24 },
  eyebrow: { fontSize: 12, letterSpacing: 2, fontWeight: '700', color: colors.accent },
  title: { fontSize: 40, fontWeight: '700', color: colors.ink },
  description: { fontSize: 16, lineHeight: 25, color: colors.muted },
  card: { backgroundColor: colors.card, padding: 24, gap: 16, borderRadius: 24, borderWidth: 1, borderColor: colors.border },
  label: { fontSize: 16, fontWeight: '600', color: colors.muted },
  count: { fontSize: 80, fontWeight: '700', color: colors.ink, textAlign: 'center', fontVariant: ['tabular-nums'] },
  button: { minHeight: 56, padding: 16, backgroundColor: colors.ink, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: '600', color: colors.card, textAlign: 'center' },
  secondary: { minHeight: 48, padding: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  secondaryText: { fontSize: 16, fontWeight: '600', color: colors.ink, textAlign: 'center' },
  pressed: { opacity: 0.65 },
  detail: { fontSize: 22, fontWeight: '600', color: colors.ink },
  footer: { fontSize: 14, lineHeight: 22, color: colors.muted },
});
