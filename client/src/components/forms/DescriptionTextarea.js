import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DescriptionTextarea = ({ postData, handleChangeInput, placeholder }) => {
    const { t } = useTranslation('categories');
    
    return (
        <Form.Group className="mb-3">
            <Form.Label>{t('description')}</Form.Label>
            <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={postData.description || ''}
                onChange={handleChangeInput}
                placeholder={placeholder || t('placeholderDescription')}
                required
            />
        </Form.Group>
    );
};

export default DescriptionTextarea;