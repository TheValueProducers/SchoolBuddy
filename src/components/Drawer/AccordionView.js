import React from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {Text, View} from '../../core/dopebase';
import {Image, StyleSheet} from 'react-native';

export default class AccordionView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      activeSections2: [],
    };
  }

  // _renderSectionTitle = (section) => {
  //   return (
  //     <View style={{backgroundColor: 'red'}}>
  //       <Text>{section.content}</Text>
  //     </View>
  //   );
  // };

  _renderHeader = (section, index, isActive, sections) => {
    const {iconCollapseSize, colorSet} = this.props;
    return (
      <View pv1 style={styles.collapseHeader}>
        <Text h3 style={{fontWeight: '600'}} numberOfLines={1}>
          {section.title}
        </Text>
        {section.lopDangDay ? (
          <View
            style={{
              transform: [isActive ? {rotate: '90deg'} : {rotate: '0deg'}],
            }}>
            <Image
              tintColor={colorSet.primaryText}
              source={require('../../assets/icons/right-arrow.png')}
              style={{width: iconCollapseSize, height: iconCollapseSize}}
            />
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  };

  _renderHeader2 = (section, index, isActive, sections) => {
    const {iconCollapseSize, colorSet} = this.props;
    return (
      <View pv1 style={styles.collapseHeader}>
        <Text h3 style={{fontWeight: '600'}} numberOfLines={1}>
          {section.khoi}
        </Text>
        <View
          style={{
            transform: [isActive ? {rotate: '90deg'} : {rotate: '0deg'}],
          }}>
          <Image
            tintColor={colorSet.primaryText}
            source={require('../../assets/icons/right-arrow.png')}
            style={{
              width: iconCollapseSize,
              height: iconCollapseSize,
              opacity: 0.5,
            }}
          />
        </View>
      </View>
    );
  };

  _renderContent = section => {
    return section.lopDangDay ? (
      <View pv1 ml4 pr2>
        <Accordion
          sections={section.lopDangDay}
          activeSections={this.state.activeSections2}
          renderHeader={this._renderHeader2}
          renderContent={this._renderContent2}
          onChange={this._updateSections2}
        />
      </View>
    ) : (
      <View></View>
    );
  };

  _renderContent2 = section => {
    const {localized} = this.props;
    return (
      <View ml4>
        {section.danhSachLop.map((item, index) => {
          return (
            <View key={index} pv1>
              <Text h3 style={{fontWeight: '600'}}>
                {localized('Lớp')} {item.tenLop}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };

  _updateSections2 = activeSections2 => {
    this.setState({activeSections2});
  };

  render() {
    const {collapse} = this.props;

    return (
      <Accordion
        sections={collapse}
        activeSections={this.state.activeSections}
        // renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}

const styles = StyleSheet.create({
  collapseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
