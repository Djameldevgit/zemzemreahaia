import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useTranslation } from 'react-i18next';

const PriceSlider = ({ postData, setPostData }) => {
    const { t } = useTranslation('categories');

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-DZ').format(price);
    };

    const priceRanges = [
        { value: 500, label: `500 ${t('moneda')}` },
        { value: 10000, label: `10,000 ${t('moneda')}` },
        { value: 50000, label: `50,000 ${t('moneda')}` },
        { value: 100000, label: `100,000 ${t('moneda')}` },
        { value: 500000, label: `500,000 ${t('moneda')}` },
        { value: 1000000, label: `1M ${t('moneda')}` },
        { value: 2000000, label: `2M ${t('moneda')}` }
    ];

    return (
        <Form.Group className="mb-3">
            <Form.Label>
                {t('precioPorPersona')}: <strong className="text-success">{formatPrice(postData.price || 0)} {t('moneda')}</strong>
            </Form.Label>
            
            <div style={{ padding: '0 20px', marginBottom: '10px' }}>
                <Slider
                    min={500}
                    max={2000000}
                    step={500}
                    value={postData.price || 0}
                    onChange={(value) => {
                        setPostData(prevState => ({
                            ...prevState,
                            price: value
                        }));
                    }}
                    trackStyle={{ backgroundColor: '#28a745', height: 8 }}
                    handleStyle={{
                        borderColor: '#28a745',
                        height: 24,
                        width: 24,
                        marginLeft: -12,
                        marginTop: -8,
                        backgroundColor: '#ffffff',
                        borderWidth: 3,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                    }}
                    railStyle={{ backgroundColor: '#e9ecef', height: 8 }}
                />
            </div>

            {/* Rango de precios de referencia */}
            <div className="small text-muted mb-3">
                <Row>
                    {priceRanges.map((range, index) => (
                        <Col key={index} className="text-center">
                            <div>{formatPrice(range.value)}</div>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Input manual del precio */}
            <InputGroup className="mb-3">
                <InputGroup.Text>{t('precioPersonalizado')}</InputGroup.Text>
                <Form.Control
                    type="number"
                    min="500"
                    max="2000000"
                    step="500"
                    value={postData.price || ''}
                    onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        setPostData(prevState => ({
                            ...prevState,
                            price: Math.min(Math.max(value, 500), 2000000)
                        }));
                    }}
                    placeholder={t('ingresePrecio')}
                />
                <InputGroup.Text>{t('moneda')}</InputGroup.Text>
            </InputGroup>

            {/* Indicadores de rango de precio */}
            <Row className="text-center">
                <Col>
                    <div className="border rounded p-2 bg-light">
                        <small className="text-muted">{t('economico')}</small>
                        <div className="small fw-bold">{t('rangoEconomico')}</div>
                    </div>
                </Col>
                <Col>
                    <div className="border rounded p-2 bg-light">
                        <small className="text-muted">{t('medio')}</small>
                        <div className="small fw-bold">{t('rangoMedio')}</div>
                    </div>
                </Col>
                <Col>
                    <div className="border rounded p-2 bg-light">
                        <small className="text-muted">{t('premium')}</small>
                        <div className="small fw-bold">{t('rangoPremium')}</div>
                    </div>
                </Col>
            </Row>

            {/* Información adicional */}
            <div className="mt-2 small text-muted">
                <i className="fas fa-info-circle me-1"></i>
                {t('deslizarParaAjustar')} • {t('precioMinimo')} • {t('precioMaximo')}
            </div>
        </Form.Group>
    );
};

export default PriceSlider;