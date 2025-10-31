import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NombreLugarLocationVacances = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    return (
        <Card className="mb-4">
            <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                    🏡 {t('nombreLugarLocation', 'Nombre y Lugar - Location Vacances')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    {/* Nombre de la Propiedad */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('nombrePropiedad', 'Nombre de la Propiedad')} *
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="nombrePropiedad"
                                value={postData.nombrePropiedad || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderNombrePropiedad', 'Ej: Villa Mar Bella, Apartamento Vista al Mar...')}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

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
                                <option value="villa">🏠 {t('villa', 'Villa')}</option>
                                <option value="apartamento">🏢 {t('apartamento', 'Apartamento')}</option>
                                <option value="studio">🔲 {t('studio', 'Studio')}</option>
                                <option value="riad">🏺 {t('riad', 'Riad')}</option>
                                <option value="chalet">⛰️ {t('chalet', 'Chalet')}</option>
                                <option value="casa_campo">🌄 {t('casa_campo', 'Casa de campo')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Dirección */}
                    <Col xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('direccionCompleta', 'Dirección Completa')} *
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="direccionCompleta"
                                value={postData.direccionCompleta || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderDireccion', 'Ej: Calle Principal Nº 123, Jijel')}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    {/* Ciudad y Código Postal */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('ciudad', 'Ciudad')} *
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="ciudad"
                                value={postData.ciudad || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderCiudad', 'Ej: Jijel, Alger, Oran...')}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('codigoPostal', 'Código Postal')}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="codigoPostal"
                                value={postData.codigoPostal || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderCodigoPostal', 'Código postal')}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    {/* Zona/Barrio */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('zonaBarrio', 'Zona/Barrio')}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="zonaBarrio"
                                value={postData.zonaBarrio || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderZona', 'Ej: Corniche, Centre-ville, Plage...')}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    {/* Referencias Cercanas */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('referenciasCercanas', 'Referencias Cercanas')}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="referenciasCercanas"
                                value={postData.referenciasCercanas || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderReferencias', 'Ej: A 200m de la playa, cerca del mercado...')}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    {/* Descripción de la Ubicación */}
                    <Col xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('descripcionUbicacion', 'Descripción de la Ubicación')}
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descripcionUbicacion"
                                value={postData.descripcionUbicacion || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderDescUbicacion', 'Describa el entorno, vistas, accesos...')}
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

export default NombreLugarLocationVacances;