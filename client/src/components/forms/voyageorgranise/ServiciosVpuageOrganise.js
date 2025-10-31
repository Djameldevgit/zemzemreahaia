import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ServiciosVoyagesOrganises = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const servicios = [
        { name: 'guiaAcompañante', label: '👨‍💼 ' + t('guiaAcompañante', 'Guía acompañante'), description: t('guiaAcompañante_desc', 'Guía profesional durante todo el viaje') },
        { name: 'excursionesIncluidas', label: '🗺️ ' + t('excursionesIncluidas', 'Excursiones incluidas'), description: t('excursionesIncluidas_desc', 'Visitas a lugares turísticos') },
        { name: 'entradasMonumentos', label: '🎫 ' + t('entradasMonumentos', 'Entradas a monumentos'), description: t('entradasMonumentos_desc', 'Acceso a sitios históricos') },
        { name: 'trasladosAeropuerto', label: '🚗 ' + t('trasladosAeropuerto', 'Traslados aeropuerto'), description: t('trasladosAeropuerto_desc', 'Transporte ida y vuelta') },
        { name: 'asistencia24h', label: '📞 ' + t('asistencia24h', 'Asistencia 24/7'), description: t('asistencia24h_desc', 'Soporte durante todo el viaje') },
        { name: 'seguroViaje', label: '🛡️ ' + t('seguroViaje', 'Seguro de viaje'), description: t('seguroViaje_desc', 'Cobertura médica y de cancelación') },
        { name: 'comidasIncluidas', label: '🍽️ ' + t('comidasIncluidas', 'Comidas incluidas'), description: t('comidasIncluidas_desc', 'Según régimen seleccionado') },
        { name: 'actividadesRecreativas', label: '🎭 ' + t('actividadesRecreativas', 'Actividades recreativas'), description: t('actividadesRecreativas_desc', 'Entretenimiento y diversión') },
        { name: 'espectaculosNocturnos', label: '🌃 ' + t('espectaculosNocturnos', 'Espectáculos nocturnos'), description: t('espectaculosNocturnos_desc', 'Shows y entretenimiento') },
        { name: 'deportesAcuaticos', label: '🏄 ' + t('deportesAcuaticos', 'Deportes acuáticos'), description: t('deportesAcuaticos_desc', 'Actividades en el agua') },
        { name: 'spaBienestar', label: '💆 ' + t('spaBienestar', 'Spa y bienestar'), description: t('spaBienestar_desc', 'Masajes y tratamientos') },
        { name: 'comprasGuiadas', label: '🛍️ ' + t('comprasGuiadas', 'Compras guiadas'), description: t('comprasGuiadas_desc', 'Tour de compras con guía') }
    ];

    return (
        <Card className="mb-4">
            <Card.Header className="bg-warning text-dark">
                <h5 className="mb-0">
                    🧳 {t('serviciosVoyages', 'Servicios Voyages Organisés')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    {servicios.map((servicio, index) => (
                        <Col xs={12} md={6} lg={4} key={index}>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    name={servicio.name}
                                    label={
                                        <div>
                                            <strong>{servicio.label}</strong>
                                            <br />
                                            <small className="text-muted">{servicio.description}</small>
                                        </div>
                                    }
                                    checked={postData[servicio.name] || false}
                                    onChange={handleChangeInput}
                                    className={isRTL ? 'text-end' : ''}
                                />
                            </Form.Group>
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ServiciosVoyagesOrganises;