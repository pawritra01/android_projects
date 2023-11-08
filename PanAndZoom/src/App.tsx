import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

function App(): JSX.Element {
  const savedScale = useSharedValue(1);
  const scale = useSharedValue(1);

  const position = {x: useSharedValue(0), y: useSharedValue(0)};
  const translate = {x: useSharedValue(0), y: useSharedValue(0)};

  const reset = () => {
    translate.x.value = withTiming(0, {duration: 500});
    translate.y.value = withTiming(0, {duration: 500});
    position.x.value = 0;
    position.y.value = 0;
    scale.value = withTiming(1, {duration: 500});
    savedScale.value = 1;
  };

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      console.log(e, position.x.value, position.y.value);
      translate.x.value = position.x.value + e.translationX;
      translate.y.value = position.y.value + e.translationY;
    })
    .onEnd(e => {
      position.x.value = position.x.value + e.translationX;
      position.y.value = position.y.value + e.translationY;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      if (savedScale.value * e.scale > 1) {
        scale.value = savedScale.value * e.scale;
      }
    })
    .onEnd(e => {
      savedScale.value = scale.value;
    });

  const doubleTapGesture = Gesture.Tap().numberOfTaps(2).onEnd(reset);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translate.x.value},
      {translateY: translate.y.value},
      {scale: scale.value},
    ],
  }));

  const composed = Gesture.Simultaneous(
    panGesture,
    doubleTapGesture,
    pinchGesture,
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={composed}>
        <View>
          <Animated.Image
            style={[styles.box, animatedStyle]}
            source={{
              uri: 'https://www.cameraegg.org/wp-content/uploads/2013/02/Nikon-D7100-Sample-Image-s2.jpg',
            }}
          />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
});

export default App;
