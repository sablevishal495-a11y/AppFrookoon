import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation<any>();
  const [lightMode, setLightMode] = useState(true);

  const SectionTitle = ({ title }: { title: string }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

const MenuItem = ({
  icon,
  title,
  rightText,
}: {
  icon: string;
  title: string;
  rightText?: string;
}) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuLeft}>
      <Icon name={icon} size={20} color="#ff7a00" />
      <Text style={styles.menuText}>{title}</Text>
    </View>

    <View style={styles.menuRight}>
      {rightText && <Text style={styles.rightText}>{rightText}</Text>}
      <Icon name="chevron-forward" size={20} color="#999" />
    </View>
  </TouchableOpacity>
);


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={26} color="#000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Settings</Text>

          <View style={{ width: 26 }} />
        </View>

        {/* ---------- USER CARD ---------- */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 22 }}>👤</Text>
          </View>

          <View>
            <Text style={styles.userName}>Amit Patel</Text>
            <Text style={styles.userEmail}>amitpatel@gmail.com</Text>
          </View>
        </View>

        {/* ---------- ACCOUNT ---------- */}
        <SectionTitle title="ACCOUNT" />

        <MenuItem
          icon="person-outline"
          title="Profile Data"
        />

        <MenuItem
          icon="card-outline"
          title="Billing & Payment"
        />

        {/* ---------- SETTINGS ---------- */}
        <SectionTitle title="SETTINGS" />

        <MenuItem
          icon="create-outline"
          title="Account Details"
        />

        <MenuItem
          icon="key-outline"
          title="Change Password"
        />

        {/* ---------- PREFERENCE ---------- */}
        <SectionTitle title="PREFERENCE" />

        <MenuItem
          icon="globe-outline"
          title="Language"
          rightText="English"
        />

        <View style={styles.switchRow}>
          <View style={styles.switchLeft}>
            <Icon name="sunny-outline" size={20} color="#ff7a00" />
            <Text style={styles.switchText}>Dark Mode</Text>
          </View>

          <Switch
            value={lightMode}
            onValueChange={setLightMode}
            trackColor={{ true: '#ff7a00', false: '#ccc' }}
            thumbColor="#fff"
          />
        </View>

        <View style={{ height: 40 }} />

      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 15,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
  },

  userCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    marginBottom: 20,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  userName: {
    fontWeight: '700',
    color: '#ff7a00',
  },

  userEmail: {
    fontSize: 13,
    color: '#555',
  },

  sectionTitle: {
    marginHorizontal: 22,
    marginTop: 10,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
  },

  menuItem: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
  },

  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightText: {
    marginRight: 6,
    color: '#666',
    fontSize: 13,
  },

  switchRow: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  switchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '600',
  },
});