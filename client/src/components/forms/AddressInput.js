import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Componente para Wilaya
export const WilayaInput = ({ 
    postData, 
    handleWilayaChange, 
    wilayasOptions 
}) => {
    const { t } = useTranslation('categories');
    
    return (
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
    );
};

// Componente para Ville
export const VilleInput = ({ 
    postData, 
    handleCommuneChange, 
    communesOptions 
}) => {
    const { t } = useTranslation('categories');
    
    return (
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
    );
};

// Componente principal que usa ambos inputs (opcional, para mantener compatibilidad)
const AddressInput = ({ 
    postData, 
    handleChangeInput, 
    wilayasOptions, 
    
    handleWilayaChange, 
 
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
            <Form.Group className="mb-3">
               
                    <WilayaInput 
                    postData={postData}
                    handleWilayaChange={handleWilayaChange}
                    wilayasOptions={wilayasOptions}
                />
                
            </Form.Group>
            
        </>
    );
};

export default AddressInput;