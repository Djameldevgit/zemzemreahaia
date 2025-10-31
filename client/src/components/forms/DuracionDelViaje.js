import React from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DuracionDelViaje = ({ postData }) => {
  const { t, i18n } = useTranslation('categories');
  const isRTL = i18n.language === 'ar';

  // Función para calcular los días de diferencia
  const calculateDays = () => {
    if (!postData.datedepar || !postData.dateretour) {
      return null;
    }

    const start = new Date(postData.datedepar);
    const end = new Date(postData.dateretour);
    
    // Diferencia en milisegundos
    const difference = end.getTime() - start.getTime();
    
    // Convertir a días
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    
    return days;
  };

  const days = calculateDays();

  return (
    <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
      <Col xs={12}>
        {days !== null && (
          <Alert variant="info" className="py-2">
            <strong>
              {t('duration', 'Durée du voyage')}: {days} {days === 1 ? t('day', 'jour') : t('days', 'jours')}
            </strong>
          </Alert>
        )}
      </Col>
    </Row>
  );
};

export default DuracionDelViaje;