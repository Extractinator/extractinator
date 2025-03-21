import React from 'react';
import commonStyles from './common.module.css';
import img from '../sprites/grinder.png';
import styles from './Grind.module.css';

export const Grind = ({
  grind,
  setGrind,
}: {
  grind: number;
  setGrind: (arg0: number) => void;
}) => (
  <>
    <div className={commonStyles.sectionContainer}>
      {' '}
      <img src={img} alt="beans" className={styles.grind} />
      <label htmlFor="grind">Grind (0-20)</label>
      <input
        id="grind"
        type="number"
        value={grind}
        onChange={(event) => {
          setGrind(Number.parseInt(event.currentTarget.value, 10));
        }}
      />
    </div>
  </>
);
