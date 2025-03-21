import React from 'react';
import commonStyles from './common.module.css';
import img from '../sprites/bean.png';
import styles from './Beans.module.css';

const generateLocations = () => {
  const locations = [];
  for (let index = 0; index < 50; index += 1) {
    locations.push({
      angle: (Math.random() * 360).toString(10),
      dist: (Math.random() * 200).toString(10),
      rotation: (Math.random() * 360).toString(10),
    });
  }
  return locations;
};

export const Beans = ({
  weight,
  setWeight,
}: {
  weight: number;
  setWeight: (arg0: number) => void;
}) => {
  const locations = React.useRef(generateLocations());
  return (
    <>
      <div className={commonStyles.sectionContainer}>
        {locations.current.map((location, index) => (
          <img
            key={index}
            src={img}
            alt="beans"
            className={styles.beans}
            style={{
              transform: `translate(calc(${location.dist}px * sin(${location.angle}deg)), calc(${location.dist}px * cos(${location.angle}deg))) rotate(${location.rotation}deg)`,
            }}
          />
        ))}
        <label htmlFor="grind">Weight (g)</label>
        <input
          id="grind"
          type="number"
          value={weight}
          className={styles.beansInput}
          onChange={(event) => {
            setWeight(Number.parseInt(event.currentTarget.value, 10));
          }}
        />
      </div>
    </>
  );
};
