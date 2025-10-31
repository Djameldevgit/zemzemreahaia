import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hotellocationvacance = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const tiposPropiedades = [
        { value: 'villa', label: '🏠 ' + t('villa', 'Villa'), icon: '🏠' },
        { value: 'apartamento', label: '🏢 ' + t('apartamento', 'Apartamento'), icon: '🏢' },
        { value: 'studio', label: '🔲 ' + t('studio', 'Studio'), icon: '🔲' },
        { value: 'riad', label: '🏺 ' + t('riad', 'Riad'), icon: '🏺' },
        { value: 'chalet', label: '⛰️ ' + t('chalet', 'Chalet'), icon: '⛰️' },
        { value: 'casa_rural', label: '🌄 ' + t('casa_rural', 'Casa rural'), icon: '🌄' }
    ];

    const capacidades = [
        { value: '1_2', label: t('1_2_personas', '1-2 personas') },
        { value: '2_4', label: t('2_4_personas', '2-4 personas') },
        { value: '4_6', label: t('4_6_personas', '4-6 personas') },
        { value: '6_8', label: t('6_8_personas', '6-8 personas') },
        { value: '8_plus', label: t('8_plus_personas', '8+ personas') }
    ];

    return (
        <Card className="mb-4">
            <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                    🏡 {t('alojamientoLocation', 'Alojamiento Location Vacances')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    {/* Tipo de Propiedad */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('tipoPropiedad', 'Tipo de Propiedad')} *
                            </Form.Label>
                            <Form.Select
                                name="tipoPropiedad"
                                value={postData.tipoPropiedad || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectTipoPropiedad', 'Seleccione tipo')}</option>
                                {tiposPropiedades.map((tipo, index) => (
                                    <option key={index} value={tipo.value}>
                                        {tipo.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Capacidad */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('capacidad', 'Capacidad')} *
                            </Form.Label>
                            <Form.Select
                                name="capacidad"
                                value={postData.capacidad || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectCapacidad', 'Número de personas')}</option>
                                {capacidades.map((cap, index) => (
                                    <option key={index} value={cap.value}>
                                        {cap.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Número de Habitaciones */}
                    <Col xs={12} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('numHabitaciones', 'Habitaciones')}
                            </Form.Label>
                            <Form.Select
                                name="numHabitaciones"
                                value={postData.numHabitaciones || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectNum', 'Seleccione')}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5+</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Número de Baños */}
                    <Col xs={12} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('numBanos', 'Baños')}
                            </Form.Label>
                            <Form.Select
                                name="numBanos"
                                value={postData.numBanos || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectNum', 'Seleccione')}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4+</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Superficie */}
                    <Col xs={12} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('superficie', 'Superficie (m²)')}
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="superficie"
                                value={postData.superficie || ''}
                                onChange={handleChangeInput}
                                placeholder="m²"
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    {/* Equipamientos */}
                    <Col xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('equipamientos', 'Equipamientos')}
                            </Form.Label>
                            <Row>
                                <Col xs={6} md={3}>
                                    <Form.Check
                                        type="checkbox"
                                        name="wifi"
                                        label={`📶 ${t('wifi', 'Wi-Fi')}`}
                                        checked={postData.wifi || false}
                                        onChange={handleChangeInput}
                                        className={isRTL ? 'text-end' : ''}
                                    />
                                </Col>
                                <Col xs={6} md={3}>
                                    <Form.Check
                                        type="checkbox"
                                        name="piscina"
                                        label={`🏊 ${t('piscina', 'Piscina')}`}
                                        checked={postData.piscina || false}
                                        onChange={handleChangeInput}
                                        className={isRTL ? 'text-end' : ''}
                                    />
                                </Col>
                                <Col xs={6} md={3}>
                                    <Form.Check
                                        type="checkbox"
                                        name="aire_acondicionado"
                                        label={`❄️ ${t('aire_acondicionado', 'Aire acondicionado')}`}
                                        checked={postData.aire_acondicionado || false}
                                        onChange={handleChangeInput}
                                        className={isRTL ? 'text-end' : ''}
                                    />
                                </Col>
                                <Col xs={6} md={3}>
                                    <Form.Check
                                        type="checkbox"
                                        name="cocina"
                                        label={`👨‍🍳 ${t('cocina', 'Cocina equipada')}`}
                                        checked={postData.cocina || false}
                                        onChange={handleChangeInput}
                                        className={isRTL ? 'text-end' : ''}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Hotellocationvacance;