import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '../Avatar';
import Card from 'react-bootstrap/Card';
import {
  FaPlus,
  FaEnvelope,
  FaInfoCircle,
  FaComments,
  FaTools,
  FaShieldAlt,
  FaBlog,
  FaUsers,
  FaClipboardList,
  FaUserCog,
  FaUserSlash,
  FaFlag,
  FaBan,
  FaShoppingCart,
  FaHome,
  FaSignOutAlt,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSearch,
  FaBell,
  FaShareAlt,
  FaGlobe,
  FaCog,
  FaCheckCircle,
} from 'react-icons/fa';

/*
  
  {auth.user && (
             
    <Link
       to="/cart"
       className="position-relative text-decoration-none d-flex align-items-center justify-content-center icon-button"
       style={{
         width: isMobile ? '40px' : '45px',
         height: isMobile ? '40px' : '45px',
         borderRadius: '12px',
         backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(102, 126, 234, 0.1)',
         transition: 'all 0.3s ease'
       }}
     >
       <BsCartFill size={isMobile ? 20 : 22} style={{ color: '#667eea' }} />
       {totalItems > 0 && (
         <Badge
           pill
           style={{
             fontSize: '0.65rem',
             position: 'absolute',
             top: '-2px',
             right: '-2px',
             padding: '4px 7px',
             background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
             border: '2px solid white',
             boxShadow: '0 2px 8px rgba(245, 87, 108, 0.4)'
           }}
         >
           {cart.items?.length > 9 ? '9+' : cart.items?.length || 0}
         </Badge>
       )}
     </Link>
   )}import { BsCartFill } from 'react-icons/bs';
*/




import { Navbar, Container, NavDropdown, Badge } from 'react-bootstrap';


import LanguageSelectorpc from '../LanguageSelectorpc';
import ActivateButton from '../../auth/ActivateButton';
import VerifyModal from '../authAndVerify/VerifyModal';
import DesactivateModal from '../authAndVerify/DesactivateModal';
import MultiCheckboxModal from './MultiCheckboxModal.';
import ShareAppModal from '../shareAppModal';

const Navbar2 = () => {
  const { auth, theme, cart, notify, settings } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { languageReducer } = useSelector(state => state);
  const { t, i18n } = useTranslation('navbar2');
  const lang = languageReducer.language || 'es';
  const [showShareModal, setShowShareModal] = useState(false);
  const [userRole, setUserRole] = useState(auth.user?.role);

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  useEffect(() => {
    if (auth.user?.role && auth.user.role !== userRole) {
      setUserRole(auth.user.role);
    }
  }, [auth.user?.role, userRole]);

  if (!settings) {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand">Cargando...</span>
      </nav>
    );
  }

  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showDeactivatedModal, setShowDeactivatedModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [showNotifyDropdown, setShowNotifyDropdown] = useState(false);

  const notifyDropdownRef = useRef(null);
  const openStatusModal = () => dispatch({ type: GLOBALTYPES.STATUS, payload: true });

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleTheme = () => dispatch({ type: GLOBALTYPES.THEME, payload: !theme });
  const history = useHistory();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifyDropdownRef.current && !notifyDropdownRef.current.contains(event.target)) {
        setShowNotifyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const totalItems = (cart?.items && Array.isArray(cart.items))
    ? cart.items.reduce((acc, item) => acc + (item?.quantity || 0), 0)
    : 0;

  // ✅ VERIFICACIÓN SEGURA DE SETTINGS
  if (!settings || Object.keys(settings).length === 0) {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand">Cargando configuración...</span>
      </nav>
    );
  }
  const unreadNotifications = notify.data.filter(n => !n.isRead).length;

  // Función helper para items del menú
  const MenuItem = ({ icon: Icon, iconColor, to, onClick, children, danger = false }) => (
    <NavDropdown.Item
      as={to ? Link : 'button'}
      to={to}
      onClick={onClick}
      className={`custom-menu-item ${danger ? 'text-danger' : ''}`}
      style={{
        padding: '12px 20px',
        transition: 'all 0.2s ease',
        borderRadius: '8px',
        margin: '2px 8px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500'
      }}
    >
      <Icon className={`me-3`} style={{ color: iconColor, fontSize: '1.1rem' }} />
      <span>{children}</span>
    </NavDropdown.Item>
  );

  return (
    <div>
      <Navbar
        expand="lg"
        style={{
          zIndex: 1030,
          marginTop: isMobile ? '55px' : '0',
          background: settings.style
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          padding: isMobile ? '8px 0' : '12px 0',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)'
        }}
        className={settings.style ? "navbar-dark" : "navbar-light"}
      >
        <Container fluid className="align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link
              to="/"
              className="btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '40px' : '55px',    // 🔷 Más pequeño en móvil
                height: isMobile ? '40px' : '55px',   // 🔷 Más pequeño en móvil
                marginLeft: '8px',
                padding: isMobile ? '2px' : '0',      // 🔷 Más padding en móvil
                marginRight: isMobile ? '6px' : '12px',
                background: 'transparent',
                border: 'none',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
              }}
            >
              <img
                src="/images/logo.png"
                alt="Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
                onError={(e) => {
                  // Fallback con icono más pequeño en móvil
                  e.target.style.display = 'none';
                }}
              />
            </Link>

            <Navbar.Brand href="/" className="py-2 d-none d-lg-block mb-0">
              <Card.Title
                className="mb-0"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}
              >
                {t('appName')}
              </Card.Title>
            </Navbar.Brand>
          </div>

          <div className="d-flex align-items-center" style={{ gap: isMobile ? '12px' : '16px' }}>
            {/* Selector de idioma para desktop */}
            <div className="d-none d-lg-block">
              <LanguageSelectorpc />
            </div>

            {/* Búsqueda */}
            <Link
              to="/search"
              className="text-decoration-none d-flex align-items-center justify-content-center icon-button"
              style={{
                width: isMobile ? '40px' : '45px',
                height: isMobile ? '40px' : '45px',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(102, 126, 234, 0.1)'
              }}
            >
              <FaSearch
                size={isMobile ? 18 : 20}
                style={{ color: '#667eea' }}
                title={t('search')}
              />
            </Link>

            {/* Botón Agregar Post */}
            {(userRole === "Super-utilisateur" || userRole === "admin") && (

              <Link
                to="/createpost"
                className="d-flex align-items-center justify-content-center icon-button text-decoration-none"
                style={{
                  width: isMobile ? '38px' : '42px',
                  height: isMobile ? '38px' : '42px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  flexShrink: 0
                }}
                title={t('addPost')}
              >
                <FaPlus
                  size={isMobile ? 16 : 18}
                  style={{ color: 'white' }}
                />
              </Link>
            )}

            {/* Notificaciones */}
            {auth.user && (
              <div
                className="position-relative d-flex align-items-center justify-content-center icon-button"
                ref={notifyDropdownRef}
                style={{
                  width: isMobile ? '40px' : '45px',
                  height: isMobile ? '40px' : '45px',
                  borderRadius: '12px',
                  backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(102, 126, 234, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <Link to={'/notify'}>
                  <FaBell
                    size={isMobile ? 20 : 22}
                    style={{ color: unreadNotifications > 0 ? '#f5576c' : '#667eea' }}
                    onClick={() => setShowNotifyDropdown(!showNotifyDropdown)}
                  />
                </Link>

                {unreadNotifications > 0 && (
                  <Badge
                    pill
                    style={{
                      fontSize: '0.65rem',
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      padding: '4px 7px',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      border: '2px solid white',
                      boxShadow: '0 2px 8px rgba(245, 87, 108, 0.4)'
                    }}
                  >
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </Badge>
                )}
              </div>
            )}


            {/* Dropdown de usuario */}
            <NavDropdown
              align="end"
              title={
                auth.user ? (
                  <div
                    className="d-flex dropdown-avatar"
                    style={{
                      width: isMobile ? '40px' : '45px',
                      height: isMobile ? '40px' : '45px',
                      borderRadius: '12px',
                      padding: '2px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    <Avatar
                      src={auth.user.avatar}
                      size="medium-avatar"
                      style={{
                        borderRadius: '10px',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: isMobile ? '40px' : '45px',
                      height: isMobile ? '40px' : '45px',
                      borderRadius: '12px',
                      backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(102, 126, 234, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FaUserCircle size={isMobile ? 24 : 28} style={{ color: '#667eea' }} />
                  </div>
                )
              }
              id="nav-user-dropdown"
              className="custom-dropdown"
              key={`nav-role-${userRole}`}
              style={{
                '--bs-dropdown-border-radius': '15px',
                '--bs-dropdown-box-shadow': '0 10px 40px rgba(0,0,0,0.15)'
              }}
            >
              <div
                className="dropdown-scroll-wrapper"
                style={{
                  maxHeight: '70vh',
                  overflowY: 'auto',
                  padding: '8px 0'
                }}
              >
                {auth.user ? (
                  <>
                    {/* Header del usuario */}
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '20px',
                        margin: '0 0 8px 0',
                        borderRadius: '12px 12px 0 0'
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          style={{
                            width: '55px',
                            height: '55px',
                            borderRadius: '50%',
                            border: '3px solid white',
                            padding: '2px',
                            background: 'white'
                          }}
                        >
                          <Avatar src={auth.user.avatar} size="medium-avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-bold text-white" style={{ fontSize: '1.1rem' }}>
                            {auth.user.username}
                          </div>
                          <div
                            style={{
                              fontSize: '0.85rem',
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              display: 'inline-block',
                              marginTop: '4px',
                              color: 'white',
                              fontWeight: '600'
                            }}
                          >
                            {userRole === 'admin' ? '👑 Admin' :
                              userRole === 'Moderateur' ? '🛡️ Moderador' :
                                userRole === 'Super-utilisateur' ? '⭐ Super User' :
                                  '👤 Usuario'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Estado de verificación */}
                    <div style={{ padding: '12px 20px', margin: '0 8px' }}>
                      {auth.user?.isVerified ? (
                        <div
                          style={{
                            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 12px rgba(56, 239, 125, 0.3)'
                          }}
                        >
                          <FaCheckCircle className="me-2" size={18} />
                          {t('verified', 'Cuenta Verificada')}
                        </div>
                      ) : (
                        <ActivateButton onClose={() => console.log("Dropdown cerrado")} />
                      )}
                    </div>

                    <NavDropdown.Divider style={{ margin: '8px 16px' }} />

                    {/* Cambio de idioma en móvil */}
                    <div className="d-lg-none">
                      <MenuItem
                        icon={FaGlobe}
                        iconColor="#667eea"
                        onClick={() => setShowLanguageModal(true)}
                      >
                        {t('changeLanguage')}
                      </MenuItem>
                    </div>

                    {/* Agregar post para super usuarios */}
                    {(userRole === "Super-utilisateur" || userRole === "admin") && (
                      <>
                        <MenuItem
                          icon={FaPlus}
                          iconColor="#667eea"
                          onClick={openStatusModal}
                        >
                          {t('addPost')}
                        </MenuItem>
                        <NavDropdown.Divider style={{ margin: '8px 16px' }} />
                      </>
                    )}



                    <MenuItem icon={FaInfoCircle} iconColor="#6c757d" to="/bloginfo">
                      {t('appInfo')}
                    </MenuItem>

                    <MenuItem icon={FaUserCircle} iconColor="#667eea" to={`/profile/${auth.user._id}`}>
                      {t('profile')}
                    </MenuItem>


                    <NavDropdown.Divider style={{ margin: '8px 16px' }} />

                    <MenuItem icon={FaShareAlt} iconColor="#ffc107" onClick={() => setShowShareModal(true)}>
                      Compartir Aplicación
                    </MenuItem>

                    <NavDropdown.Divider style={{ margin: '8px 16px' }} />

                    <MenuItem icon={FaTools} iconColor="#6c757d" to="/users/roles">
                      {t('roles')}
                    </MenuItem>

                    {/* Panel de Admin */}
                    {userRole === "admin" && (
                      <>
                        <NavDropdown.Divider style={{ margin: '8px 16px' }} />

                        <div
                          style={{
                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                            padding: '12px 20px',
                            margin: '4px 16px 8px 16px',
                            borderRadius: '10px',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)'
                          }}
                        >
                          <FaShieldAlt className="me-2" size={18} />
                          {t('adminPanel', 'Panel de Administración')}
                        </div>

                        <MenuItem icon={FaCog} iconColor="#6c757d" to="/users/privacidad">
                          Ajustes de privacidad
                        </MenuItem>

                        <MenuItem icon={FaCog} iconColor="#6c757d" onClick={() => setShowFeaturesModal(true)}>
                          Configuración global
                        </MenuItem>

                        <MenuItem icon={FaBlog} iconColor="#667eea" to="/blog">
                          {t('blog')}
                        </MenuItem>

                        <MenuItem icon={FaEnvelope} iconColor="#17a2b8" to="/mails">
                          {t('adminSendEmail')}
                        </MenuItem>

                        <MenuItem icon={FaUsers} iconColor="#28a745" to="/users">
                          {t('users')}
                        </MenuItem>

                        <MenuItem icon={FaClipboardList} iconColor="#ffc107" to="/postspendientes">
                          {t('pendingPosts')}
                        </MenuItem>

                        <MenuItem icon={FaUserCog} iconColor="#667eea" to="/usersactionn">
                          {t('userActions')}
                        </MenuItem>

                        <MenuItem icon={FaUserSlash} iconColor="#dc3545" to="/listuserbloque">
                          {t('blockedUsersList')}
                        </MenuItem>

                        <MenuItem icon={FaFlag} iconColor="#ff6b6b" to="/listausariosdenunciadoss">
                          {t('usariosdenunciados')}
                        </MenuItem>

                        <MenuItem icon={FaBan} iconColor="#6c757d" to="/bloqueos">
                          {t('estadodeusuariosrespectoalbloqueo')}
                        </MenuItem>


                      </>
                    )}

                    <NavDropdown.Divider style={{ margin: '8px 16px' }} />

                    {/* Tema y Logout */}
                    <MenuItem
                      icon={theme ? () => <span style={{ fontSize: '1.2rem' }}>🌞</span> : () => <span style={{ fontSize: '1.2rem' }}>🌙</span>}
                      iconColor="#ffc107"
                      onClick={toggleTheme}
                    >
                      {theme ? t('lightMode') : t('darkMode')}
                    </MenuItem>

                    <MenuItem
                      icon={FaSignOutAlt}
                      iconColor="#dc3545"
                      onClick={handleLogout}
                      danger
                    >
                      <span className="fw-bold">{t('logout')}</span>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem icon={FaSignInAlt} iconColor="#28a745" to="/login">
                      {t('login')}
                    </MenuItem>
                    <MenuItem icon={FaUserPlus} iconColor="#667eea" to="/register">
                      {t('register')}
                    </MenuItem>
                    <MenuItem icon={FaInfoCircle} iconColor="#6c757d" to="/bloginfo">
                      {t('appInfo')}
                    </MenuItem>
                    <MenuItem icon={FaInfoCircle} iconColor="#6c757d" to="/infoaplicacionn">
                      {t('appInfo')}
                    </MenuItem>

                    <MenuItem icon={FaShareAlt} iconColor="#ffc107" onClick={() => setShowShareModal(true)}>
                      Compartir Aplicación
                    </MenuItem>
                  </>
                )}
              </div>
            </NavDropdown>
          </div>
        </Container>
      </Navbar>

      {/* CSS personalizado */}
      <style jsx>{`
        .icon-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3) !important;
        }

        .custom-menu-item:hover {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%) !important;
          transform: translateX(4px);
        }

        .custom-menu-item.text-danger:hover {
          background: linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%) !important;
        }

        .dropdown-scroll-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .dropdown-scroll-wrapper::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .dropdown-scroll-wrapper::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }

        .dropdown-menu {
          border: none !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15) !important;
        }
      `}</style>

      {/* Modal de idioma */}
      {showLanguageModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          onClick={() => setShowLanguageModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: '15px', border: 'none' }}>
              <div
                className="modal-header"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '15px 15px 0 0'
                }}
              >
                <h5 className="modal-title fw-bold">
                  <FaGlobe className="me-2" />
                  {t('selectLanguage', 'Seleccionar Idioma')}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowLanguageModal(false)}
                ></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modales */}
      <VerifyModal
        show={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
      />

      <DesactivateModal
        show={showDeactivatedModal}
        onClose={() => setShowDeactivatedModal(false)}
      />

      <MultiCheckboxModal
        show={showFeaturesModal}
        onClose={() => setShowFeaturesModal(false)}
      />

      <ShareAppModal
        show={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
};

export default Navbar2;