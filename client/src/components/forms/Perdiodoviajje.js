import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const PeriodoViaje = ({ postData, handleChangeInput }) => {
    const { t } = useTranslation('categories');

    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    return (
        <Card className="mb-3">
            <Card.Header>
                <h6 className="mb-0">🗓️ {t('periodoViaje')}</h6>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('mesInicio')}</Form.Label>
                            <Form.Select
                                name="mesInicio"
                                value={postData.mesInicio || ''}
                                onChange={handleChangeInput}
                                required
                            >
                                <option value="">{t('seleccionarMes')}</option>
                                {meses.map((mes, index) => (
                                    <option key={index} value={mes}>
                                        {t(`meses.${mes}`)}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('mesFin')}</Form.Label>
                            <Form.Select
                                name="mesFin"
                                value={postData.mesFin || ''}
                                onChange={handleChangeInput}
                                required
                            >
                                <option value="">{t('seleccionarMes')}</option>
                                {meses.map((mes, index) => (
                                    <option key={index} value={mes}>
                                        {t(`meses.${mes}`)}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('temporada')}</Form.Label>
                            <Form.Select
                                name="temporada"
                                value={postData.temporada || ''}
                                onChange={handleChangeInput}
                            >
                                <option value="">{t('seleccionarTemporada')}</option>
                                <option value="alta">{t('temporadaAlta')}</option>
                                <option value="media">{t('temporadaMedia')}</option>
                                <option value="baja">{t('temporadaBaja')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('anyo')}</Form.Label>
                            <Form.Select
                                name="anyo"
                                value={postData.anyo || ''}
                                onChange={handleChangeInput}
                                required
                            >
                                <option value="">{t('seleccionarAnyo')}</option>
                                {Array.from({ length: 5 }, (_, i) => {
                                    const year = new Date().getFullYear() + i;
                                    return (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PeriodoViaje;