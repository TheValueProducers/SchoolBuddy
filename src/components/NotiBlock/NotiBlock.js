import React, { useState, useEffect, useRef, useMemo } from 'react';
import { IconButton, Text, View } from '../../core/dopebase';
import { ActivityIndicator, StyleSheet, Animated, Dimensions } from 'react-native';
import { Image } from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';

const data = {
  red: {
    class: '7A5',
  },
  yellow: {
    stack: 2,
  }
}

const NotiBlock = (props) => {
  const { colorSet } = props;
  const [isLoading, setIsLoading] = useState(true);
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const iconSize = useMemo(() => width * 0.07, []);
  const [redState, setRedState] = useState(true);
  const [yellowState, setYellowState] = useState(true);
  const redRef = useRef();
  const yellowRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (data) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [blinkAnim]);

  const handleRedClose = () => {
    if (redRef.current) {
      redRef.current.animate('fadeOutRight', 500).then(() => {
        setRedState(false);
      })
    }
  };

  const handleYellowClose = () => {
    if (yellowRef.current) {
      yellowRef.current.animate('fadeOutRight', 500).then(() => {
        setYellowState(false);
      })
    }
  };

  return (
    isLoading ?
      <View pv3>
        <ActivityIndicator size="small" color={colorSet.secondaryText} />
      </View> :
      (<View>
        {redState &&
          <Animatable.View ref={redRef} style={{width: width}}>
            <View pv3 ph4 style={[styles.flexRow, { backgroundColor: colorSet.alertColor, opacity: blinkAnim, justifyContent: 'space-between', }]}>
              <View style={styles.flexRow}>
                <Image source={require('../../assets/icons/circle.png')} />
                <Text ml1>Bạn đang trong tiết dạy lớp {data.red.class}</Text>
              </View>
              <IconButton
                tintColor={colorSet.primaryText}
                source={require('../../assets/icons/close-x-icon2x.png')}
                width={iconSize * 1.1}
                height={iconSize * 1.1}
                onPress={handleRedClose}
              />
            </View>
          </Animatable.View>
        }
        {yellowState &&
          <Animatable.View ref={yellowRef} style={{width: width}}>
            <View pv3 ph4 style={[styles.flexRow, { backgroundColor: colorSet.warningColor, justifyContent: 'space-between', }]}>
              <View style={styles.flexRow}>
                <Image source={require('../../assets/icons/warning-circle.png')} />
                <Text ml1>({data.yellow.stack}) Hoàn thành đánh giá tiết học đã qua</Text>
              </View>
              <IconButton
                tintColor={colorSet.primaryText}
                source={require('../../assets/icons/close-x-icon2x.png')}
                width={iconSize * 1.1}
                height={iconSize * 1.1}
                onPress={handleYellowClose}
              />
            </View>
          </Animatable.View>
        }
      </View>)
  );
};

export default NotiBlock;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  redContainer: {

  },
  yellowContainer: {

  },
})