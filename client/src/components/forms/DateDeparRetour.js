import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DateDeparRetour = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('categories');
  
  const isRTL = i18n.language === 'ar'; // Verificar si es árabe (derecha a izquierda)

  return (
    <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
      <Col xs={12} md={6}>
        <Form.Group className="mb-3">
          <Form.Label className={isRTL ? 'text-end d-block' : ''}>
            {t('dateDepart', 'Date de Départ')} *
          </Form.Label>
          <Form.Control
            type="date"
            name="datedepar"
            value={postData.datedepar || ''}
            onChange={handleChangeInput}
            required
            className={isRTL ? 'text-end' : ''}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
            {t('selectDepartureDate', 'Sélectionnez la date de départ')}
          </Form.Text>
        </Form.Group>
      </Col>
      
      <Col xs={12} md={6}>
        <Form.Group className="mb-3">
          <Form.Label className={isRTL ? 'text-end d-block' : ''}>
            {t('dateRetour', 'Date de Retour')} *
          </Form.Label>
          <Form.Control
            type="date"
            name="dateretour"
            value={postData.dateretour || ''}
            onChange={handleChangeInput}
            required
            className={isRTL ? 'text-end' : ''}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
            {t('selectReturnDate', 'Sélectionnez la date de retour')}
          </Form.Text>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default DateDeparRetour;
