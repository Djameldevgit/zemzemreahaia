import React from 'react';
import { Form, Card, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TitleInput = ({ postData, handleChangeInput, placeholder }) => {
    const { t } = useTranslation('categories');
    
    return (
        <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
                <h6 className="mb-0">
                    <i className="fas fa-heading me-2"></i>
                    {t('titreAnnonce')}
                </h6>
            </Card.Header>
            <Card.Body>
                <Form.Group className="mb-0">
                    <Form.Label className="fw-bold text-dark">
                        {t('titre')} <span className="text-danger">*</span>
                    </Form.Label>
                    
                    <InputGroup>
                        <InputGroup.Text className="bg-light border-end-0">
                            <i className="fas fa-pencil-alt text-primary"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="title"
                            value={postData.title || ''}
                            onChange={handleChangeInput}
                            placeholder={placeholder || t('placeholderTitre')}
                            required
                            className="border-start-0"
                            style={{
                                fontSize: '1.1rem',
                                fontWeight: '500',
                                padding: '12px 16px'
                            }}
                        />
                    </InputGroup>
                    
                    <Form.Text className="text-muted mt-2 d-block">
                        <i className="fas fa-lightbulb text-warning me-1"></i>
                        {t('conseilTitre')}
                    </Form.Text>

                    {/* Contador de caracteres */}
                    <div className="text-end mt-2">
                        <small className={`${(postData.title || '').length > 60 ? 'text-warning' : 'text-muted'}`}>
                            {(postData.title || '').length} / 60 {t('caracteres')}
                            {(postData.title || '').length > 60 && (
                                <span className="ms-1">⚠️ {t('titreTropLong')}</span>
                            )}
                        </small>
                    </div>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default TitleInput;