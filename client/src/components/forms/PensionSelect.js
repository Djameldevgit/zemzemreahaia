import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const PensionSelect = ({ postData, handleChangeInput }) => {
    const { t } = useTranslation('categories');
    
    return (
        <Form.Group className="mb-3">
            <Form.Label>{t('typePension')}</Form.Label>
            <Form.Select
                name="serviciosdelhotel"
                value={postData.serviciosdelhotel || ''}
                onChange={handleChangeInput}
            >
                <option value="">{t('selectionnezPension')}</option>
                <option value="Complète">{t('pensionComplete')}</option>
                <option value="Demi-pension">{t('demiPension')}</option>
                <option value="Petit déjeuner">{t('petitDejeuner')}</option>
                <option value="Sans repas">{t('sansRepas')}</option>
            </Form.Select>
        </Form.Group>
    );
};

export default PensionSelect;