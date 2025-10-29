import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ResumenPeregrinacion = ({ postData }) => {
    const { t } = useTranslation('categories');

    return (
        <Card className="mb-3 border-success">
            <Card.Header className="bg-success text-white">
                <h6 className="mb-0">🕋 {t('resumenPeregrinacion')}</h6>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md={6}>
                        <h6>{t('informacionGeneral')}</h6>
                        <div className="mb-2">
                            <strong>{t('tipoPeregrinacion')}:</strong> 
                            <Badge bg="primary" className="ms-2">{postData.tipoPeregrinacion || 'Omra'}</Badge>
                        </div>
                        <div className="mb-2">
                            <strong>{t('duracion')}:</strong> {postData.duracion || '16'} {t('dias')}
                        </div>
                        <div className="mb-2">
                            <strong>{t('temporada')}:</strong> {postData.temporada || t('invierno')}
                        </div>
                        <div className="mb-2">
                            <strong>{t('aerolinea')}:</strong> {postData.aerolinea || 'Air Algérie'}
                        </div>
                    </Col>
                    
                    <Col md={6}>
                        <h6>{t('fechasViaje')}</h6>
                        <div className="mb-2">
                            <strong>{t('salida')}:</strong> {postData.fechaSalida || '22/12/2025'}
                        </div>
                        <div className="mb-2">
                            <strong>{t('regreso')}:</strong> {postData.fechaRegreso || '06/01/2026'}
                        </div>
                        <div className="mb-2">
                            <strong>{t('itinerario')}:</strong> {postData.itinerario || t('medinaJeddah')}
                        </div>
                    </Col>
                </Row>

                <hr />
                
                <h6>{t('alojamientos')}</h6>
                <Row>
                    <Col md={6}>
                        <div className="mb-3 p-2 border rounded">
                            <strong>🏨 {t('medina')}</strong>
                            <div>{postData.hotelMedina || 'فندق المدينة مجموعة الحياة'}</div>
                            <small className="text-muted">
                                ⭐⭐⭐ | 200m {t('delHaram')}
                            </small>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3 p-2 border rounded">
                            <strong>🏨 {t('mecca')}</strong>
                            <div>{postData.hotelMecca || 'فندق روعة الشموخ'}</div>
                            <small className="text-muted">
                                ⭐⭐⭐ | 750m {t('delHaram')}
                            </small>
                        </div>
                    </Col>
                </Row>

                <hr />
                
                <h6>{t('preciosPorHabitacion')}</h6>
                <Row>
                    <Col md={3} className="text-center">
                        <div className="border p-2 rounded">
                            <strong>2 {t('personas')}</strong>
                            <div className="text-success fw-bold">329,000 دج</div>
                        </div>
                    </Col>
                    <Col md={3} className="text-center">
                        <div className="border p-2 rounded">
                            <strong>3 {t('personas')}</strong>
                            <div className="text-success fw-bold">289,000 دج</div>
                        </div>
                    </Col>
                    <Col md={3} className="text-center">
                        <div className="border p-2 rounded">
                            <strong>4 {t('personas')}</strong>
                            <div className="text-success fw-bold">259,000 دج</div>
                        </div>
                    </Col>
                    <Col md={3} className="text-center">
                        <div className="border p-2 rounded">
                            <strong>5 {t('personas')}</strong>
                            <div className="text-success fw-bold">249,000 دج</div>
                        </div>
                    </Col>
                </Row>

                <hr />
                
                <h6>{t('serviciosIncluidos')}</h6>
                <Row>
                    {['visa', 'vuelo', 'alojamiento', 'transporte', 'guia', 'seguro', 'visitas'].map((servicio) => (
                        <Col md={4} key={servicio} className="mb-1">
                            <span className="text-success">✅</span> {t(`servicios.${servicio}`)}
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ResumenPeregrinacion;