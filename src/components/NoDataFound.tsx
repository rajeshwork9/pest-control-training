import React from 'react';
import { IonText, IonIcon } from '@ionic/react';
import { alertCircleOutline } from 'ionicons/icons';

interface NoDataFoundProps {
  message?: string; // Optional custom message
  icon?: string;    // Optional custom icon
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
  message = 'No data found.',
  icon = alertCircleOutline,
}) => {
  return (
    <div style={styles.container}>
      <IonIcon icon={icon} style={styles.icon} />
      <IonText color="medium" >
        <h4 style={styles.text}>{message}</h4>
      </IonText>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
    textAlign: 'center' as const,
  },
  icon: {
    fontSize: '48px',
    marginBottom: '16px',
    color: '#6c757d',
  },
  text: {
    textTransform: 'capitalize' as const
  }
};

export default NoDataFound;
