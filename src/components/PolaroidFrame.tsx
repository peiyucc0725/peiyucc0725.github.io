import React from 'react';
import styles from './PolaroidFrame.module.scss'; // 假設使用 CSS Modules

interface PolaroidFrameProps {
  children: React.ReactNode;
  text?: string;
}

const PolaroidFrame: React.FC<PolaroidFrameProps> = ({ children, text }) => {
  return (
    <div className={styles.polaroidContainer}>
      <div className={styles.polaroidFrame}>
        <div className={styles.imageWrapper}>
          {children}
        </div>
        {text && <span className={styles.polaroidText}>{text}</span>}
      </div>
    </div>
  );
};

export default PolaroidFrame;