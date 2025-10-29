import React from 'react';

const OptionsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: 'white',
        width: '100%',
        maxWidth: '500px',
        borderRadius: '20px 20px 0 0',
        padding: '20px'
      }}>
        <button onClick={onClose}>Cerrar</button>
        <p>Modal funcionando</p>
      </div>
    </div>
  );
};

export default OptionsModal;