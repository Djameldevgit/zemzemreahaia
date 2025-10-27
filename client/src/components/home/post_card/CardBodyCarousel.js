import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Row, 
  Col, 
  Badge,
  OverlayTrigger,
  Tooltip,
  Dropdown,
  Alert,
  Modal
} from 'react-bootstrap';
import LikeButton from '../../LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, unLikePost, savePost, unSavePost, updatePost, deletePost } from '../../../redux/actions/postAction';
import Carousel from '../../Carousel';
import AuthModalAddLikesCommentsSave from '../../AuthModalAddLikesCommentsSave';
import CommentsModal from './CommentsModal';
import ShareModal from '../../ShareModal';
import { BASE_URL } from '../../../utils/config';
import { MESS_TYPES } from '../../../redux/actions/messageAction';
import { useTranslation } from 'react-i18next';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';

const CardBodyCarousel = ({ post, hideCard = false }) => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation(['descripcion']);
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const { auth, socket, theme } = useSelector(state => state);
    const [saved, setSaved] = useState(false);
    const [saveLoad, setSaveLoad] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [showDownloadAlert, setShowDownloadAlert] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [showCustomAlert, setShowCustomAlert] = useState(false);
    const [customAlertMessage, setCustomAlertMessage] = useState('');
    const [customAlertVariant, setCustomAlertVariant] = useState('info');
    const [isInstallingPWA, setIsInstallingPWA] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Detectar si estamos en la página de detalle del post
    const isDetailPage = location.pathname === `/post/${post._id}`;
    
    // Detectar si es RTL (árabe)
    const isRTL = i18n.language === 'ar';
    const getIconClass = (iconName) => {
        return isRTL ? `${iconName} ms-2` : `${iconName} me-2`;
    };
    const getFlexClass = () => isRTL ? 'flex-row-reverse' : 'flex-row';

    // 🔷 VERIFICAR SI EL USUARIO PUEDE EDITAR/ELIMINAR EL POST
    const canEditPost = auth.user && (
        auth.user._id === post.user?._id || 
        auth.user.role === "admin"
    );

    const canDeletePost = auth.user && (
        auth.user._id === post.user?._id || 
        auth.user.role === "admin"
    );

    // 🔷 SISTEMA DE ESTILOS MEJORADO
    const styles = {
        card: {
            background: theme 
                ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            overflow: 'hidden',
            border: theme 
                ? '1px solid rgba(255, 255, 255, 0.1)' 
                : '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: theme 
                ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
                : '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        },
        primaryButton: {
            display: 'block',
            width: '100%',
            fontWeight: '700',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
            backgroundSize: '200% 100%',
            fontSize: '1.1rem',
            padding: '18px 24px',
            transition: 'all 0.4s ease',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            letterSpacing: '0.5px'
        },
        iconContainer: {
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: theme 
                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)' 
                : 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: theme 
                ? '1px solid rgba(255, 255, 255, 0.15)' 
                : '1px solid rgba(102, 126, 234, 0.2)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
        },
        interactionButton: {
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        }
    };

    // 🔷 SISTEMA DE ICONOS MEJORADO
    const getEnhancedIcon = (iconType, options = {}) => {
        const { size = 'default', color = 'default', animation = false } = options;
        
        const sizeMap = {
            small: '0.9rem',
            default: '1.2rem',
            large: '1.5rem',
            xlarge: '2rem'
        };

        const colorMap = {
            default: theme ? '#fff' : '#333',
            primary: '#667eea',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
        };

        const iconStyle = {
            fontSize: sizeMap[size],
            color: colorMap[color],
            background: color === 'gradient' ? colorMap.gradient : 'transparent',
            WebkitBackgroundClip: color === 'gradient' ? 'text' : 'initial',
            WebkitTextFillColor: color === 'gradient' ? 'transparent' : 'initial',
            animation: animation ? 'pulse 2s infinite' : 'none',
            filter: theme && color !== 'gradient' ? 'brightness(1.2)' : 'none'
        };

        const icons = {
            eye: 'fas fa-eye',
            calendar: 'far fa-calendar-alt',
            location: 'fas fa-map-marker-alt',
            building: 'fas fa-building',
            plane: 'fas fa-plane',
            rocket: 'fas fa-rocket',
            external: 'fas fa-external-link-alt',
            edit: 'fas fa-edit',
            trash: 'fas fa-trash-alt',
            comments: 'fas fa-comments',
            info: 'fas fa-info-circle',
            flag: 'fas fa-flag',
            share: 'fas fa-share-alt',
            bookmark: saved ? 'fas fa-bookmark' : 'far fa-bookmark',
            heart: isLike ? 'fas fa-heart' : 'far fa-heart',
            spinner: 'fas fa-spinner fa-spin',
            ellipsis: 'fas fa-ellipsis-h'
        };

        return (
            <i 
                className={icons[iconType]} 
                style={iconStyle}
            />
        );
    };

    // 🔷 COMPONENTE DE BOTÓN MEJORADO
    const EnhancedButton = ({ 
        children, 
        onClick, 
        icon = null,
        disabled = false,
        fullWidth = true
    }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <Button
                variant="primary"
                className={`${fullWidth ? 'w-100' : ''} position-relative overflow-hidden border-0`}
                onClick={onClick}
                disabled={disabled}
                style={{
                    ...styles.primaryButton,
                    transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                    boxShadow: isHovered 
                        ? '0 15px 35px rgba(102, 126, 234, 0.4)' 
                        : '0 8px 25px rgba(102, 126, 234, 0.3)',
                    backgroundPosition: isHovered ? '100% 0' : '0 0'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Efecto de brillo en hover */}
                {isHovered && (
                    <div 
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                            animation: 'shimmer 1.5s ease-in-out'
                        }}
                    />
                )}
                
                <div className="d-flex align-items-center justify-content-center position-relative z-2">
                    {icon && (
                        <span className={isRTL ? 'ms-3' : 'me-3'}>
                            {getEnhancedIcon(icon, { size: 'default' })}
                        </span>
                    )}
                    <span className="fw-bold text-white">{children}</span>
                </div>
            </Button>
        );
    };

    // 🔷 NUEVA FUNCIÓN: Eliminar post
    const handleDeletePost = async () => {
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        if (!canDeletePost) {
            showAlert(t('not_authorized_delete'), 'warning');
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
            console.error('Error deleting post:', error);
            showAlert(t('error_deleting_post'), 'danger');
        }
    };

    // 🔷 NUEVA FUNCIÓN: Abrir modal de confirmación para eliminar
    const handleDeleteClick = (e) => {
        e?.stopPropagation();
        
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        if (!canDeletePost) {
            showAlert(t('not_authorized_delete'), 'warning');
            return;
        }

        setShowDeleteModal(true);
    };

    // 🔷 Función para formatear fecha
    const formatTravelDate = () => {
        if (post.datedepar) {
            return new Date(post.datedepar).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
        return null;
    };

    const travelDate = formatTravelDate();

    // Resto del código existente (useEffects y funciones) se mantiene igual...
    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    // Likes
    useEffect(() => {
        if (post.likes.find(like => like._id === auth.user?._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [post.likes, auth.user?._id]);

    const handleLike = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(likePost({ post, auth, socket }));
        setLoadLike(false);
    };

    const handleUnLike = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(unLikePost({ post, auth, socket }));
        setLoadLike(false);
    };

    // Saved
    useEffect(() => {
        if (auth.user?.saved.find(id => id === post._id)) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [auth.user?.saved, post._id]);

    const handleSavePost = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(savePost({ post, auth }));
        setSaveLoad(false);
    };

    const handleUnSavePost = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(unSavePost({ post, auth }));
        setSaveLoad(false);
    };

    const redirectToLogin = () => {
        history.push('/login');
        setShowAuthModal(false);
    };

    const redirectToRegister = () => {
        history.push('/register');
        setShowAuthModal(false);
    };

    const closeModal = () => setShowAuthModal(false);

    const handleViewDetails = () => {
        history.push(`/post/${post._id}`);
    };

    // 🔷 FUNCIÓN PARA MOSTRAR ALERTAS PERSONALIZADAS
    const showAlert = (message, variant = 'info') => {
        setCustomAlertMessage(message);
        setCustomAlertVariant(variant);
        setShowCustomAlert(true);
        setTimeout(() => {
            setShowCustomAlert(false);
        }, 3000);
    };

    // 🔷 LÓGICA MEJORADA PARA CHAT CON EL DUEÑO
    const handleAddUser = useCallback((user) => {
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } });
        history.push(`/message/${user._id}`);
    }, [auth.user, dispatch, history]);

    const handleChatWithOwner = (e) => {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        if (auth.user._id === post.user?._id) {
            showAlert(t('cannot_chat_yourself'), 'warning');
            return;
        }

        handleAddUser(post.user);

        if (socket) {
            socket.emit('createConversation', {
                recipients: [post.user?._id, auth.user._id],
                postId: post._id,
                sender: auth.user
            });
        }
    };

    const handleVisitApp = (e) => {
        e?.stopPropagation();
        const appLink = post.link || post.productionUrl;
        
        if (appLink) {
            const finalUrl = appLink.startsWith('http') ? appLink : `https://${appLink}`;
            window.open(finalUrl, '_blank', 'noopener,noreferrer');
            
            if (window.gtag) {
                window.gtag('event', 'visit_app', {
                    'event_category': 'engagement',
                    'event_label': post.title,
                    'post_id': post._id
                });
            }
            
            showAlert(t('redirecting_to_app'), 'success');
        } else {
            showAlert(t('no_app_link'), 'warning');
        }
    };

    const handleInstallPostPWA = async (e) => {
        e?.stopPropagation();
        
        if (isInstallingPWA) return;
        
        setIsInstallingPWA(true);

        const appLink = post.link || post.productionUrl;
        
        if (!appLink) {
            showAlert(t('no_app_link_available'), 'warning');
            setIsInstallingPWA(false);
            return;
        }

        try {
            const currentOrigin = window.location.origin;
            const targetOrigin = new URL(appLink).origin;
            
            if (currentOrigin === targetOrigin) {
                showAlert(t('cannot_install_current_app'), 'info');
                setIsInstallingPWA(false);
                return;
            }
        } catch (error) {
            console.error('Error parsing URL:', error);
        }

        try {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                
                const { outcome } = await deferredPrompt.userChoice;
                
                if (outcome === 'accepted') {
                    showAlert(t('pwa_install_started'), 'success');
                } else {
                    showAlert(t('pwa_install_declined'), 'info');
                }
                
                setDeferredPrompt(null);
            } else {
                const newWindow = window.open(appLink, '_blank', 'noopener,noreferrer');
                
                if (newWindow) {
                    showAlert(t('opening_app_for_installation'), 'success');
                    
                    setTimeout(() => {
                        if (newWindow && !newWindow.closed) {
                            newWindow.close();
                            showAlert(t('pwa_install_guide'), 'info');
                        }
                    }, 8000);
                } else {
                    showAlert(t('popup_blocked'), 'warning');
                    window.open(appLink, '_blank', 'noopener,noreferrer');
                    showAlert(t('check_browser_menu'), 'info');
                }
            }
            
        } catch (error) {
            console.error('Error al instalar la aplicación:', error);
            showAlert(t('error_opening_app'), 'danger');
        } finally {
            setTimeout(() => setIsInstallingPWA(false), 2000);
        }
    };

    // 🔷 FUNCIÓN DE EDICIÓN MEJORADA
    const handleEditPost = (e) => {
        e?.stopPropagation();
        
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        const userCanEdit = auth.user && (
            auth.user._id === post.user?._id || 
            auth.user._id === post.user || 
            auth.user.role === "admin"
        );

        if (!userCanEdit) {
            showAlert(t('not_post_owner_or_admin'), 'warning');
            return;
        }

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
                duracionviaje: post.duracionviaje || '',
                transporte: post.transporte || '',
            }
        });
    };

    const handleThreeDotsMenu = (action) => {
        switch (action) {
            case 'contact':
                handleChatWithOwner();
                break;
            case 'install':
                handleInstallPostPWA();
                break;
            case 'visit':
                handleVisitApp();
                break;
            case 'edit':
                handleEditPost();
                break;
            case 'delete':
                handleDeleteClick();
                break;
            case 'details':
                handleViewDetails();
           
                break;
            default:
                break;
        }
    };

    // 🔷 FUNCIÓN COMPARTIR MEJORADA
    const handleShare = (platform) => {
        const postUrl = `${BASE_URL}/post/${post._id}`;
        const shareText = `🌍 ${post.title} - Agencia de Viajes`;
        
        let shareUrl = '';
        
        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + postUrl)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
                break;
            case 'tiktok':
                shareUrl = `https://www.tiktok.com/share?url=${encodeURIComponent(postUrl)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(postUrl);
                showAlert('Enlace copiado al portapapeles', 'success');
                setShowShareModal(false);
                return;
            default:
                return;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShowShareModal(false);
    };

    if (isDetailPage && hideCard) {
        return null;
    }

    return (
        <>
            <Card className="border-0" style={styles.card}>
                <Card.Body className="p-0">
                    {/* Alert personalizado mejorado */}
                    {showCustomAlert && (
                        <Alert 
                            variant={customAlertVariant} 
                            className="border-0 rounded-0 m-0 py-3"
                            style={{
                                background: theme 
                                    ? customAlertVariant === 'success' 
                                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))'
                                        : customAlertVariant === 'warning'
                                        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1))'
                                        : customAlertVariant === 'danger'
                                        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))'
                                        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))'
                                    : undefined,
                                borderBottom: theme 
                                    ? `1px solid rgba(255, 255, 255, 0.1)` 
                                    : `1px solid rgba(0, 0, 0, 0.05)`
                            }}
                        >
                            <div className="d-flex align-items-center">
                                {getEnhancedIcon(
                                    customAlertVariant === 'success' ? 'info' : 
                                    customAlertVariant === 'warning' ? 'flag' : 
                                    customAlertVariant === 'danger' ? 'trash' : 'info',
                                    { size: 'default', color: customAlertVariant }
                                )}
                                <span className={isRTL ? 'ms-0 me-3' : 'ms-3 me-0'}>{customAlertMessage}</span>
                            </div>
                        </Alert>
                    )}

                    {/* 🔷 HEADER COMPLETAMENTE REDISEÑADO */}
                    <div className="p-4 pb-3">
                        <Row className={`align-items-start ${getFlexClass()}`}>
                            <Col>
                                <div className={`d-flex align-items-start gap-4 ${getFlexClass()}`}>
                                    {/* Icono de agencia rediseñado */}
                                    <div className="flex-shrink-0">
                                        <div style={styles.iconContainer}>
                                            {getEnhancedIcon(
                                                post.promoteurimmobilier ? 'building' : 'plane',
                                                { size: 'large', color: 'gradient' }
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Información principal */}
                                    <div style={{ flex: 1 }}>
                                        <Card.Title 
                                            className="mb-3" 
                                            style={{
                                                fontSize: '1.3rem',
                                                fontWeight: '800',
                                                color: theme ? '#fff' : '#1a1a1a',
                                                lineHeight: '1.3',
                                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }}
                                        >
                                            {post.subCategory || post.title}
                                        </Card.Title>
                                        
                                        {/* Información del viaje mejorada */}
                                        <div className="d-flex flex-wrap align-items-center gap-4">
                                            {travelDate && (
                                                <div className="d-flex align-items-center gap-2">
                                                    {getEnhancedIcon('calendar', { size: 'small', color: 'primary' })}
                                                    <small className="fw-semibold" style={{
                                                        color: theme ? '#ccc' : '#666'
                                                    }}>
                                                        {travelDate}
                                                    </small>
                                                </div>
                                            )}
                                            
                                            {(post.destinacionvoyage1 || post.destinacionhadj) && (
                                                <div className="d-flex align-items-center gap-2">
                                                    {getEnhancedIcon('location', { size: 'small', color: 'danger' })}
                                                    <small className="fw-semibold" style={{
                                                        color: theme ? '#ccc' : '#666'
                                                    }}>
                                                        {post.destinacionvoyage1 || post.destinacionhadj}
                                                    </small>
                                                </div>
                                            )}

                                            
                                        </div>
                                        
                                        {/* Badge mejorado */}
                                        {post.appType && (
                                            <Badge 
                                                className="mt-3 border-0"
                                                style={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                    padding: '8px 12px',
                                                    borderRadius: '10px',
                                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                    border: 'none'
                                                }}
                                            >
                                                {t(`createpost:app_${post.appType.replace(/-/g, '_')}`, post.appType)}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </Col>
                            
                            {/* Menú de tres puntos rediseñado */}
                            <Col xs="auto">
                                <Dropdown>
                                    <Dropdown.Toggle 
                                        variant={theme ? "dark" : "light"} 
                                        size="sm"
                                        className="border-0 shadow-none p-3"
                                        style={{
                                            background: theme 
                                                ? 'rgba(255, 255, 255, 0.1)' 
                                                : 'rgba(102, 126, 234, 0.1)',
                                            borderRadius: '12px',
                                            width: '44px',
                                            height: '44px',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {getEnhancedIcon('ellipsis', { 
                                            size: 'default', 
                                            color: theme ? '#fff' : '#667eea' 
                                        })}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className={`
                                        ${theme ? 'bg-dark text-light border-0' : 'border-0'} 
                                        shadow-lg rounded-3 p-2
                                    `}>
                                         
                                        
  

                                        {canEditPost && (
                                            <>
                                                <Dropdown.Item 
                                                    onClick={() => handleThreeDotsMenu('edit')}
                                                    className={`d-flex align-items-center rounded-2 px-3 py-2 ${theme ? 'text-light' : ''}`}
                                                >
                                                    {getEnhancedIcon('edit', { size: 'default', color: 'primary' })}
                                                    <span className={isRTL ? 'ms-0 me-3' : 'ms-3 me-0'}>
                                                        {auth.user.role === "admin" ? `${t('edit_post')} (Admin)` : t('edit_post')}
                                                    </span>
                                                </Dropdown.Item>
                                                
                                                <Dropdown.Item 
                                                    onClick={() => handleThreeDotsMenu('delete')}
                                                    className="d-flex align-items-center rounded-2 px-3 py-2 text-danger"
                                                >
                                                    {getEnhancedIcon('trash', { size: 'default', color: 'danger' })}
                                                    <span className={isRTL ? 'ms-0 me-3' : 'ms-3 me-0'}>
                                                        {auth.user.role === "admin" ? `${t('delete_post')} (Admin)` : t('delete_post')}
                                                    </span>
                                                </Dropdown.Item>
                                                
                                                 
                                            </>
                                        )}

                                        
 

                                         
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </div>

                    {/* 🔷 CAROUSEL CON BOTONES DE INTERACCIÓN MEJORADOS */}
                    <div className="position-relative">
                        <div 
                            className="card-image"
                            onClick={() => !isDetailPage && history.push(`/post/${post._id}`)}
                            style={{ cursor: isDetailPage ? 'default' : 'pointer' }}
                        >
                            <Carousel images={post.images} id={post._id} />
                        </div>

                        {!isDetailPage && (
                            <div className="position-absolute" style={{ bottom: '25px', right: '20px', zIndex: 10 }}>
                                <div className="d-flex flex-column align-items-center gap-3">
                                    {/* Like Button Mejorado */}
                                    <div className="text-center">
                                        <div 
                                            style={styles.interactionButton}
                                            onClick={isLike ? handleUnLike : handleLike}
                                        >
                                            <LikeButton
                                                isLike={isLike}
                                                handleLike={handleLike}
                                                handleUnLike={handleUnLike}
                                                size="lg"
                                                iconStyle={{ 
                                                    color: isLike ? '#ef4444' : '#fff',
                                                    fontSize: '1.3rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            />
                                        </div>
                                        <div className="fw-bold mt-2 small text-white text-shadow">
                                            {post.likes.length}
                                        </div>
                                    </div>

                                    {/* Save Button Mejorado */}
                                    <div className="text-center">
                                        <div 
                                            style={styles.interactionButton}
                                            onClick={saved ? handleUnSavePost : handleSavePost}
                                        >
                                            {getEnhancedIcon('bookmark', { 
                                                size: 'large', 
                                                color: saved ? 'warning' : 'default'
                                            })}
                                        </div>
                                        <div className="fw-bold mt-2 small text-white text-shadow">
                                            {post.saves || 0}
                                        </div>
                                    </div>

                                    {/* Share Button Mejorado */}
                                    <div className="text-center">
                                        <div 
                                            style={styles.interactionButton}
                                            onClick={() => setShowShareModal(true)}
                                        >
                                            {getEnhancedIcon('share', { size: 'large', color: 'default' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 🔷 BOTÓN PRINCIPAL MEJORADO - 100% ANCHO */}
                    {!isDetailPage && (
                        <div className="p-4 pt-3">
                            <EnhancedButton
                                onClick={handleViewDetails}
                                icon="eye"
                                fullWidth={true}
                            >
                                {t('view_full_details')}
                            </EnhancedButton>
                        </div>
                    )}
                </Card.Body>

                {/* 🔷 MODALES REDISEÑADOS */}
                <Modal 
                    show={showDeleteModal} 
                    onHide={() => setShowDeleteModal(false)}
                    centered
                    className={theme ? 'dark-modal' : ''}
                >
                    <Modal.Header 
                        closeButton 
                        className={theme ? 'bg-dark text-light border-secondary' : 'border-light'}
                        style={{
                            background: theme 
                                ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.95), rgba(45, 45, 45, 0.95))' 
                                : undefined
                        }}
                    >
                        <Modal.Title className="d-flex align-items-center">
                            {getEnhancedIcon('trash', { size: 'default', color: 'danger' })}
                            <span className={isRTL ? 'ms-0 me-3' : 'ms-3 me-0'}>{t('confirm_delete')}</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={theme ? 'bg-dark text-light' : ''}>
                        <div className="text-center py-4">
                            <div className="mb-4">
                                {getEnhancedIcon('trash', { size: 'xlarge', color: 'danger' })}
                            </div>
                            <h5 className="mb-3 fw-bold">{t('delete_post_question')}</h5>
                            <p className="text-muted mb-4">
                                "{post.title || post.category}"
                            </p>
                            <p className="small text-warning d-flex align-items-center justify-content-center">
                                {getEnhancedIcon('info', { size: 'small', color: 'warning' })}
                                <span className={isRTL ? 'ms-0 me-2' : 'ms-2 me-0'}>{t('delete_warning')}</span>
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className={theme ? 'bg-dark border-secondary' : 'border-light'}>
                        <Button 
                            variant="outline-secondary" 
                            onClick={() => setShowDeleteModal(false)}
                            className="px-4 py-2 rounded-2"
                        >
                            {getEnhancedIcon('times', { size: 'default' })}
                            <span className={isRTL ? 'ms-0 me-2' : 'ms-2 me-0'}>{t('cancel')}</span>
                        </Button>
                        <Button 
                            variant="danger" 
                            onClick={handleDeletePost}
                            className="px-4 py-2 rounded-2"
                            style={{
                                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                border: 'none'
                            }}
                        >
                            {getEnhancedIcon('trash', { size: 'default' })}
                            <span className={isRTL ? 'ms-0 me-2' : 'ms-2 me-0'}>{t('delete_confirm')}</span>
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal de compartir rediseñado */}
                <ShareModal 
                    show={showShareModal}
                    onHide={() => setShowShareModal(false)}
                    onShare={handleShare}
                    theme={theme}
                    isRTL={isRTL}
                    getEnhancedIcon={getEnhancedIcon}
                />
            </Card>

            <AuthModalAddLikesCommentsSave
                showModal={showAuthModal}
                closeModal={closeModal}
                redirectToLogin={redirectToLogin}
                redirectToRegister={redirectToRegister}
            />

            {/* Estilos CSS para animaciones */}
            <style>
                {`
                    @keyframes pulse {
                        0% { opacity: 1; }
                        50% { opacity: 0.7; }
                        100% { opacity: 1; }
                    }
                    @keyframes shimmer {
                        0% { left: -100%; }
                        100% { left: 100%; }
                    }
                    .text-shadow {
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
                    }
                    .hover-primary:hover {
                        background: rgba(102, 126, 234, 0.2) !important;
                    }
                    .card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                    }
                `}
            </style>
        </>
    );
};

export default CardBodyCarousel;