import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AddressInput = ({ 
    postData, 
    handleChangeInput, 
    wilayasOptions, 
    communesOptions, 
    handleWilayaChange, 
    handleCommuneChange 
}) => {
    const { t } = useTranslation('categories');
    
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>{t('villeDepart')}</Form.Label>
                <Form.Control
                    type="text"
                    name="adress"
                    value={postData.adress || ''}
                    onChange={handleChangeInput}
                    placeholder={t('placeholderAdresse')}
                />
            </Form.Group>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('wilaya')}</Form.Label>
                        <Form.Select
                            name="wilaya"
                            value={postData.wilaya || ''}
                            onChange={handleWilayaChange}
                            required
                        >
                            <option value="">{t('selectionnezWilaya')}</option>
                            {wilayasOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('commune')}</Form.Label>
                        <Form.Select
                            name="commune"
                            value={postData.commune || ''}
                            onChange={handleCommuneChange}
                            required
                        >
                            <option value="">{t('selectionnezCommune')}</option>
                            {communesOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
};

export default AddressInput;