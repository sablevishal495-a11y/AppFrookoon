import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// ─── Types ────────────────────────────────────────────────────────────────────
type OrderStatus = 'Delivered' | 'Cancelled' | 'Processing' | 'Out for Delivery';
type FilterTab = 'All Order' | 'Cancelled';

interface Order {
  id: string;
  name: string;
  image: any;
  date: string;
  amount: number;
  status: OrderStatus;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const orders: Order[] = [
  {
    id: 'o1',
    name: 'Milk',
    image: require('../assets/milk.png'), // replace with actual milk image
    date: '25-02-2026',
    amount: 30,
    status: 'Delivered',
  },
  {
    id: 'o2',
    name: 'Amul Cheese Slice',
    image: require('../assets/cheese.png'), // replace with actual image
    date: '25-02-2026',
    amount: 88,
    status: 'Cancelled',
  },
  {
    id: 'o3',
    name: 'Haldiram Boondi',
    image: require('../assets/boondi.png'), // replace with actual image
    date: '25-02-2026',
    amount: 59,
    status: 'Delivered',
  },
  {
    id: 'o4',

    name: 'Basmati Rice',
    image: require('../assets/rice.png'),
    date: '23-02-2026',
    amount: 400,
    status: 'Out for Delivery',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusConfig: Record<OrderStatus, { color: string; bg: string; icon: string }> = {
  Delivered: { color: '#22a55b', bg: '#e6f9ee', icon: 'checkmark-circle' },
  Cancelled: { color: '#e53935', bg: '#fdecea', icon: 'close-circle' },
  Processing: { color: '#ff7a00', bg: '#fff4eb', icon: 'time' },
  'Out for Delivery': { color: '#1565C0', bg: '#e3f0ff', icon: 'bicycle' },
};

// ─── Order Card ───────────────────────────────────────────────────────────────
const OrderCard = ({ item }: { item: Order }) => {
  const cfg = statusConfig[item.status];

  return (
    <View style={styles.card}>
      {/* Left: Image */}
      <View style={styles.cardImgWrap}>
        <Image source={item.image} style={styles.cardImg} />
      </View>

      {/* Right: Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width:
                  item.status === 'Delivered'
                    ? '100%'
                    : item.status === 'Out for Delivery'
                    ? '75%'
                    : item.status === 'Processing'
                    ? '40%'
                    : '20%',
                backgroundColor: cfg.color,
              },
            ]}
          />
        </View>

        {/* Status Badge */}
        <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
          <Icon name={cfg.icon} size={13} color={cfg.color} />
          <Text style={[styles.statusText, { color: cfg.color }]}>{item.status}</Text>
        </View>

        {/* Date & Amount Row */}
        <View style={styles.cardFooter}>
          <Text style={styles.dateText}>
            {item.status === 'Cancelled' ? 'Order Cancelled on' : 'Order Delivered on'}{' '}
            <Text style={styles.dateValue}>{item.date}</Text>
          </Text>
          <View style={styles.amountBadge}>
            <Text style={styles.amountText}>{item.amount} Rs.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const MyOrdersScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<FilterTab>('All Order');

  const filtered =
    activeTab === 'Cancelled'
      ? orders.filter((o) => o.status === 'Cancelled')
      : orders;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Orders</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="search-outline" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="menu-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── FILTER TABS ── */}
      <View style={styles.tabRow}>
        {(['All Order', 'Cancelled'] as FilterTab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── ORDER LIST ── */}
      {filtered.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Icon name="bag-outline" size={60} color="#ddd" />
          <Text style={styles.emptyText}>No orders found</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <OrderCard item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      )}
    </View>
  );
};

export default MyOrdersScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.2,
  },

  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },

  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  tab: {
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ff7a00',
    backgroundColor: '#fff',
  },

  tabActive: {
    backgroundColor: '#ff7a00',
  },

  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff7a00',
  },

  tabTextActive: {
    color: '#fff',
  },

  // Order Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  cardImgWrap: {
    width: 80,
    height: 90,
    borderRadius: 14,
    backgroundColor: '#fdf3ea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    overflow: 'hidden',
  },

  cardImg: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },

  cardInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },

  cardName: {
    fontWeight: '800',
    fontSize: 15,
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  // Progress bar
  progressTrack: {
    height: 5,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginBottom: 6,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Status badge
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 8,
    gap: 4,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Footer row
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dateText: {
    fontSize: 11,
    color: '#999',
    flex: 1,
    flexWrap: 'wrap',
  },

  dateValue: {
    fontWeight: '600',
    color: '#666',
  },

  amountBadge: {
    backgroundColor: '#ff7a00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
  },

  amountText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },

  // Empty state
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  emptyText: {
    fontSize: 16,
    color: '#bbb',
    fontWeight: '600',
  },
});