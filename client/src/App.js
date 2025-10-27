import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import i18n from './i18n';
import { io } from 'socket.io-client';
import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import ActivatePage from './auth/ActivatePage';
import Alert from './components/alert/Alert'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'

import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

import LanguageSelectorandroid from './components/LanguageSelectorandroid'

import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';

import { getUsers } from './redux/actions/userAction';

import Navbar2 from './components/header/Navbar2'

import video from './pages/video';
import { getPrivacySettings } from './redux/actions/privacyAction';
import infoaplicacionn from './pages/infoaplicacionn';
import bloginfo from './pages/bloginfo';
import InfoAplicacion from './components/blogInfoComment/InfoAplicacion';
import Bloqueos404 from './components/adminitration/Bloqueos404';

import appinfo2 from './pages/appinfo2';
import Createpost from './pages/createpost';

function App() {
  const { auth, status, modal, languageReducer, notify } = useSelector(state => state)
  const dispatch = useDispatch()
  const language = languageReducer?.language || localStorage.getItem("lang") || "en";

  // ✅ ESTADOS PARA MANEJO OFFLINE
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showContent, setShowContent] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // ✅ EFECTO PARA DETECTAR CONEXIÓN
  useEffect(() => {
    const handleOnline = () => {
      console.log('✅ Conexión restaurada');
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log('🔌 Sin conexión - Modo offline activado');
      setIsOnline(false);
      // Forzar mostrar contenido más rápido cuando estamos offline
      setTimeout(() => setShowContent(true), 1000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ✅ TIMEOUT DE SEGURIDAD PARA LOADING
  useEffect(() => {
    const maxWaitTime = isOnline ? 8000 : 2500; // 2.5s offline vs 8s online

    const timeoutId = setTimeout(() => {
      console.log('⏰ Timeout de loading - Forzando mostrar contenido');
      setShowContent(true);
      setLoadingTimeout(true);
    }, maxWaitTime);

    return () => clearTimeout(timeoutId);
  }, [isOnline]);

  // ✅ INICIALIZACIÓN DE APP CON MANEJO OFFLINE
  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (isOnline) {
          console.log('🌐 Online - Inicializando app completa');
          await dispatch(refreshToken());

          const socket = io()
          dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })

          dispatch(getPosts());

          if (auth.token) {
            dispatch(getPrivacySettings(auth.token));
            dispatch(getUsers(auth.token));
          }
        } else {
          console.log('📴 Offline - Inicialización mínima');
          // En offline, solo cargar datos esenciales del localStorage
          const cachedAuth = localStorage.getItem('auth_cache');
          if (cachedAuth) {
            console.log('📦 Usando datos cacheados');
          }
          // Marcar como listo más rápido
          setTimeout(() => setShowContent(true), 1500);
        }
      } catch (error) {
        console.log('❌ Error en inicialización:', error);
        // En caso de error, forzar mostrar contenido
        setShowContent(true);
      }
    };

    initializeApp();
  }, [dispatch, isOnline, auth.token]);

  // ✅ MANEJO DE IDIOMA
  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
      localStorage.setItem('language', language);
    }
  }, [language]);

  // ✅ NOTIFICACIONES (SOLO ONLINE)
  useEffect(() => {
    if (isOnline && !("Notification" in window)) {
      console.log("⚠️ Este navegador no soporta notificaciones");
    }
    else if (isOnline && Notification.permission === "granted") {
      // Permiso ya concedido
    }
    else if (isOnline && Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log("✅ Permiso de notificaciones concedido");
        }
      });
    }
  }, [isOnline]);

  // ✅ NOTIFICACIONES Y SONIDOS
  const lastNotifyId = useRef(null);

  useEffect(() => {
    if (notify.data.length > 0 && isOnline) {
      const ultima = notify.data[0];

      if (ultima._id !== lastNotifyId.current) {
        lastNotifyId.current = ultima._id;

        // 🔔 Sonido (solo online)
        try {
          const audio = new Audio("/sounds/notify.mp3");
          audio.play().catch(err => {
            console.log("⚠️ El sonido requiere interacción del usuario", err);
          });
        } catch (error) {
          console.warn("Sonido no soportado", error);
        }

        // 📳 Vibración
        if ("vibrate" in navigator) {
          navigator.vibrate([300, 100, 300, 100, 600]);
        }
      }
    }
  }, [notify.data, isOnline]);

  // ✅ COMPONENTE DE LOADING MEJORADO
  const LoadingComponent = () => (
    <div className="loading-container" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div className="spinner-border text-light" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>

      <div className="mt-3 text-center">
        <h5>Djamel APS</h5>
        {!isOnline ? (
          <div>
            <p className="mb-1">🔌 Modo offline detectado</p>
            <small>Cargando versión local...</small>
          </div>
        ) : loadingTimeout ? (
          <div>
            <p className="text-warning mb-1">⚠️ Conexión lenta</p>
            <small>Forzando carga de la aplicación...</small>
          </div>
        ) : (
          <small>Conectando con el servidor...</small>
        )}
      </div>
    </div>
  );

  // ✅ BANNER DE ESTADO OFFLINE
  const OfflineBanner = () => (
    !isOnline && (
      <div style={{
        background: '#ffeb3b',
        color: '#856404',
        padding: '8px 16px',
        textAlign: 'center',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 9999,
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        ⚡ Modo Offline - Algunas funciones pueden estar limitadas
      </div>
    )
  );

  // ✅ USUARIO BLOQUEADO
  if (auth.token && auth.user?.esBloqueado) {
    return (
      <Router>
        <Route exact path="/bloqueos404" component={Bloqueos404} />
        <Route path="*" component={Bloqueos404} />
      </Router>
    )
  }

  // ✅ RENDER PRINCIPAL
  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <OfflineBanner />
        <LanguageSelectorandroid />
        <div className="main">
          <Navbar2 />

          {/* Socket solo cuando hay conexión y token */}
          {auth.token && isOnline && <SocketClient />}


          {auth.token && <SocketClient />}

          <Switch>
            {/* públicas */}
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/bloginfo" component={bloginfo} />
            <Route exact path="/infoaplicacionn" component={appinfo2} />
            <Route exact path="/infoAplicacionn" component={appinfo2} />
            <Route exact path="/appinfo2" component={appinfo2} />


            <Route path="/editpost/:id" element={<Createpost />} />
            <Route exact path="/bloqueos404" component={Bloqueos404} />
            <Route exact path="/video/:obraId" component={video} />
            <Route exact path="/forgot_password" component={ForgotPassword} />
            <Route path="/user/reset/:token" component={ResetPassword} exact />
            <Route path="/user/activate/:activation_token" component={auth.token ? ActivatePage : Login} exact />

            {/* privadas específicas */}
            <PrivateRouter exact path="/users/roles" component={PageRender} />
            <PrivateRouter exact path="/users/contactt" component={PageRender} />
            <PrivateRouter exact path="/users/bloqueados" component={PageRender} />

            {/* privadas genéricas */}
            <PrivateRouter exact path="/:page/:id/:tab" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
            <PrivateRouter exact path="/:page" component={PageRender} />





          </Switch>
        </div>

      </div>



    </Router >
  );
}

export default App;