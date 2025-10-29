import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Card,
  Row,
  Col,
  Badge,
  Button,
  ListGroup,
  ListGroupItem,
  Container,
  Alert,
  Accordion
} from 'react-bootstrap';

const DescriptionPost = ({ post }) => {
  const [readMore, setReadMore] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('0');
  const { languageReducer, theme } = useSelector(state => state);
  const { t, i18n } = useTranslation('descripcion');
  const lang = languageReducer.language || 'fr';
  const isRTL = i18n.language === 'ar';

  // Función para obtener iconos basados en RTL
  const getIconClass = (iconName) => {
    return isRTL ? `${iconName} ms-2` : `${iconName} me-2`;
  };

  // Función para obtener clases de alineación
  const getAlignClass = () => {
    return isRTL ? 'text-end' : 'text-start';
  };

  // Función para obtener clases flex
  const getFlexClass = () => {
    return isRTL ? 'flex-row-reverse' : 'flex-row';
  };

  // Función para formatear arrays
  const formatArray = (array) => {
    if (!array || !Array.isArray(array)) return [];
    return array.filter(item => item && item.trim() !== '');
  };

  // Función para renderizar servicios incluidos mejorada
  const renderServices = () => {
    const services = [];

    // Servicios booleanos
    if (post.assurancesIncluses) services.push(t('insurance_included'));
    if (post.guideLocal) services.push(t('local_guide'));
    if (post.repasInclus) services.push(t('meals_included'));
    if (post.transfertAeroport) services.push(t('airport_transfer'));
    if (post.animauxAcceptes) services.push(t('pets_allowed'));
    if (post.parking) services.push(t('parking_available'));
    if (post.piscine) services.push(t('swimming_pool'));
    if (post.climatisation) services.push(t('air_conditioning'));
    if (post.cuisineEquipee) services.push(t('equipped_kitchen'));
    if (post.wifiGratuit) services.push(t('free_wifi'));
    if (post.television) services.push(t('television'));
    if (post.menageInclus) services.push(t('cleaning_included'));
    if (post.promoteurimmobilier) services.push(t('real_estate_developer'));
    if (post.acompteRequise) services.push(t('deposit_required'));

    // Servicios de arrays
    if (post.servicesInclus && Array.isArray(post.servicesInclus)) {
      services.push(...post.servicesInclus.filter(item => item && item.trim() !== '').map(service => t(`service_${service}`) || service));
    }
    if (post.servicios && Array.isArray(post.servicios)) {
      services.push(...post.servicios.filter(item => item && item.trim() !== '').map(servicio => t(`servicio_${servicio}`) || servicio));
    }
    if (post.serviciosTr && Array.isArray(post.serviciosTr)) {
      services.push(...post.serviciosTr.filter(item => item && item.trim() !== '').map(servicioTr => t(`servicio_tr_${servicioTr}`) || servicioTr));
    }
    if (post.specifications && Array.isArray(post.specifications)) {
      services.push(...post.specifications.filter(item => item && item.trim() !== '').map(spec => t(`spec_${spec}`) || spec));
    }
    if (post.serviciosTransporte && Array.isArray(post.serviciosTransporte)) {
      services.push(...post.serviciosTransporte.filter(item => item && item.trim() !== '').map(servicio => t(`transport_service_${servicio}`) || servicio));
    }

    return services.filter(service => service && service.trim() !== '');
  };

  // Componente para mostrar información de transporte mejorado
  const TransportInfo = () => {
    const serviciosTransporte = formatArray(post.serviciosTransporte);
    
    if (!post.transporte && !post.tipoTransporte && !post.claseTransporte && 
        !post.companiaTransporte && serviciosTransporte.length === 0 && 
        !post.comentariosTransporte) {
      return null;
    }

    return (
      <Card className={`border-0 shadow-sm mb-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
        <Card.Header className={`border-0 ${theme ? 'bg-dark' : 'bg-primary bg-opacity-10'}`}>
          <h5 className="mb-0 d-flex align-items-center text-primary">
            <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
              <i className="fas fa-bus text-primary"></i>
            </div>
            {t('transport_details')}
          </h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            {post.transporte && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="fas fa-bus-simple text-primary"></i>
                    </div>
                    <div>
                      <div className="text-muted small">{t('transport_type')}</div>
                      <div className="fw-bold">{t(`transportes.${post.transporte}`) || post.transporte}</div>
                    </div>
                  </div>
                </div>
              </Col>
            )}
            
            {post.tipoTransporte && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <div className="d-flex align-items-center">
                    <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="fas fa-train text-info"></i>
                    </div>
                    <div>
                      <div className="text-muted small">{t('transport_category')}</div>
                      <div className="fw-bold">{post.tipoTransporte}</div>
                    </div>
                  </div>
                </div>
              </Col>
            )}
            
            {post.claseTransporte && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <div className="d-flex align-items-center">
                    <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="fas fa-crown text-warning"></i>
                    </div>
                    <div>
                      <div className="text-muted small">{t('transport_class')}</div>
                      <div className="fw-bold">{t(`clases.${post.claseTransporte}`) || post.claseTransporte}</div>
                    </div>
                  </div>
                </div>
              </Col>
            )}
            
            {post.companiaTransporte && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="fas fa-building text-success"></i>
                    </div>
                    <div>
                      <div className="text-muted small">{t('transport_company')}</div>
                      <div className="fw-bold">{post.companiaTransporte}</div>
                    </div>
                  </div>
                </div>
              </Col>
            )}
            
            {post.numeroTransporte && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <div className="d-flex align-items-center">
                    <div className="bg-danger bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="fas fa-hashtag text-danger"></i>
                    </div>
                    <div>
                      <div className="text-muted small">{t('transport_number')}</div>
                      <div className="fw-bold">{post.numeroTransporte}</div>
                    </div>
                  </div>
                </div>
              </Col>
            )}
            
            {post.tiempoTransporte && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <div className="d-flex align-items-center">
                    <div className="bg-secondary bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="fas fa-clock text-secondary"></i>
                    </div>
                    <div>
                      <div className="text-muted small">{t('transport_time')}</div>
                      <div className="fw-bold">{post.tiempoTransporte}</div>
                    </div>
                  </div>
                </div>
              </Col>
            )}
          </Row>
          
          {/* Itinerario de transporte */}
          {post.itinerarioTransporte && (
            <div className="mt-4">
              <h6 className="mb-3 text-muted">
                <i className="fas fa-route me-2"></i>
                {t('transport_itinerary')}
              </h6>
              <div className={`p-3 rounded ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                <p className="mb-0">{post.itinerarioTransporte}</p>
              </div>
            </div>
          )}
          
          {/* Servicios de transporte */}
          {serviciosTransporte.length > 0 && (
            <div className="mt-4">
              <h6 className="mb-3 text-muted">
                <i className="fas fa-concierge-bell me-2"></i>
                {t('transport_services')}
              </h6>
              <Row className="g-2">
                {serviciosTransporte.map((servicio, index) => (
                  <Col key={index} xs={12} sm={6} lg={4}>
                    <div className={`p-3 rounded ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                      <i className="fas fa-check text-success me-2"></i>
                      <span>{t(`serviciosTransporte.${servicio}`) || servicio}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          
          {/* Comentarios adicionales */}
          {post.comentariosTransporte && (
            <div className="mt-4">
              <h6 className="mb-3 text-muted">
                <i className="fas fa-comment-dots me-2"></i>
                {t('transport_comments')}
              </h6>
              <div className={`p-3 rounded ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                <p className="mb-0">{post.comentariosTransporte}</p>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  // Componente para información del hotel mejorado
  const HotelInfo = () => {
    const serviciosHotel = formatArray(post.serviciosdelhotel);
    const tipoHabitaciones = formatArray(post.tipodehabutaciones);
    
    if (!post.nombredelhotel && !post.adresshotel && !post.estrellas && 
        !post.totalhabitaciones && serviciosHotel.length === 0 && 
        tipoHabitaciones.length === 0) {
      return null;
    }

    return (
      <Card className={`border-0 shadow-sm mb-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
        <Card.Header className={`border-0 ${theme ? 'bg-dark' : 'bg-warning bg-opacity-10'}`}>
          <h5 className="mb-0 d-flex align-items-center text-warning">
            <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-2">
              <i className="fas fa-hotel text-warning"></i>
            </div>
            {t('hotel_information')}
          </h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            {post.nombredelhotel && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-signature text-primary me-2"></i>
                  <strong>{t('hotel_name')}:</strong> {post.nombredelhotel}
                </div>
              </Col>
            )}
            {post.adresshotel && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-map-marker-alt text-danger me-2"></i>
                  <strong>{t('hotel_address')}:</strong> {post.adresshotel}
                </div>
              </Col>
            )}
            {post.estrellas && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-star text-warning me-2"></i>
                  <strong>{t('hotel_stars')}:</strong> {'⭐'.repeat(post.estrellas)} ({post.estrellas})
                </div>
              </Col>
            )}
            {post.totalhabitaciones && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-door-closed text-info me-2"></i>
                  <strong>{t('total_rooms')}:</strong> {post.totalhabitaciones}
                </div>
              </Col>
            )}
            {post.hotelWebsite && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-globe text-success me-2"></i>
                  <strong>{t('hotel_website')}:</strong> 
                  <a href={post.hotelWebsite} target="_blank" rel="noopener noreferrer" className="ms-2">
                    {t('visit_website')}
                  </a>
                </div>
              </Col>
            )}
          </Row>

          {/* Tipo de habitaciones */}
          {tipoHabitaciones.length > 0 && (
            <div className="mt-4">
              <h6 className="mb-3 text-muted">
                <i className="fas fa-bed me-2"></i>
                {t('room_types')}
              </h6>
              <Row className="g-2">
                {tipoHabitaciones.map((tipo, index) => (
                  <Col key={index} xs={12} sm={6} lg={4}>
                    <div className={`p-3 rounded ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                      <i className="fas fa-check text-info me-2"></i>
                      <span>{t(`room_type_${tipo}`) || tipo}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Servicios del hotel */}
          {serviciosHotel.length > 0 && (
            <div className="mt-4">
              <h6 className="mb-3 text-muted">
                <i className="fas fa-concierge-bell me-2"></i>
                {t('hotel_services')}
              </h6>
              <Row className="g-2">
                {serviciosHotel.map((servicio, index) => (
                  <Col key={index} xs={12} sm={6} lg={4}>
                    <div className={`p-3 rounded ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                      <i className="fas fa-check text-success me-2"></i>
                      <span>{t(`hotel_service_${servicio}`) || servicio}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Incluido en el precio */}
          {post.incluidoenelprecio && (
            <div className="mt-4">
              <h6 className="mb-3 text-muted">
                <i className="fas fa-tags me-2"></i>
                {t('included_in_price')}
              </h6>
              <div className={`p-3 rounded ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                <p className="mb-0">{post.incluidoenelprecio}</p>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  // Componente para periodo de viaje mejorado
  const TravelPeriod = () => {
    if (!post.mesInicio && !post.mesFin && !post.temporada && !post.anio) {
      return null;
    }

    return (
      <Card className={`border-0 shadow-sm mb-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
        <Card.Header className={`border-0 ${theme ? 'bg-dark' : 'bg-info bg-opacity-10'}`}>
          <h5 className="mb-0 d-flex align-items-center text-info">
            <div className="bg-info bg-opacity-10 rounded-circle p-2 me-2">
              <i className="fas fa-calendar-alt text-info"></i>
            </div>
            {t('travel_period')}
          </h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            {post.mesInicio && (
              <Col xs={12} md={6} lg={3}>
                <div className={`text-center p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-play-circle fs-2 text-success mb-2"></i>
                  <div className="fw-bold">{t(`month_${post.mesInicio}`) || post.mesInicio}</div>
                  <div className="text-muted small">{t('start_month')}</div>
                </div>
              </Col>
            )}
            {post.mesFin && (
              <Col xs={12} md={6} lg={3}>
                <div className={`text-center p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-stop-circle fs-2 text-danger mb-2"></i>
                  <div className="fw-bold">{t(`month_${post.mesFin}`) || post.mesFin}</div>
                  <div className="text-muted small">{t('end_month')}</div>
                </div>
              </Col>
            )}
            {post.temporada && (
              <Col xs={12} md={6} lg={3}>
                <div className={`text-center p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-sun fs-2 text-warning mb-2"></i>
                  <div className="fw-bold">{t(`season_${post.temporada}`) || post.temporada}</div>
                  <div className="text-muted small">{t('season')}</div>
                </div>
              </Col>
            )}
            {post.anio && (
              <Col xs={12} md={6} lg={3}>
                <div className={`text-center p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-calendar fs-2 text-primary mb-2"></i>
                  <div className="fw-bold">{post.anio}</div>
                  <div className="text-muted small">{t('year')}</div>
                </div>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    );
  };

  // Componente para información de ubicación
  const LocationInfo = () => {
    if (!post.wilaya && !post.commune && !post.adress) {
      return null;
    }

    return (
      <Card className={`border-0 shadow-sm mb-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
        <Card.Header className={`border-0 ${theme ? 'bg-dark' : 'bg-danger bg-opacity-10'}`}>
          <h5 className="mb-0 d-flex align-items-center text-danger">
            <div className="bg-danger bg-opacity-10 rounded-circle p-2 me-2">
              <i className="fas fa-map-marker-alt text-danger"></i>
            </div>
            {t('location_information')}
          </h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            {post.wilaya && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-map text-primary me-2"></i>
                  <strong>{t('wilaya')}:</strong> {post.wilaya}
                </div>
              </Col>
            )}
            {post.commune && (
              <Col xs={12} md={6}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-location-dot text-success me-2"></i>
                  <strong>{t('commune')}:</strong> {post.commune}
                </div>
              </Col>
            )}
            {post.adress && (
              <Col xs={12}>
                <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                  <i className="fas fa-address-card text-warning me-2"></i>
                  <strong>{t('address')}:</strong> {post.adress}
                </div>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid className="px-2 py-3">
      {/* HEADER PRINCIPAL MEJORADO */}
      <Card className={`border-0 shadow-lg mb-4 overflow-hidden ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
        <div className={`bg-gradient p-4 text-white position-relative`} style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '0.5rem 0.5rem 0 0'
        }}>
          <div className="position-absolute top-0 end-0 p-3">
            {post.subCategory && (
              <Badge bg="light" text="dark" className="fs-6 px-3 py-2 shadow">
                <i className={getIconClass("fas fa-suitcase-rolling")}></i>
                {t(`category_${post.subCategory}`) || post.subCategory}
              </Badge>
            )}
          </div>

          <Row className="align-items-center">
            <Col xs={12} lg={8}>
              <div className={`d-flex align-items-center mb-3 ${getFlexClass()}`}>
                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                  <i className="fas fa-plane-departure fs-1"></i>
                </div>
                <div>
                  <h2 className="fw-bold">{post.title || t('travel_agency')}</h2>
                  <p className="opacity-90">
                    <i className={getIconClass("fas fa-map-location-dot")}></i>
                    {t('discover_adventure')}
                  </p>
                </div>
              </div>
            </Col>

            <Col xs={12} lg={4} className="text-lg-end">
              {post.price && (
                <div className="bg-white bg-opacity-25 rounded-3 p-3 d-inline-block">
                  <div className="text-white text-opacity-75 small">{t('desde')}</div>
                  <div className="fs-2 fw-bold">{post.price} <small>DA</small></div>
                  <div className="text-white text-opacity-75 small">{t('per_person')}</div>
                </div>
              )}
            </Col>
          </Row>

          {/* BADGES INFORMATIVOS */}
          <div className={`d-flex flex-wrap gap-2 mt-3 ${isRTL ? 'justify-content-end' : ''}`}>
            {post.typeVoyage && (
              <Badge bg="light" text="dark" className="px-3 py-2 fs-6 shadow-sm">
                <i className={getIconClass("fas fa-route")}></i>
                {t(`type_${post.typeVoyage}`) || post.typeVoyage}
              </Badge>
            )}
            {post.niveauConfort && (
              <Badge bg="light" text="dark" className="px-3 py-2 fs-6 shadow-sm">
                <i className={getIconClass("fas fa-star")}></i>
                {t(`comfort_${post.niveauConfort}`) || post.niveauConfort}
              </Badge>
            )}
            {post.duracionviaje && (
              <Badge bg="light" text="dark" className="px-3 py-2 fs-6 shadow-sm">
                <i className={getIconClass("fas fa-hourglass-half")}></i>
                {post.duracionviaje}
              </Badge>
            )}
            {post.publicCible && (
              <Badge bg="light" text="dark" className="px-3 py-2 fs-6 shadow-sm">
                <i className={getIconClass("fas fa-users")}></i>
                {t(`public_${post.publicCible}`) || post.publicCible}
              </Badge>
            )}
          </div>
        </div>

        <Card.Body className="p-4">
          {/* DESCRIPCIÓN PRINCIPAL */}
          {(post.description || post.content) && (
            <Alert variant={theme ? 'secondary' : 'light'} className="border-start border-4 border-primary mb-0">
              <div className={`d-flex align-items-start ${getFlexClass()}`}>
                <i className="fas fa-circle-info text-primary fs-4 mt-1 me-3"></i>
                <div className="flex-grow-1">
                  <h5 className="alert-heading mb-2">
                    <i className={getIconClass("fas fa-file-lines")}></i>
                    {t('about_trip')}
                  </h5>
                  <p className="mb-0" style={{ lineHeight: '1.8' }}>
                    {readMore ? (post.description || post.content) : `${(post.description || post.content).substring(0, 250)}...`}
                  </p>
                  {(post.description || post.content).length > 250 && (
                    <Button
                      variant="link"
                      className="p-0 mt-2 text-decoration-none fw-bold"
                      onClick={() => setReadMore(!readMore)}
                    >
                      {readMore ? (
                        <><i className="fas fa-chevron-up me-2"></i>{t('show_less')}</>
                      ) : (
                        <><i className="fas fa-chevron-down me-2"></i>{t('read_more')}</>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Alert>
          )}
        </Card.Body>
      </Card>

      {/* COMPONENTES ESPECIALIZADOS */}
      <LocationInfo />
      <TransportInfo />
      <HotelInfo />
      <TravelPeriod />

      {/* ACORDEÓN PARA INFORMACIÓN DETALLADA */}
      <Accordion activeKey={activeAccordion} onSelect={(key) => setActiveAccordion(key)} className="mb-4">
        {/* INFORMACIÓN BÁSICA */}
        <Accordion.Item eventKey="0" className={`border-0 shadow-sm ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
          <Accordion.Header className={theme ? 'bg-dark' : 'bg-light'}>
            <div className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                <i className="fas fa-info-circle text-primary"></i>
              </div>
              <h5 className="mb-0">{t('basic_information')}</h5>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Row className="g-3">
              {/* Información de salida */}
              {(post.datedepar || post.horadudepar || post.horariollegada || post.fecharegreso) && (
                <Col xs={12} lg={6}>
                  <Card className={`h-100 border-0 ${theme ? 'bg-dark text-light' : 'bg-light'}`}>
                    <Card.Header className={`border-0 ${theme ? 'bg-dark' : 'bg-light'}`}>
                      <h6 className="mb-0 d-flex align-items-center">
                        <i className="fas fa-calendar-day text-primary me-2"></i>
                        {t('schedule_info')}
                      </h6>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        {post.datedepar && (
                          <ListGroupItem className={`border-0 px-0 ${theme ? 'bg-dark' : ''}`}>
                            <Row className="align-items-center">
                              <Col xs={5} className="text-muted">
                                <i className="fas fa-plane-departure text-info me-2"></i>
                                {t('departure_date')}
                              </Col>
                              <Col xs={7} className="text-end">
                                <span className="fw-bold">
                                  {new Date(post.datedepar).toLocaleDateString(lang, {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </Col>
                            </Row>
                          </ListGroupItem>
                        )}
                        {post.horadudepar && (
                          <ListGroupItem className={`border-0 px-0 ${theme ? 'bg-dark' : ''}`}>
                            <Row className="align-items-center">
                              <Col xs={5} className="text-muted">
                                <i className="fas fa-clock text-warning me-2"></i>
                                {t('departure_time')}
                              </Col>
                              <Col xs={7} className="text-end fw-bold">
                                {post.horadudepar}
                              </Col>
                            </Row>
                          </ListGroupItem>
                        )}
                        {post.horariollegada && (
                          <ListGroupItem className={`border-0 px-0 ${theme ? 'bg-dark' : ''}`}>
                            <Row className="align-items-center">
                              <Col xs={5} className="text-muted">
                                <i className="fas fa-clock text-success me-2"></i>
                                {t('arrival_time')}
                              </Col>
                              <Col xs={7} className="text-end fw-bold">
                                {post.horariollegada}
                              </Col>
                            </Row>
                          </ListGroupItem>
                        )}
                        {post.fecharegreso && (
                          <ListGroupItem className={`border-0 px-0 ${theme ? 'bg-dark' : ''}`}>
                            <Row className="align-items-center">
                              <Col xs={5} className="text-muted">
                                <i className="fas fa-plane-arrival text-danger me-2"></i>
                                {t('return_date')}
                              </Col>
                              <Col xs={7} className="text-end fw-bold">
                                {new Date(post.fecharegreso).toLocaleDateString(lang)}
                              </Col>
                            </Row>
                          </ListGroupItem>
                        )}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              )}

              {/* Información adicional */}
              <Col xs={12} lg={6}>
                <Card className={`h-100 border-0 ${theme ? 'bg-dark text-light' : 'bg-light'}`}>
                  <Card.Header className={`border-0 ${theme ? 'bg-dark' : 'bg-light'}`}>
                    <h6 className="mb-0 d-flex align-items-center">
                      <i className="fas fa-info-circle text-info me-2"></i>
                      {t('additional_info')}
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {post.duracionviaje && (
                        <ListGroupItem className={`border-0 px-0 ${theme ? 'bg-dark' : ''}`}>
                          <Row className="align-items-center">
                            <Col xs={5} className="text-muted">
                              <i className="fas fa-hourglass-half text-warning me-2"></i>
                              {t('duration')}
                            </Col>
                            <Col xs={7} className="text-end fw-bold">
                              {post.duracionviaje}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      )}
                      {post.delaiTraitement && (
                        <ListGroupItem className={`border-0 px-0 ${theme ? 'bg-dark' : ''}`}>
                          <Row className="align-items-center">
                            <Col xs={5} className="text-muted">
                              <i className="fas fa-hourglass text-warning me-2"></i>
                              {t('processing_time')}
                            </Col>
                            <Col xs={7} className="text-end fw-bold">
                              {post.delaiTraitement}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      )}
                      {post.formalites && (
                        <ListGroupItem className={`border-0 px-0 ${theme ? 'bg-dark' : ''}`}>
                          <Row className="align-items-center">
                            <Col xs={5} className="text-muted">
                              <i className="fas fa-file-alt text-primary me-2"></i>
                              {t('formalities')}
                            </Col>
                            <Col xs={7} className="text-end fw-bold">
                              {post.formalites}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* SERVICIOS Y COMODIDADES */}
        {renderServices().length > 0 && (
          <Accordion.Item eventKey="1" className={`border-0 shadow-sm mt-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
            <Accordion.Header className={theme ? 'bg-dark' : 'bg-light'}>
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                  <i className="fas fa-check-circle text-success"></i>
                </div>
                <h5 className="mb-0">{t('services_amenities')}</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Row className="g-2">
                {renderServices().map((service, index) => (
                  <Col key={index} xs={12} sm={6} lg={4}>
                    <div className={`p-3 rounded ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                      <i className="fas fa-check text-success me-2"></i>
                      <span>{service}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        )}

        {/* ACTIVIDADES Y EXCURSIONES */}
        {(formatArray(post.activites).length > 0 || formatArray(post.excursions).length > 0) && (
          <Accordion.Item eventKey="2" className={`border-0 shadow-sm mt-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
            <Accordion.Header className={theme ? 'bg-dark' : 'bg-light'}>
              <div className="d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                  <i className="fas fa-hiking text-warning"></i>
                </div>
                <h5 className="mb-0">{t('activities_excursions')}</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {formatArray(post.activites).length > 0 && (
                <div className="mb-4">
                  <h6 className="mb-3 text-muted">
                    <i className="fas fa-running me-2"></i>
                    {t('activities')}
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {formatArray(post.activites).map((activity, index) => (
                      <Badge key={index} bg="warning" text="dark" className="px-3 py-2 fs-6">
                        {t(`activity_${activity}`) || activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {formatArray(post.excursions).length > 0 && (
                <div>
                  <h6 className="mb-3 text-muted">
                    <i className="fas fa-map-marked-alt me-2"></i>
                    {t('excursions')}
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {formatArray(post.excursions).map((excursion, index) => (
                      <Badge key={index} bg="info" className="px-3 py-2 fs-6">
                        {t(`excursion_${excursion}`) || excursion}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        )}

        {/* IDIOMAS DISPONIBLES */}
        {formatArray(post.language).length > 0 && (
          <Accordion.Item eventKey="3" className={`border-0 shadow-sm mt-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
            <Accordion.Header className={theme ? 'bg-dark' : 'bg-light'}>
              <div className="d-flex align-items-center">
                <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                  <i className="fas fa-language text-info"></i>
                </div>
                <h5 className="mb-0">{t('available_languages')}</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Row className="g-2">
                {formatArray(post.language).map((language, index) => (
                  <Col key={index} xs={12} sm={6} lg={4}>
                    <div className={`p-3 rounded ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                      <i className="fas fa-check text-info me-2"></i>
                      <span>{t(`language_${language}`) || language}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        )}

        {/* OPCIONES DE PAGO */}
        {formatArray(post.optionsPaiement).length > 0 && (
          <Accordion.Item eventKey="4" className={`border-0 shadow-sm mt-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
            <Accordion.Header className={theme ? 'bg-dark' : 'bg-light'}>
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                  <i className="fas fa-credit-card text-success"></i>
                </div>
                <h5 className="mb-0">{t('payment_options')}</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Row className="g-2">
                {formatArray(post.optionsPaiement).map((option, index) => (
                  <Col key={index} xs={12} sm={6} lg={4}>
                    <div className={`p-3 rounded ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                      <i className="fas fa-check text-success me-2"></i>
                      <span>{t(`payment_${option}`) || option}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>

      {/* CARACTERÍSTICAS DEL ALOJAMIENTO */}
      {(post.capacitePersonnes || post.nombreChambres || post.nombreSallesBain || post.superficie || post.etage) && (
        <Card className={`border-0 shadow-sm mb-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
          <Card.Header className={`border-0 ${theme ? 'bg-dark' : 'bg-primary bg-opacity-10'}`}>
            <h5 className="mb-0 d-flex align-items-center text-primary">
              <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                <i className="fas fa-home text-primary"></i>
              </div>
              {t('accommodation_features')}
            </h5>
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              {post.capacitePersonnes && (
                <Col xs={6} md={3}>
                  <div className={`text-center p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <i className="fas fa-users fs-2 text-primary mb-2"></i>
                    <div className="fw-bold fs-5">{post.capacitePersonnes}</div>
                    <div className="text-muted small">{t('capacity')}</div>
                  </div>
                </Col>
              )}
              {post.nombreChambres && (
                <Col xs={6} md={3}>
                  <div className={`text-center p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <i className="fas fa-bed fs-2 text-success mb-2"></i>
                    <div className="fw-bold fs-5">{post.nombreChambres}</div>
                    <div className="text-muted small">{t('bedrooms')}</div>
                  </div>
                </Col>
              )}
              {post.nombreSallesBain && (
                <Col xs={6} md={3}>
                  <div className={`text-center p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <i className="fas fa-bath fs-2 text-info mb-2"></i>
                    <div className="fw-bold fs-5">{post.nombreSallesBain}</div>
                    <div className="text-muted small">{t('bathrooms')}</div>
                  </div>
                </Col>
              )}
              {post.superficie && (
                <Col xs={6} md={3}>
                  <div className={`text-center p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <i className="fas fa-ruler-combined fs-2 text-warning mb-2"></i>
                    <div className="fw-bold fs-5">{post.superficie}m²</div>
                    <div className="text-muted small">{t('surface')}</div>
                  </div>
                </Col>
              )}
              {post.etage && (
                <Col xs={6} md={3}>
                  <div className={`text-center p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <i className="fas fa-building fs-2 text-secondary mb-2"></i>
                    <div className="fw-bold fs-5">{post.etage}</div>
                    <div className="text-muted small">{t('floor')}</div>
                  </div>
                </Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* DESTINOS MEJORADO */}
      {(post.destinacionvoyage1 || post.destinacionvoyage2 || post.destinacionhadj || post.paysDestination) && (
        <Card className={`border-0 shadow-sm mb-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
          <Card.Header className={`border-0 ${theme ? 'bg-dark' : 'bg-success bg-opacity-10'}`}>
            <h5 className="mb-0 d-flex align-items-center text-success">
              <div className="bg-success bg-opacity-10 rounded-circle p-2 me-2">
                <i className="fas fa-map-marked-alt text-success"></i>
              </div>
              {t('destinations')}
            </h5>
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              {post.destinacionvoyage1 && (
                <Col xs={12} md={6} lg={4}>
                  <div className={`p-3 rounded-3 h-100 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <div className="d-flex align-items-start mb-2">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                        <i className="fas fa-location-dot text-primary"></i>
                      </div>
                      <div>
                        <div className="text-muted small">{t('destination')} 1</div>
                        <h6 className="mb-0 fw-bold">{post.destinacionvoyage1}</h6>
                      </div>
                    </div>
                    {post.voyage1hotel1 && (
                      <div className={`mt-2 p-2 rounded ${theme ? 'bg-dark' : 'bg-white'}`}>
                        <div className="small">
                          <i className="fas fa-hotel text-info me-2"></i>
                          <span className="text-muted">{post.voyage1hotel1}</span>
                        </div>
                        {post.voyage1nombrehotel1 && (
                          <div className="small fw-bold mt-1">{post.voyage1nombrehotel1}</div>
                        )}
                      </div>
                    )}
                  </div>
                </Col>
              )}

              {post.destinacionvoyage2 && (
                <Col xs={12} md={6} lg={4}>
                  <div className={`p-3 rounded-3 h-100 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <div className="d-flex align-items-start mb-2">
                      <div className="bg-success bg-opacity-10 rounded-circle p-2 me-2">
                        <i className="fas fa-location-dot text-success"></i>
                      </div>
                      <div>
                        <div className="text-muted small">{t('destination')} 2</div>
                        <h6 className="mb-0 fw-bold">{post.destinacionvoyage2}</h6>
                      </div>
                    </div>
                    {post.voyage2hotel2 && (
                      <div className={`mt-2 p-2 rounded ${theme ? 'bg-dark' : 'bg-white'}`}>
                        <div className="small">
                          <i className="fas fa-hotel text-info me-2"></i>
                          <span className="text-muted">{post.voyage2hotel2}</span>
                        </div>
                        {post.voyage1nombrehotel2 && (
                          <div className="small fw-bold mt-1">{post.voyage1nombrehotel2}</div>
                        )}
                      </div>
                    )}
                  </div>
                </Col>
              )}

              {post.destinacionhadj && (
                <Col xs={12} md={6} lg={4}>
                  <div className={`p-3 rounded-3 h-100 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <div className="d-flex align-items-start">
                      <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-2">
                        <i className="fas fa-kaaba text-warning"></i>
                      </div>
                      <div>
                        <div className="text-muted small">{t('holy_destination')}</div>
                        <h6 className="mb-0 fw-bold">{post.destinacionhadj}</h6>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {post.paysDestination && (
                <Col xs={12} md={6} lg={4}>
                  <div className={`p-3 rounded-3 h-100 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <div className="d-flex align-items-start">
                      <div className="bg-info bg-opacity-10 rounded-circle p-2 me-2">
                        <i className="fas fa-globe text-info"></i>
                      </div>
                      <div>
                        <div className="text-muted small">{t('destination_country')}</div>
                        <h6 className="mb-0 fw-bold">{post.paysDestination}</h6>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* PRECIOS DETALLADOS */}
      {(post.prixAdulte || post.prixEnfant || post.prixBebe || post.tarifnuit) && (
        <Card className={`border-0 shadow-sm mb-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
          <Card.Header className={`border-0 ${theme ? 'bg-dark' : 'bg-warning bg-opacity-10'}`}>
            <h5 className="mb-0 d-flex align-items-center text-warning">
              <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-2">
                <i className="fas fa-money-bill-wave text-warning"></i>
              </div>
              {t('detailed_prices')}
            </h5>
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              {post.prixAdulte && (
                <Col xs={12} md={4}>
                  <div className={`text-center p-4 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <i className="fas fa-user fs-1 text-primary mb-2"></i>
                    <div className="fw-bold fs-4">{post.prixAdulte} DA</div>
                    <div className="text-muted">{t('adult_price')}</div>
                  </div>
                </Col>
              )}
              {post.prixEnfant && (
                <Col xs={12} md={4}>
                  <div className={`text-center p-4 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <i className="fas fa-child fs-1 text-success mb-2"></i>
                    <div className="fw-bold fs-4">{post.prixEnfant} DA</div>
                    <div className="text-muted">{t('child_price')}</div>
                  </div>
                </Col>
              )}
              {post.prixBebe && (
                <Col xs={12} md={4}>
                  <div className={`text-center p-4 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <i className="fas fa-baby fs-1 text-info mb-2"></i>
                    <div className="fw-bold fs-4">{post.prixBebe} DA</div>
                    <div className="text-muted">{t('baby_price')}</div>
                  </div>
                </Col>
              )}
              {post.tarifnuit && (
                <Col xs={12} md={4}>
                  <div className={`text-center p-4 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <i className="fas fa-moon fs-1 text-secondary mb-2"></i>
                    <div className="fw-bold fs-4">{post.tarifnuit} DA</div>
                    <div className="text-muted">{t('night_rate')}</div>
                  </div>
                </Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* DOCUMENTOS REQUERIDOS */}
      {formatArray(post.documentsRequises).length > 0 && (
        <Card className={`border-0 shadow-sm mb-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
          <Card.Header className={`border-0 ${theme ? 'bg-dark' : 'bg-danger bg-opacity-10'}`}>
            <h5 className="mb-0 d-flex align-items-center text-danger">
              <div className="bg-danger bg-opacity-10 rounded-circle p-2 me-2">
                <i className="fas fa-file-alt text-danger"></i>
              </div>
              {t('required_documents')}
            </h5>
          </Card.Header>
          <Card.Body>
            <Row className="g-2">
              {formatArray(post.documentsRequises).map((document, index) => (
                <Col key={index} xs={12} sm={6} lg={4}>
                  <div className={`p-3 rounded ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <i className="fas fa-file-circle-check text-warning me-2"></i>
                    <span>{t(`document_${document}`) || document}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* POLÍTICAS Y CONDICIONES */}
      {(post.conditionsAnnulation || post.politiqueAnnulation || post.cancelarreserva || post.itemsReservations_Visa) && (
        <Card className={`border-0 shadow-sm mb-3 ${theme ? 'bg-dark text-light' : 'bg-white'}`}>
          <Card.Header className={`border-0 ${theme ? 'bg-dark' : 'bg-secondary bg-opacity-10'}`}>
            <h5 className="mb-0 d-flex align-items-center text-secondary">
              <div className="bg-secondary bg-opacity-10 rounded-circle p-2 me-2">
                <i className="fas fa-file-contract text-secondary"></i>
              </div>
              {t('policies_conditions')}
            </h5>
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              {post.conditionsAnnulation && (
                <Col xs={12} lg={6}>
                  <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <h6 className="text-danger">
                      <i className="fas fa-ban me-2"></i>
                      {t('cancellation_conditions')}
                    </h6>
                    <p className="mb-0">{post.conditionsAnnulation}</p>
                  </div>
                </Col>
              )}
              {post.politiqueAnnulation && (
                <Col xs={12} lg={6}>
                  <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <h6 className="text-warning">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {t('cancellation_policy')}
                    </h6>
                    <p className="mb-0">{post.politiqueAnnulation}</p>
                  </div>
                </Col>
              )}
              {post.cancelarreserva && (
                <Col xs={12} lg={6}>
                  <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <h6 className="text-info">
                      <i className="fas fa-calendar-times me-2"></i>
                      {t('reservation_cancellation')}
                    </h6>
                    <p className="mb-0">{post.cancelarreserva}</p>
                  </div>
                </Col>
              )}
              {post.itemsReservations_Visa && (
                <Col xs={12} lg={6}>
                  <div className={`p-3 rounded-3 ${theme ? 'bg-secondary bg-opacity-25' : 'bg-light'}`}>
                    <h6 className="text-primary">
                      <i className="fas fa-passport me-2"></i>
                      {t('reservation_visa_items')}
                    </h6>
                    <p className="mb-0">{post.itemsReservations_Visa}</p>
                  </div>
                </Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* BOTÓN DE CONTACTO MEJORADO */}
      {post.contacto && (
        <Card className={`border-0 shadow-lg mt-4 ${theme ? 'bg-dark text-light' : 'bg-success text-white'}`}>
          <Card.Body className="text-center py-5">
            <div className="mb-4">
              <i className="fas fa-phone-volume fs-1 mb-3"></i>
              <h3 className="mb-3">{t('ready_to_travel')}</h3>
              <p className="fs-5 opacity-90 mb-4">{t('contact_for_booking')}</p>
            </div>

            <Button
              variant="light"
              size="lg"
              className="px-5 py-3 shadow-lg fw-bold fs-5"
              style={{ borderRadius: '50px' }}
              onClick={() => window.open(`tel:${post.contacto}`, '_self')}
            >
              <i className="fas fa-phone me-3"></i>
              {t('call_now')}
              <div className="small mt-1">{post.contacto}</div>
            </Button>

            <div className="mt-4 opacity-75">
              <i className="fas fa-headset me-2"></i>
              {t('available_24_7')}
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default DescriptionPost;