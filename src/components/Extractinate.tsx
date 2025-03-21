import { Beans } from './Beans.tsx';
import { Grind } from './Grind.tsx';
import React from 'react';
import commonStyles from './common.module.css';
import img from '../sprites/thingy.png';
import styles from './Extractinate.module.css';
import useLocalStorage from 'use-local-storage';

export type HistoryType = {
  grind: number;
  weight: number;
  yield: number;
  extrtactTime: string;
  preExtractionTime: string;
};

const getPreExtractionTime = (
  extrtactTime: number,
  startTime: number,
): string => {
  if (extrtactTime === 0) {
    if (startTime === 0) {
      return '0';
    }
    return ((Date.now() - startTime) / 1000).toFixed(2);
  }
  return ((extrtactTime - startTime) / 1000).toFixed(2);
};

const getExtractionTime = (endTime: number, extrtactTime: number): string => {
  if (endTime === 0) {
    if (extrtactTime === 0) {
      return '0';
    }
    return ((Date.now() - extrtactTime) / 1000).toFixed(2);
  }
  return ((endTime - extrtactTime) / 1000).toFixed(2);
};

// eslint-disable-next-line max-lines-per-function,max-statements
export const Extractinate = () => {
  const [, setHistory] = useLocalStorage<HistoryType[]>('history', []);
  const [grind, setGrind] = React.useState(7);
  const [weight, setWeight] = React.useState(18);
  const targetYield = weight * 2;

  const [phase, setPhase] = React.useState('ready');
  const [startTime, setStartTime] = React.useState(0);
  const [extrtactTime, setExtrtactTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
  const [, setCurrentTime] = React.useState(0);

  const intervalRef = React.useRef<number | null>(null);

  const preExtractionTime = getPreExtractionTime(extrtactTime, startTime);
  const extractionTime = getExtractionTime(endTime, extrtactTime);

  // eslint-disable-next-line max-statements
  const start = () => {
    if (phase === 'ready') {
      setPhase('pre');
      setStartTime(Date.now());
      setExtrtactTime(0);
      setEndTime(0);
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now());
      }, 50);
    }
    if (phase === 'pre') {
      setPhase('extract');
      setExtrtactTime(Date.now());
    }
    if (phase === 'extract') {
      setPhase('ready');
      const localEndTime = Date.now();
      setEndTime(localEndTime);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = null;

      setHistory((prevHistroy: HistoryType[] | undefined) => {
        const nextHistory: HistoryType[] = [...(prevHistroy ?? [])];
        nextHistory.push({
          extrtactTime: getExtractionTime(localEndTime, extrtactTime),
          grind,
          preExtractionTime: getPreExtractionTime(extrtactTime, startTime),
          weight,
          yield: targetYield,
        });
        return nextHistory;
      });
    }
  };

  const timeRender =
    startTime === 0 ? '0' : ((Date.now() - startTime) / 1000).toFixed(2);
  const startTimeHuman =
    startTime === 0
      ? 'Quick, make a coffee'
      : new Date(startTime).toLocaleString('en-US', {
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          month: 'long',
          second: 'numeric',
          weekday: 'long',
          year: 'numeric',
        });

  return (
    <>
      <Beans weight={weight} setWeight={setWeight} />
      <Grind grind={grind} setGrind={setGrind} />

      <div className={commonStyles.sectionContainer}>
        <img src={img} alt="beans" className={styles.thingy} />
        <button
          className={styles.button}
          onClick={() => {
            start();
          }}
        >
          {' '}
          {phase === 'ready' && 'Start'}
          {phase === 'pre' && 'Extraction Started'}
          {phase === 'extract' && 'Stop'}
          {'\n'}
          <br />
          {timeRender}s
        </button>
        <div className={commonStyles.sectionContainer}>
          <p className={styles.label}>target yield: {targetYield}g</p>
        </div>
        <p>Pre extraction for: {preExtractionTime}s</p>
        <p>Extracted for: {extractionTime}s</p>
        <p>Coffee made at: {startTimeHuman}</p>
      </div>
    </>
  );
};
