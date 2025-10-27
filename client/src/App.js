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
 
import bloginfo from './pages/bloginfo';
 
import Bloqueos404 from './components/adminitration/Bloqueos404';

import appinfo2 from './pages/appinfo2';
import Createpost from './pages/createpost';

function App() {
  const { auth, status, modal, languageReducer } = useSelector(state => state)
  const dispatch = useDispatch()
  const language = languageReducer?.language || localStorage.getItem("lang") || "en";
 
  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  
  useEffect(() => {
   
    dispatch(getPosts())
    if (auth.token) {
      dispatch(getPrivacySettings((auth.token)))
  
      dispatch(getUsers(auth.token))
 
    }
  }, [dispatch, auth.token])

  // ✅ MANEJO DE IDIOMA
  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
      localStorage.setItem('language', language);
    }
  }, [language]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])
 

  if (auth.token && auth.user?.esBloqueado) {
    return (
      <Router>
        <Route exact path="/bloqueos404" component={Bloqueos404} />
        <Route path="*" component={Bloqueos404} />
      </Router>
    )
  }

 
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
      <LanguageSelectorandroid />
      <div className="main">

        <Navbar2 />

        {status && <StatusModal />}
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