import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// ─── Types ────────────────────────────────────────────────────────────────────
type OrderStatus = 'Delivered' | 'Cancelled' | 'Processing' | 'Out for Delivery';
type FilterTab = 'All' | 'Delivered' | 'Processing' | 'Cancelled';

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  image: any;
}

interface Order {
  orderId: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  deliveryAddress: string;
}

// ─── Mock Data (realistic grouped orders) ────────────────────────────────────
const orders: Order[] = [
  {
    orderId: 'FRK-10245',
    date: '25 Feb 2026, 12:45 PM',
    status: 'Delivered',
    deliveryAddress: '123 MG Road, Bengaluru',
    items: [
      { id: 'i1', name: 'Aashirvaad Atta 5kg',  qty: 1, price: 350, image: require('../assets/atta.png')    },
      { id: 'i2', name: 'Toor Dal 1kg',          qty: 2, price: 199, image: require('../assets/dal.png')     },
      { id: 'i3', name: 'Basmati Rice 5kg',      qty: 1, price: 400, image: require('../assets/rice.png')    },
      { id: 'i4', name: 'Lays Classic',           qty: 3, price: 20,  image: require('../assets/lays.png')    },
    ],
  },
  {
    orderId: 'FRK-10201',
    date: '22 Feb 2026, 09:10 AM',
    status: 'Cancelled',
    deliveryAddress: '123 MG Road, Bengaluru',
    items: [
      { id: 'i5', name: 'Coca Cola 2L',     qty: 2, price: 40, image: require('../assets/coke.png')    },
      { id: 'i6', name: 'Kurkure Masala',   qty: 4, price: 20, image: require('../assets/kurkure.png') },
    ],
  },
  {
    orderId: 'FRK-10198',
    date: '20 Feb 2026, 03:30 PM',
    status: 'Processing',
    deliveryAddress: '123 MG Road, Bengaluru',
    items: [
      { id: 'i7', name: 'Face Wash 100ml',   qty: 1, price: 120, image: require('../assets/facewash.png') },
      { id: 'i8', name: 'Shampoo 200ml',     qty: 1, price: 180, image: require('../assets/shampoo.png')  },
      { id: 'i9', name: 'Bingo Mad Angles',  qty: 2, price: 25,  image: require('../assets/bingo.png')    },
    ],
  },
  {
    orderId: 'FRK-10155',
    date: '15 Feb 2026, 11:00 AM',
    status: 'Out for Delivery',
    deliveryAddress: '123 MG Road, Bengaluru',
    items: [
      { id: 'i10', name: 'Cooking Oil 1L', qty: 2, price: 120, image: require('../assets/oil2.png')   },
      { id: 'i11', name: 'Real Juice 1L',  qty: 3, price: 99,  image: require('../assets/juice.png')  },
      { id: 'i12', name: 'Pepsi 2L',       qty: 1, price: 40,  image: require('../assets/pepsi.png')  },
    ],
  },
];

// ─── Status Config ────────────────────────────────────────────────────────────
const statusConfig: Record<OrderStatus, { color: string; bg: string; icon: string; progress: number }> = {
  'Delivered':          { color: '#22a55b', bg: '#e6f9ee', icon: 'checkmark-circle', progress: 100 },
  'Cancelled':          { color: '#e53935', bg: '#fdecea', icon: 'close-circle',     progress: 15  },
  'Processing':         { color: '#ff7a00', bg: '#fff4eb', icon: 'time',             progress: 35  },
  'Out for Delivery':   { color: '#1565C0', bg: '#e3f0ff', icon: 'bicycle',          progress: 75  },
};

const STEPS = ['Placed', 'Processing', 'Pickup', 'Delivered'];
const STEP_THRESHOLDS = [10, 35, 65, 100];

// ─── Order Card ───────────────────────────────────────────────────────────────
const OrderCard = ({ order }: { order: Order }) => {
  const [expanded, setExpanded] = useState(false);
  const cfg = statusConfig[order.status];

  const totalAmount = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalItems  = order.items.reduce((sum, i) => sum + i.qty, 0);
  const previewItems = order.items.slice(0, 3);
  const extraCount   = order.items.length - 3;

  return (
    <View style={styles.card}>

      {/* ── Order ID + Status ── */}
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderId}>Order #{order.orderId}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
          <Icon name={cfg.icon} size={13} color={cfg.color} />
          <Text style={[styles.statusText, { color: cfg.color }]}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* ── Progress Bar + Steps ── */}
      <View style={styles.progressSection}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${cfg.progress}%`, backgroundColor: cfg.color },
            ]}
          />
        </View>
        <View style={styles.progressSteps}>
          {STEPS.map((step, idx) => {
            const active = cfg.progress >= STEP_THRESHOLDS[idx];
            return (
              <View key={step} style={styles.stepWrap}>
                <View style={[styles.stepDot, active && { backgroundColor: cfg.color }]} />
                <Text style={[styles.stepLabel, active && { color: cfg.color, fontWeight: '700' }]}>
                  {step}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.divider} />

      {/* ── Collapsed: Image Previews + Total ── */}
      {!expanded && (
        <View style={styles.previewRow}>
          {previewItems.map((item) => (
            <View key={item.id} style={styles.previewImgWrap}>
              <Image source={item.image} style={styles.previewImg} />
            </View>
          ))}
          {extraCount > 0 && (
            <View style={styles.moreItemsBubble}>
              <Text style={styles.moreItemsText}>+{extraCount}</Text>
            </View>
          )}
          <View style={{ flex: 1 }} />
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.totalItemsText}>{totalItems} item{totalItems > 1 ? 's' : ''}</Text>
            <Text style={styles.totalAmountText}>₹{totalAmount}</Text>
          </View>
        </View>
      )}

      {/* ── Expanded: Full Item List ── */}
      {expanded && (
        <View style={styles.itemList}>
          {order.items.map((item, idx) => (
            <View key={item.id}>
              <View style={styles.itemRow}>
                <View style={styles.itemImgWrap}>
                  <Image source={item.image} style={styles.itemImg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQty}>Qty: {item.qty}</Text>
                </View>
                <Text style={styles.itemPrice}>₹{item.price * item.qty}</Text>
              </View>
              {idx < order.items.length - 1 && <View style={styles.itemDivider} />}
            </View>
          ))}

          {/* Dashed Total Row */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>₹{totalAmount}</Text>
          </View>

          {/* Delivery Address */}
          <View style={styles.addressRow}>
            <Icon name="location-outline" size={14} color="#ff7a00" />
            <Text style={styles.addressText}>{order.deliveryAddress}</Text>
          </View>
        </View>
      )}

      {/* ── Footer Buttons ── */}
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => setExpanded(!expanded)}
          activeOpacity={0.8}
        >
          <Text style={styles.viewBtnText}>{expanded ? 'Show Less' : 'View Details'}</Text>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color="#ff7a00" />
        </TouchableOpacity>

        {order.status === 'Delivered' && (
          <TouchableOpacity style={styles.reorderBtn} activeOpacity={0.8}>
            <Icon name="refresh-outline" size={14} color="#fff" />
            <Text style={styles.actionBtnText}>Reorder</Text>
          </TouchableOpacity>
        )}

        {(order.status === 'Processing' || order.status === 'Out for Delivery') && (
          <TouchableOpacity style={styles.trackBtn} activeOpacity={0.8}>
            <Icon name="navigate-outline" size={14} color="#fff" />
            <Text style={styles.actionBtnText}>Track Order</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const MyOrdersScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const tabs: FilterTab[] = ['All', 'Delivered', 'Processing', 'Cancelled'];

  const filtered =
    activeTab === 'All'
      ? orders
      : orders.filter((o) => o.status === activeTab);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        {/* Frookoon logo top left */}
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.headerTitle}>My Orders</Text>

        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="close-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* ── FILTER TABS ── */}
      <View style={styles.tabWrap}>
        <FlatList
          data={tabs}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(t) => t}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
          renderItem={({ item: tab }) => (
            <TouchableOpacity
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* ── COUNT ── */}
      <Text style={styles.countText}>
        {filtered.length} order{filtered.length !== 1 ? 's' : ''} found
      </Text>

      {/* ── LIST ── */}
      {filtered.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Icon name="bag-outline" size={64} color="#ddd" />
          <Text style={styles.emptyTitle}>No orders here</Text>
          <Text style={styles.emptySubtitle}>
            Your {activeTab.toLowerCase()} orders will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(o) => o.orderId}
          contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <OrderCard order={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        />
      )}
    </View>
  );
};

export default MyOrdersScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.2,
  },

  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Tabs
  tabWrap: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ff7a00',
    backgroundColor: '#fff',
  },

  tabActive:     { backgroundColor: '#ff7a00' },
  tabText:       { fontSize: 13, fontWeight: '600', color: '#ff7a00' },
  tabTextActive: { color: '#fff' },

  countText: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 4,
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  orderId:   { fontSize: 14, fontWeight: '800', color: '#1a1a1a' },
  orderDate: { fontSize: 12, color: '#999', marginTop: 3 },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 5,
  },

  statusText: { fontSize: 12, fontWeight: '700' },

  divider: { height: 1, backgroundColor: '#f2f2f2', marginVertical: 12 },

  // Progress
  progressSection: { marginBottom: 4 },

  progressTrack: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },

  progressFill: { height: '100%', borderRadius: 4 },

  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  stepWrap:  { alignItems: 'center', gap: 4 },
  stepDot:   { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ddd' },
  stepLabel: { fontSize: 10, color: '#bbb', fontWeight: '500' },

  // Preview (collapsed)
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },

  previewImgWrap: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#fdf3ea',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  previewImg: { width: 40, height: 40, resizeMode: 'contain' },

  moreItemsBubble: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#ff7a00',
    justifyContent: 'center',
    alignItems: 'center',
  },

  moreItemsText:   { color: '#fff', fontWeight: '800', fontSize: 13 },
  totalItemsText:  { fontSize: 12, color: '#999' },
  totalAmountText: { fontSize: 16, fontWeight: '800', color: '#ff7a00' },

  // Expanded item list
  itemList: { marginTop: 4 },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },

  itemImgWrap: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#fdf3ea',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemImg:   { width: 44, height: 44, resizeMode: 'contain' },
  itemName:  { fontSize: 13, fontWeight: '600', color: '#1a1a1a', marginBottom: 3 },
  itemQty:   { fontSize: 12, color: '#999' },
  itemPrice: { fontSize: 14, fontWeight: '700', color: '#1a1a1a' },
  itemDivider: { height: 1, backgroundColor: '#f5f5f5' },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 6,
    borderTopWidth: 1.5,
    borderTopColor: '#f0f0f0',
  },

  totalLabel: { fontSize: 14, fontWeight: '700', color: '#555' },
  totalValue: { fontSize: 16, fontWeight: '800', color: '#ff7a00' },

  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
    backgroundColor: '#fff9f5',
    padding: 10,
    borderRadius: 10,
  },

  addressText: { fontSize: 12, color: '#666', flex: 1 },

  // Footer
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    gap: 10,
  },

  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ff7a00',
  },

  viewBtnText:    { fontSize: 13, fontWeight: '600', color: '#ff7a00' },
  actionBtnText:  { fontSize: 13, fontWeight: '600', color: '#fff' },

  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#ff7a00',
  },

  trackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#1565C0',
  },

  // Empty state
  emptyWrap:     { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
  emptyTitle:    { fontSize: 18, fontWeight: '700', color: '#bbb' },
  emptySubtitle: { fontSize: 13, color: '#ccc' },
});