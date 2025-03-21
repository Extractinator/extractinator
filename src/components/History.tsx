import type { HistoryType } from './Extractinate.tsx';
import React from 'react';
import useLocalStorage from 'use-local-storage';

export const History = () => {
  const [history] = useLocalStorage<HistoryType[]>('history', []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Grind</th>
            <th>Weight</th>
            <th>Yield</th>
            <th>Extraction Time</th>
            <th>Pre-Extraction Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.grind}</td>
              <td>{item.weight}</td>
              <td>{item.yield}</td>
              <td>{item.extrtactTime}</td>
              <td>{item.preExtractionTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
