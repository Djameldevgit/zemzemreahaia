import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ServiciosLocationVacances = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const servicios = [
        { name: 'limpiezaDiaria', label: '🧹 ' + t('limpiezaDiaria', 'Limpieza diaria'), description: t('limpiezaDiaria_desc', 'Servicio de limpieza todos los días') },
        { name: 'cambioRopa', label: '🛏️ ' + t('cambioRopa', 'Cambio de ropa de cama'), description: t('cambioRopa_desc', 'Cambio regular de sábanas y toallas') },
        { name: 'wifiGratuito', label: '📶 ' + t('wifiGratuito', 'Wi-Fi gratuito'), description: t('wifiGratuito_desc', 'Internet de alta velocidad') },
        { name: 'parkingGratuito', label: '🅿️ ' + t('parkingGratuito', 'Parking gratuito'), description: t('parkingGratuito_desc', 'Estacionamiento incluido') },
        { name: 'piscinaPrivada', label: '🏊 ' + t('piscinaPrivada', 'Piscina privada'), description: t('piscinaPrivada_desc', 'Uso exclusivo de piscina') },
        { name: 'jacuzzi', label: '💦 ' + t('jacuzzi', 'Jacuzzi'), description: t('jacuzzi_desc', 'Bañera de hidromasaje') },
        { name: 'bbq', label: '🔥 ' + t('bbq', 'Zona de barbacoa'), description: t('bbq_desc', 'Área para parrilladas') },
        { name: 'cuna', label: '👶 ' + t('cuna', 'Cuna para bebé'), description: t('cuna_desc', 'Disponible bajo petición') },
        { name: 'lavadora', label: '🧼 ' + t('lavadora', 'Lavadora'), description: t('lavadora_desc', 'Lavadora a disposición') },
        { name: 'secadora', label: '🌬️ ' + t('secadora', 'Secadora'), description: t('secadora_desc', 'Secadora de ropa') },
        { name: 'accesoPlaya', label: '🏖️ ' + t('accesoPlaya', 'Acceso directo a playa'), description: t('accesoPlaya_desc', 'Acceso privado a la playa') },
        { name: 'gimnasio', label: '💪 ' + t('gimnasio', 'Acceso a gimnasio'), description: t('gimnasio_desc', 'Uso de instalaciones deportivas') }
    ];

    return (
        <Card className="mb-4">
            <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                    🏡 {t('serviciosLocation', 'Servicios Location Vacances')}
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

export default ServiciosLocationVacances;