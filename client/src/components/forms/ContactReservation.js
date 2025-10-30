import React, { useState } from 'react';
import { Form, Alert, InputGroup, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ContactReservation = ({ postData, handleChangeInput }) => {
    const { t } = useTranslation('categories');
    const [showExamples, setShowExamples] = useState(false);

    // Ejemplos de formato para guiar al usuario
    const contactExamples = [
        "📞 +213-555-123-456",
        "📧 email@example.com", 
        "🌐 https://www.agence-voyage.com",
        "📱 WhatsApp: +213-555-789-012",
        "📠 Fax: +213-21-123-456",
        "📍 Adresse: Rue Example, Alger"
    ];

    // Detectar tipo de contacto para mostrar badges
    const detectContactType = (contactText) => {
        if (!contactText) return [];
        
        const types = [];
        if (contactText.includes('@') || contactText.toLowerCase().includes('email')) {
            types.push('email');
        }
        if (/\+\d{2,3}[-.\s]?\d{2,3}[-.\s]?\d{3}[-.\s]?\d{3}/.test(contactText) || 
            contactText.toLowerCase().includes('tel') || 
            contactText.toLowerCase().includes('whatsapp')) {
            types.push('phone');
        }
        if (contactText.toLowerCase().includes('http') || 
            contactText.toLowerCase().includes('www') || 
            contactText.toLowerCase().includes('.com') || 
            contactText.toLowerCase().includes('.dz')) {
            types.push('website');
        }
        if (contactText.toLowerCase().includes('facebook') || 
            contactText.toLowerCase().includes('instagram') || 
            contactText.toLowerCase().includes('twitter')) {
            types.push('social');
        }
        if (contactText.toLowerCase().includes('adresse') || 
            contactText.toLowerCase().includes('rue') || 
            contactText.toLowerCase().includes('address')) {
            types.push('address');
        }
        
        return types;
    };

    const contactTypes = detectContactType(postData.contacto || '');

    return (
        <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
                📞 {t('contactReservation')}
                <span className="text-danger">*</span>
            </Form.Label>

            {/* Badges de tipos de contacto detectados */}
            {contactTypes.length > 0 && (
                <div className="mb-2">
                    <small className="text-muted me-2">{t('typesDetectes')}:</small>
                    {contactTypes.map((type, index) => (
                        <Badge 
                            key={index} 
                            bg={
                                type === 'phone' ? 'success' :
                                type === 'email' ? 'primary' :
                                type === 'website' ? 'info' :
                                type === 'social' ? 'warning' :
                                'secondary'
                            } 
                            className="me-1 mb-1"
                        >
                            {t(`type_${type}`)}
                        </Badge>
                    ))}
                </div>
            )}

            <InputGroup>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="contacto"
                    value={postData.contacto || ''}
                    onChange={handleChangeInput}
                    placeholder={t('placeholderContact')}
                    required
                    style={{ resize: 'vertical' }}
                />
            </InputGroup>

            <Form.Text className="text-muted">
                💡 {t('conseilSaisie')}
            </Form.Text>

            {/* Contador de caracteres */}
            <div className="text-end small text-muted mt-1">
                {(postData.contacto || '').length} {t('caracteres')}
            </div>

            {/* Ejemplos de formato */}
            <Alert 
                variant="info" 
                className="mt-3" 
                style={{ cursor: 'pointer' }}
                onClick={() => setShowExamples(!showExamples)}
            >
                <div className="d-flex justify-content-between align-items-center">
                    <span>
                        <i className="fas fa-lightbulb me-2"></i>
                        {t('exemplesFormat')}
                    </span>
                    <i className={`fas fa-chevron-${showExamples ? 'up' : 'down'}`}></i>
                </div>
                
                {showExamples && (
                    <div className="mt-2 small">
                        {contactExamples.map((example, index) => (
                            <div key={index} className="text-muted mb-1">
                                • {example}
                            </div>
                        ))}
                    </div>
                )}
            </Alert>

            {/* Información de validación */}
            <Alert variant="light" className="small">
                <strong>✅ {t('informationsAcceptees')}:</strong>
                <div className="mt-1">
                    {t('phones')}, {t('emails')}, {t('websites')}, {t('reseauxSociaux')}, {t('adresses')}
                </div>
            </Alert>
        </Form.Group>
    );
};

export default ContactReservation;