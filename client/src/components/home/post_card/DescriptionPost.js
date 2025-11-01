import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { 
  FaCar, FaEye, FaComments, FaPlaneDeparture, FaCalendarDay, 
  FaHourglassHalf, FaClock, FaBus, FaMapMarkerAlt, FaMapMarker, 
  FaKaaba, FaPassport, FaUmbrellaBeach, FaHome, FaRulerCombined, 
  FaBuilding, FaUserTie, FaList, FaHotel, FaMapPin, FaBed, 
  FaListOl, FaStar, FaWifi, FaLanguage, FaMoneyBillWave, 
  FaLaptop, FaBan, FaGlobe, FaMapMarkedAlt, FaSignature, 
  FaCalendarCheck, FaConciergeBell, FaCheckCircle, FaTimesCircle, 
  FaTag, FaPhone, FaCalendarAlt, FaSyncAlt, FaInfoCircle
} from 'react-icons/fa';

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

    // Componente para cada item de información - TODOS EN LA MISMA FILA
    const InfoItem = ({ icon, label, value, array, boolean, link }) => {
        if (!value && (!array || array.length === 0) && !boolean) return null;

        return (
            <div className="d-flex align-items-center mb-3 border-bottom pb-2">
                {/* Icono */}
                <div className="flex-shrink-0 me-3" style={{ color: "#6c757d" }}>
                    {icon}
                </div>
                
                {/* Campo/Label */}
                <div className="flex-shrink-0 me-3">
                    <span className="fw-bold text-muted" style={{ fontSize: '18px', minWidth: '120px' }}>
                        {label}
                    </span>
                </div>
                
                {/* Valor */}
                <div className="flex-grow-1">
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
                            style={{ fontSize: '18px' }}
                        >
                            {value}
                        </a>
                    ) : (
                        <span 
                            className={!array && !boolean ? 'text-dark' : ''}
                            style={{ fontSize: '18px' }}
                        >
                            {value}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <Card className="mb-4">
           <Card.Header className="bg-light" style={{ paddingLeft: '15px' }}>
    <h5 className="ml-4 mb-0 d-flex align-items-center">
        <FaInfoCircle size={16} color="#6c757d" className="me-2" />
        {t('informations_details', 'Informations Détaillées')}
    </h5>
</Card.Header>
            <Card.Body>
                {/* Información Básica */}
                <InfoItem 
    icon={<FaList size={16} color="#6c757d" />}
    label={t('categorie', 'Catégorie')}
    value={post.subCategory}
/>

                {post.title && (
                    <InfoItem 
                        icon={<FaEye size={16} color="#6c757d" />}
                        label={t('titre', 'Titre')}
                        value={post.title}
                    />
                )}

                {/* Descripción con Read More */}
                {post.description && (
                    <div className="d-flex align-items-start mb-3 border-bottom pb-2">
                        <div className="flex-shrink-0 me-3" style={{ color: "#6c757d" }}>
                            <FaComments size={16} color="#6c757d" />
                        </div>
                        <div className="flex-shrink-0 me-3">
                            <span className="fw-bold text-muted" style={{ fontSize: '14px', minWidth: '120px' }}>
                                {t('description', 'Description')}
                            </span>
                        </div>
                        <div className="flex-grow-1">
                            <div className={isRTL ? 'text-end' : ''}>
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
                                        style={{ fontSize: '12px' }}
                                    >
                                        {readMore 
                                            ? t('masquer_contenu', 'Masquer le contenu') 
                                            : t('lire_plus', 'Lire plus')
                                        }
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Información de Viaje */}
                {post.horadudepar && (
                    <InfoItem 
                        icon={<FaPlaneDeparture size={16} color="#6c757d" />}
                        label={t('heure_depart', 'Heure de départ')}
                        value={post.horadudepar}
                    />
                )}

                {post.datedepar && (
                    <InfoItem 
                        icon={<FaCalendarDay size={16} color="#6c757d" />}
                        label={t('date_depart', 'Date de départ')}
                        value={post.datedepar}
                    />
                )}

                {post.duracionviaje && (
                    <InfoItem 
                        icon={<FaHourglassHalf size={16} color="#6c757d" />}
                        label={t('duree_voyage', 'Durée du voyage')}
                        value={post.duracionviaje}
                    />
                )}

                {post.horariollegada && (
                    <InfoItem 
                        icon={<FaClock size={16} color="#6c757d" />}
                        label={t('heure_arrivee', 'Heure d\'arrivée')}
                        value={post.horariollegada}
                    />
                )}

                {post.transporte && (
                    <InfoItem 
                        icon={<FaBus size={16} color="#6c757d" />}
                        label={t('transport', 'Transport')}
                        value={post.transporte}
                    />
                )}

                {/* Localización */}
                {post.commune && (
                    <InfoItem 
                        icon={<FaMapMarkerAlt size={16} color="#6c757d" />}
                        label={t('lieu_depart', 'Lieu de départ')}
                        value={post.commune}
                    />
                )}

                {post.wilaya && (
                    <InfoItem 
                        icon={<FaMapMarker size={16} color="#6c757d" />}
                        label={t('wilaya', 'Wilaya')}
                        value={post.wilaya}
                    />
                )}

                {post.destinacionhadj && (
                    <InfoItem 
                        icon={<FaKaaba size={16} color="#6c757d" />}
                        label={t('destination', 'Destination')}
                        value={post.destinacionhadj}
                    />
                )}

                {/* Información de Vacaciones */}
                {post.itemsReservations_Visa && (
                    <InfoItem 
                        icon={<FaPassport size={16} color="#6c757d" />}
                        label={t('reservations_visa', 'Réservations/Visa')}
                        value={post.itemsReservations_Visa}
                    />
                )}

                {post.Location_Vacances && (
                    <InfoItem 
                        icon={<FaUmbrellaBeach size={16} color="#6c757d" />}
                        label={t('location_vacances', 'Location Vacances')}
                        value={post.Location_Vacances}
                    />
                )}

                {post.alquilergeneral && (
                    <InfoItem 
                        icon={<FaHome size={16} color="#6c757d" />}
                        label={t('a_louer', 'À louer')}
                        value={post.alquilergeneral}
                    />
                )}

                {post.superficie && (
                    <InfoItem 
                        icon={<FaRulerCombined size={16} color="#6c757d" />}
                        label={t('superficie', 'Superficie')}
                        value={`${post.superficie} m²`}
                    />
                )}

                {post.etage && (
                    <InfoItem 
                        icon={<FaBuilding size={16} color="#6c757d" />}
                        label={t('etage', 'Étage')}
                        value={post.etage}
                    />
                )}

                {post.promoteurimmobilier !== undefined && (
                    <InfoItem 
                        icon={<FaUserTie size={16} color="#6c757d" />}
                        label={t('promoteur_immobilier', 'Promoteur Immobilier')}
                        boolean={true}
                        value={post.promoteurimmobilier}
                    />
                )}

                {post.specifications && post.specifications.length > 0 && (
                    <div className="d-flex align-items-start mb-3 border-bottom pb-2">
                        <div className="flex-shrink-0 me-3" style={{ color: "#6c757d" }}>
                            <FaList size={16} color="#6c757d" />
                        </div>
                        <div className="flex-shrink-0 me-3">
                            <span className="fw-bold text-muted" style={{ fontSize: '14px', minWidth: '120px' }}>
                                {t('specifications', 'Spécifications')}
                            </span>
                        </div>
                        <div className="flex-grow-1">
                            {renderArray(post.specifications)}
                        </div>
                    </div>
                )}

                {/* Información de Hotel */}
                {post.nombredelhotel && (
                    <InfoItem 
                        icon={<FaHotel size={16} color="#6c757d" />}
                        label={t('nom_hotel', 'Nom de l\'hôtel')}
                        value={post.nombredelhotel}
                    />
                )}

                {post.adresshotel && (
                    <InfoItem 
                        icon={<FaMapPin size={16} color="#6c757d" />}
                        label={t('adresse', 'Adresse')}
                        value={post.adresshotel}
                    />
                )}

                {post.totalhabitaciones && (
                    <InfoItem 
                        icon={<FaBed size={16} color="#6c757d" />}
                        label={t('total_chambres', 'Total chambres')}
                        value={post.totalhabitaciones}
                    />
                )}

                {post.tipodehabutaciones && post.tipodehabutaciones.length > 0 && (
                    <div className="d-flex align-items-start mb-3 border-bottom pb-2">
                        <div className="flex-shrink-0 me-3" style={{ color: "#6c757d" }}>
                            <FaListOl size={16} color="#6c757d" />
                        </div>
                        <div className="flex-shrink-0 me-3">
                            <span className="fw-bold text-muted" style={{ fontSize: '14px', minWidth: '120px' }}>
                                {t('types_chambres', 'Types de chambres')}
                            </span>
                        </div>
                        <div className="flex-grow-1">
                            {renderArray(post.tipodehabutaciones)}
                        </div>
                    </div>
                )}

                {post.estrellas && (
                    <InfoItem 
                        icon={<FaStar size={16} color="#6c757d" />}
                        label={t('etoiles', 'Étoiles')}
                        value={`${post.estrellas} ${t('etoiles', 'Étoiles')}`}
                    />
                )}

                {post.wifi && post.wifi.length > 0 && (
                    <div className="d-flex align-items-start mb-3 border-bottom pb-2">
                        <div className="flex-shrink-0 me-3" style={{ color: "#6c757d" }}>
                            <FaWifi size={16} color="#6c757d" />
                        </div>
                        <div className="flex-shrink-0 me-3">
                            <span className="fw-bold text-muted" style={{ fontSize: '14px', minWidth: '120px' }}>
                                {t('wifi', 'WiFi')}
                            </span>
                        </div>
                        <div className="flex-grow-1">
                            {renderArray(post.wifi)}
                        </div>
                    </div>
                )}

                {post.language && post.language.length > 0 && (
                    <div className="d-flex align-items-start mb-3 border-bottom pb-2">
                        <div className="flex-shrink-0 me-3" style={{ color: "#6c757d" }}>
                            <FaLanguage size={16} color="#6c757d" />
                        </div>
                        <div className="flex-shrink-0 me-3">
                            <span className="fw-bold text-muted" style={{ fontSize: '14px', minWidth: '120px' }}>
                                {t('langues', 'Langues')}
                            </span>
                        </div>
                        <div className="flex-grow-1">
                            {renderArray(post.language)}
                        </div>
                    </div>
                )}

                {post.tarifnuit && (
                    <InfoItem 
                        icon={<FaMoneyBillWave size={16} color="#6c757d" />}
                        label={t('tarif_nuit', 'Tarif/nuit')}
                        value={post.tarifnuit}
                    />
                )}

                {post.reservacionenlinea && (
                    <InfoItem 
                        icon={<FaLaptop size={16} color="#6c757d" />}
                        label={t('reservation_en_ligne', 'Réservation en ligne')}
                        value={post.reservacionenlinea}
                    />
                )}

                {post.politiqueAnnulation && (
                    <InfoItem 
                        icon={<FaBan size={16} color="#6c757d" />}
                        label={t('politique_annulation', 'Politique d\'annulation')}
                        value={post.politiqueAnnulation}
                    />
                )}

                {post.hotelWebsite && (
                    <InfoItem 
                        icon={<FaGlobe size={16} color="#6c757d" />}
                        label={t('site_web', 'Site web')}
                        value={post.hotelWebsite}
                        link={true}
                    />
                )}

                {/* Destinos de Viaje */}
                {post.destinacionvoyage1 && (
                    <InfoItem 
                        icon={<FaMapMarkedAlt size={16} color="#6c757d" />}
                        label={t('destination_1', 'Destination 1')}
                        value={post.destinacionvoyage1}
                    />
                )}

                {post.voyage1hotel1 && (
                    <InfoItem 
                        icon={<FaHotel size={16} color="#6c757d" />}
                        label={t('hotel_1', 'Hôtel 1')}
                        value={post.voyage1hotel1}
                    />
                )}

                {post.voyage1nombrehotel1 && (
                    <InfoItem 
                        icon={<FaSignature size={16} color="#6c757d" />}
                        label={t('nom_hotel_1', 'Nom Hôtel 1')}
                        value={post.voyage1nombrehotel1}
                    />
                )}

                {post.destinacionvoyage2 && (
                    <InfoItem 
                        icon={<FaMapMarkedAlt size={16} color="#6c757d" />}
                        label={t('destination_2', 'Destination 2')}
                        value={post.destinacionvoyage2}
                    />
                )}

                {post.voyage2hotel2 && (
                    <InfoItem 
                        icon={<FaHotel size={16} color="#6c757d" />}
                        label={t('hotel_2', 'Hôtel 2')}
                        value={post.voyage2hotel2}
                    />
                )}

                {post.voyage1nombrehotel2 && (
                    <InfoItem 
                        icon={<FaSignature size={16} color="#6c757d" />}
                        label={t('nom_hotel_2', 'Nom Hôtel 2')}
                        value={post.voyage1nombrehotel2}
                    />
                )}

                {post.fecharegreso && (
                    <InfoItem 
                        icon={<FaCalendarCheck size={16} color="#6c757d" />}
                        label={t('date_retour', 'Date de retour')}
                        value={post.fecharegreso}
                    />
                )}

                {post.serviciosdelhotel && (
                    <InfoItem 
                        icon={<FaConciergeBell size={16} color="#6c757d" />}
                        label={t('services_hotel', 'Services hôtel')}
                        value={post.serviciosdelhotel}
                    />
                )}

                {post.incluidoenelprecio && (
                    <InfoItem 
                        icon={<FaCheckCircle size={16} color="#6c757d" />}
                        label={t('inclus_prix', 'Inclus dans le prix')}
                        value={post.incluidoenelprecio}
                    />
                )}

                {post.cancelarreserva && (
                    <InfoItem 
                        icon={<FaTimesCircle size={16} color="#6c757d" />}
                        label={t('annulation', 'Annulation')}
                        value={post.cancelarreserva}
                    />
                )}

                {post.price && (
                    <InfoItem 
                        icon={<FaTag size={16} color="#6c757d" />}
                        label={t('prix_personne', 'Prix par personne')}
                        value={`${post.price} DA`}
                    />
                )}

                {post.contacto && (
                    <InfoItem 
                        icon={<FaPhone size={16} color="#6c757d" />}
                        label={t('contact', 'Contact')}
                        value={post.contacto}
                    />
                )}

                {/* Información del Post */}
                <InfoItem 
                    icon={<FaCalendarAlt size={16} color="#6c757d" />}
                    label={t('publie_le', 'Publié le')}
                    value={`${new Date(post.createdAt).toLocaleDateString()} à ${new Date(post.createdAt).toLocaleTimeString()}`}
                />

                <InfoItem 
                    icon={<FaSyncAlt size={16} color="#6c757d" />}
                    label={t('actualise_le', 'Actualisé le')}
                    value={`${new Date(post.updatedAt).toLocaleDateString()} à ${new Date(post.updatedAt).toLocaleTimeString()}`}
                />

                {post.vistas > 0 && (
                    <InfoItem 
                        icon={<FaEye size={16} color="#6c757d" />}
                        label={t('vues', 'Vues')}
                        value={post.vistas.toString()}
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export default DescriptionPost;