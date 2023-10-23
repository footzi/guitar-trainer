import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import { getList, getTask } from './data/index.js';
import { NOTES } from './constants.js';

export const App = () => {
  const [task, setTask] = useState('');
  const [isError, setIsError] = useState(null);

  const ref = useRef(null);

  const handleTaskClick = () => {
    play(task.src);

    if (!isError) {
      setIsError(null);
    }
  };

  const handeClickPreview = (src) => play(src);

  const play = (src) => {
    const audio = ref?.current;

    if (audio) {
      audio.src = src;
      audio.play();
    }
  };

  const setRandomTask = () => {
    const task = getTask();

    setTask(task);

    return task;
  };

  const handleClickAnswer = (note) => {
    if (note === task.note) {
      setIsError(false);
      setRandomTask();
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    setRandomTask();
  }, [getTask]);

  const list = getList();

  return (
    <div className={styles.container}>
      <audio id="myAudio" ref={ref}>
        <source src="" type="audio/mpeg" />
      </audio>

      <div className={styles.header}>
        <button onClick={handleTaskClick}>{"Let's"} try ▶️</button>

        {isError !== null && (
          <div className={styles['error-container']}>
            {Boolean(isError) && <span className={styles.error}>{"It's"} wrong</span>}
            {!isError && <span className={styles.success}>{"It's"} correct</span>}
          </div>
        )}
      </div>

      <ul className={styles.list}>
        {NOTES.map((note) => (
          <li key={note.name}>
            <button onClick={() => handleClickAnswer(note.name)}>{note.label}</button>
          </li>
        ))}
      </ul>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>note</td>
            <td>string</td>
            <td>fret</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={item.note}>
                <td>{item.note}</td>
                <td>{item.string}</td>
                <td>{item.fret}</td>
                <td>
                  <button onClick={() => handeClickPreview(item.src)}>▶️</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
