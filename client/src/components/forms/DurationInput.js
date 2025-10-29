import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DurationInput = ({ postData, handleChangeInput }) => {
    const { t } = useTranslation('categories');
    
    return (
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>{t('dias')}</Form.Label>
                    <Form.Control
                        type="number"
                        name="diasViaje"
                        value={postData.diasViaje || ''}
                        onChange={handleChangeInput}
                        placeholder={t('placeholderDias')}
                        min="1"
                        required
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>{t('noches')}</Form.Label>
                    <Form.Control
                        type="number"
                        name="nochesViaje"
                        value={postData.nochesViaje || ''}
                        onChange={handleChangeInput}
                        placeholder={t('placeholderNoches')}
                        min="0"
                        required
                    />
                </Form.Group>
            </Col>
        </Row>
    );
};

export default DurationInput;