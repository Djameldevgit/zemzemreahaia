import React from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DescriptionPost = ({ post, readMore, setReadMore }) => {
    const { t, i18n } = useTranslation('descripcion');
    const isRTL = i18n.language === 'ar';

    // Función para renderizar arrays
    const renderArray = (array) => {
        if (!array || !Array.isArray(array) || array.length === 0) return null;
        
        return (
            <div className="d-flex flex-wrap gap-1 mt-1">
                {array.map((item, index) => (
                    <Badge 
                        key={index} 
                        bg="secondary" 
                        className="me-1 mb-1"
                    >
                        {item}
                    </Badge>
                ))}
            </div>
        );
    };

    // Función para renderizar campos booleanos
    const renderBoolean = (value) => {
        return value ? t('oui', 'Oui') : t('non', 'Non');
    };

    // Componente para cada item de información
    const InfoItem = ({ icon, label, value, array, boolean, link }) => {
        if (!value && (!array || array.length === 0) && !boolean) return null;

        return (
            <Row className="mb-3 border-bottom pb-2">
                <Col xs={12} md={3} className={`d-flex align-items-start ${isRTL ? 'justify-content-end' : ''}`}>
                    <div className="me-2">
                        <i className={icon}></i>
                    </div>
                    <span className="fw-bold text-muted small">{label}</span>
                </Col>
                <Col xs={12} md={9} className={isRTL ? 'text-end' : ''}>
                    {boolean && (
                        <span className={value ? 'text-success' : 'text-danger'}>
                            {renderBoolean(value)}
                        </span>
                    )}
                    {array && renderArray(array)}
                    {link ? (
                        <a 
                            href={value} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary text-decoration-none"
                        >
                            {value}
                        </a>
                    ) : (
                        <span className={!array && !boolean ? 'text-dark' : ''}>
                            {value}
                        </span>
                    )}
                </Col>
            </Row>
        );
    };

    return (
        <Card className="mb-4">
            <Card.Header className="bg-light">
                <h5 className="mb-0">
                    <i className="fas fa-info-circle me-2"></i>
                    {t('informations_details', 'Informations Détaillées')}
                </h5>
            </Card.Header>
            <Card.Body>
                {/* Información Básica */}
                <InfoItem 
                    icon="fas fa-car"
                    label={t('categorie', 'Catégorie')}
                    value={post.subCategory}
                />

                {post.title && (
                    <InfoItem 
                        icon="fas fa-eye"
                        label={t('titre', 'Titre')}
                        value={post.title}
                    />
                )}

                {/* Descripción con Read More */}
                {post.description && (
                    <Row className="mb-3 border-bottom pb-2">
                        <Col xs={12} md={3} className={`d-flex align-items-start ${isRTL ? 'justify-content-end' : ''}`}>
                            <div className="me-2">
                                <i className="fas fa-comments"></i>
                            </div>
                            <span className="fw-bold text-muted small">
                                {t('description', 'Description')}
                            </span>
                        </Col>
                        <Col xs={12} md={9}>
                            <Card.Text className={isRTL ? 'text-end' : ''}>
                                {post.description.length < 60
                                    ? post.description
                                    : readMore 
                                        ? post.description + ' ' 
                                        : post.description.slice(0, 60) + '.....'
                                }
                                {post.description.length > 60 && (
                                    <Button 
                                        variant="link" 
                                        className="p-0 ms-2 text-decoration-none"
                                        onClick={() => setReadMore(!readMore)}
                                        size="sm"
                                    >
                                        {readMore 
                                            ? t('masquer_contenu', 'Masquer le contenu') 
                                            : t('lire_plus', 'Lire plus')
                                        }
                                    </Button>
                                )}
                            </Card.Text>
                        </Col>
                    </Row>
                )}

                {/* Información de Viaje */}
                {post.horadudepar && (
                    <InfoItem 
                        icon="fas fa-plane-departure"
                        label={t('heure_depart', 'Heure de départ')}
                        value={post.horadudepar}
                    />
                )}

                {post.datedepar && (
                    <InfoItem 
                        icon="fas fa-calendar-day"
                        label={t('date_depart', 'Date de départ')}
                        value={post.datedepar}
                    />
                )}

                {post.duracionviaje && (
                    <InfoItem 
                        icon="fas fa-hourglass-half"
                        label={t('duree_voyage', 'Durée du voyage')}
                        value={post.duracionviaje}
                    />
                )}

                {post.horariollegada && (
                    <InfoItem 
                        icon="fas fa-clock"
                        label={t('heure_arrivee', 'Heure d\'arrivée')}
                        value={post.horariollegada}
                    />
                )}

                {post.transporte && (
                    <InfoItem 
                        icon="fas fa-bus"
                        label={t('transport', 'Transport')}
                        value={post.transporte}
                    />
                )}

                {/* Localización */}
                {post.commune && (
                    <InfoItem 
                        icon="fas fa-map-marker-alt"
                        label={t('lieu_depart', 'Lieu de départ')}
                        value={post.commune}
                    />
                )}

                {post.wilaya && (
                    <InfoItem 
                        icon="fas fa-map-marker"
                        label={t('wilaya', 'Wilaya')}
                        value={post.wilaya}
                    />
                )}

                {post.destinacionhadj && (
                    <InfoItem 
                        icon="fas fa-kaaba"
                        label={t('destination', 'Destination')}
                        value={post.destinacionhadj}
                    />
                )}

                {/* Información de Vacaciones */}
                {post.itemsReservations_Visa && (
                    <InfoItem 
                        icon="fas fa-passport"
                        label={t('reservations_visa', 'Réservations/Visa')}
                        value={post.itemsReservations_Visa}
                    />
                )}

                {post.Location_Vacances && (
                    <InfoItem 
                        icon="fas fa-umbrella-beach"
                        label={t('location_vacances', 'Location Vacances')}
                        value={post.Location_Vacances}
                    />
                )}

                {post.alquilergeneral && (
                    <InfoItem 
                        icon="fas fa-home"
                        label={t('a_louer', 'À louer')}
                        value={post.alquilergeneral}
                    />
                )}

                {post.superficie && (
                    <InfoItem 
                        icon="fas fa-ruler-combined"
                        label={t('superficie', 'Superficie')}
                        value={`${post.superficie} m²`}
                    />
                )}

                {post.etage && (
                    <InfoItem 
                        icon="fas fa-building"
                        label={t('etage', 'Étage')}
                        value={post.etage}
                    />
                )}

                {post.promoteurimmobilier !== undefined && (
                    <InfoItem 
                        icon="fas fa-user-tie"
                        label={t('promoteur_immobilier', 'Promoteur Immobilier')}
                        boolean={true}
                        value={post.promoteurimmobilier}
                    />
                )}

                {post.specifications && post.specifications.length > 0 && (
                    <Row className="mb-3 border-bottom pb-2">
                        <Col xs={12} md={3} className={`d-flex align-items-start ${isRTL ? 'justify-content-end' : ''}`}>
                            <div className="me-2">
                                <i className="fas fa-list"></i>
                            </div>
                            <span className="fw-bold text-muted small">
                                {t('specifications', 'Spécifications')}
                            </span>
                        </Col>
                        <Col xs={12} md={9}>
                            {renderArray(post.specifications)}
                        </Col>
                    </Row>
                )}

                {/* Información de Hotel */}
                {post.nombredelhotel && (
                    <InfoItem 
                        icon="fas fa-hotel"
                        label={t('nom_hotel', 'Nom de l\'hôtel')}
                        value={post.nombredelhotel}
                    />
                )}

                {post.adresshotel && (
                    <InfoItem 
                        icon="fas fa-map-pin"
                        label={t('adresse', 'Adresse')}
                        value={post.adresshotel}
                    />
                )}

                {post.totalhabitaciones && (
                    <InfoItem 
                        icon="fas fa-bed"
                        label={t('total_chambres', 'Total chambres')}
                        value={post.totalhabitaciones}
                    />
                )}

                {post.tipodehabutaciones && post.tipodehabutaciones.length > 0 && (
                    <Row className="mb-3 border-bottom pb-2">
                        <Col xs={12} md={3} className={`d-flex align-items-start ${isRTL ? 'justify-content-end' : ''}`}>
                            <div className="me-2">
                                <i className="fas fa-list-ol"></i>
                            </div>
                            <span className="fw-bold text-muted small">
                                {t('types_chambres', 'Types de chambres')}
                            </span>
                        </Col>
                        <Col xs={12} md={9}>
                            {renderArray(post.tipodehabutaciones)}
                        </Col>
                    </Row>
                )}

                {post.estrellas && (
                    <InfoItem 
                        icon="fas fa-star"
                        label={t('etoiles', 'Étoiles')}
                        value={`${post.estrellas} ${t('etoiles', 'Étoiles')}`}
                    />
                )}

                {post.wifi && post.wifi.length > 0 && (
                    <Row className="mb-3 border-bottom pb-2">
                        <Col xs={12} md={3} className={`d-flex align-items-start ${isRTL ? 'justify-content-end' : ''}`}>
                            <div className="me-2">
                                <i className="fas fa-wifi"></i>
                            </div>
                            <span className="fw-bold text-muted small">
                                {t('wifi', 'WiFi')}
                            </span>
                        </Col>
                        <Col xs={12} md={9}>
                            {renderArray(post.wifi)}
                        </Col>
                    </Row>
                )}

                {post.language && post.language.length > 0 && (
                    <Row className="mb-3 border-bottom pb-2">
                        <Col xs={12} md={3} className={`d-flex align-items-start ${isRTL ? 'justify-content-end' : ''}`}>
                            <div className="me-2">
                                <i className="fas fa-language"></i>
                            </div>
                            <span className="fw-bold text-muted small">
                                {t('langues', 'Langues')}
                            </span>
                        </Col>
                        <Col xs={12} md={9}>
                            {renderArray(post.language)}
                        </Col>
                    </Row>
                )}

                {post.tarifnuit && (
                    <InfoItem 
                        icon="fas fa-money-bill-wave"
                        label={t('tarif_nuit', 'Tarif/nuit')}
                        value={post.tarifnuit}
                    />
                )}

                {post.reservacionenlinea && (
                    <InfoItem 
                        icon="fas fa-laptop"
                        label={t('reservation_en_ligne', 'Réservation en ligne')}
                        value={post.reservacionenlinea}
                    />
                )}

                {post.politiqueAnnulation && (
                    <InfoItem 
                        icon="fas fa-ban"
                        label={t('politique_annulation', 'Politique d\'annulation')}
                        value={post.politiqueAnnulation}
                    />
                )}

                {post.hotelWebsite && (
                    <InfoItem 
                        icon="fas fa-globe"
                        label={t('site_web', 'Site web')}
                        value={post.hotelWebsite}
                        link={true}
                    />
                )}

                {/* Destinos de Viaje */}
                {post.destinacionvoyage1 && (
                    <InfoItem 
                        icon="fas fa-map-marked-alt"
                        label={t('destination_1', 'Destination 1')}
                        value={post.destinacionvoyage1}
                    />
                )}

                {post.voyage1hotel1 && (
                    <InfoItem 
                        icon="fas fa-hotel"
                        label={t('hotel_1', 'Hôtel 1')}
                        value={post.voyage1hotel1}
                    />
                )}

                {post.voyage1nombrehotel1 && (
                    <InfoItem 
                        icon="fas fa-signature"
                        label={t('nom_hotel_1', 'Nom Hôtel 1')}
                        value={post.voyage1nombrehotel1}
                    />
                )}

                {post.destinacionvoyage2 && (
                    <InfoItem 
                        icon="fas fa-map-marked-alt"
                        label={t('destination_2', 'Destination 2')}
                        value={post.destinacionvoyage2}
                    />
                )}

                {post.voyage2hotel2 && (
                    <InfoItem 
                        icon="fas fa-hotel"
                        label={t('hotel_2', 'Hôtel 2')}
                        value={post.voyage2hotel2}
                    />
                )}

                {post.voyage1nombrehotel2 && (
                    <InfoItem 
                        icon="fas fa-signature"
                        label={t('nom_hotel_2', 'Nom Hôtel 2')}
                        value={post.voyage1nombrehotel2}
                    />
                )}

                {post.fecharegreso && (
                    <InfoItem 
                        icon="fas fa-calendar-check"
                        label={t('date_retour', 'Date de retour')}
                        value={post.fecharegreso}
                    />
                )}

                {post.serviciosdelhotel && (
                    <InfoItem 
                        icon="fas fa-concierge-bell"
                        label={t('services_hotel', 'Services hôtel')}
                        value={post.serviciosdelhotel}
                    />
                )}

                {post.incluidoenelprecio && (
                    <InfoItem 
                        icon="fas fa-check-circle"
                        label={t('inclus_prix', 'Inclus dans le prix')}
                        value={post.incluidoenelprecio}
                    />
                )}

                {post.cancelarreserva && (
                    <InfoItem 
                        icon="fas fa-times-circle"
                        label={t('annulation', 'Annulation')}
                        value={post.cancelarreserva}
                    />
                )}

                {post.price && (
                    <InfoItem 
                        icon="fas fa-tag"
                        label={t('prix_personne', 'Prix par personne')}
                        value={`${post.price} DA`}
                    />
                )}

                {post.contacto && (
                    <InfoItem 
                        icon="fas fa-phone"
                        label={t('contact', 'Contact')}
                        value={post.contacto}
                    />
                )}

                {/* Información del Post */}
                <InfoItem 
                    icon="fas fa-calendar-alt"
                    label={t('publie_le', 'Publié le')}
                    value={`${new Date(post.createdAt).toLocaleDateString()} à ${new Date(post.createdAt).toLocaleTimeString()}`}
                />

                <InfoItem 
                    icon="fas fa-sync-alt"
                    label={t('actualise_le', 'Actualisé le')}
                    value={`${new Date(post.updatedAt).toLocaleDateString()} à ${new Date(post.updatedAt).toLocaleTimeString()}`}
                />

                {post.vistas > 0 && (
                    <InfoItem 
                        icon="fas fa-eye"
                        label={t('vues', 'Vues')}
                        value={post.vistas.toString()}
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export default DescriptionPost;