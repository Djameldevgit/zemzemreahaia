import React from 'react';
import { Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const HotelHajjOmra = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const categoriasHoteles = [
        { value: '5_estrellas', label: '⭐⭐⭐⭐⭐ 5 ' + t('estrellas', 'estrellas'), desc: t('lujo', 'Alojamiento de lujo') },
        { value: '4_estrellas', label: '⭐⭐⭐⭐ 4 ' + t('estrellas', 'estrellas'), desc: t('superior', 'Alojamiento superior') },
        { value: '3_estrellas', label: '⭐⭐⭐ 3 ' + t('estrellas', 'estrellas'), desc: t('confort', 'Alojamiento confort') },
        { value: '2_estrellas', label: '⭐⭐ 2 ' + t('estrellas', 'estrellas'), desc: t('economico', 'Alojamiento económico') }
    ];

    return (
        <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                    🏨 {t('alojamientoHajj', 'Alojamiento Hajj/Omra')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    {/* Categoría del Hotel en La Meca */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('hotelMeca', 'Hotel en La Meca')} *
                            </Form.Label>
                            <Form.Select
                                name="categoriaHotelMeca"
                                value={postData.categoriaHotelMeca || ''}
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
                            <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                {postData.categoriaHotelMeca && 
                                    categoriasHoteles.find(c => c.value === postData.categoriaHotelMeca)?.desc
                                }
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    {/* Categoría del Hotel en Medina */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('hotelMedina', 'Hotel en Medina')} *
                            </Form.Label>
                            <Form.Select
                                name="categoriaHotelMedina"
                                value={postData.categoriaHotelMedina || ''}
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
                            <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                {postData.categoriaHotelMedina && 
                                    categoriasHoteles.find(c => c.value === postData.categoriaHotelMedina)?.desc
                                }
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    {/* Distancia a la Mezquita en La Meca */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('distanciaMeca', 'Distancia a Al-Haram (Meca)')} *
                            </Form.Label>
                            <Form.Select
                                name="distanciaMeca"
                                value={postData.distanciaMeca || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectDistancia', 'Seleccione distancia')}</option>
                                <option value="0_200">0-200 m {t('muy_cerca', 'Muy cerca')}</option>
                                <option value="200_500">200-500 m {t('cerca', 'Cerca')}</option>
                                <option value="500_1000">500-1000 m {t('media', 'Distancia media')}</option>
                                <option value="1000_plus">+1000 m {t('lejos', 'Lejos')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Distancia a la Mezquita en Medina */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('distanciaMedina', 'Distancia a Al-Masjid (Medina)')} *
                            </Form.Label>
                            <Form.Select
                                name="distanciaMedina"
                                value={postData.distanciaMedina || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectDistancia', 'Seleccione distancia')}</option>
                                <option value="0_200">0-200 m {t('muy_cerca', 'Muy cerca')}</option>
                                <option value="200_500">200-500 m {t('cerca', 'Cerca')}</option>
                                <option value="500_1000">500-1000 m {t('media', 'Distancia media')}</option>
                                <option value="1000_plus">+1000 m {t('lejos', 'Lejos')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Servicios del Hotel */}
                    <Col xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('serviciosHotel', 'Servicios del Hotel')}
                            </Form.Label>
                            <div className={isRTL ? 'text-end' : ''}>
                                <Form.Check
                                    inline
                                    type="checkbox"
                                    name="wifiHotel"
                                    label={`📶 ${t('wifi', 'Wi-Fi')}`}
                                    checked={postData.wifiHotel || false}
                                    onChange={handleChangeInput}
                                    className={isRTL ? 'ms-2' : 'me-2'}
                                />
                                <Form.Check
                                    inline
                                    type="checkbox"
                                    name="comidasIncluidas"
                                    label={`🍽️ ${t('comidasIncluidas', 'Comidas incluidas')}`}
                                    checked={postData.comidasIncluidas || false}
                                    onChange={handleChangeInput}
                                    className={isRTL ? 'ms-2' : 'me-2'}
                                />
                                <Form.Check
                                    inline
                                    type="checkbox"
                                    name="accesoTransporte"
                                    label={`🚌 ${t('accesoTransporte', 'Transporte al Haram')}`}
                                    checked={postData.accesoTransporte || false}
                                    onChange={handleChangeInput}
                                    className={isRTL ? 'ms-2' : 'me-2'}
                                />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default HotelHajjOmra;