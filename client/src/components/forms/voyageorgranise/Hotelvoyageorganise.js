import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hotelvoyageorganise = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const categoriasHoteles = [
        { value: '5_estrellas', label: '⭐⭐⭐⭐⭐ 5 ' + t('estrellas', 'estrellas') },
        { value: '4_estrellas', label: '⭐⭐⭐⭐ 4 ' + t('estrellas', 'estrellas') },
        { value: '3_estrellas', label: '⭐⭐⭐ 3 ' + t('estrellas', 'estrellas') },
        { value: '2_estrellas', label: '⭐⭐ 2 ' + t('estrellas', 'estrellas') },
        { value: 'hostal', label: '🏠 ' + t('hostal', 'Hostal') },
        { value: 'apartamento', label: '🏢 ' + t('apartamento', 'Apartamento') }
    ];

    const tiposHabitacion = [
        { value: 'doble', label: t('doble', 'Habitación doble') },
        { value: 'individual', label: t('individual', 'Habitación individual') },
        { value: 'triple', label: t('triple', 'Habitación triple') },
        { value: 'suite', label: t('suite', 'Suite') },
        { value: 'familiar', label: t('familiar', 'Habitación familiar') }
    ];

    return (
        <Card className="mb-4">
            <Card.Header className="bg-warning text-dark">
                <h5 className="mb-0">
                    🏨 {t('alojamientoVoyages', 'Alojamiento Voyages Organisés')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    {/* Categoría del Alojamiento */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('categoriaAlojamiento', 'Categoría del Alojamiento')} *
                            </Form.Label>
                            <Form.Select
                                name="categoriaAlojamiento"
                                value={postData.categoriaAlojamiento || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectCategoria', 'Seleccione categoría')}</option>
                                {categoriasHoteles.map((cat, index) => (
                                    <option key={index} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Tipo de Habitación */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('tipoHabitacion', 'Tipo de Habitación')} *
                            </Form.Label>
                            <Form.Select
                                name="tipoHabitacion"
                                value={postData.tipoHabitacion || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectTipoHabitacion', 'Seleccione tipo')}</option>
                                {tiposHabitacion.map((tipo, index) => (
                                    <option key={index} value={tipo.value}>
                                        {tipo.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Régimen de Comidas */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('regimenComidas', 'Régimen de Comidas')} *
                            </Form.Label>
                            <Form.Select
                                name="regimenComidas"
                                value={postData.regimenComidas || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectRegimen', 'Seleccione régimen')}</option>
                                <option value="solo_alojamiento">🏨 {t('solo_alojamiento', 'Solo alojamiento')}</option>
                                <option value="desayuno">🍳 {t('desayuno', 'Desayuno incluido')}</option>
                                <option value="media_pension">🍽️ {t('media_pension', 'Media pensión')}</option>
                                <option value="pension_completa">📦 {t('pension_completa', 'Pensión completa')}</option>
                                <option value="todo_incluido">🎉 {t('todo_incluido', 'Todo incluido')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Ubicación del Hotel */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('ubicacionHotel', 'Ubicación del Hotel')}
                            </Form.Label>
                            <Form.Select
                                name="ubicacionHotel"
                                value={postData.ubicacionHotel || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectUbicacion', 'Tipo de ubicación')}</option>
                                <option value="centro_ciudad">🏙️ {t('centro_ciudad', 'Centro ciudad')}</option>
                                <option value="playa">🏖️ {t('playa', 'Frente a la playa')}</option>
                                <option value="montana">⛰️ {t('montana', 'En la montaña')}</option>
                                <option value="campo">🌾 {t('campo', 'En el campo')}</option>
                                <option value="aeropuerto">✈️ {t('aeropuerto', 'Cerca del aeropuerto')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Servicios del Hotel */}
                    <Col xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('serviciosIncluidos', 'Servicios Incluidos')}
                            </Form.Label>
                            <Row>
                                <Col xs={6} md={3}>
                                    <Form.Check
                                        type="checkbox"
                                        name="wifiIncluido"
                                        label={`📶 ${t('wifi', 'Wi-Fi')}`}
                                        checked={postData.wifiIncluido || false}
                                        onChange={handleChangeInput}
                                        className={isRTL ? 'text-end' : ''}
                                    />
                                </Col>
                                <Col xs={6} md={3}>
                                    <Form.Check
                                        type="checkbox"
                                        name="piscinaIncluida"
                                        label={`🏊 ${t('piscina', 'Piscina')}`}
                                        checked={postData.piscinaIncluida || false}
                                        onChange={handleChangeInput}
                                        className={isRTL ? 'text-end' : ''}
                                    />
                                </Col>
                                <Col xs={6} md={3}>
                                    <Form.Check
                                        type="checkbox"
                                        name="spaIncluido"
                                        label={`💆 ${t('spa', 'Spa')}`}
                                        checked={postData.spaIncluido || false}
                                        onChange={handleChangeInput}
                                        className={isRTL ? 'text-end' : ''}
                                    />
                                </Col>
                                <Col xs={6} md={3}>
    <Form.Check
        type="checkbox"
        name="gimnasioIncluido"
        label={`💪 ${t('gimnasio', 'Gimnasio')}`}
        checked={postData.gimnasioIncluido || false}
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

export default Hotelvoyageorganise;