import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    id: '1',
    q: 'How do I track my order?',
    a: 'Go to My Orders from your profile menu. Tap any active order and press "Track Order" to see real-time delivery status.',
  },
  {
    id: '2',
    q: 'Can I cancel my order?',
    a: 'You can cancel an order within 2 minutes of placing it. Go to My Orders → select the order → tap Cancel. After 2 minutes, please contact our support team.',
  },
  {
    id: '3',
    q: 'What is the delivery time?',
    a: 'Frookoon delivers in 10–20 minutes depending on your location and order size. You can see the estimated time on the product page.',
  },
  {
    id: '4',
    q: 'How do I get a refund?',
    a: 'Refunds are processed within 5–7 business days to your original payment method. Raise a request via Help & Support or contact us directly.',
  },
  {
    id: '5',
    q: 'What if I received a wrong item?',
    a: 'We\'re sorry! Please take a photo of the wrong item and contact us within 24 hours. We\'ll arrange a replacement or full refund immediately.',
  },
  {
    id: '6',
    q: 'How do I change my delivery address?',
    a: 'Go to Profile → Address Management to add or edit your saved addresses. You can also change the address at checkout before placing the order.',
  },
];

// ─── Contact Options ──────────────────────────────────────────────────────────
const CONTACT_OPTIONS = [
  {
    id: 'chat',
    icon: 'chatbubble-ellipses',
    label: 'Live Chat',
    sub: 'Avg. reply in 2 mins',
    color: '#22a55b',
    bg: '#e6f9ee',
    action: () => Alert.alert('Live Chat', 'Connecting you to an agent...'),
  },
  {
    id: 'call',
    icon: 'call',
    label: 'Call Us',
    sub: '24 / 7 support',
    color: '#1565C0',
    bg: '#e3f0ff',
    action: () => Linking.openURL('tel:+918800000000'),
  },
  {
    id: 'email',
    icon: 'mail',
    label: 'Email Us',
    sub: 'Reply within 24 hrs',
    color: '#ff7a00',
    bg: '#fff4eb',
    action: () => Linking.openURL('mailto:support@frookoon.com'),
  },
  {
    id: 'whatsapp',
    icon: 'logo-whatsapp',
    label: 'WhatsApp',
    sub: 'Chat on WhatsApp',
    color: '#25D366',
    bg: '#e8fdf0',
    action: () => Linking.openURL('https://wa.me/918800000000'),
  },
];

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
const FAQItem = ({ item }: { item: typeof FAQS[0] }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={faqStyles.wrap}>
      <TouchableOpacity
        style={faqStyles.question}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <View style={faqStyles.qLeft}>
          <View style={faqStyles.qDot} />
          <Text style={faqStyles.qText}>{item.q}</Text>
        </View>
        <Icon
          name={open ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#ff7a00"
        />
      </TouchableOpacity>

      {open && (
        <View style={faqStyles.answer}>
          <Text style={faqStyles.aText}>{item.a}</Text>
        </View>
      )}
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const HelpSupportScreen = () => {
  const navigation = useNavigation<any>();

  const [searchText,   setSearchText]   = useState('');
  const [issueText,    setIssueText]    = useState('');
  const [activeTab,    setActiveTab]    = useState<'faq' | 'contact'>('faq');
  const [submitted,    setSubmitted]    = useState(false);

  const filteredFAQs = FAQS.filter(
    f =>
      f.q.toLowerCase().includes(searchText.toLowerCase()) ||
      f.a.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSubmitTicket = () => {
    if (!issueText.trim()) {
      Alert.alert('Empty', 'Please describe your issue before submitting.');
      return;
    }
    setSubmitted(true);
    setIssueText('');
    setTimeout(() => setSubmitted(false), 3000);
  };

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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ── HERO BANNER ── */}
        <View style={styles.heroBanner}>
          <View style={styles.heroIconWrap}>
            <Text style={{ fontSize: 42 }}>🛒</Text>
          </View>
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <Text style={styles.heroSub}>
            Your Personal Aid 24/7 — FROOKOON HELP & SUPPORT
          </Text>

          {/* Search bar */}
          <View style={styles.heroSearch}>
            <Icon name="search-outline" size={18} color="#bbb" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.heroSearchInput}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search for help..."
              placeholderTextColor="#bbb"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Icon name="close-circle" size={18} color="#ddd" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ── TAB SWITCHER ── */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'faq' && styles.tabActive]}
            onPress={() => setActiveTab('faq')}
            activeOpacity={0.8}
          >
            <Icon name="help-circle-outline" size={16} color={activeTab === 'faq' ? '#fff' : '#ff7a00'} />
            <Text style={[styles.tabText, activeTab === 'faq' && styles.tabTextActive]}>
              FAQs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'contact' && styles.tabActive]}
            onPress={() => setActiveTab('contact')}
            activeOpacity={0.8}
          >
            <Icon name="headset-outline" size={16} color={activeTab === 'contact' ? '#fff' : '#ff7a00'} />
            <Text style={[styles.tabText, activeTab === 'contact' && styles.tabTextActive]}>
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── FAQ TAB ── */}
        {activeTab === 'faq' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

            {filteredFAQs.length === 0 ? (
              <View style={styles.emptyWrap}>
                <Icon name="search-outline" size={48} color="#ddd" />
                <Text style={styles.emptyText}>No results for "{searchText}"</Text>
              </View>
            ) : (
              filteredFAQs.map(item => <FAQItem key={item.id} item={item} />)
            )}
          </View>
        )}

        {/* ── CONTACT TAB ── */}
        {activeTab === 'contact' && (
          <View style={styles.section}>

            {/* Contact option cards */}
            <Text style={styles.sectionTitle}>Reach Us Directly</Text>
            <View style={styles.contactGrid}>
              {CONTACT_OPTIONS.map(opt => (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.contactCard, { borderColor: opt.color + '33' }]}
                  onPress={opt.action}
                  activeOpacity={0.8}
                >
                  <View style={[styles.contactIconWrap, { backgroundColor: opt.bg }]}>
                    <Icon name={opt.icon} size={24} color={opt.color} />
                  </View>
                  <Text style={[styles.contactLabel, { color: opt.color }]}>{opt.label}</Text>
                  <Text style={styles.contactSub}>{opt.sub}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Divider */}
            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or describe your issue</Text>
              <View style={styles.orLine} />
            </View>

            {/* Submit a ticket */}
            <View style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                <Icon name="ticket-outline" size={20} color="#ff7a00" />
                <Text style={styles.ticketTitle}>Submit a Ticket</Text>
              </View>
              <Text style={styles.ticketSub}>
                Describe your problem and we'll get back to you within 24 hours.
              </Text>

              <View style={styles.ticketInput}>
                <TextInput
                  style={styles.ticketTextInput}
                  value={issueText}
                  onChangeText={setIssueText}
                  placeholder="Tell us what went wrong..."
                  placeholderTextColor="#bbb"
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>

              {/* Success message */}
              {submitted && (
                <View style={styles.successBanner}>
                  <Icon name="checkmark-circle" size={16} color="#22a55b" />
                  <Text style={styles.successText}>
                    Ticket submitted! We'll reply within 24 hours.
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={[styles.submitBtn, submitted && { backgroundColor: '#22a55b' }]}
                onPress={handleSubmitTicket}
                activeOpacity={0.8}
              >
                <Icon
                  name={submitted ? 'checkmark-circle' : 'send'}
                  size={16}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.submitBtnText}>
                  {submitted ? 'Submitted!' : 'Submit Ticket'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── QUICK LINKS (always visible) ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinksCard}>
            {[
              { icon: 'document-text-outline', label: 'Terms & Conditions' },
              { icon: 'shield-checkmark-outline', label: 'Privacy Policy' },
              { icon: 'star-outline', label: 'Rate the App' },
              { icon: 'share-social-outline', label: 'Share Frookoon' },
            ].map((item, idx, arr) => (
              <View key={item.label}>
                <TouchableOpacity style={styles.quickLinkRow} activeOpacity={0.7}>
                  <View style={styles.quickLinkLeft}>
                    <View style={styles.quickLinkIcon}>
                      <Icon name={item.icon} size={18} color="#ff7a00" />
                    </View>
                    <Text style={styles.quickLinkText}>{item.label}</Text>
                  </View>
                  <Icon name="chevron-forward" size={18} color="#ccc" />
                </TouchableOpacity>
                {idx < arr.length - 1 && <View style={styles.quickLinkDivider} />}
              </View>
            ))}
          </View>
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>🛒 FROOKOON</Text>
          <Text style={styles.footerSub}>support@frookoon.com  •  +91 88000 00000</Text>
          <Text style={styles.footerVersion}>App Version 1.0.0</Text>
        </View>

      </ScrollView>
    </View>
  );
};

export default HelpSupportScreen;

// ─── FAQ Styles ───────────────────────────────────────────────────────────────
const faqStyles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  qLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
    marginRight: 10,
  },
  qDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff7a00',
    flexShrink: 0,
  },
  qText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
    lineHeight: 20,
  },
  answer: {
    backgroundColor: '#fff9f5',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#fff0e0',
  },
  aText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
});

// ─── Screen Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
  },

  // Hero
  heroBanner: {
    backgroundColor: '#ff7a00',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 32,
    alignItems: 'center',
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  heroSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  heroSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  heroSearchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabActive:     { backgroundColor: '#ff7a00' },
  tabText:       { fontSize: 14, fontWeight: '700', color: '#ff7a00' },
  tabTextActive: { color: '#fff' },

  // Section
  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#999',
    letterSpacing: 1,
    marginBottom: 12,
    textTransform: 'uppercase',
  },

  // Empty
  emptyWrap: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText: { fontSize: 14, color: '#bbb', fontWeight: '600' },

  // Contact grid
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1.5,
    gap: 8,
  },
  contactIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactLabel: { fontSize: 14, fontWeight: '800' },
  contactSub:   { fontSize: 11, color: '#aaa', textAlign: 'center' },

  // Or divider
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  orLine: { flex: 1, height: 1, backgroundColor: '#eee' },
  orText: { fontSize: 12, color: '#bbb', fontWeight: '600' },

  // Ticket card
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  ticketTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a1a' },
  ticketSub:   { fontSize: 12, color: '#aaa', marginBottom: 14, lineHeight: 18 },
  ticketInput: {
    backgroundColor: '#fafafa',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#eee',
    padding: 14,
    marginBottom: 12,
    minHeight: 110,
  },
  ticketTextInput: {
    fontSize: 14,
    color: '#1a1a1a',
    minHeight: 90,
  },

  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#e6f9ee',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  successText: { fontSize: 13, color: '#22a55b', fontWeight: '600', flex: 1 },

  submitBtn: {
    height: 50,
    backgroundColor: '#ff7a00',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#ff7a00',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  submitBtnText: { fontSize: 14, fontWeight: '800', color: '#fff', letterSpacing: 0.3 },

  // Quick links
  quickLinksCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  quickLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  quickLinkLeft:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
  quickLinkIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#fff5ee',
    justifyContent: 'center', alignItems: 'center',
  },
  quickLinkText:    { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  quickLinkDivider: { height: 1, backgroundColor: '#f5f5f5', marginHorizontal: 16 },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    gap: 4,
  },
  footerText:    { fontSize: 16, fontWeight: '900', color: '#ff7a00' },
  footerSub:     { fontSize: 12, color: '#aaa' },
  footerVersion: { fontSize: 11, color: '#ddd', marginTop: 4 },
});