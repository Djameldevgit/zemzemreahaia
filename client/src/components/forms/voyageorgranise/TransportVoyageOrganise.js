import React from 'react';
import { Form, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TransportVoyagesOrganises = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const transportModes = [
        { value: 'avion', label: '✈️ ' + t('avion', 'Avion'), description: t('avion_desc', 'Vol international') },
        { value: 'bus', label: '🚌 ' + t('bus', 'Bus touristique'), description: t('bus_desc', 'Bus climatisé') },
        { value: 'train', label: '🚆 ' + t('train', 'Train'), description: t('train_desc', 'Voyage en train') },
        { value: 'bateau', label: '🚢 ' + t('bateau', 'Bateau/Croisière'), description: t('bateau_desc', 'Croisière maritime') },
        { value: 'mixte', label: '🔀 ' + t('mixte', 'Transport mixte'), description: t('mixte_desc', 'Combinaison multiple') }
    ];

    const airlines = [
        'Air Algérie', 'Turkish Airlines', 'Emirates', 'Qatar Airways',
        'Air France', 'Lufthansa', 'British Airways', 'Other'
    ];

    return (
        <Card className="mb-4">
            <Card.Header className="bg-warning text-dark">
                <h5 className="mb-0">
                    🧳 {t('transportVoyages', 'Transport Voyages Organisés')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    {/* Mode de Transport Principal */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('modeTransport', 'Mode de Transport Principal')} *
                            </Form.Label>
                            <Form.Select
                                name="modeTransport"
                                value={postData.modeTransport || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectMainTransport', 'Sélectionnez le transport')}</option>
                                {transportModes.map((mode, index) => (
                                    <option key={index} value={mode.value}>
                                        {mode.label}
                                    </option>
                                ))}
                            </Form.Select>
                            {postData.modeTransport && (
                                <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                    {transportModes.find(m => m.value === postData.modeTransport)?.description}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>

                    {/* Compagnie Aérienne */}
                    {postData.modeTransport === 'avion' && (
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                    {t('compagnieAerienne', 'Compagnie Aérienne')} *
                                </Form.Label>
                                <Form.Select
                                    name="compagnieAerienne"
                                    value={postData.compagnieAerienne || ''}
                                    onChange={handleChangeInput}
                                    required
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
                    )}

                    {/* Classe de Transport */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('classeTransport', 'Classe de Transport')}
                            </Form.Label>
                            <Form.Select
                                name="classeTransport"
                                value={postData.classeTransport || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="standard">⭐ {t('standard', 'Standard')}</option>
                                <option value="comfort">⭐⭐ {t('comfort', 'Confort')}</option>
                                <option value="premium">⭐⭐⭐ {t('premium', 'Premium')}</option>
                                <option value="luxe">💎 {t('luxe', 'Luxe')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Services Inclus */}
                    <Col xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('servicesInclus', 'Services de Transport Inclus')}
                            </Form.Label>
                            <div className={isRTL ? 'text-end' : ''}>
    <Form.Check
        inline
        type="checkbox"
        name="transfertsAeroport"
        label={"🚗 " + t('transfertsAeroport', 'Transferts aéroport')}
        checked={postData.transfertsAeroport || false}
        onChange={handleChangeInput}
        className={isRTL ? 'ms-2' : 'me-2'}
    />
    <Form.Check
        inline
        type="checkbox"
        name="transportExcursions"
        label={"🚌 " + t('transportExcursions', 'Transport excursions')}
        checked={postData.transportExcursions || false}
        onChange={handleChangeInput}
        className={isRTL ? 'ms-2' : 'me-2'}
    />
    <Form.Check
        inline
        type="checkbox"
        name="assistanceGuide"
        label={"👨‍💼 " + t('assistanceGuide', 'Assistance guide')}
        checked={postData.assistanceGuide || false}
        onChange={handleChangeInput}
        className={isRTL ? 'ms-2' : 'me-2'}
    />
</div>
                        </Form.Group>
                    </Col>

                    {/* Informations Vol */}
                    {(postData.modeTransport === 'avion' || postData.modeTransport === 'mixte') && (
                        <Col xs={12}>
                            <Card className="bg-light">
                                <Card.Header>
                                    <strong>✈️ {t('infoVol', 'Informations Vol')}</strong>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('typeVol', 'Type de Vol')}</Form.Label>
                                                <Form.Select
                                                    name="typeVol"
                                                    value={postData.typeVol || ''}
                                                    onChange={handleChangeInput}
                                                >
                                                    <option value="direct">🛫 {t('vol_direct', 'Vol direct')}</option>
                                                    <option value="escale">🛬 {t('vol_escale', 'Avec escale')}</option>
                                                    <option value="multi">🔀 {t('vol_multi', 'Multi-destinations')}</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('baggage', 'Bagage Inclus')}</Form.Label>
                                                <Form.Select
                                                    name="baggage"
                                                    value={postData.baggage || ''}
                                                    onChange={handleChangeInput}
                                                >
                                                    <option value="20kg">🎒 20kg {t('soute', 'soute')}</option>
                                                    <option value="30kg">🧳 30kg {t('soute', 'soute')}</option>
                                                    <option value="cabine">💼 {t('cabine_only', 'Cabine seulement')}</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('repasVol', 'Repas à bord')}</Form.Label>
                                                <Form.Select
                                                    name="repasVol"
                                                    value={postData.repasVol || ''}
                                                    onChange={handleChangeInput}
                                                >
                                                    <option value="inclus">🍱 {t('inclus', 'Inclus')}</option>
                                                    <option value="payant">💵 {t('payant', 'Payant')}</option>
                                                    <option value="non">❌ {t('non_inclus', 'Non inclus')}</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Card.Body>
        </Card>
    );
};

export default TransportVoyagesOrganises;