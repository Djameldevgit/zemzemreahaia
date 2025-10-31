import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ServiciosHajjOmra = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const servicios = [
        { name: 'guiaReligioso', label: '📖 ' + t('guiaReligioso', 'Guía religioso'), description: t('guiaReligioso_desc', 'Acompañamiento de un guía religioso') },
        { name: 'conferencias', label: '🎤 ' + t('conferencias', 'Conferencias religiosas'), description: t('conferencias_desc', 'Conferencias sobre rituales') },
        { name: 'trasladosMecaMedina', label: '🚌 ' + t('trasladosMecaMedina', 'Traslados Meca-Medina'), description: t('trasladosMecaMedina_desc', 'Transporte entre ciudades santas') },
        { name: 'visitasGuiadas', label: '🏛️ ' + t('visitasGuiadas', 'Visitas guiadas'), description: t('visitasGuiadas_desc', 'Visitas a lugares históricos') },
        { name: 'asistenciaMedica', label: '🏥 ' + t('asistenciaMedica', 'Asistencia médica'), description: t('asistenciaMedica_desc', 'Servicio médico durante el viaje') },
        { name: 'seguroViaje', label: '🛡️ ' + t('seguroViaje', 'Seguro de viaje'), description: t('seguroViaje_desc', 'Cobertura de seguro médico') },
        { name: 'kitPeregrino', label: '🎒 ' + t('kitPeregrino', 'Kit del peregrino'), description: t('kitPeregrino_desc', 'Incluye Ihram y otros elementos') },
        { name: 'tramitesVisado', label: '📄 ' + t('tramitesVisado', 'Trámites de visado'), description: t('tramitesVisado_desc', 'Gestión de visado saudí') }
    ];

    return (
        <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                    🛎️ {t('serviciosHajj', 'Servicios Hajj/Omra')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    {servicios.map((servicio, index) => (
                        <Col xs={12} md={6} key={index}>
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

export default ServiciosHajjOmra;