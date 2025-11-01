import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button, Alert, Accordion, Badge, ProgressBar } from 'react-bootstrap';
import { FaInfoCircle, FaImage, FaEdit, FaPlane, FaHome, FaKaaba, FaSave, FaTimes } from 'react-icons/fa';

// 🔷 COMPONENTES COMUNES
import CategorySelector from '../components/forms/CategorySelector';
import DescriptionTextarea from '../components/forms/DescriptionTextarea';
import AddressInput from '../components/forms/AddressInput';
import ImageUpload from '../components/forms/ImageUpload';
import TarifasYprecios from '../components/forms/TarifasYprecios';
import ContactReservation from '../components/forms/ContactReservation';
import CancellationPolicy from '../components/forms/CancellationPolicy';

// 🔷 COMPONENTES DE FECHAS Y HORARIOS
import DateDeparRetour from '../components/forms/DateDeparRetour';
import HoraDepart from '../components/forms/HoraDepart';
import DurationDisplay from '../components/forms/DuracionDelViaje';

// 🔷 COMPONENTES DE DESTINOS
import DestinationHajjOmra from '../components/forms/hadjpmra/DestinacionHdjaOmra';
import DestinationLocationVacances from '../components/forms/locationvacances/DestinacionLocationvacances';
import DestinationVoyagesOrganises from '../components/forms/voyageorgranise/Destinacionvoyageorganise';

// 🔷 COMPONENTES DE TRANSPORTE
import TransportHajjOmra from '../components/forms/hadjpmra/TransporHajjOmra';
import TransportLocationVacances from '../components/forms/locationvacances/TransportLocationVacances';
import TransportVoyagesOrganises from '../components/forms/voyageorgranise/TransportVoyageOrganise';

// 🔷 COMPONENTES DE ALOJAMIENTO
import AlojamientoHajjOmra from '../components/forms/hadjpmra/HotelHajjOmra';
import AlojamientoLocationVacances from '../components/forms/locationvacances/Hotellocationvacance';
import AlojamientoVoyagesOrganises from '../components/forms/voyageorgranise/Hotelvoyageorganise';

// 🔷 COMPONENTES DE NOMBRE Y LUGAR
import NombreLugarHajjOmra from '../components/forms/hadjpmra/Nombrelugarhotelhadj';
import NombreLugarLocationVacances from '../components/forms/locationvacances/NombreLugarLocationVacances';
import NombreLugarVoyagesOrganises from '../components/forms/voyageorgranise/NombreLugarVoyagesOrganiseq';

// 🔷 COMPONENTES DE SERVICIOS
import ServiciosHajjOmra from '../components/forms/hadjpmra/ServiciosHajjOmra';
import ServiciosLocationVacances from '../components/forms/locationvacances/ServiciosLocationVancances';
import ServiciosVoyagesOrganises from '../components/forms/voyageorgranise/ServiciosVpuageOrganise';

// 🔷 IMPORTAR ACCIONES Y DATOS
import { createPost, updatePost } from '../redux/actions/postAction';
import communesjson from "../json/communes.json";

const Createpost = () => {
    // 🔷 ESTADOS GLOBALES 
    const { auth, theme, socket, languageReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { t, i18n } = useTranslation('createpost');

    const isEdit = location.state?.isEdit || false;
    const postToEdit = location.state?.postData || null;

    // 🔷 DETECTAR SI ES IDIOMA ÁRABE
    const isRTL = i18n.language === 'ar';

    // 🔷 ESTADO INICIAL SIMPLIFICADO
    const initialState = {
        category: "Agence de Voyage",
        subCategory: "",
        title: "",
        description: "",
        price: "",
        wilaya: "",
        commune: "",
        contacto: "",
        images: [],

        // Fechas y horarios
        datedepar: "",
        horadudepar: "",
        dateretour: "",
        dureeSejour: "",

        // Precios
        prixAdulte: "",
        prixEnfant: "",
        prixBebe: "",
    };

    // 🔷 ESTADOS
    const [postData, setPostData] = useState(initialState);
    const [images, setImages] = useState([]);
    const [selectedWilaya, setSelectedWilaya] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("info");
    const [activeAccordion, setActiveAccordion] = useState(['0']);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    // 🔷 EFFECT PARA CAMBIO DE IDIOMA
    useEffect(() => {
        const lang = languageReducer?.language || 'fr';
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [languageReducer?.language, i18n]);

    // 🔷 EFFECT PARA CARGAR DATOS DE EDICIÓN
    useEffect(() => {
        if (isEdit && postToEdit) {
            const sanitizedData = sanitizePostData(postToEdit);
            const finalPostData = {
                ...initialState,
                ...sanitizedData,
                category: sanitizedData.category || "Agence de Voyage",
                subCategory: sanitizedData.subCategory || "",
                description: sanitizedData.description || sanitizedData.content || "",
                title: sanitizedData.title || "",
            };

            setPostData(finalPostData);

            // Manejar imágenes existentes
            if (postToEdit.images && Array.isArray(postToEdit.images) && postToEdit.images.length > 0) {
                const existingImages = postToEdit.images
                    .map(img => {
                        if (typeof img === 'string') {
                            return { url: img, file: null, isExisting: true };
                        } else if (img && img.url) {
                            return { ...img, file: null, isExisting: true };
                        }
                        return null;
                    })
                    .filter(img => img !== null);
                setImages(existingImages);
            } else {
                setImages([]);
            }

            setSelectedWilaya(postToEdit.wilaya || "");
        } else {
            setPostData(initialState);
            setImages([]);
            setSelectedWilaya("");
        }
    }, [isEdit, postToEdit]);

    // 🔷 EFFECT PARA CALCULAR PORCENTAJE DE COMPLETADO
    useEffect(() => {
        calculateCompletionPercentage();
    }, [postData, images]);

    // 🔷 FUNCIÓN PARA CALCULAR PORCENTAJE DE COMPLETADO
    const calculateCompletionPercentage = () => {
        let completedFields = 0;
        const totalFields = 8;

        if (postData.subCategory) completedFields++;
        if (postData.title) completedFields++;
        if (postData.description) completedFields++;
        if (postData.wilaya) completedFields++;
        if (postData.commune) completedFields++;
        if (postData.contacto) completedFields++;
        if (images.length > 0) completedFields++;
        if (postData.prixAdulte || postData.price) completedFields++;

        const percentage = Math.round((completedFields / totalFields) * 100);
        setCompletionPercentage(percentage);
    };

    // 🔷 FUNCIÓN PARA SANITIZAR DATOS
    const sanitizePostData = (data) => {
        if (!data) return {};
        return { ...data };
    };

    // 🔷 HANDLERS PRINCIPALES
    const handleChangeInput = (e) => {
        const { name, value, type, checked } = e.target;
        setPostData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // 🔷 ELIMINADA: handleArrayChange - No se estaba usando

    const handleWilayaChange = (event) => {
        const selectedWilaya = event.target.value;
        setSelectedWilaya(selectedWilaya);
        const wilayaEncontrada = communesjson.find((wilaya) => wilaya.wilaya === selectedWilaya);
        const communes = wilayaEncontrada ? wilayaEncontrada.commune : [];

        setPostData((prevState) => ({
            ...prevState,
            wilaya: selectedWilaya,
            commune: communes.length > 0 ? communes[0] : "",
        }));
    };

    const handleCommuneChange = (event) => {
        const selectedCommune = event.target.value;
        setPostData((prevState) => ({
            ...prevState,
            commune: selectedCommune,
        }));
    };

    const handleChangeImages = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newImages = [];

        files.forEach(file => {
            if (!file) return err = t('validation_images_required');
            if (file.size > 1024 * 1024 * 5) {
                return err = t('validation_images_size');
            }
            return newImages.push(file);
        });

        if (err) {
            setAlertMessage(err);
            setAlertVariant("danger");
            setShowAlert(true);
            return;
        }

        setImages([...images, ...newImages]);
    };

    const deleteImages = (index) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (!postData.subCategory) {
            setAlertMessage(t('validation_category_required'));
            setAlertVariant("danger");
            setShowAlert(true);
            return;
        }

        if (!postData.wilaya || !postData.commune) {
            setAlertMessage(t('validation_wilaya_required'));
            setAlertVariant("danger");
            setShowAlert(true);
            return;
        }

        if (images.length === 0) {
            setAlertMessage(t('validation_images_required'));
            setAlertVariant("danger");
            setShowAlert(true);
            return;
        }

        try {
            if (isEdit && postToEdit) {
                const status = {
                    _id: postToEdit._id,
                    ...postToEdit
                };

                await dispatch(updatePost({
                    postData,
                    images,
                    auth,
                    status
                }));

                setAlertMessage(t('success_update'));
                setAlertVariant("success");
            } else {
                await dispatch(createPost({
                    postData,
                    images,
                    auth,
                    socket
                }));

                setAlertMessage(t('success_create'));
                setAlertVariant("success");
            }

            setShowAlert(true);

            setTimeout(() => {
                history.push('/');
            }, 2000);

        } catch (error) {
            setAlertMessage(t('error_publication'));
            setAlertVariant("danger");
            setShowAlert(true);
        }
    };

    // 🔷 RENDERIZADO DINÁMICO SEGÚN CATEGORÍA

    // 🧳 VOYAGE ORGANISÉ
    const renderVoyageOrganise = () => (
        <Card className="mb-4">
            <Card.Header className="bg-info text-white ps-3">
                <h5 className="mb-0 d-flex align-items-center">
                    <FaPlane size={16} color="white" className="me-2" />
                    {t('voyage_organise', 'Voyage Organisé')}
                </h5>
            </Card.Header>
            <Card.Body className="px-2"> {/* Menos padding horizontal */}
                <Accordion activeKey={activeAccordion} onSelect={setActiveAccordion} flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            🗺️ {t('voyage.destinations_internationales', 'Destinations Internationales')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2"> {/* Menos padding horizontal */}
                            <DestinationVoyagesOrganises
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            📅 {t('voyage.dates_duree', 'Dates et Durée')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <DateDeparRetour
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                            <HoraDepart
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                            <DurationDisplay
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            ✈️ {t('voyage.transport_deplacements', 'Transport et Déplacements')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <TransportVoyagesOrganises
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            🏨 {t('voyage.hebergement_pension', 'Hébergement et Pension')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <NombreLugarVoyagesOrganises
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                            <AlojamientoVoyagesOrganises
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4">
                        <Accordion.Header>
                            🛎️ {t('voyage.services_inclus', 'Services Inclus')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <ServiciosVoyagesOrganises
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
    );

    // 🏠 LOCATION VACANCES
    const renderLocationVacances = () => (
        <Card className="mb-4">
            <Card.Header className="bg-success text-white ps-3">
                <h5 className="mb-0 d-flex align-items-center">
                    <FaHome size={16} color="white" className="me-2" />
                    {t('location_vacances', 'Location Vacances')}
                </h5>
            </Card.Header>
            <Card.Body className="px-2">
                <Accordion activeKey={activeAccordion} onSelect={setActiveAccordion} flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            🏡 {t('location.informations_logement', 'Informations du Logement')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <NombreLugarLocationVacances
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                            <DestinationLocationVacances
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            🏨 {t('location.details_hebergement', 'Détails de l\'Hébergement')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <AlojamientoLocationVacances
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            🚗 {t('location.transport_acces', 'Transport et Accès')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <TransportLocationVacances
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            🛎️ {t('location.services_equipements', 'Services et Équipements')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <ServiciosLocationVacances
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
    );

    // 🕋 HAJJ & OMRA
    const renderHadjOmra = () => (
        <Card className="mb-4">
            <Card.Header className="bg-warning text-dark ps-3">
                <h5 className="mb-0 d-flex align-items-center">
                    <FaKaaba size={16} color="#6c757d" className="me-2" />
                    {t('hadj_omra', 'Hadj & Omra')}
                </h5>
            </Card.Header>
            <Card.Body className="px-2">
                <Accordion activeKey={activeAccordion} onSelect={setActiveAccordion} flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            🕋 {t('hadj.destination_peletinage', 'Destination du Pèlerinage')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <DestinationHajjOmra
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                            <NombreLugarHajjOmra
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            📅 {t('hadj.dates_peletinage', 'Dates du Pèlerinage')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <DateDeparRetour
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                            <HoraDepart
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                            <DurationDisplay
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            🚗 {t('hadj.transport_hebergement', 'Transport et Hébergement')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <TransportHajjOmra
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                            <AlojamientoHajjOmra
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            🛎️ {t('hadj.services_religieux', 'Services Religieux')}
                        </Accordion.Header>
                        <Accordion.Body className="px-2">
                            <ServiciosHajjOmra
                                postData={postData}
                                handleChangeInput={handleChangeInput}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
    );

    // 🔷 RENDERIZADO DINÁMICO SEGÚN CATEGORÍA
    const renderCategoryFields = () => {
        switch (postData.subCategory) {
            case "Voyage Organise":
                return renderVoyageOrganise();
            case "Location_Vacances":
                return renderLocationVacances();
            case "hadj_Omra":
                return renderHadjOmra();
            default:
                return null;
        }
    };

    // 🔷 COMPONENTES COMUNES PARA TODAS LAS CATEGORÍAS
    const renderCommonComponents = () => (
        <>
            {/* Tarifas y Precios */}
            <TarifasYprecios 
                postData={postData} 
                handleChangeInput={handleChangeInput}
                category={postData.subCategory}
            />

            {/* Política de Cancelación */}
            <CancellationPolicy
                postData={postData}
                handleChangeInput={handleChangeInput}
            />

            {/* Contacto y Reservas */}
            <ContactReservation
                postData={postData}
                handleChangeInput={handleChangeInput}
            />
        </>
    );

    const wilayasOptions = communesjson.map((wilaya, index) => (
        <option key={index} value={wilaya.wilaya}>
            {wilaya.wilaya}
        </option>
    ));

    const communesOptions = selectedWilaya
        ? communesjson
            .find((wilaya) => wilaya.wilaya === selectedWilaya)
            ?.commune?.map((commune, index) => (
                <option key={index} value={commune}>
                    {commune}
                </option>
            ))
        : [];

    return (
        <Container fluid className="p-0" dir={isRTL ? "rtl" : "ltr"}>
            <Row className="g-0">
                <Col xs={12}>
                    {/* Header Principal */}
                    <Card className="border-0 rounded-0">
                        <Card.Header className={`${isEdit ? "bg-warning text-dark" : "bg-primary text-white"} ps-3`}>
                            <Row className="align-items-center g-0">
                                <Col>
                                    <h2 className="mb-1 fs-6 d-flex align-items-center">
                                        {isEdit ? (
                                            <>
                                                <FaEdit size={16} color="#6c757d" className="me-2" />
                                                {t('edit_title', 'Modifier la Publication')}
                                            </>
                                        ) : (
                                            <>
                                                <FaInfoCircle size={16} color="white" className="me-2" />
                                                {t('create_title', 'Créer une Nouvelle Publication')}
                                            </>
                                        )}
                                    </h2>
                                    {isEdit && postToEdit?.title && (
                                        <p className="mb-0 opacity-75 small">
                                            {t('modification', 'Modification de')}: "{postToEdit.title}"
                                        </p>
                                    )}
                                </Col>
                                <Col xs="auto">
                                    <Badge 
                                        bg={isEdit ? "dark" : "light"} 
                                        text={isEdit ? "white" : "dark"}
                                        className="fs-6"
                                    >
                                        {completionPercentage}% {t('common.complete', 'Complété')}
                                    </Badge>
                                </Col>
                            </Row>
                        </Card.Header>
                    </Card>

                    {/* Barra de Progreso */}
                    {completionPercentage > 0 && (
                        <Card className="border-0 rounded-0">
                            <Card.Body className="py-2">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <small className="text-muted">
                                        {t('common.progress', 'Progression de votre annonce')}
                                    </small>
                                    <small className="fw-bold">{completionPercentage}%</small>
                                </div>
                                <ProgressBar 
                                    now={completionPercentage} 
                                    variant={completionPercentage < 50 ? "warning" : "success"}
                                    className="h-2"
                                />
                            </Card.Body>
                        </Card>
                    )}

                    {/* Alertas */}
                    {showAlert && (
                        <Alert
                            variant={alertVariant}
                            dismissible
                            onClose={() => setShowAlert(false)}
                            className="mb-0 rounded-0 border-0"
                        >
                            <Alert.Heading className="fs-6">
                                {alertVariant === "success" ? "✅ Success" : "⚠️ Error"}
                            </Alert.Heading>
                            {alertMessage}
                        </Alert>
                    )}

                    {/* Formulario Principal */}
                    <Card className="shadow-none border-0 rounded-0">
                        <Card.Body className="p-0">
                            <Form onSubmit={handleSubmit} className="p-0">
                                {/* Selector de Categoría */}
                                <div className="px-2"> {/* Contenedor para controlar dropdowns */}
                                    <CategorySelector
                                        postData={postData}
                                        handleChangeInput={handleChangeInput}
                                    />
                                </div>

                                {postData.subCategory && (
                                    <>
                                        {/* Información Básica */}
                                        <Card className="mb-0 border-0 rounded-0">
                                            <Card.Header className="bg-light border-0 ps-3">
                                                <h5 className="mb-0 fs-6 d-flex align-items-center">
                                                    <FaInfoCircle size={16} color="#6c757d" className="me-2" />
                                                    {t('common.basic_info', 'Informations de Base')}
                                                </h5>
                                            </Card.Header>
                                            <Card.Body className="px-2"> {/* Menos padding horizontal */}
                                                <DescriptionTextarea
                                                    postData={postData}
                                                    handleChangeInput={handleChangeInput}
                                                />
                                                
                                                <AddressInput
                                                    postData={postData}
                                                    handleChangeInput={handleChangeInput}
                                                    wilayasOptions={wilayasOptions}
                                                    communesOptions={communesOptions}
                                                    handleWilayaChange={handleWilayaChange}
                                                    handleCommuneChange={handleCommuneChange}
                                                />
                                            </Card.Body>
                                        </Card>

                                        {/* Campos Específicos de la Categoría */}
                                        {renderCategoryFields()}

                                        {/* Componentes Comunes */}
                                        {renderCommonComponents()}

                                        {/* Subida de Imágenes - SIN ZOOM */}
                                        <Card className="mb-0 border-0 rounded-0">
                                            <Card.Header className="bg-light border-0 ps-3">
                                                <h5 className="mb-0 fs-6 d-flex align-items-center">
                                                    <FaImage size={16} color="#6c757d" className="me-2" />
                                                    {t('common.images', 'Images de l\'Annonce')}
                                                </h5>
                                            </Card.Header>
                                            <Card.Body className="px-2">
                                                <ImageUpload
                                                    images={images}
                                                    handleChangeImages={handleChangeImages}
                                                    deleteImages={deleteImages}
                                                    theme={theme}
                                                    // Prop para desactivar zoom
                                                    disableZoom={true}
                                                />
                                            </Card.Body>
                                        </Card>

                                        {/* Botones de Acción */}
                                        <Card className="border-0 bg-transparent">
                                            <Card.Body className="px-2"> {/* Menos padding horizontal */}
                                                <Row className={`g-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <Col xs={8}>
                                                        <div className="d-grid gap-1">
                                                            <Button
                                                                variant={isEdit ? "warning" : "success"}
                                                                type="submit"
                                                                size="lg"
                                                                className="fw-bold py-2 d-flex align-items-center justify-content-center"
                                                            >
                                                                {isEdit ? (
                                                                    <>
                                                                        <FaSave size={16} className="me-2" />
                                                                        {t('button_update', 'Mettre à jour')}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <FaInfoCircle size={16} className="me-2" />
                                                                        {t('button_publish', 'Publier')}
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <Button
                                                            variant="outline-secondary"
                                                            size="lg"
                                                            className="w-100 py-2 d-flex align-items-center justify-content-center"
                                                            onClick={() => history.goBack()}
                                                        >
                                                            <FaTimes size={16} className="me-2" />
                                                            {t('common.cancel', 'Annuler')}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </>
                                )}

                                {!postData.subCategory && (
                                    <Card className="text-center border-0 bg-light rounded-0">
                                        <Card.Body className="py-4">
                                            <div className="fs-1 mb-2">🏁</div>
                                            <h5 className="text-muted fs-6">
                                                {t('common.select_category_first', 'Sélectionnez d\'abord une catégorie pour commencer')}
                                            </h5>
                                        </Card.Body>
                                    </Card>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* 🔷 ESTILOS PARA CONTROLAR DROPDOWNS Y ELIMINAR ZOOM */}
            <style>{`
                .form-select {
                    position: relative;
                    z-index: 1000;
                }
                .dropdown-menu {
                    z-index: 1050 !important;
                }
                /* Eliminar efectos de zoom en todas las imágenes */
                img {
                    transform: none !important;
                    transition: none !important;
                }
                .image-hover-zoom {
                    transform: none !important;
                }
                .image-hover-zoom:hover {
                    transform: none !important;
                }
                /* Menos padding horizontal en todos los forms */
                .form-control, .form-select, .form-check-input {
                    border-radius: 0.375rem;
                }
                .card-body.px-2 .form-control,
                .card-body.px-2 .form-select {
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
            `}</style>
        </Container>
    );
};

export default Createpost;