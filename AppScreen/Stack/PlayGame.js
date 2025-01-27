import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  PanResponder,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const ARCHER_SIZE = 60;
const TARGET_SIZE = 40;
const ARROW_SIZE = 30;
const GAME_DURATION = 60;
const MAX_PULL = 150;
const HIT_THRESHOLD = TARGET_SIZE / 2; // Distance threshold for hit detection

const PlayGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [targets, setTargets] = useState([]);
  const [isArrowFlying, setIsArrowFlying] = useState(false);
  const [aimAngle, setAimAngle] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const arrowAnimation = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    generateTargets();
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateTargets = () => {
    const newTargets = [];
    for (let i = 0; i < 3; i++) {
      newTargets.push({
        id: i,
        x: 50 + Math.random() * (SCREEN_WIDTH - TARGET_SIZE - 100),
        y: 100 + Math.random() * (SCREEN_HEIGHT / 2.5),
      });
    }
    setTargets(newTargets);
  };

  const shootArrow = () => {
    if (isArrowFlying) return;

    setIsArrowFlying(true);
    
    const power = 500;
    const targetX = Math.cos(aimAngle) * power;
    const targetY = Math.sin(aimAngle) * power;

    Animated.timing(arrowAnimation, {
      toValue: { x: targetX, y: targetY },
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      const finalX = SCREEN_WIDTH / 2 + targetX;
      const finalY = SCREEN_HEIGHT - 150 + targetY;
      checkHits(finalX, finalY);
      
      setTimeout(() => {
        setIsArrowFlying(false);
        arrowAnimation.setValue({ x: 0, y: 0 });
      }, 100);
    });
  };

  const checkHits = (arrowX, arrowY) => {
    let hitTarget = false;
    
    targets.forEach((target) => {
      const distance = Math.sqrt(
        Math.pow(arrowX - (target.x + TARGET_SIZE / 2), 2) +
        Math.pow(arrowY - (target.y + TARGET_SIZE / 2), 2)
      );

      if (distance < HIT_THRESHOLD) {
        hitTarget = true;
        setScore(prev => prev + 100);
        setTargets(prev => prev.filter(t => t.id !== target.id));
      }
    });

    // Generate new targets if all are hit or none remain
    if (targets.length <= 1 || hitTarget) {
      generateTargets();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsDragging(true);
      },
      onPanResponderMove: (_, gesture) => {
        if (isArrowFlying) return;

        const dx = gesture.dx;
        const dy = gesture.dy;
        // Invert angle calculation for more intuitive aiming
        const angle = Math.atan2(-dy, -dx);
        setAimAngle(angle);
      },
      onPanResponderRelease: () => {
        setIsDragging(false);
      },
    })
  ).current;

  const renderAimLine = () => {
    if (!isDragging) return null;

    return (
      <>
        {/* Direction line */}
        <View
          style={[
            styles.aimLine,
            {
              width: 100,
              transform: [{ rotate: `${aimAngle}rad` }],
            },
          ]}
        />
        {/* Arrow indicator at the end of line */}
        <View
          style={[
            styles.aimArrowIndicator,
            {
              transform: [
                { translateX: Math.cos(aimAngle) * 100 },
                { translateY: Math.sin(aimAngle) * 100 },
                { rotate: `${aimAngle}rad` },
              ],
            },
          ]}>
          <View style={styles.aimArrowHead} />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.score}>{score}/500</Text>
        <Text style={styles.timer}>{timeLeft}s</Text>
      </View>

      <View style={styles.gameArea} {...panResponder.panHandlers}>
        {/* Targets with visual center point */}
        {targets.map((target) => (
          <View key={target.id}>
            <View
              style={[styles.target, { left: target.x, top: target.y }]}
            />
            <View
              style={[
                styles.targetCenter,
                { left: target.x + TARGET_SIZE / 2, top: target.y + TARGET_SIZE / 2 },
              ]}
            />
          </View>
        ))}

        <View style={[styles.archer, { left: SCREEN_WIDTH / 2 - ARCHER_SIZE / 2 }]}>
          <Animated.View
            style={[
              styles.arrow,
              {
                transform: [
                  { translateX: arrowAnimation.x },
                  { translateY: arrowAnimation.y },
                  { rotate: `${aimAngle}rad` },
                ],
              },
            ]}
          />
          {renderAimLine()}
        </View>

        <TouchableOpacity
          style={[
            styles.shootButton,
            isArrowFlying && styles.shootButtonDisabled,
          ]}
          onPress={shootArrow}
          disabled={isArrowFlying}>
          <Text style={styles.shootButtonText}>
            {isArrowFlying ? 'FIRING...' : 'SHOOT'}
          </Text>
        </TouchableOpacity>

        <View style={styles.debugInfo}>
          <Text>Angle: {Math.round(aimAngle * 180 / Math.PI)}°</Text>
          <Text>Flying: {isArrowFlying ? 'Yes' : 'No'}</Text>
          <Text>Score: {score}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#171717',
  },
  score: {
    color: '#C6A44E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timer: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
  },
  target: {
    position: 'absolute',
    width: TARGET_SIZE,
    height: TARGET_SIZE,
    borderRadius: TARGET_SIZE / 2,
    backgroundColor: '#C6A44E',
  },
  archer: {
    position: 'absolute',
    bottom: 50,
    width: ARCHER_SIZE,
    height: ARCHER_SIZE,
    backgroundColor: '#171717',
  },
  arrow: {
    position: 'absolute',
    width: ARROW_SIZE,
    height: 2,
    backgroundColor: '#171717',
    top: ARCHER_SIZE / 2,
    left: ARCHER_SIZE / 2,
  },
  aimLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#C6A44E',
    top: ARCHER_SIZE / 2,
    left: ARCHER_SIZE / 2,
  },
  aimArrowIndicator: {
    position: 'absolute',
    top: ARCHER_SIZE / 2 - 5,
    left: ARCHER_SIZE / 2,
  },
  aimArrowHead: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#C6A44E',
    transform: [{ rotate: '90deg' }],
  },
  shootButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#C6A44E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  shootButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  debugInfo: {
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
  },
  targetCenter: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#FF0000',
    borderRadius: 2,
  },
  shootButtonDisabled: {
    backgroundColor: '#888888',
  },
});

export default PlayGame;