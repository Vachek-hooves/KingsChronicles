import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const ARCHER_SIZE = 60;
const TARGET_SIZE = 40;
const ARROW_SIZE = 30;
const GAME_DURATION = 60; // 60 seconds
const MAX_PULL = 100; // Maximum pull distance

const PlayGame = ({navigation}) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isGameActive, setIsGameActive] = useState(true);
  const [targets, setTargets] = useState([]);
  const [arrowPosition, setArrowPosition] = useState({
    x: SCREEN_WIDTH / 2,
    y: SCREEN_HEIGHT - 150,
  });
  const [isArrowFlying, setIsArrowFlying] = useState(false);
  const [arrowTrajectory, setArrowTrajectory] = useState(null);
  const [aimAngle, setAimAngle] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const arrowAnimation = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsDragging(true);
      },
      onPanResponderMove: (_, gesture) => {
        if (isArrowFlying) return;

        // Calculate angle and pull distance from touch position
        const touchX = gesture.dx;
        const touchY = gesture.dy;
        const distance = Math.min(
          Math.sqrt(touchX * touchX + touchY * touchY),
          MAX_PULL
        );
        const angle = Math.atan2(touchY, touchX);

        setAimAngle(angle);
        setPullDistance(distance);
      },
      onPanResponderRelease: () => {
        if (isArrowFlying) return;
        shootArrow(aimAngle, pullDistance);
        setIsDragging(false);
        setPullDistance(0);
      },
    })
  ).current;

  useEffect(() => {
    generateTargets();
    startTimer();
  }, []);

  const generateTargets = () => {
    const newTargets = [];
    for (let i = 0; i < 3; i++) {
      newTargets.push({
        id: i,
        x: Math.random() * (SCREEN_WIDTH - TARGET_SIZE),
        y: Math.random() * (SCREEN_HEIGHT / 2),
      });
    }
    setTargets(newTargets);
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setIsGameActive(false);
    // Handle game over logic
  };

  const shootArrow = (angle, power) => {
    if (isArrowFlying) return;

    setIsArrowFlying(true);
    const trajectory = calculateTrajectory(angle, power);
    setArrowTrajectory(trajectory);

    Animated.timing(arrowAnimation, {
      toValue: { x: trajectory.targetX, y: trajectory.targetY },
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      checkHit(trajectory.targetX, trajectory.targetY);
      resetArrow();
    });
  };

  const calculateTrajectory = (angle, power) => {
    const normalizedPower = power / MAX_PULL; // 0 to 1
    const maxDistance = 300; // Maximum shooting distance
    const targetX = Math.cos(angle) * (maxDistance * normalizedPower);
    const targetY = Math.sin(angle) * (maxDistance * normalizedPower);
    return { targetX, targetY };
  };

  const checkHit = (x, y) => {
    targets.forEach((target) => {
      const distance = Math.sqrt(
        Math.pow(x - target.x, 2) + Math.pow(y - target.y, 2)
      );
      if (distance < TARGET_SIZE / 2) {
        setScore((prevScore) => prevScore + 100);
        removeTarget(target.id);
      }
    });
  };

  const removeTarget = (targetId) => {
    setTargets(targets.filter((target) => target.id !== targetId));
    if (targets.length <= 1) {
      generateTargets();
    }
  };

  const resetArrow = () => {
    setIsArrowFlying(false);
    arrowAnimation.setValue({ x: 0, y: 0 });
  };

  // Render trajectory guide
  const renderTrajectoryGuide = () => {
    if (!isDragging || isArrowFlying) return null;

    const guidePoints = [];
    const steps = 10;
    const trajectory = calculateTrajectory(aimAngle, pullDistance);

    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      guidePoints.push(
        <View
          key={i}
          style={[
            styles.trajectoryDot,
            {
              left: arrowPosition.x + trajectory.targetX * progress,
              top: arrowPosition.y + trajectory.targetY * progress,
              opacity: 1 - progress,
            },
          ]}
        />
      );
    }

    return guidePoints;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.score}>{score}/500</Text>
        <Text style={styles.timer}>{timeLeft}s</Text>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea} {...panResponder.panHandlers}>
        {/* Trajectory Guide */}
        {renderTrajectoryGuide()}

        {/* Targets */}
        {targets.map((target) => (
          <View
            key={target.id}
            style={[styles.target, { left: target.x, top: target.y }]}
          />
        ))}

        {/* Archer and Arrow */}
        <View style={[styles.archer, { left: arrowPosition.x - ARCHER_SIZE / 2 }]}>
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
          {isDragging && (
            <View
              style={[
                styles.aimLine,
                {
                  width: pullDistance,
                  transform: [{ rotate: `${aimAngle}rad` }],
                },
              ]}
            />
          )}
        </View>
      </View>

      {/* Game Controls */}
      <TouchableOpacity
        style={styles.shootButton}
        onPress={() => shootArrow(Math.PI / 4, MAX_PULL)} // 45 degrees angle
      >
        <Text style={styles.shootButtonText}>SHOOT</Text>
      </TouchableOpacity>
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
    position: 'relative',
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
    transformOrigin: 'left',
  },
  shootButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#C6A44E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  shootButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trajectoryDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(198, 164, 78, 0.5)',
  },
  aimLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#C6A44E',
    top: ARCHER_SIZE / 2,
    left: ARCHER_SIZE / 2,
    transformOrigin: 'left',
  },
});

export default PlayGame;