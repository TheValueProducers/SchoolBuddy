import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Modal} from 'react-native';
import Checkbox from 'expo-checkbox';
import {useTheme, useTranslations} from '../../../core';
import dynamicStyles from './styles';

export const DropdownPicker = ({
  title,
  items,
  onSelectItem,
  allowMultipleSelection = false,
  selectedItemsList = [],
  containerStyle,
  modalWidth,
}) => {
  const {localized} = useTranslations();
  const {theme, appearance} = useTheme();
  const styles = dynamicStyles(theme, appearance);

  const dropdownButton = useRef();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropdownLocation, setDropdownLocation] = useState(0);

  useEffect(() => {
    allowMultipleSelection
      ? setSelectedItems(selectedItemsList)
      : setSelectedItems([selectedItemsList[0]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDropdownItemPress = item => {
    let tempArr = JSON.parse(JSON.stringify(selectedItems));
    if (selectedItems.includes(item)) {
      setSelectedItems(tempArr.filter(x => x !== item));
    } else if (allowMultipleSelection) {
      tempArr.push(item);
      setSelectedItems(tempArr);
    } else {
      setSelectedItems([item]);
      setShowDropDown(false);
    }
  };

  const onDropDownDismiss = () => {
    onSelectItem(selectedItems);
  };

  const toggleDropdown = () => {
    showDropDown ? setShowDropDown(false) : openDropdown();
  };

  const openDropdown = () => {
    dropdownButton.current.measure((fx, fy, w, h, px, py) => {
      setDropdownLocation({top: py + h, left: px});
    });
    setShowDropDown(true);
  };

  const renderDropdown = () => {
    return (
      <Modal visible={showDropDown} onDismiss={onDropDownDismiss} transparent>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlay}
          onPress={() => {
            setShowDropDown(false);
          }}>
          <View style={styles.shadowContainer}>
            <View
              style={[styles.dropdown, dropdownLocation, {width: modalWidth}]}>
              <ScrollView
                activeOpacity={1}
                showsVerticalScrollIndicator={false}>
                {items.map(itm => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => onDropdownItemPress(itm)}
                      key={itm + 'index'}
                      style={[
                        selectedItems.includes(itm) && {
                          backgroundColor: theme.colors[appearance].grey0,
                        },
                        styles.item,
                      ]}>
                      {allowMultipleSelection && (
                        <Checkbox
                          style={styles.checkbox}
                          value={selectedItems.includes(itm)}
                        />
                      )}
                      <Text style={styles.itemText}>{localized(itm)}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const getSelectedText = () => {
    if (!selectedItems || selectedItems.length === 0 || !selectedItems[0]) {
      return localized('Select Option');
    }
    if (allowMultipleSelection) {
      return selectedItems.join(', ');
    } else {
      return selectedItems[0];
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{localized(title)}</Text>
        </View>
      )}
      <View style={styles.listContainer}>
        <TouchableOpacity
          ref={dropdownButton}
          activeOpacity={1}
          onPress={toggleDropdown}
          style={styles.selectedItemContainer}>
          <Text style={styles.itemText} numberOfLines={1}>
            {getSelectedText()}
          </Text>
        </TouchableOpacity>
        {renderDropdown()}
      </View>
    </View>
  );
};
