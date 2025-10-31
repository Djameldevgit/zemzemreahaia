import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TransporteViajehadj = ({ postData = {}, handleChangeInput }) => {
    const { t } = useTranslation('categories');

    // 🔷 VALIDACIÓN DEFENSIVA - asegurar que los arrays existan
    const serviciosTransporte = Array.isArray(postData.serviciosTransporte) ? postData.serviciosTransporte : [];
    const tiposTransporte = [
        { value: 'avion', label: t('tiposTransporte.avion'), emoji: '✈️' },
        { value: 'bus', label: t('tiposTransporte.bus'), emoji: '🚌' },
        { value: 'tren', label: t('tiposTransporte.tren'), emoji: '🚆' },
        { value: 'coche', label: t('tiposTransporte.coche'), emoji: '🚗' },
        { value: 'barco', label: t('tiposTransporte.barco'), emoji: '🚢' }
    ];
    
    const clasesTransporte = [
        t('clasesTransporte.economica'),
        t('clasesTransporte.primera_clase'),
        t('clasesTransporte.estandar')
    ];
    
    const serviciosDisponibles = [
        t('serviciosDisponibles.comida_incluida'),
        t('serviciosDisponibles.asientos_reclinables'),
        t('serviciosDisponibles.espacio_extra'),
        t('serviciosDisponibles.maletas_incluidas')
    ];
    // 🔷 HANDLER PARA CHECKBOXES CON ARRAYS
    const handleArrayChange = (field, value, isChecked) => {
        const currentArray = postData[field] || [];
        let newArray;
        
        if (isChecked) {
            newArray = [...currentArray, value];
        } else {
            newArray = currentArray.filter(item => item !== value);
        }
        
        // Simular el evento para handleChangeInput
        const syntheticEvent = {
            target: {
                name: field,
                value: newArray,
                type: 'array'
            }
        };
        
        handleChangeInput(syntheticEvent);
    };

    return (
        <Card className="mb-3">
            <Card.Header>
                <h6 className="mb-0">🚗 {t('transporteViaje')}</h6>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('tipoTransporte')}</Form.Label>
                            <Form.Select
                                name="transporte"  // 🔷 CAMBIADO para coincidir con tu estado
                                value={postData.transporte || ''}
                                onChange={handleChangeInput}
                                required
                            >
                                <option value="">{t('seleccionarTransporte')}</option>
                                {tiposTransporte.map((transporte) => (
                                    <option key={transporte.value} value={transporte.value}>
                                        {transporte.emoji} {t(`transportes.${transporte.value}`)}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('claseTransporte')}</Form.Label>
                            <Form.Select
                                name="claseTransporte"
                                value={postData.claseTransporte || ''}
                                onChange={handleChangeInput}
                            >
                                <option value="">{t('seleccionarClase')}</option>
                                {clasesTransporte.map((clase) => (
                                    <option key={clase} value={clase}>
                                        {t(`clases.${clase}`)}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('aerolineaCompania')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="companiaTransporte"
                                value={postData.companiaTransporte || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderCompania')}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('numeroVueloBus')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="numeroTransporte"
                                value={postData.numeroTransporte || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderNumero')}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('itinerarioTransporte')}</Form.Label>
                            <Form.Select
                                name="itinerarioTransporte"
                                value={postData.itinerarioTransporte || ''}
                                onChange={handleChangeInput}
                            >
                                <option value="">{t('seleccionarItinerario')}</option>
                                <option value="solo_ida">{t('soloIda')}</option>
                                <option value="ida_vuelta">{t('idaVuelta')}</option>
                             
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('tiempoEstimado')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="tiempoTransporte"
                                value={postData.tiempoTransporte || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderTiempo')}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>{t('serviciosIncluidosTransporte')}</Form.Label>
                    <div>
                        <Row>
                            {serviciosDisponibles.map((servicio) => (
                                <Col md={6} key={servicio}>
                                    <Form.Check
                                        type="checkbox"
                                        id={`servicio-${servicio}`}
                                        label={t(`serviciosTransporte.${servicio}`)}
                                        checked={serviciosTransporte.includes(servicio)} // 🔷 USANDO array validado
                                        onChange={(e) => handleArrayChange('serviciosTransporte', servicio, e.target.checked)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>{t('comentariosTransporte')}</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="comentariosTransporte"
                        value={postData.comentariosTransporte || ''}
                        onChange={handleChangeInput}
                        placeholder={t('placeholderComentarios')}
                    />
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default TransporteViajehadj;