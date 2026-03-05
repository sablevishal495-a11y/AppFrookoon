import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// ─── Types ────────────────────────────────────────────────────────────────────
type DeliveryStep = 'Accepted' | 'Processing' | 'Pickup' | 'Delivered';

const STEPS: { key: DeliveryStep; icon: string; label: string }[] = [
  { key: 'Accepted',   icon: 'checkmark-circle', label: 'Accepted'   },
  { key: 'Processing', icon: 'restaurant',        label: 'Processing' },
  { key: 'Pickup',     icon: 'bicycle',           label: 'Pickup'     },
  { key: 'Delivered',  icon: 'home',              label: 'Delivered'  },
];

const TIP_OPTIONS = [10, 20, 30, 50];

// ─── Professional Map ─────────────────────────────────────────────────────────
const MapBlock = ({ currentStep }: { currentStep: number }) => {
  const pulseAnim  = useRef(new Animated.Value(1)).current;
  const pulseAnim2 = useRef(new Animated.Value(1)).current;
  const riderX     = useRef(new Animated.Value(0)).current;
  const riderY     = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 2.4, duration: 1400, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1,   duration: 300,  useNativeDriver: true }),
    ])).start();

    Animated.loop(Animated.sequence([
      Animated.delay(500),
      Animated.timing(pulseAnim2, { toValue: 1.7, duration: 1100, useNativeDriver: true }),
      Animated.timing(pulseAnim2, { toValue: 1,   duration: 300,  useNativeDriver: true }),
    ])).start();

    Animated.loop(Animated.sequence([
      Animated.timing(riderX, { toValue: 4,  duration: 2200, useNativeDriver: true }),
      Animated.timing(riderX, { toValue: -4, duration: 2200, useNativeDriver: true }),
    ])).start();

    Animated.loop(Animated.sequence([
      Animated.timing(riderY, { toValue: -5, duration: 1800, useNativeDriver: true }),
      Animated.timing(riderY, { toValue: 3,  duration: 1800, useNativeDriver: true }),
    ])).start();
  }, []);

  return (
    <View style={mapStyles.container}>

      {/* ── BASE MAP BACKGROUND ── */}
      <View style={mapStyles.mapBg} />

      {/* ── GREEN PARK / ZONE AREAS ── */}
      <View style={[mapStyles.parkZone, { top: '5%',  left: '0%',  width: '18%', height: '30%', borderRadius: 8 }]} />
      <View style={[mapStyles.parkZone, { top: '60%', left: '60%', width: '38%', height: '38%', borderRadius: 10 }]} />
      <View style={[mapStyles.parkZone, { top: '5%',  left: '78%', width: '20%', height: '22%', borderRadius: 6 }]} />

      {/* ── WATER / LAKE ── */}
      <View style={[mapStyles.water, { top: '68%', left: '62%', width: '30%', height: '20%', borderRadius: 50 }]} />

      {/* ── THICK MAIN ROADS ── */}
      {/* Horizontal */}
      <View style={[mapStyles.roadMain, { top: '20%', left: 0, right: 0, height: 16 }]} />
      <View style={[mapStyles.roadMain, { top: '44%', left: 0, right: 0, height: 13 }]} />
      <View style={[mapStyles.roadMain, { top: '66%', left: 0, right: '30%', height: 13 }]} />
      {/* Vertical */}
      <View style={[mapStyles.roadMain, { left: '22%', top: 0, bottom: 0, width: 16 }]} />
      <View style={[mapStyles.roadMain, { left: '56%', top: 0, bottom: '28%', width: 13 }]} />
      <View style={[mapStyles.roadMain, { left: '78%', top: '20%', bottom: 0, width: 10 }]} />

      {/* ── THIN SIDE ROADS ── */}
      <View style={[mapStyles.roadSide, { top: '32%', left: '22%', right: '44%', height: 7 }]} />
      <View style={[mapStyles.roadSide, { top: '56%', left: '22%', right: '44%', height: 7 }]} />
      <View style={[mapStyles.roadSide, { left: '40%', top: '20%', bottom: '56%', width: 7 }]} />

      {/* ── ROAD CENTER DASHES ── */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <View key={`dh1_${i}`} style={[mapStyles.dashH, { top: '27.5%', left: `${5 + i * 12}%` }]} />
      ))}
      {[0,1,2,3,4,5,6,7].map(i => (
        <View key={`dh2_${i}`} style={[mapStyles.dashH, { top: '50.5%', left: `${5 + i * 12}%` }]} />
      ))}
      {[0,1,2,3,4,5].map(i => (
        <View key={`dv1_${i}`} style={[mapStyles.dashV, { left: '29.5%', top: `${5 + i * 14}%` }]} />
      ))}

      {/* ── CITY BLOCKS (buildings) ── */}
      <View style={[mapStyles.block, { top: '24%', left: '26%', width: '28%', height: '18%' }]} />
      <View style={[mapStyles.block, { top: '24%', left: '60%', width: '15%', height: '18%' }]} />
      <View style={[mapStyles.block, { top: '48%', left: '0%',  width: '20%', height: '15%' }]} />
      <View style={[mapStyles.block, { top: '48%', left: '26%', width: '28%', height: '15%' }]} />
      <View style={[mapStyles.block, { top: '48%', left: '60%', width: '15%', height: '15%' }]} />
      <View style={[mapStyles.block, { top: '71%', left: '26%', width: '28%', height: '12%' }]} />
      {/* Small sub-blocks */}
      <View style={[mapStyles.blockInner, { top: '26%', left: '27%', width: '12%', height: '7%' }]} />
      <View style={[mapStyles.blockInner, { top: '26%', left: '41%', width: '11%', height: '7%' }]} />
      <View style={[mapStyles.blockInner, { top: '50%', left: '27%', width: '12%', height: '7%' }]} />
      <View style={[mapStyles.blockInner, { top: '50%', left: '41%', width: '11%', height: '7%' }]} />
      <View style={[mapStyles.blockInner, { top: '73%', left: '27%', width: '12%', height: '5%' }]} />

      {/* ── ROUTE PATH — green rounded segments ── */}
      {/* Vertical: from dest down to horizontal road */}
      {[0,1,2,3,4,5].map(i => (
        <View key={`r1_${i}`} style={[mapStyles.routeSeg, {
          top: `${20 + i * 4}%`, left: '55.5%',
          width: 8, height: 16, borderRadius: 4,
          opacity: currentStep >= 1 ? 1 : 0.3,
        }]} />
      ))}
      {/* Corner dot */}
      <View style={[mapStyles.routeSeg, { top: '43.5%', left: '54.5%', width: 12, height: 12, borderRadius: 6 }]} />
      {/* Horizontal: right to left */}
      {[0,1,2,3,4].map(i => (
        <View key={`r2_${i}`} style={[mapStyles.routeSeg, {
          top: '44%', left: `${55 - (i + 1) * 8}%`,
          width: 20, height: 8, borderRadius: 4,
          opacity: currentStep >= 2 ? 1 : 0.3,
        }]} />
      ))}
      {/* Corner dot */}
      <View style={[mapStyles.routeSeg, { top: '43.5%', left: '21.5%', width: 12, height: 12, borderRadius: 6, opacity: currentStep >= 2 ? 1 : 0.3 }]} />
      {/* Vertical: down to rider */}
      {[0,1].map(i => (
        <View key={`r3_${i}`} style={[mapStyles.routeSeg, {
          top: `${44 + (i + 1) * 5}%`, left: '22.5%',
          width: 8, height: 16, borderRadius: 4,
          opacity: currentStep >= 2 ? 1 : 0.3,
        }]} />
      ))}

      {/* ── DESTINATION PIN ── */}
      <View style={[mapStyles.destWrap, { top: '5%', left: '47%' }]}>
        <View style={mapStyles.destBubble}>
          <Icon name="home" size={11} color="#fff" />
          <Text style={mapStyles.destLabel}>Your Home</Text>
        </View>
        <View style={mapStyles.destTail} />
        <View style={mapStyles.destFloor} />
      </View>

      {/* ── STORE PIN ── */}
      <View style={[mapStyles.storeWrap, { top: '48%', left: '1%' }]}>
        <View style={mapStyles.storeBox}>
          <Text style={{ fontSize: 14 }}>🏪</Text>
        </View>
        <Text style={mapStyles.storeLabel}>Frookoon</Text>
      </View>

      {/* ── RIDER ── */}
      <Animated.View style={[
        mapStyles.riderWrap,
        { top: '51%', left: '17%' },
        { transform: [{ translateX: riderX }, { translateY: riderY }] },
      ]}>
        {/* GPS accuracy circle */}
        <View style={mapStyles.accuracyCircle} />
        {/* Outer pulse */}
        <Animated.View style={[mapStyles.riderRingOuter, {
          transform: [{ scale: pulseAnim }],
          opacity: pulseAnim.interpolate({ inputRange: [1, 2.4], outputRange: [0.35, 0] }),
        }]} />
        {/* Inner pulse */}
        <Animated.View style={[mapStyles.riderRingInner, {
          transform: [{ scale: pulseAnim2 }],
          opacity: pulseAnim2.interpolate({ inputRange: [1, 1.7], outputRange: [0.5, 0] }),
        }]} />
        {/* Rider bubble */}
        <View style={mapStyles.riderBubble}>
          <Text style={{ fontSize: 18 }}>🛵</Text>
        </View>
        {/* Direction arrow on top */}
        <View style={mapStyles.directionArrow}>
          <Icon name="arrow-up-circle" size={14} color="#22a55b" />
        </View>
      </Animated.View>

      {/* ── ETA PILL floating on map ── */}
      <View style={mapStyles.etaPill}>
        <Icon name="time-outline" size={12} color="#22a55b" />
        <Text style={mapStyles.etaPillText}>8 min</Text>
      </View>

      {/* ── DISTANCE CHIP ── */}
      <View style={mapStyles.distChip}>
        <Icon name="navigate-outline" size={11} color="#1565C0" />
        <Text style={mapStyles.distChipText}>1.2 km</Text>
      </View>

      {/* ── LIVE BADGE ── */}
      <View style={mapStyles.liveBadge}>
        <View style={mapStyles.liveDot} />
        <Text style={mapStyles.liveText}>LIVE</Text>
      </View>

      {/* ── MAP CREDIT ── */}
      <Text style={mapStyles.credit}>© Frookoon Maps</Text>
    </View>
  );
};

// ─── Progress Stepper ────────────────────────────────────────────────────────
const Stepper = ({ currentStep }: { currentStep: number }) => (
  <View style={{ paddingVertical: 4 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {STEPS.map((step, idx) => {
        const isActive  = idx <= currentStep;
        const isCurrent = idx === currentStep;
        const isLast    = idx === STEPS.length - 1;
        return (
          <React.Fragment key={step.key}>
            <View style={[
              stepStyles.dot,
              isActive  && { backgroundColor: '#22a55b', borderColor: '#22a55b' },
              isCurrent && stepStyles.dotCurrent,
            ]}>
              <Icon
                name={isActive ? step.icon : 'ellipse-outline'}
                size={isCurrent ? 14 : 12}
                color={isActive ? '#fff' : '#ccc'}
              />
            </View>
            {!isLast && (
              <View style={[stepStyles.line, { backgroundColor: idx < currentStep ? '#22a55b' : '#e0e0e0' }]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
    <View style={{ flexDirection: 'row', marginTop: 6 }}>
      {STEPS.map((step, idx) => {
        const isActive = idx <= currentStep;
        return (
          <React.Fragment key={step.key}>
            <Text style={[stepStyles.label, isActive && { color: '#22a55b', fontWeight: '700' }]}>
              {step.label}
            </Text>
            {idx < STEPS.length - 1 && <View style={{ flex: 1 }} />}
          </React.Fragment>
        );
      })}
    </View>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const TrackOrderScreen = () => {
  const navigation = useNavigation<any>();

  const [currentStep, setCurrentStep] = useState<number>(2);
  const [tipSelected, setTipSelected] = useState<number | null>(null);
  const [tipSent,     setTipSent]     = useState(false);
  const [eta,         setEta]         = useState(8);

  useEffect(() => {
    if (eta <= 0 || currentStep === 3) return;
    const t = setInterval(() => setEta(e => Math.max(0, e - 1)), 60000);
    return () => clearInterval(t);
  }, [eta, currentStep]);

  const statusLabel: Record<number, string> = {
    0: 'Order Accepted', 1: 'Being Prepared', 2: 'Out for Delivery', 3: 'Delivered! 🎉',
  };
  const statusColor: Record<number, string> = {
    0: '#ff7a00', 1: '#1565C0', 2: '#22a55b', 3: '#22a55b',
  };

  const handleTip = () => {
    if (!tipSelected) { Alert.alert('Select Tip', 'Please choose a tip amount.'); return; }
    setTipSent(true);
    Alert.alert('🎉 Thank you!', `₹${tipSelected} tip sent to Sumit. You're awesome!`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* ── MAP ── */}
      <View style={styles.mapArea}>
        <MapBlock currentStep={currentStep} />

        <TouchableOpacity style={styles.floatingBack} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Icon name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>

        <View style={styles.floatingOrderId}>
          <Icon name="receipt-outline" size={12} color="#ff7a00" />
          <Text style={styles.floatingOrderIdText}>FRK-10155</Text>
        </View>
      </View>

      {/* ── BOTTOM SHEET ── */}
      <ScrollView style={styles.sheet} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <View style={styles.sheetHandle} />

        {/* STATUS ROW */}
        <View style={styles.statusRow}>
          <View>
            <Text style={[styles.statusLabel, { color: statusColor[currentStep] }]}>
              {statusLabel[currentStep]}
            </Text>
            {currentStep < 3 && (
              <Text style={styles.statusSub}>
                Arriving at {new Date(Date.now() + eta * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            )}
          </View>
          <View style={[styles.etaBadge, { backgroundColor: statusColor[currentStep] + '18' }]}>
            {currentStep < 3 ? (
              <>
                <Text style={[styles.etaMin, { color: statusColor[currentStep] }]}>{eta}</Text>
                <Text style={[styles.etaLabel, { color: statusColor[currentStep] }]}>min</Text>
              </>
            ) : (
              <Icon name="checkmark-circle" size={36} color="#22a55b" />
            )}
          </View>
        </View>

        {/* DELIVERY CODE */}
        <View style={styles.codeRow}>
          <Icon name="shield-checkmark-outline" size={14} color="#aaa" />
          <Text style={styles.codeText}>Delivery Code: <Text style={styles.codeValue}>2045</Text></Text>
          <Text style={styles.codeHint}>(Share only with rider)</Text>
        </View>

        {/* STEPPER */}
        <View style={styles.stepperCard}>
          <Stepper currentStep={currentStep} />
        </View>

        {/* RIDER CARD — professional */}
        <View style={styles.riderCard}>
          {/* Left: avatar + badges */}
          <View style={styles.riderAvatarWrap}>
            <View style={styles.riderAvatar}>
              <Text style={{ fontSize: 30 }}>🧑‍🦱</Text>
            </View>
            <View style={styles.riderOnlineDot} />
          </View>

          {/* Center: info */}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.riderName}>Sumit Kumar</Text>
              <View style={styles.verifiedBadge}>
                <Icon name="shield-checkmark" size={10} color="#fff" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
            <Text style={styles.riderStatus}>Coming to you ⚡  •  1.2 km away</Text>
            <View style={styles.riderMeta}>
              <View style={styles.ratingPill}>
                <Icon name="star" size={11} color="#ff7a00" />
                <Text style={styles.ratingVal}>4.9</Text>
              </View>
              <View style={styles.tripsPill}>
                <Icon name="bicycle" size={11} color="#1565C0" />
                <Text style={styles.tripsVal}>2,340 trips</Text>
              </View>
              <View style={styles.vehiclePill}>
                <Text style={styles.vehicleText}>🛵 KA-05-AB-1234</Text>
              </View>
            </View>
          </View>

          {/* Right: call + chat */}
          <View style={styles.riderActions}>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => Linking.openURL('tel:+919876543210')}
              activeOpacity={0.8}
            >
              <Icon name="call" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chatBtn}
              onPress={() => Alert.alert('Chat', 'Opening chat with Sumit...')}
              activeOpacity={0.8}
            >
              <Icon name="chatbubble-ellipses" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ORDER SUMMARY */}
        <View style={styles.orderSummaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="bag-check-outline" size={16} color="#ff7a00" />
            <Text style={styles.summaryTitle}>Order Summary</Text>
          </View>
          {[
            { name: 'Cooking Oil 1L', qty: 2, price: 240 },
            { name: 'Real Juice 1L',  qty: 3, price: 297 },
            { name: 'Pepsi 2L',       qty: 1, price: 40  },
          ].map((item, idx) => (
            <View key={idx} style={styles.summaryRow}>
              <Text style={styles.summaryQty}>{item.qty}×</Text>
              <Text style={styles.summaryName}>{item.name}</Text>
              <Text style={styles.summaryPrice}>₹{item.price}</Text>
            </View>
          ))}
          <View style={styles.summaryTotal}>
            <Text style={styles.summaryTotalLabel}>Total Paid</Text>
            <Text style={styles.summaryTotalValue}>₹577</Text>
          </View>
        </View>

        {/* TIP */}
        {currentStep === 2 && !tipSent && (
          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <Text style={styles.tipTitle}>Tip your Shopper 💛</Text>
              <Text style={styles.tipSub}>Everyone deserves a little kindness</Text>
            </View>
            <View style={styles.tipOptions}>
              {TIP_OPTIONS.map(amount => (
                <TouchableOpacity
                  key={amount}
                  style={[styles.tipBtn, tipSelected === amount && styles.tipBtnActive]}
                  onPress={() => setTipSelected(amount)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tipBtnText, tipSelected === amount && { color: '#fff' }]}>₹{amount}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.tipSendBtn, !tipSelected && { opacity: 0.4 }]}
              onPress={handleTip}
              activeOpacity={0.8}
              disabled={!tipSelected}
            >
              <Icon name="heart" size={15} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.tipSendText}>Send Tip</Text>
            </TouchableOpacity>
          </View>
        )}

        {tipSent && (
          <View style={styles.tipSentBanner}>
            <Icon name="heart" size={16} color="#e53935" />
            <Text style={styles.tipSentText}>₹{tipSelected} tip sent to Sumit! 🎉</Text>
          </View>
        )}

        {/* HELP */}
        <TouchableOpacity
          style={styles.helpBtn}
          onPress={() => navigation.navigate('HelpSupport')}
          activeOpacity={0.8}
        >
          <Icon name="help-circle-outline" size={18} color="#888" />
          <Text style={styles.helpBtnText}>Need help with this order?</Text>
          <Icon name="chevron-forward" size={16} color="#ccc" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TrackOrderScreen;

// ─── Map Styles ───────────────────────────────────────────────────────────────
const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8efe0',
    overflow: 'hidden',
    position: 'relative',
  },

  mapBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eef2e6',
  },

  // Zones
  parkZone: {
    position: 'absolute',
    backgroundColor: '#c8ddb0',
  },
  water: {
    position: 'absolute',
    backgroundColor: '#b8d4e8',
  },

  // Roads
  roadMain: {
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 1,
  },
  roadSide: {
    position: 'absolute',
    backgroundColor: '#f5f5f0',
  },

  // Road markings
  dashH: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: '#f0c040',
    borderRadius: 1,
  },
  dashV: {
    position: 'absolute',
    width: 2,
    height: 14,
    backgroundColor: '#f0c040',
    borderRadius: 1,
  },

  // Blocks
  block: {
    position: 'absolute',
    backgroundColor: '#d8d4c8',
    borderRadius: 4,
  },
  blockInner: {
    position: 'absolute',
    backgroundColor: '#ccc8ba',
    borderRadius: 3,
  },

  // Route
  routeSeg: {
    position: 'absolute',
    backgroundColor: '#22a55b',
    elevation: 2,
  },

  // Destination
  destWrap: {
    position: 'absolute',
    alignItems: 'center',
  },
  destBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#e53935',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    elevation: 6,
    shadowColor: '#e53935',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  destLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.3,
  },
  destTail: {
    width: 0, height: 0,
    borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 9,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
    borderTopColor: '#e53935',
  },
  destFloor: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#e53935',
    marginTop: 2,
    opacity: 0.4,
  },

  // Store
  storeWrap: {
    position: 'absolute',
    alignItems: 'center',
  },
  storeBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 2,
    borderColor: '#ff7a00',
  },
  storeLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#ff7a00',
    marginTop: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },

  // Rider
  riderWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  accuracyCircle: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(34,165,91,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(34,165,91,0.2)',
  },
  riderRingOuter: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(34,165,91,0.3)',
  },
  riderRingInner: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(34,165,91,0.35)',
  },
  riderBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#22a55b',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    borderWidth: 2.5,
    borderColor: '#22a55b',
  },
  directionArrow: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#fff',
    borderRadius: 7,
  },

  // Overlays
  etaPill: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#22a55b22',
  },
  etaPillText: { fontSize: 12, fontWeight: '800', color: '#22a55b' },

  distChip: {
    position: 'absolute',
    bottom: 14,
    right: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  distChipText: { fontSize: 11, fontWeight: '700', color: '#1565C0' },

  liveBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  liveDot: {
    width: 7, height: 7, borderRadius: 4,
    backgroundColor: '#22a55b',
  },
  liveText: { fontSize: 11, fontWeight: '800', color: '#fff', letterSpacing: 1 },

  credit: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    fontSize: 9,
    color: 'rgba(0,0,0,0.3)',
  },
});

// ─── Stepper Styles ───────────────────────────────────────────────────────────
const stepStyles = StyleSheet.create({
  dot: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 2, borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
  },
  dotCurrent: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 3,
    elevation: 4,
    shadowColor: '#22a55b',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  line:  { flex: 1, height: 3, borderRadius: 2 },
  label: { fontSize: 9, color: '#bbb', fontWeight: '500', textAlign: 'center' },
});

// ─── Screen Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },

  mapArea: { height: 320, position: 'relative' },

  floatingBack: {
    position: 'absolute', top: 52, left: 16,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    elevation: 6,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
  },
  floatingOrderId: {
    position: 'absolute', top: 54,
    alignSelf: 'center', left: '30%',
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#fff', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    elevation: 6,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
  },
  floatingOrderIdText: { fontSize: 13, fontWeight: '700', color: '#1a1a1a' },

  sheet: {
    flex: 1, backgroundColor: '#fff',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    marginTop: -24, paddingHorizontal: 20,
  },
  sheetHandle: {
    width: 40, height: 4, backgroundColor: '#e0e0e0',
    borderRadius: 2, alignSelf: 'center',
    marginTop: 12, marginBottom: 18,
  },

  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  statusLabel: { fontSize: 22, fontWeight: '900', letterSpacing: 0.3 },
  statusSub:   { fontSize: 13, color: '#999', marginTop: 3 },
  etaBadge: { width: 64, height: 64, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  etaMin:   { fontSize: 26, fontWeight: '900', lineHeight: 28 },
  etaLabel: { fontSize: 11, fontWeight: '600' },

  codeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  codeText:  { fontSize: 12, color: '#aaa' },
  codeValue: { fontWeight: '800', color: '#1a1a1a', fontSize: 13 },
  codeHint:  { fontSize: 11, color: '#ccc' },

  stepperCard: {
    backgroundColor: '#fafafa', borderRadius: 18, padding: 16,
    marginBottom: 14, borderWidth: 1, borderColor: '#f0f0f0',
  },

  // ── Professional Rider Card ──
  riderCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginBottom: 14,
    elevation: 5,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
    borderWidth: 1, borderColor: '#f0f0f0',
  },
  riderAvatarWrap: { position: 'relative' },
  riderAvatar: {
    width: 58, height: 58, borderRadius: 29,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#22a55b',
  },
  riderOnlineDot: {
    position: 'absolute', bottom: 2, right: 2,
    width: 13, height: 13, borderRadius: 7,
    backgroundColor: '#22a55b', borderWidth: 2, borderColor: '#fff',
  },
  riderName: { fontSize: 15, fontWeight: '800', color: '#1a1a1a' },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#22a55b', borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  verifiedText: { fontSize: 9, fontWeight: '800', color: '#fff' },
  riderStatus: { fontSize: 11, color: '#888', marginTop: 3 },
  riderMeta: { flexDirection: 'row', gap: 6, marginTop: 6, flexWrap: 'wrap' },
  ratingPill: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#fff5ee', borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 3,
  },
  ratingVal: { fontSize: 10, fontWeight: '700', color: '#ff7a00' },
  tripsPill: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#e3f0ff', borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 3,
  },
  tripsVal: { fontSize: 10, fontWeight: '600', color: '#1565C0' },
  vehiclePill: {
    backgroundColor: '#f5f5f5', borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 3,
  },
  vehicleText: { fontSize: 9, color: '#666', fontWeight: '600' },
  riderActions: { gap: 10 },
  callBtn: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: '#22a55b',
    justifyContent: 'center', alignItems: 'center',
    elevation: 3,
    shadowColor: '#22a55b', shadowOpacity: 0.4, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  chatBtn: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: '#ff7a00',
    justifyContent: 'center', alignItems: 'center',
    elevation: 3,
    shadowColor: '#ff7a00', shadowOpacity: 0.4, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },

  orderSummaryCard: {
    backgroundColor: '#fafafa', borderRadius: 18, padding: 16,
    marginBottom: 14, borderWidth: 1, borderColor: '#f0f0f0',
  },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  summaryTitle:  { fontSize: 14, fontWeight: '800', color: '#1a1a1a' },
  summaryRow:    { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  summaryQty:    { fontSize: 13, fontWeight: '700', color: '#ff7a00', width: 24 },
  summaryName:   { flex: 1, fontSize: 13, color: '#444' },
  summaryPrice:  { fontSize: 13, fontWeight: '700', color: '#1a1a1a' },
  summaryTotal: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingTop: 10, marginTop: 4, borderTopWidth: 1, borderTopColor: '#eee',
  },
  summaryTotalLabel: { fontSize: 13, fontWeight: '700', color: '#666' },
  summaryTotalValue: { fontSize: 15, fontWeight: '900', color: '#ff7a00' },

  tipCard: {
    backgroundColor: '#fffbf0', borderRadius: 20, padding: 16,
    marginBottom: 14, borderWidth: 1.5, borderColor: '#ffe8a0',
  },
  tipHeader:  { marginBottom: 14 },
  tipTitle:   { fontSize: 15, fontWeight: '800', color: '#1a1a1a' },
  tipSub:     { fontSize: 12, color: '#aaa', marginTop: 3 },
  tipOptions: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  tipBtn: {
    flex: 1, height: 40, borderRadius: 12,
    borderWidth: 1.5, borderColor: '#ff7a00',
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff',
  },
  tipBtnActive: { backgroundColor: '#ff7a00' },
  tipBtnText:   { fontSize: 13, fontWeight: '700', color: '#ff7a00' },
  tipSendBtn: {
    height: 46, backgroundColor: '#ff7a00', borderRadius: 14,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    elevation: 3, shadowColor: '#ff7a00', shadowOpacity: 0.3, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  tipSendText: { fontSize: 14, fontWeight: '800', color: '#fff' },

  tipSentBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#fdecea', borderRadius: 14, padding: 14, marginBottom: 14,
  },
  tipSentText: { fontSize: 13, fontWeight: '700', color: '#e53935', flex: 1 },

  helpBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fafafa', borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#f0f0f0',
  },
  helpBtnText: { flex: 1, fontSize: 13, fontWeight: '600', color: '#888' },
});