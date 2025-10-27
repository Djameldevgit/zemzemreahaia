import React from 'react';

const OptionsModal = ({ 
  show, 
  onClose, 
  innerRef,
  isAdmin,
  isPostOwner,
  saved,
  saveLoad,
  t,
  onOptionClick,
  onAprove,
  onChatWithAdmin,
  onEditPost // 🔷 RECIBIR LA FUNCIÓN DE EDICIÓN
}) => {
  if (!show) return null;

  // ✅ Función de traducción por defecto mejorada
  const translate = (key) => {
    if (typeof t === 'function') {
      return t(key);
    }
    
    const defaultTranslations = {
      'approvePublication': 'Approve Publication',
      'editPublication': 'Edit Publication',
      'deletePublication': 'Delete Publication',
      'sharePublication': 'Share',
      'contactAdmin': 'Contact Admin',
      'savePublication': 'Save',
      'saved': 'Saved',
      'cancel': 'Cancel',
      'reportPublication': 'Report',
      'chat_with_developer': 'Chat with Developer',
      'install_this_app': 'Install this App',
      'visit_live_app': 'Visit Live App'
    };
    
    return defaultTranslations[key] || key;
  };

  // 🔷 DEBUG: Log para verificar props
  console.log('🔧 OptionsModal Props:', {
    show,
    isAdmin,
    isPostOwner,
    saved,
    hasTFunc: typeof t === 'function'
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.3s ease'
    }}>
      <div
        ref={innerRef}
        style={{
          background: 'white',
          width: '100%',
          maxWidth: '500px',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: '20px 0',
          transform: 'translateY(0)',
          animation: 'slideUp 0.3s ease',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* 🔷 Opciones para admin */}
          {isAdmin && (
            <button
              onClick={onAprove}
              style={{
                background: 'none',
                border: 'none',
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '16px',
                color: '#333',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <span className="material-icons" style={{ color: '#28a745' }}>
                check_circle
              </span>
              {translate('approvePublication')}
            </button>
          )}

          {/* 🔷 Opciones para el dueño del post o admin */}
          {(isPostOwner || isAdmin) && (
            <>
<<<<<<< HEAD
              {/* 🔷 BOTÓN EDITAR - AHORA CON onClick CORRECTO */}
              <button 
                onClick={onEditPost} // 🔷 USA LA FUNCIÓN PASADA COMO PROP
=======
              <button
                onClick={() => {
                  console.log('✏️ Edit option clicked in modal');
                  onOptionClick('edit');
                }}
>>>>>>> 8efc6188e7b3baea2af36cd02c6d92ac9d6d8fbf
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '16px',
                  color: '#333',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background-color 0.2s ease',
                  backgroundColor: 'rgba(255, 193, 7, 0.1)',
                  borderLeft: '3px solid #ffc107'
                }}
<<<<<<< HEAD
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
=======
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 193, 7, 0.2)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 193, 7, 0.1)'}
>>>>>>> 8efc6188e7b3baea2af36cd02c6d92ac9d6d8fbf
              >
                <span className="material-icons" style={{ color: '#ffc107' }}>
                  edit
                </span>
                {translate('editPublication')}
<<<<<<< HEAD
=======
                {isAdmin && !isPostOwner && ' (Admin)'}
>>>>>>> 8efc6188e7b3baea2af36cd02c6d92ac9d6d8fbf
              </button>

              <button
                onClick={() => onOptionClick('delete')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '16px',
                  color: '#e74c3c',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(231, 76, 60, 0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <span className="material-icons" style={{ color: '#e74c3c' }}>
                  delete
                </span>
                {translate('deletePublication')}
              </button>
            </>
          )}

<<<<<<< HEAD
          {/* Resto de opciones... */}
=======
          {/* 🔷 Opciones para todos los usuarios */}
>>>>>>> 8efc6188e7b3baea2af36cd02c6d92ac9d6d8fbf
          <button
            onClick={() => onOptionClick('share')}
            style={{
              background: 'none',
              border: 'none',
              padding: '16px 24px',
              textAlign: 'left',
              fontSize: '16px',
              color: '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <span className="material-icons" style={{ color: '#007bff' }}>
              share
            </span>
            {translate('sharePublication')}
          </button>

          <button
            onClick={onChatWithAdmin}
            style={{
              background: 'none',
              border: 'none',
              padding: '16px 24px',
              textAlign: 'left',
              fontSize: '16px',
              color: '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <span className="material-icons" style={{ color: '#6f42c1' }}>
              admin_panel_settings
            </span>
            {translate('contactAdmin')}
          </button>

          <button
            onClick={() => onOptionClick('save')}
            disabled={saveLoad}
            style={{
              background: 'none',
              border: 'none',
              padding: '16px 24px',
              textAlign: 'left',
              fontSize: '16px',
<<<<<<< HEAD
              color: '#333',
=======
              color: saveLoad ? '#999' : '#333',
>>>>>>> 8efc6188e7b3baea2af36cd02c6d92ac9d6d8fbf
              cursor: saveLoad ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'background-color 0.2s ease',
              opacity: saveLoad ? 0.6 : 1
            }}
            onMouseEnter={(e) => !saveLoad && (e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)')}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <span className="material-icons" style={{ color: saved ? '#ffc107' : '#666' }}>
              {saved ? 'bookmark' : 'bookmark_border'}
            </span>
            {saveLoad ? 'Loading...' : (saved ? translate('saved') : translate('savePublication'))}
          </button>

          {/* Opción reportar para usuarios no propietarios */}
          {!isPostOwner && !isAdmin && (
            <button
              onClick={() => onOptionClick('report')}
              style={{
                background: 'none',
                border: 'none',
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '16px',
                color: '#e74c3c',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(231, 76, 60, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <span className="material-icons" style={{ color: '#e74c3c' }}>
                flag
              </span>
              {translate('reportPublication')}
            </button>
          )}

          <div style={{ padding: '8px 16px', marginTop: '8px' }}>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '16px',
                color: '#333',
                cursor: 'pointer',
                width: '100%',
                fontWeight: '600',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
            >
              {translate('cancel')}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default OptionsModal;