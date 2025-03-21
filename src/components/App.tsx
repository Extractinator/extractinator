import { Extractinate } from './Extractinate.tsx';
import Header from './Header.tsx';
import { History } from './History.tsx';
import React from 'react';
import styles from './App.module.css';

const App: React.FC = () => {
  const [view, setView] = React.useState<'extractinate' | 'histroy'>(
    'extractinate',
  );

  const toggleView = () => {
    setView((prevView) =>
      prevView === 'extractinate' ? 'histroy' : 'extractinate',
    );
  };

  return (
    <div className={styles.container}>
      <Header toggleView={toggleView} isHistory={view === 'histroy'} />
      {view === 'extractinate' && <Extractinate />}
      {view === 'histroy' && <History />}
    </div>
  );
};

export default App;
