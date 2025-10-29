import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import Carousel from '../../Carousel';
import { likePost, unLikePost, savePost, unSavePost, deletePost } from '../../../redux/actions/postAction';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import ShareModal from '../../ShareModal';
import VerifyModal from '../../authAndVerify/VerifyModal';
import DesactivateModal from '../../authAndVerify/DesactivateModal';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import moment from 'moment';

const CardBodyCarousel = ({ post }) => {
  const { languageReducer, auth, socket } = useSelector((state) => state);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showDeactivatedModal, setShowDeactivatedModal] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const optionsModalRef = useRef(null);

  const { t } = useTranslation(['cardbodycarousel', 'common']);
  const lang = languageReducer.language || 'en';
  const history = useHistory();
  const location = useLocation(); // NUEVO: Para detectar la ruta actual
  const dispatch = useDispatch();

  const [showInfo, setShowInfo] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  // NUEVO: Detectar si estamos en la página detailPost
  const isDetailPage = location.pathname.includes('/post/');

  // Verificar si el usuario es el dueño del post o es admin
  const isPostOwner = auth.user && post.user && auth.user._id === post.user._id;
  const isAdmin = auth.user && auth.user.role === 'admin';

  // Handlers para mostrar/ocultar información
  const handleImageClick = () => {
    if (!isDetailPage) {
      setShowInfo(prev => !prev);
    }
  };

  const handleTouchStart = () => {
    if (!isDetailPage) {
      setIsTouching(true);
    }
  };

  const handleTouchEnd = () => {
    if (!isDetailPage) {
      setIsTouching(false);
      setTimeout(() => setShowInfo(prev => !prev), 100);
    }
  };

  const canProceed = () => {
    if (!auth.token || !auth.user) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  // Función para mostrar alertas
  const showAlert = (message, variant = 'info') => {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { [variant]: message }
    });
  };

  // LÓGICA DE ELIMINACIÓN DE POST
  const handleDeletePost = async () => {
    if (!auth.user) {
      setShowModal(true);
      return;
    }

    if (!isPostOwner && !isAdmin) {
      showAlert(t('no_permission_delete'), 'warning');
      return;
    }

    try {
      setShowDeleteModal(false);
      showAlert(t('deleting_post'), 'info');

      await dispatch(deletePost({ post, auth }));
      showAlert(t('post_deleted_success'), 'success');

      setTimeout(() => {
        history.push('/');
      }, 1500);

    } catch (error) {
      console.error('Error eliminando publicación:', error);
      showAlert(t('error_deleting_post'), 'danger');
    }
  };

  const handleDeleteClick = (e) => {
    e?.stopPropagation();

    if (!auth.user) {
      setShowModal(true);
      return;
    }

    if (!isPostOwner && !isAdmin) {
      showAlert(t('no_permission_delete'), 'warning');
      return;
    }

    setShowDeleteModal(true);
  };

  // LÓGICA DE EDICIÓN DE POST
  const handleEditPost = (e) => {
    e?.stopPropagation();

    if (!auth.user) {
      setShowModal(true);
      return;
    }

    if (!isPostOwner && !isAdmin) {
      showAlert(t('no_permission_edit'), 'warning');
      return;
    }

    // Navegar a la página de edición con los datos del post
    history.push('/createpost', {
      isEdit: true,
      postData: {
        ...post,
        title: post.title || '',
        description: post.description || post.content || '',
        images: post.images || [],
        category: post.category || 'Agence de Voyage',
        subCategory: post.subCategory || '',
        price: post.price || '',
        wilaya: post.wilaya || '',
        commune: post.commune || '',
        contacto: post.contacto || '',
        datedepar: post.datedepar || '',
        destinacionvoyage1: post.destinacionvoyage1 || '',
        destinacionhadj: post.destinacionhadj || '',
        duracionviaje: post.duracionviaje || '',
        transporte: post.transporte || '',
      }
    });
  };

  useEffect(() => {
    if (auth.user && post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user]);

  useEffect(() => {
    if (auth.user?.saved?.includes(post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user, post._id]);

  const handleLike = async () => {
    if (!canProceed()) return;
    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket, t, languageReducer }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (!canProceed()) return;
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket, t, languageReducer }));
    setLoadLike(false);
  };

  const handleSavePost = async () => {
    if (!canProceed()) return;
    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (!canProceed()) return;
    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title || t('default_share_title'),
        text: post.content || t('default_share_text'),
        url: window.location.href,
      })
        .catch((error) => console.log('Error sharing', error));
    } else {
      setShowShareOptions(true);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', options);
  };

  // MODAL DE OPCIONES MEJORADO CON BOTONES DIRECTOS
  const OptionsModal = () => {
    if (!showOptionsModal) return null;

    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(10px)"
      }}>
        <div
          ref={optionsModalRef}
          style={{
            background: "white",
            width: "100%",
            maxWidth: "500px",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            padding: "20px 0",
            transform: "translateY(0)",
            animation: "slideUp 0.3s ease",
            boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)"
          }}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}>
            {/* BOTÓN DE EDITAR - SOLO PARA DUEÑO O ADMIN */}
            {(isPostOwner || isAdmin) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditPost(e);
                  setShowOptionsModal(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "16px",
                  color: "#333",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background-color 0.2s ease",
                  backgroundColor: "rgba(255, 193, 7, 0.1)",
                  borderLeft: "3px solid #ffc107"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255, 193, 7, 0.2)"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(255, 193, 7, 0.1)"}
              >
                <span className="material-icons" style={{ color: "#ffc107" }}>
                  edit
                </span>
                {isAdmin && !isPostOwner ? t('edit_post_admin') : t('edit_post')}
              </button>
            )}

            {/* BOTÓN DE ELIMINAR - SOLO PARA DUEÑO O ADMIN */}
            {(isPostOwner || isAdmin) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(e);
                  setShowOptionsModal(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "16px",
                  color: "#e74c3c",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background-color 0.2s ease"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(231, 76, 60, 0.1)"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                <span className="material-icons" style={{ color: "#e74c3c" }}>
                  delete
                </span>
                {isAdmin && !isPostOwner ? t('delete_post_admin') : t('delete_post')}
              </button>
            )}

            {/* BOTÓN DE COMPARTIR - PARA TODOS */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
                setShowOptionsModal(false);
              }}
              style={{
                background: "none",
                border: "none",
                padding: "16px 24px",
                textAlign: "left",
                fontSize: "16px",
                color: "#333",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "background-color 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.05)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              <span className="material-icons" style={{ color: "#007bff" }}>
                share
              </span>
              {t('share')}
            </button>

            {/* BOTÓN DE GUARDAR - PARA USUARIOS AUTENTICADOS */}
            {auth.user && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  saved ? handleUnSavePost() : handleSavePost();
                  setShowOptionsModal(false);
                }}
                disabled={saveLoad}
                style={{
                  background: "none",
                  border: "none",
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "16px",
                  color: saveLoad ? "#999" : "#333",
                  cursor: saveLoad ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background-color 0.2s ease",
                  opacity: saveLoad ? 0.6 : 1
                }}
                onMouseEnter={(e) => !saveLoad && (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.05)")}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                <span className="material-icons" style={{ color: saved ? "#ff8c00" : "#666" }}>
                  {saved ? 'bookmark' : 'bookmark_border'}
                </span>
                {saveLoad ? t('saving') : (saved ? t('saved') : t('save'))}
              </button>
            )}

            {/* BOTÓN DE REPORTAR - PARA USUARIOS NO PROPIETARIOS */}
            {!isPostOwner && !isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showAlert(t('post_reported'), 'info');
                  setShowOptionsModal(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "16px",
                  color: "#e74c3c",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background-color 0.2s ease"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(231, 76, 60, 0.1)"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                <span className="material-icons" style={{ color: "#e74c3c" }}>
                  flag
                </span>
                {t('report_post')}
              </button>
            )}

            {/* BOTÓN DE CERRAR */}
            <div style={{ padding: "8px 16px", marginTop: "8px" }}>
              <button
                onClick={() => setShowOptionsModal(false)}
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                  border: "none",
                  padding: "16px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  color: "#333",
                  cursor: "pointer",
                  width: "100%",
                  fontWeight: "600",
                  transition: "background-color 0.2s ease"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.05)"}
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div>
      <div className="card_body">
        {post.images.length > 0 && (
          <div
            className="carousel-container"
            style={{
              position: "relative",
              height: "400px",
              maxHeight: "80vh",
              overflow: 'hidden',
              cursor: isDetailPage ? 'default' : 'pointer'
            }}
            onClick={handleImageClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* NUEVO: Contenedor de textos en la parte superior izquierda */}
            <div style={{
              position: "absolute",
              top: "1px",
              left: "1px",
              zIndex: 10,
              background: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              padding: "4px 4px",
              color: "white",
              maxWidth: "65%",
              minWidth: "200px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
            }}>
              {/* Primera fila: Nombre de la agencia decorado */}
              <div style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "4px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Playfair Display', serif",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)"
              }}>
                ⭐ {post.category} ⭐
              </div>

              {/* Segunda fila: Subcategoría */}
              <div style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px",
                color: "#ffd700",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}>
                <span className="material-icons" style={{ fontSize: "16px" }}>
                  category
                </span>
                {post.subCategory || t('default_category')}
              </div>

              {/* Tercera fila: Destinos y fecha */}
              <div style={{
                fontSize: "12px",
                lineHeight: "1.4",
                color: "#f0f0f0"
              }}>
                {/* Mostrar los destinos disponibles */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "4px" }}>
                  {post.destinacionvoyage1 && (
                    <span style={{
                      background: "rgba(76, 175, 80, 0.3)",
                      padding: "2px 6px",
                      borderRadius: "8px",
                      border: "1px solid rgba(76, 175, 80, 0.5)"
                    }}>
                      🛫 {post.destinacionvoyage1}
                    </span>
                  )}
                  {post.destinacionvoyage2 && (
                    <span style={{
                      background: "rgba(33, 150, 243, 0.3)",
                      padding: "2px 6px",
                      borderRadius: "8px",
                      border: "1px solid rgba(33, 150, 243, 0.5)"
                    }}>
                      ✈️ {post.destinacionvoyage2}
                    </span>
                  )}
                  {post.destinacionhadj && (
                    <span style={{
                      background: "rgba(156, 39, 176, 0.3)",
                      padding: "2px 6px",
                      borderRadius: "8px",
                      border: "1px solid rgba(156, 39, 176, 0.5)"
                    }}>
                      🕋 {post.destinacionhadj}
                    </span>
                  )}
                  
                  {post.datedepar && (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "11px",
                      color: "#ffa726",
                      fontWeight: "500"
                    }}>
                      <span className="material-icons" style={{ fontSize: "14px" }}>
                        calendar_today
                      </span>
                      {formatDate(post.datedepar)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botón de tres puntos (parte superior derecha) - OCULTO EN DETAILPAGE */}
            {!isDetailPage && (
              <div style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 10,
                opacity: showInfo ? 1 : 0.8,
                transition: 'opacity 0.3s ease'
              }}>
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "50%",
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOptionsModal(true);
                  }}
                >
                  <span className="material-icons" style={{
                    fontSize: "18px",
                    color: "white"
                  }}>
                    more_vert
                  </span>
                </div>
              </div>
            )}

            {/* Botón de edición (solo en detailPage para dueño o admin) */}
            {isDetailPage && (isPostOwner || isAdmin) && (
              <div style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 10
              }}>
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "rgba(255, 193, 7, 0.8)",
                    borderRadius: "50%",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 4px 12px rgba(255, 193, 7, 0.4)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.backgroundColor = "rgba(255, 193, 7, 0.9)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.backgroundColor = "rgba(255, 193, 7, 0.8)";
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditPost(e);
                  }}
                >
                  <span className="material-icons" style={{
                    fontSize: "20px",
                    color: "white"
                  }}>
                    edit
                  </span>
                </div>
              </div>
            )}

            {/* Información del artista (ocultable con animación) - OCULTA EN DETAILPAGE */}
            {!isDetailPage && (
              <div style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                zIndex: 2,
                color: "white",
                background: showInfo
                  ? "linear-gradient(transparent 0%, rgba(0, 0, 0, 0.8) 100%)"
                  : "transparent",
                padding: showInfo ? "16px 12px 12px 12px" : "0px 12px",
                backdropFilter: showInfo ? "blur(10px)" : "none",
                borderTop: showInfo ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                height: showInfo ? "auto" : "0px",
                opacity: showInfo ? 1 : 0,
                transform: showInfo ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                overflow: 'hidden'
              }}>
                {/* Primera línea: Usuario y fecha */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: showInfo ? "8px" : "0px",
                  transition: 'margin-bottom 0.3s ease'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: "clamp(14px, 2vh, 18px)",
                      fontWeight: "bold",
                      marginBottom: "2px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      opacity: showInfo ? 1 : 0,
                      transform: showInfo ? 'translateX(0)' : 'translateX(-10px)',
                      transition: 'all 0.3s ease 0.1s'
                    }}>
                      <span>{post?.title || t('default_category')}</span>
                      {post.user?.isVerified && (
                        <span className="material-icons" style={{
                          fontSize: "16px",
                          color: "#0095f6"
                        }}>
                          verified
                        </span>
                      )}
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "clamp(10px, 1.5vh, 12px)",
                      opacity: showInfo ? 0.9 : 0,
                      transform: showInfo ? 'translateX(0)' : 'translateX(-10px)',
                      transition: 'all 0.3s ease 0.15s'
                    }}>
                      <span className="material-icons" style={{ fontSize: "12px" }}>
                        schedule
                      </span>
                      <span>{moment(post.createdAt).fromNow()}</span>
                    </div>
                  </div>

                  {/* Botón Más Detalles */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/post/${post._id}`);
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "clamp(10px, 1.5vh, 12px)",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)",
                      opacity: showInfo ? 1 : 0,
                      transform: showInfo ? 'translateX(0)' : 'translateX(10px)',
                      transition: 'all 0.3s ease 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.3)";
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.2)";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    <span>{t('details')}</span>
                    <span className="material-icons" style={{ fontSize: "14px" }}>
                      arrow_forward
                    </span>
                  </button>
                </div>

                {/* Título de la obra */}
                {post.title && (
                 
                 
                 <div style={{
                    fontSize: "clamp(12px, 1.5vh, 14px)",
                    opacity: showInfo ? 0.95 : 0,
                    lineHeight: "1.3",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginTop: showInfo ? "4px" : "0px",
                    transform: showInfo ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.3s ease 0.25s'
                  }}>
                <strong className='text-warning'>Départ: </strong>   {post.commune} : {post.wilaya}
                  </div>
                )}
              </div>
            )}

            {/* Indicador visual cuando la información está oculta - OCULTO EN DETAILPAGE */}
            {!isDetailPage && !showInfo && (
              <div style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "4px 12px",
                borderRadius: "15px",
                fontSize: "11px",
                fontWeight: "500",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                animation: "pulse 2s infinite",
                cursor: "pointer"
              }}>
                <span className="material-icons" style={{
                  fontSize: "14px",
                  marginRight: "4px"
                }}>
                  touch_app
                </span>
                {t('tap_to_see_info')}
              </div>
            )}

            {/* Contenedor de iconos al estilo TikTok (derecha) - OCULTO EN DETAILPAGE */}
            {!isDetailPage && (
              <div style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "clamp(6px, 2vh, 16px)",
                justifyContent: "center",
                maxHeight: "calc(100% - 140px)",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}>
                {/* Botón de like */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px"
                }}>
                  <div
                    style={{
                      cursor: "pointer",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: loadLike ? 0.7 : 1,
                      width: "clamp(32px, 5vh, 40px)",
                      height: "clamp(32px, 5vh, 40px)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    onClick={(e) => {
                      e.stopPropagation();
                      isLike ? handleUnLike() : handleLike();
                    }}
                  >
                    <span
                      className="material-icons"
                      style={{
                        fontSize: "clamp(18px, 3vh, 24px)",
                        color: isLike ? "#F91880" : "white"
                      }}
                    >
                      {loadLike ? "hourglass_empty" : "favorite"}
                    </span>
                  </div>
                  <span style={{
                    fontSize: "clamp(10px, 1.5vh, 12px)",
                    fontWeight: "bold",
                    color: "white",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.7)"
                  }}>
                    {post.likes.length}
                  </span>
                </div>

                {/* Botón de guardar */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px"
                }}>
                  <div
                    style={{
                      cursor: "pointer",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "clamp(32px, 5vh, 40px)",
                      height: "clamp(32px, 5vh, 40px)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    onClick={(e) => {
                      e.stopPropagation();
                      saved ? handleUnSavePost() : handleSavePost();
                    }}
                  >
                    <span
                      className="material-icons"
                      style={{
                        fontSize: "clamp(18px, 3vh, 24px)",
                        color: saved ? "#ff8c00" : "white",
                        opacity: saveLoad ? 0.5 : 1
                      }}
                    >
                      {saveLoad ? "hourglass_empty" : "bookmark"}
                    </span>
                  </div>
                </div>

                {/* Contador de vistas */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px"
                }}>
                  <div style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "clamp(32px, 5vh, 40px)",
                    height: "clamp(32px, 5vh, 40px)"
                  }}>
                    <span className="material-icons" style={{
                      fontSize: "clamp(18px, 3vh, 24px)",
                      color: "white"
                    }}>
                      visibility
                    </span>
                  </div>
                  <span style={{
                    fontSize: "clamp(10px, 1.5vh, 12px)",
                    fontWeight: "bold",
                    color: "white",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.7)"
                  }}>
                    {post.views || 0}
                  </span>
                </div>

                {/* Botón de compartir */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px"
                }}>
                  <div
                    style={{
                      cursor: "pointer",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "clamp(32px, 5vh, 40px)",
                      height: "clamp(32px, 5vh, 40px)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare();
                    }}
                  >
                    <span className="material-icons" style={{
                      fontSize: "clamp(18px, 3vh, 24px)",
                      color: "white"
                    }}>
                      share
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Carousel */}
            <div className="card" style={{ height: "100%" }}>
              <div
                className="card__image"
                onClick={(e) => {
                  if (!isDetailPage) {
                    e.stopPropagation();
                    history.push(`/post/${post._id}`);
                  }
                }}
                style={{
                  height: "100%",
                  cursor: isDetailPage ? 'default' : 'pointer'
                }}
              >
                <div style={{ height: "100%" }}>
                  <Carousel images={post.images} id={post._id} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de opciones con botones directos - OCULTO EN DETAILPAGE */}
      {!isDetailPage && <OptionsModal />}

      {/* Los modales restantes se mantienen igual */}
      {showDeleteModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            maxWidth: "400px",
            width: "90vw",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
          }}>
            <div style={{
              fontSize: "48px",
              color: "#e74c3c",
              marginBottom: "20px"
            }}>
              <span className="material-icons">delete_forever</span>
            </div>

            <h3 style={{
              marginBottom: "15px",
              color: "#2c3e50",
              fontWeight: "700"
            }}>
              {t('confirm_delete')}
            </h3>

            <p style={{
              marginBottom: "25px",
              color: "#7f8c8d",
              lineHeight: "1.5"
            }}>
              {t('delete_confirmation_message')}
            </p>

            <div style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center"
            }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: "12px 24px",
                  background: "rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "#2c3e50",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(0, 0, 0, 0.05)";
                }}
              >
                {t('cancel')}
              </button>

              <button
                onClick={handleDeletePost}
                style={{
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "white",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(231, 76, 60, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                {t('delete_post')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de compartir */}
      {showShareOptions && (
        <div className="modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content" style={{ width: '300px', borderRadius: '12px' }}>
            <h3>{t('share_post')}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
              <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <span className="material-icons" style={{ color: 'white' }}>chat</span>
                </div>
                <p>WhatsApp</p>
              </div>
              <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <span className="material-icons" style={{ color: 'white' }}>facebook</span>
                </div>
                <p>Facebook</p>
              </div>
              <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#1DA1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <span className="material-icons" style={{ color: 'white' }}>flutter_dash</span>
                </div>
                <p>Twitter</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => setShowShareOptions(false)}
                style={{ padding: '8px 16px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '20px', cursor: 'pointer' }}
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de autenticación */}
      {showModal && (
        <div className="modal">
          <div className="modal-content" style={{ position: 'relative' }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '1.8rem',
                color: '#333',
                cursor: 'pointer',
                fontWeight: 'bold',
                lineHeight: '1',
              }}
              aria-label={t('close')}
            >
              ×
            </button>

            <h4>{t("title2", { lng: languageReducer.language })}</h4>
            <p>{t("message2", { lng: languageReducer.language })}</p>
            <div className="modal-buttons">
              <button onClick={() => history.push("/login")}>
                {t("login2", { lng: languageReducer.language })}
              </button>
              <button onClick={() => history.push("/register")}>
                {t("register2", { lng: languageReducer.language })}
              </button>
              <button onClick={() => setShowModal(false)}>
                {t("close2", { lng: languageReducer.language })}
              </button>
            </div>
          </div>
        </div>
      )}

      {showVerifyModal && (
        <VerifyModal show={showVerifyModal} onClose={() => setShowVerifyModal(false)} />
      )}
      <DesactivateModal show={showDeactivatedModal} onClose={() => setShowDeactivatedModal(false)} />
    </div>
  );
};

export default React.memo(CardBodyCarousel);