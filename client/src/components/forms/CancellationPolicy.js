import React from 'react';
import { Form, Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const CancellationPolicy = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const policies = [
        { value: 'Flexible', color: 'success', icon: '✅' },
        { value: 'Moderee', color: 'warning', icon: '⚠️' },
        { value: 'Strict', color: 'danger', icon: '❌' }
    ];

    return (
        <Card className="mb-3">
            <Card.Header>
                <h6 className="mb-0">📝 {t('politique_annulation')}</h6>
            </Card.Header>
            <Card.Body>
                <Form.Group>
                    <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                        {t('selectionnez_politique')}
                    </Form.Label>
                    <Form.Select
                        name="cancelarreserva"
                        value={postData.cancelarreserva || ''}
                        onChange={handleChangeInput}
                        className="mb-3"
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        <option value="">-- {t('selectionnez_politique')} --</option>
                        {policies.map(policy => (
                            <option key={policy.value} value={policy.value}>
                                {policy.icon} {t(`politique_${policy.value.toLowerCase()}`)}
                            </option>
                        ))}
                    </Form.Select>
                    
                    {/* Descripción de la política seleccionada */}
                    {postData.cancelarreserva && (
                        <div className={`alert alert-${policies.find(p => p.value === postData.cancelarreserva)?.color || 'info'} mt-3`}>
                            <div className={`d-flex align-items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <span className="fs-5 me-2">
                                    {policies.find(p => p.value === postData.cancelarreserva)?.icon}
                                </span>
                                <div className={isRTL ? 'text-end' : ''}>
                                    <strong>{t(`titre_${postData.cancelarreserva.toLowerCase()}`)}</strong>
                                    <div className="small mt-1">
                                        {t(`description_${postData.cancelarreserva.toLowerCase()}`)}
                                    </div>
                                    <div className="small text-muted mt-2">
                                        {t(`details_${postData.cancelarreserva.toLowerCase()}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Vista previa de todas las políticas */}
                    <div className="mt-4">
                        <h6 className={`text-muted mb-3 ${isRTL ? 'text-end' : ''}`}>
                            {t('apercu_politiques')}
                        </h6>
                        <Row className="g-2">
                            {policies.map(policy => (
                                <Col key={policy.value} md={4}>
                                    <div 
                                        className={`border rounded p-3 text-center cursor-pointer ${postData.cancelarreserva === policy.value ? `border-${policy.color} bg-${policy.color}-subtle` : ''}`}
                                        onClick={() => handleChangeInput({
                                            target: { 
                                                name: 'cancelarreserva', 
                                                value: policy.value 
                                            }
                                        })}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="fs-4">{policy.icon}</div>
                                        <div className="fw-bold small">
                                            {t(`titre_${policy.value.toLowerCase()}`)}
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default CancellationPolicy;