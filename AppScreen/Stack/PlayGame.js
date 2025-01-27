import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const ARCHER_SIZE = 60;
const TARGET_SIZE = 40;
const ARROW_SIZE = 30;
const GAME_DURATION = 60; // 60 seconds

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
  
  const arrowAnimation = useRef(new Animated.ValueXY()).current;

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

  const shootArrow = (angle) => {
    if (isArrowFlying) return;

    setIsArrowFlying(true);
    const trajectory = calculateTrajectory(angle);
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

  const calculateTrajectory = (angle) => {
    const power = 300; // Adjust for arrow speed
    const targetX = Math.sin(angle) * power;
    const targetY = -Math.cos(angle) * power;
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.score}>{score}/500</Text>
        <Text style={styles.timer}>{timeLeft}s</Text>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        {/* Targets */}
        {targets.map((target) => (
          <View
            key={target.id}
            style={[
              styles.target,
              { left: target.x, top: target.y },
            ]}
          />
        ))}

        {/* Archer */}
        <View style={[styles.archer, { left: arrowPosition.x - ARCHER_SIZE / 2 }]}>
          {/* Arrow */}
          <Animated.View
            style={[
              styles.arrow,
              {
                transform: [
                  { translateX: arrowAnimation.x },
                  { translateY: arrowAnimation.y },
                  { rotate: arrowTrajectory ? `${Math.atan2(arrowTrajectory.targetY, arrowTrajectory.targetX)}rad` : '0deg' },
                ],
              },
            ]}
          />
        </View>
      </View>

      {/* Game Controls */}
      <TouchableOpacity
        style={styles.shootButton}
        onPress={() => shootArrow(Math.PI / 4)} // 45 degrees angle
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
});

export default PlayGame;