import React from 'react';
import { Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TransportHajjOmra = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const airlines = [
        'Air Algérie', 'Saudi Airlines', 'Emirates', 'Qatar Airways', 
        'Turkish Airlines', 'Etihad Airways', 'Other'
    ];

    const transportTypes = [
        { value: 'avion_direct', label: t('avion_direct', 'Vol direct'), icon: '✈️' },
        { value: 'avion_escale', label: t('avion_escale', 'Vol avec escale'), icon: '🛬' },
        { value: 'bus_meca_medina', label: t('bus_meca_medina', 'Bus Mecque-Médine'), icon: '🚌' }
    ];

    return (
        <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                    🚗 {t('transportHajj', 'Transport Hajj/Omra')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    {/* Type de Transport */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('typeTransport', 'Type de Transport')} *
                            </Form.Label>
                            <Form.Select
                                name="typeTransport"
                                value={postData.typeTransport || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectTransportType', 'Sélectionnez le type')}</option>
                                {transportTypes.map((type, index) => (
                                    <option key={index} value={type.value}>
                                        {type.icon} {type.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Compagnie Aérienne */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('compagnieAerienne', 'Compagnie Aérienne')}
                            </Form.Label>
                            <Form.Select
                                name="compagnieAerienne"
                                value={postData.compagnieAerienne || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectAirline', 'Choisissez la compagnie')}</option>
                                {airlines.map((airline, index) => (
                                    <option key={index} value={airline}>
                                        {airline}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Classe de Vol */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('classeVol', 'Classe de Vol')}
                            </Form.Label>
                            <Form.Select
                                name="classeVol"
                                value={postData.classeVol || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectClass', 'Sélectionnez la classe')}</option>
                                <option value="economy">{t('economy', 'Économique')}</option>
                                <option value="premium_economy">{t('premium_economy', 'Économique Premium')}</option>
                                <option value="business">{t('business', 'Affaires')}</option>
                                <option value="first">{t('first', 'Première Classe')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Transport Terrestre */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('transportTerrestre', 'Transport Terrestre')}
                            </Form.Label>
                            <Form.Select
                                name="transportTerrestre"
                                value={postData.transportTerrestre || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectGroundTransport', 'Transport au sol')}</option>
                                <option value="bus_ac">🚌 {t('bus_ac', 'Bus climatisé')}</option>
                                <option value="van">🚐 {t('van', 'Van de luxe')}</option>
                                <option value="voiture">🚗 {t('voiture', 'Voiture privée')}</option>
                                <option value="non_inclus">❌ {t('non_inclus', 'Non inclus')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Transferts Aéroport */}
                    <Col xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                name="transfertsAeroport"
                                label={t('transfertsAeroport', 'Transferts aéroport-hôtel inclus')}
                                checked={postData.transfertsAeroport || false}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default TransportHajjOmra;