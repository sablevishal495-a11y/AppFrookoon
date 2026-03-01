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
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Address {
  id: string;
  type: 'Home' | 'Office' | 'Other';
  title: string;
  full: string;
  selected: boolean;
}

// ─── Icon per address type ────────────────────────────────────────────────────
const typeIcon: Record<string, string> = {
  Home:   'home',
  Office: 'business',
  Other:  'location',
};

// ─── Single Address Card ──────────────────────────────────────────────────────
const AddressCard = ({
  address,
  onSelect,
  onEdit,
  onDelete,
}: {
  address: Address;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <View style={[cardStyles.wrap, address.selected && cardStyles.wrapSelected]}>
    {/* Left icon */}
    <View style={[cardStyles.iconBox, address.selected && cardStyles.iconBoxSelected]}>
      <Icon name={typeIcon[address.type]} size={20} color={address.selected ? '#fff' : '#ff7a00'} />
    </View>

    {/* Info */}
    <View style={{ flex: 1 }}>
      <Text style={cardStyles.title}>{address.title}</Text>
      <Text style={cardStyles.full} numberOfLines={2}>{address.full}</Text>
    </View>

    {/* Right side: radio + actions */}
    <View style={{ alignItems: 'center', gap: 10 }}>
      {/* Radio */}
      <TouchableOpacity onPress={onSelect} activeOpacity={0.8}>
        <View style={[cardStyles.radio, address.selected && cardStyles.radioSelected]}>
          {address.selected && <View style={cardStyles.radioDot} />}
        </View>
      </TouchableOpacity>

      {/* Edit / Delete */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity onPress={onEdit} activeOpacity={0.7}>
          <Icon name="create-outline" size={17} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} activeOpacity={0.7}>
          <Icon name="trash-outline" size={17} color="#e53935" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// ─── Add / Edit Address Modal ─────────────────────────────────────────────────
const AddressModal = ({
  visible,
  initial,
  onSave,
  onClose,
}: {
  visible: boolean;
  initial?: Partial<Address>;
  onSave: (a: Omit<Address, 'id' | 'selected'>) => void;
  onClose: () => void;
}) => {
  const [type,  setType]  = useState<'Home' | 'Office' | 'Other'>(initial?.type  || 'Home');
  const [title, setTitle] = useState(initial?.title || '');
  const [full,  setFull]  = useState(initial?.full  || '');
  const [search, setSearch] = useState('');

  const typeOptions: Array<'Home' | 'Office' | 'Other'> = ['Home', 'Office', 'Other'];

  const handleSave = () => {
    if (!title.trim() || !full.trim()) {
      Alert.alert('Missing info', 'Please fill in address title and full address.');
      return;
    }
    onSave({ type, title: title.trim(), full: full.trim() });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <View style={modalStyles.sheet}>

          {/* Handle */}
          <View style={modalStyles.handle} />

          {/* Header */}
          <View style={modalStyles.header}>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={modalStyles.backBtn}>
              <Icon name="chevron-back" size={22} color="#000" />
            </TouchableOpacity>
            <Text style={modalStyles.headerTitle}>
              {initial?.id ? 'EDIT ADDRESS' : 'NEW ADDRESS'}
            </Text>
            <View style={{ width: 38 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

            {/* Choose Avatar / Type */}
            <View style={modalStyles.section}>
              <Text style={modalStyles.sectionLabel}>ADDRESS TYPE</Text>
              <View style={modalStyles.typeRow}>
                {typeOptions.map(t => (
                  <TouchableOpacity
                    key={t}
                    style={[modalStyles.typeBtn, type === t && modalStyles.typeBtnActive]}
                    onPress={() => setType(t)}
                    activeOpacity={0.8}
                  >
                    <Icon
                      name={typeIcon[t]}
                      size={16}
                      color={type === t ? '#fff' : '#ff7a00'}
                    />
                    <Text style={[modalStyles.typeBtnText, type === t && { color: '#fff' }]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Address Title */}
            <View style={modalStyles.section}>
              <Text style={modalStyles.sectionLabel}>ADDRESS TITLE</Text>
              <View style={modalStyles.inputBox}>
                <Icon name="bookmark-outline" size={18} color="#bbb" style={{ marginRight: 10 }} />
                <TextInput
                  style={modalStyles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="e.g. Home, Mom's place..."
                  placeholderTextColor="#bbb"
                />
              </View>
            </View>

            {/* Search location */}
            <View style={modalStyles.section}>
              <Text style={modalStyles.sectionLabel}>SEARCH LOCATION</Text>
              <View style={[modalStyles.inputBox, { borderColor: '#ff7a00' }]}>
                <Icon name="search" size={18} color="#ff7a00" style={{ marginRight: 10 }} />
                <TextInput
                  style={modalStyles.input}
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search your location..."
                  placeholderTextColor="#bbb"
                />
              </View>
            </View>

            {/* Map placeholder */}
            <View style={modalStyles.mapBox}>
              <Icon name="map" size={48} color="#e0e0e0" />
              <Text style={modalStyles.mapText}>Map view coming soon</Text>
            </View>

            {/* Full address input */}
            <View style={modalStyles.section}>
              <Text style={modalStyles.sectionLabel}>FULL ADDRESS</Text>
              <View style={[modalStyles.inputBox, { height: 80, alignItems: 'flex-start', paddingTop: 12 }]}>
                <Icon name="location-outline" size={18} color="#bbb" style={{ marginRight: 10, marginTop: 2 }} />
                <TextInput
                  style={[modalStyles.input, { height: 60 }]}
                  value={full}
                  onChangeText={setFull}
                  placeholder="Enter full address..."
                  placeholderTextColor="#bbb"
                  multiline
                />
              </View>
            </View>

            {/* Use current location */}
            <TouchableOpacity style={modalStyles.locationBtn} activeOpacity={0.8}>
              <View style={modalStyles.locationIconWrap}>
                <Icon name="navigate" size={18} color="#ff7a00" />
              </View>
              <Text style={modalStyles.locationBtnText}>Use my current location</Text>
              <Icon name="chevron-forward" size={18} color="#ff7a00" />
            </TouchableOpacity>

            {/* Save button */}
            <TouchableOpacity style={modalStyles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
              <Icon name="save-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={modalStyles.saveBtnText}>SAVE ADDRESS</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const AddressManagementScreen = () => {
  const navigation = useNavigation<any>();

  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', type: 'Office', title: 'Office',  full: 'IT Park / Technopark, Bargi Hills, Jabalpur, Madhya Pradesh', selected: false },
    { id: '2', type: 'Home',   title: 'Home',    full: '123 MG ROAD, BANGALURU, KA 560001',                           selected: true  },
    { id: '3', type: 'Other',  title: 'Home2',   full: 'Kausalya My Home Block F, Sagar Ratna',                       selected: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editTarget,   setEditTarget]   = useState<Address | undefined>();
  const [searchText,   setSearchText]   = useState('');

  const filtered = addresses.filter(a =>
    a.title.toLowerCase().includes(searchText.toLowerCase()) ||
    a.full.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, selected: a.id === id })));
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Address', 'Are you sure you want to remove this address?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () =>
          setAddresses(prev => prev.filter(a => a.id !== id))
      },
    ]);
  };

  const handleEdit = (address: Address) => {
    setEditTarget(address);
    setModalVisible(true);
  };

  const handleSave = (data: Omit<Address, 'id' | 'selected'>) => {
    if (editTarget) {
      // Update existing
      setAddresses(prev => prev.map(a =>
        a.id === editTarget.id ? { ...a, ...data } : a
      ));
    } else {
      // Add new
      const newAddress: Address = {
        id: Date.now().toString(),
        selected: false,
        ...data,
      };
      setAddresses(prev => [...prev, newAddress]);
    }
    setEditTarget(undefined);
  };

  const selectedAddress = addresses.find(a => a.selected);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ADDRESS MANAGEMENT</Text>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
          <Icon name="menu-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* DELIVERING TO banner */}
      {selectedAddress && (
        <View style={styles.deliveryBanner}>
          <Icon name="location" size={14} color="#ff7a00" />
          <Text style={styles.deliveryText} numberOfLines={1}>
            Delivering to: <Text style={{ fontWeight: '700' }}>{selectedAddress.title}</Text>
            {' '}— {selectedAddress.full}
          </Text>
        </View>
      )}

      {/* SEARCH */}
      <View style={styles.searchWrap}>
        <Icon name="search-outline" size={18} color="#bbb" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search your location......"
          placeholderTextColor="#bbb"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Icon name="close-circle" size={18} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>

      {/* ADDRESS LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Icon name="location-outline" size={56} color="#ddd" />
            <Text style={styles.emptyText}>No addresses found</Text>
          </View>
        ) : (
          filtered.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              onSelect={() => handleSelect(address.id)}
              onEdit={() => handleEdit(address)}
              onDelete={() => handleDelete(address.id)}
            />
          ))
        )}
      </ScrollView>

      {/* ADD ADDRESS BUTTON */}
      <View style={styles.addBtnWrap}>
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('NewAddress')}
        >
          <Icon name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addBtnText}>Add Address</Text>
        </TouchableOpacity>
      </View>

      {/* ADD / EDIT MODAL */}
      <AddressModal
        visible={modalVisible}
        initial={editTarget}
        onSave={handleSave}
        onClose={() => { setModalVisible(false); setEditTarget(undefined); }}
      />
    </View>
  );
};

export default AddressManagementScreen;

// ─── Card Styles ──────────────────────────────────────────────────────────────
const cardStyles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: 12,
  },
  wrapSelected: {
    borderColor: '#ff7a00',
    backgroundColor: '#fffaf6',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#fff5ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxSelected: {
    backgroundColor: '#ff7a00',
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  full: {
    fontSize: 12,
    color: '#888',
    lineHeight: 17,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#ff7a00',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff7a00',
  },
});

// ─── Modal Styles ─────────────────────────────────────────────────────────────
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '92%',
    paddingHorizontal: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
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
    fontSize: 16,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 0.8,
  },
  section: {
    marginBottom: 18,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#999',
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ff7a00',
    backgroundColor: '#fff',
  },
  typeBtnActive: {
    backgroundColor: '#ff7a00',
  },
  typeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ff7a00',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: '#fafafa',
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },
  mapBox: {
    height: 150,
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 8,
  },
  mapText: {
    fontSize: 13,
    color: '#ccc',
    fontWeight: '600',
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff9f5',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: '#ffe4cc',
    gap: 10,
  },
  locationIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fff5ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBtnText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#ff7a00',
  },
  saveBtn: {
    height: 54,
    backgroundColor: '#ff7a00',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#ff7a00',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
});

// ─── Screen Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },

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
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 0.8,
  },

  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff9f5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffe4cc',
  },
  deliveryText: {
    fontSize: 12,
    color: '#888',
    flex: 1,
  },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#1a1a1a' },

  emptyWrap: { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyText: { fontSize: 15, color: '#ccc', fontWeight: '600' },

  addBtnWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  addBtn: {
    height: 54,
    backgroundColor: '#ff7a00',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#ff7a00',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
});