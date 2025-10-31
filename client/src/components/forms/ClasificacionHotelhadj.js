import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ClasificacionHotelhadj = ({ postData = {}, handleChangeInput, handleArrayChange }) => {
    const { t } = useTranslation('categories');
    
    // 🔷 VALIDACIÓN DEFENSIVA - asegurar que los arrays existan
    const servicios = Array.isArray(postData.servicios) ? postData.servicios : [];
    const serviciosTr = Array.isArray(postData.serviciosTr) ? postData.serviciosTr : [];
    const tipodehabutaciones = Array.isArray(postData.tipodehabutaciones) ? postData.tipodehabutaciones : [];
    const wifi = Array.isArray(postData.wifi) ? postData.wifi : [];

    const categoriasEstrellas = [
        { value: '1', label: '⭐' },
        { value: '2', label: '⭐⭐' },
        { value: '3', label: '⭐⭐⭐' },
        { value: '4', label: '⭐⭐⭐⭐' },
        { value: '5', label: '⭐⭐⭐⭐⭐' }
    ];

    const tiposHabitaciones = [
        t('tiposHabitaciones.individual'),
        t('tiposHabitaciones.doble'), 
        t('tiposHabitaciones.triple'),
        t('tiposHabitaciones.suite'),
        t('tiposHabitaciones.familiar'),
        t('tiposHabitaciones.presidencial')
    ];

   
    return (
        <Card className="mb-3">
            <Card.Header>
                <h6 className="mb-0">🏨 {t('clasificacion_hotel')}</h6>
            </Card.Header>
            <Card.Body>
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>{t('nombre_hotel')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombredelhotel"
                                value={postData.nombredelhotel || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholder_nombre_hotel')}
                            />
                        </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>{t('direccion_hotel')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="adresshotel"
                                value={postData.adresshotel || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholder_direccion_hotel')}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="g-3 mt-2">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>{t('categoria_estrellas')}</Form.Label>
                            <Form.Select
                                name="estrellas"
                                value={postData.estrellas || ''}
                                onChange={handleChangeInput}
                            >
                                <option value="">{t('seleccionar_estrellas')}</option>
                                {categoriasEstrellas.map((categoria) => (
                                    <option key={categoria.value} value={categoria.value}>
                                        {categoria.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>{t('total_habitaciones')}</Form.Label>
                            <Form.Control
                                type="number"
                                name="totalhabitaciones"
                                value={postData.totalhabitaciones || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholder_total_habitaciones')}
                            />
                        </Form.Group>
                    </Col>
                    
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>{t('sitio_web_hotel')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="hotelWebsite"
                                value={postData.hotelWebsite || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholder_sitio_web')}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* TIPOS DE HABITACIONES */}
                <Form.Group className="mt-3">
                    <Form.Label>{t('tipos_habitaciones')}</Form.Label>
                    <div className="d-flex flex-wrap gap-3">
                        {tiposHabitaciones.map((tipo) => (
                            <Form.Check
                                key={tipo}
                                type="checkbox"
                                label={t(`tipo_habitacion_${tipo}`)}
                                checked={tipodehabutaciones.includes(tipo)} // ✅ USANDO array validado
                                onChange={(e) => {
                                    if (handleArrayChange) {
                                        handleArrayChange('tipodehabutaciones', tipo, e.target.checked);
                                    } else {
                                        // Fallback seguro
                                        const currentArray = tipodehabutaciones;
                                        let newArray = e.target.checked 
                                            ? [...currentArray, tipo] 
                                            : currentArray.filter(item => item !== tipo);
                                        
                                        const syntheticEvent = {
                                            target: {
                                                name: 'tipodehabutaciones',
                                                value: newArray,
                                                type: 'array'
                                            }
                                        };
                                        handleChangeInput(syntheticEvent);
                                    }
                                }}
                            />
                        ))}
                    </div>
                </Form.Group>

             
                {/* SERVICIOS WIFI */}
                <Form.Group className="mt-3">
                    <Form.Label>{t('servicios_wifi')}</Form.Label>
                    <div className="d-flex flex-wrap gap-3">
                        {['wifi_gratuito', 'wifi_premium', 'wifi_business'].map((tipoWifi) => (
                            <Form.Check
                                key={tipoWifi}
                                type="checkbox"
                                label={t(`wifi_${tipoWifi}`)}
                                checked={wifi.includes(tipoWifi)} // ✅ USANDO array validado
                                onChange={(e) => {
                                    if (handleArrayChange) {
                                        handleArrayChange('wifi', tipoWifi, e.target.checked);
                                    } else {
                                        // Fallback seguro
                                        const currentArray = wifi;
                                        let newArray = e.target.checked 
                                            ? [...currentArray, tipoWifi] 
                                            : currentArray.filter(item => item !== tipoWifi);
                                        
                                        const syntheticEvent = {
                                            target: {
                                                name: 'wifi',
                                                value: newArray,
                                                type: 'array'
                                            }
                                        };
                                        handleChangeInput(syntheticEvent);
                                    }
                                }}
                            />
                        ))}
                    </div>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default ClasificacionHotelhadj;