import React from 'react';
import { Form, Row, Col, Card, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TarifasYprecios = ({ postData, handleChangeInput, category }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    // Función para calcular el total automáticamente
    const calcularTotal = () => {
        const precioBase = parseFloat(postData.precioBase) || 0;
        const tarifaNinos = parseFloat(postData.tarifaNinos) || 0;
        const tarifaBebes = parseFloat(postData.tarifaBebes) || 0;
        
        return precioBase + tarifaNinos + tarifaBebes;
    };

    return (
        <Card className="mb-4">
            <Card.Header className="bg-info text-white">
                <h5 className="mb-0">
                    💰 {t('tarifasPrecios', 'Tarifas y Precios')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    
                    {/* Precio Base - Común para todas las categorías */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('precioBase', 'Precio Base')} *
                            </Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="number"
                                    name="precioBase"
                                    value={postData.precioBase || ''}
                                    onChange={handleChangeInput}
                                    placeholder="0"
                                    min="0"
                                    required
                                    className={isRTL ? 'text-end' : ''}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                />
                                <span className="input-group-text">DZD</span>
                            </div>
                            <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                {category === 'hadjomra' 
                                    ? t('precioBaseHajj', 'Precio por persona para el paquete completo')
                                    : category === 'locationvacances'
                                    ? t('precioBaseLocation', 'Precio por noche para la propiedad')
                                    : t('precioBaseVoyages', 'Precio por persona para el viaje organizado')
                                }
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    {/* Tipo de Precio - Específico por categoría */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('tipoPrecio', 'Tipo de Precio')}
                            </Form.Label>
                            <Form.Select
                                name="tipoPrecio"
                                value={postData.tipoPrecio || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectTipoPrecio', 'Seleccione tipo')}</option>
                                
                                {category === 'hadjomra' && (
                                    <>
                                        <option value="paquete_completo">📦 {t('paquete_completo', 'Paquete completo')}</option>
                                        <option value="solo_vuelo">✈️ {t('solo_vuelo', 'Solo vuelo')}</option>
                                        <option value="solo_hotel">🏨 {t('solo_hotel', 'Solo hotel')}</option>
                                        <option value="personalizado">🔧 {t('personalizado', 'Personalizado')}</option>
                                    </>
                                )}
                                
                                {category === 'locationvacances' && (
                                    <>
                                        <option value="por_noche">🌙 {t('por_noche', 'Por noche')}</option>
                                        <option value="por_semana">📅 {t('por_semana', 'Por semana')}</option>
                                        <option value="por_mes">🗓️ {t('por_mes', 'Por mes')}</option>
                                        <option value="temporada_alta">📈 {t('temporada_alta', 'Temporada alta')}</option>
                                        <option value="temporada_baja">📉 {t('temporada_baja', 'Temporada baja')}</option>
                                    </>
                                )}
                                
                                {category === 'voyagesorganises' && (
                                    <>
                                        <option value="todo_incluido">🎉 {t('todo_incluido', 'Todo incluido')}</option>
                                        <option value="vuelo_hotel">✈️🏨 {t('vuelo_hotel', 'Vuelo + Hotel')}</option>
                                        <option value="solo_circuito">🗺️ {t('solo_circuito', 'Solo circuito')}</option>
                                        <option value="personalizado">🔧 {t('personalizado', 'Personalizado')}</option>
                                    </>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Tarifas para Niños - Común para todas */}
                    <Col xs={12}>
                        <h6 className={`border-bottom pb-2 ${isRTL ? 'text-end' : ''}`}>
                            👶 {t('tarifasNinos', 'Tarifas para Niños')}
                        </h6>
                    </Col>

                    <Col xs={12} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('ninos_2_12', 'Niños (2-12 años)')}
                            </Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="number"
                                    name="tarifaNinos"
                                    value={postData.tarifaNinos || ''}
                                    onChange={handleChangeInput}
                                    placeholder="0"
                                    min="0"
                                    className={isRTL ? 'text-end' : ''}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                />
                                <span className="input-group-text">DZD</span>
                            </div>
                            <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                {t('tarifaNinosHelp', 'Precio especial para niños')}
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('bebes_0_2', 'Bebés (0-2 años)')}
                            </Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="number"
                                    name="tarifaBebes"
                                    value={postData.tarifaBebes || ''}
                                    onChange={handleChangeInput}
                                    placeholder="0"
                                    min="0"
                                    className={isRTL ? 'text-end' : ''}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                />
                                <span className="input-group-text">DZD</span>
                            </div>
                            <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                {t('tarifaBebesHelp', 'Precio para bebés (generalmente gratuito)')}
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('politicaNinos', 'Política de Niños')}
                            </Form.Label>
                            <Form.Select
                                name="politicaNinos"
                                value={postData.politicaNinos || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectPolitica', 'Seleccione política')}</option>
                                <option value="gratis_hasta_2">{t('gratis_hasta_2', 'Gratis hasta 2 años')}</option>
                                <option value="descuento_50">{t('descuento_50', '50% descuento 2-12 años')}</option>
                                <option value="descuento_30">{t('descuento_30', '30% descuento 2-12 años')}</option>
                                <option value="mismo_precio">{t('mismo_precio', 'Mismo precio que adultos')}</option>
                                <option value="no_admiten">{t('no_admiten', 'No admiten niños')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Descuentos y Ofertas */}
                    <Col xs={12}>
                        <h6 className={`border-bottom pb-2 mt-3 ${isRTL ? 'text-end' : ''}`}>
                            🏷️ {t('descuentosOfertas', 'Descuentos y Ofertas')}
                        </h6>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('descuentoGrupo', 'Descuento por Grupo')}
                            </Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="number"
                                    name="descuentoGrupo"
                                    value={postData.descuentoGrupo || ''}
                                    onChange={handleChangeInput}
                                    placeholder="0"
                                    min="0"
                                    max="100"
                                    className={isRTL ? 'text-end' : ''}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                />
                                <span className="input-group-text">%</span>
                            </div>
                            <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                {t('descuentoGrupoHelp', 'Descuento para grupos grandes')}
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('ofertaEspecial', 'Oferta Especial')}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="ofertaEspecial"
                                value={postData.ofertaEspecial || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderOferta', 'Ej: 3x2, Early Booking...')}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    {/* Total Calculado */}
                    <Col xs={12}>
                        <Alert variant="success" className="mt-3">
                            <div className={`d-flex justify-content-between align-items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <strong>{t('totalEstimado', 'Total Estimado')}:</strong>
                                <h4 className="mb-0">{calcularTotal().toLocaleString()} DZD</h4>
                            </div>
                            <small className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                {t('totalHelp', 'Precio base + tarifas niños - Este es un cálculo estimado')}
                            </small>
                        </Alert>
                    </Col>

                    {/* Información de Pago */}
                    <Col xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('infoPago', 'Información de Pago')}
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="infoPago"
                                value={postData.infoPago || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderInfoPago', 'Condiciones de pago, seña requerida, métodos de pago aceptados...')}
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

export default TarifasYprecios;