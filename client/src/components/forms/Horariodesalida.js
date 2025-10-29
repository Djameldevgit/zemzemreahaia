import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Horariodesalida = ({ postData, handleChangeInput }) => {
    const { t } = useTranslation('categories');
    
    return (
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>{t('fechaSalida')}</Form.Label>
                    <Form.Control
                        type="date"
                        name="datedepar"
                        value={postData.datedepar || ''}
                        onChange={handleChangeInput}
                        required
                    />
                    <Form.Text className="text-muted">
                        {t('seleccionarFechaSalida')}
                    </Form.Text>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>{t('horaSalida')}</Form.Label>
                    <Form.Control
                        type="time"
                        name="horadudepar"
                        value={postData.horadudepar || ''}
                        onChange={handleChangeInput}
                        required
                    />
                    <Form.Text className="text-muted">
                        {t('seleccionarHoraSalida')}
                    </Form.Text>
                </Form.Group>
            </Col>
        </Row>
    );
};

export default Horariodesalida;