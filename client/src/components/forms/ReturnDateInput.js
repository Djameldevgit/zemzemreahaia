import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ReturnDateInput = ({ postData, handleChangeInput }) => {
    const { t } = useTranslation('common');
    
    return (
        <Form.Group className="mb-3">
            <Form.Label>{t('dateRetour')}</Form.Label>
            <Form.Control
                type="date"
                name="fecharegreso"
                value={postData.fecharegreso || ''}
                onChange={handleChangeInput}
                required
            />
        </Form.Group>
    );
};

export default ReturnDateInput;