import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TransportLocationVacances = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    return (
        <Card className="mb-4">
            <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                    🏠 {t('transportLocation', 'Transport Location Vacances')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    {/* Transport Inclus */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('transportInclus', 'Transport Inclus')}
                            </Form.Label>
                            <Form.Select
                                name="transportInclus"
                                value={postData.transportInclus || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectTransportOption', 'Options de transport')}</option>
                                <option value="non_inclus">❌ {t('transport_non_inclus', 'Transport non inclus')}</option>
                                <option value="navette">🚐 {t('navette', 'Navette gratuite')}</option>
                                <option value="transfert_paye">🚗 {t('transfert_paye', 'Transfert payant')}</option>
                                <option value="location_voiture">🔑 {t('location_voiture', 'Location voiture incluse')}</option>
                            </Form.Select>
                            <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                {t('transportLocationHelp', 'Transport vers la location')}
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    {/* Parking */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('parking', 'Parking')}
                            </Form.Label>
                            <Form.Select
                                name="parking"
                                value={postData.parking || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectParking', 'Options parking')}</option>
                                <option value="gratuit">🅿️ {t('parking_gratuit', 'Parking gratuit')}</option>
                                <option value="payant">💰 {t('parking_payant', 'Parking payant')}</option>
                                <option value="prive">🔒 {t('parking_prive', 'Parking privé')}</option>
                                <option value="non_disponible">❌ {t('parking_non_disponible', 'Pas de parking')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Accès Transport Public */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('accesTransport', 'Accès Transport Public')}
                            </Form.Label>
                            <div className={isRTL ? 'text-end' : ''}>
                                <Form.Check
                                    inline
                                    type="checkbox"
                                    name="accesBus"
                                    label="🚌 Bus"
                                    checked={postData.accesBus || false}
                                    onChange={handleChangeInput}
                                    className={isRTL ? 'ms-2' : 'me-2'}
                                />
                                <Form.Check
                                    inline
                                    type="checkbox"
                                    name="accesTaxi"
                                    label="🚕 Taxi"
                                    checked={postData.accesTaxi || false}
                                    onChange={handleChangeInput}
                                    className={isRTL ? 'ms-2' : 'me-2'}
                                />
                                <Form.Check
                                    inline
                                    type="checkbox"
                                    name="accesMetro"
                                    label="🚇 Métro"
                                    checked={postData.accesMetro || false}
                                    onChange={handleChangeInput}
                                    className={isRTL ? 'ms-2' : 'me-2'}
                                />
                            </div>
                        </Form.Group>
                    </Col>

                    {/* Distance Transport */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('distanceTransport', 'Distance arrêt transport')}
                            </Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="number"
                                    name="distanceTransport"
                                    value={postData.distanceTransport || ''}
                                    onChange={handleChangeInput}
                                    placeholder="500"
                                    className={isRTL ? 'text-end' : ''}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                />
                                <span className="input-group-text">mètres</span>
                            </div>
                            <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                {t('distanceTransportHelp', 'Distance du transport public')}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default TransportLocationVacances;