import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DestinacionExtranjera = ({ postData, handleChangeInput, destinationNumber = 1 }) => {
    const { t } = useTranslation('categories');
    
    return (
        <Card className="mb-3">
            <Card.Header>
                <h6 className="mb-0">📍 {t('destino')} {destinationNumber} - {t('internacional')}</h6>
            </Card.Header>
            <Card.Body>
                <Form.Group className="mb-3">
                    <Form.Label>{t('ciudadDestino')}</Form.Label>
                    <Form.Select
                        name={`destinacionvoyage${destinationNumber}`}
                        value={postData[`destinacionvoyage${destinationNumber}`] || ''}
                        onChange={handleChangeInput}
                    >
                        <option value="">{t('elegirDestino')}</option>
                        <optgroup label={t('destinosArabes')}>
                            <option value="Dubai">Dubai</option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="El Cairo">El Cairo</option>
                            <option value="Sharm El Sheikh">Sharm El Sheikh</option>
                            <option value="Alejandría">Alejandría</option>
                            <option value="Túnez">Túnez</option>
                            <option value="Sousse">Sousse</option>
                            <option value="Djerba">Djerba</option>
                            <option value="Hammamet">Hammamet</option>
                            <option value="Amán">Amán</option>
                            <option value="Aqaba">Aqaba</option>
                            <option value="Petra">Petra</option>
                            <option value="Doha">Doha</option>
                            <option value="Manama">Manama</option>
                            <option value="Mascate">Mascate</option>
                            <option value="Salalah">Salalah</option>
                            <option value="Beirut">Beirut</option>
                            <option value="Trípoli">Trípoli</option>
                        </optgroup>
                        <optgroup label={t('destinosTurquia')}>
                            <option value="Estambul">Estambul</option>
                            <option value="Ankara">Ankara</option>
                            <option value="Esmirna">Esmirna</option>
                            <option value="Antalya">Antalya</option>
                            <option value="Bursa">Bursa</option>
                            <option value="Konya">Konya</option>
                            <option value="Trabzon">Trabzon</option>
                            <option value="Capadocia">Capadocia</option>
                            <option value="Pamukkale">Pamukkale</option>
                            <option value="Éfeso">Éfeso</option>
                        </optgroup>
                        <optgroup label={t('destinosAsia')}>
                            <option value="Kuala Lumpur">Kuala Lumpur</option>
                            <option value="Langkawi">Langkawi</option>
                            <option value="Penang">Penang</option>
                            <option value="Bangkok">Bangkok</option>
                            <option value="Phuket">Phuket</option>
                            <option value="Chiang Mai">Chiang Mai</option>
                            <option value="Singapur">Singapur</option>
                            <option value="Bali">Bali</option>
                            <option value="Yakarta">Yakarta</option>
                            <option value="Seúl">Seúl</option>
                        </optgroup>
                        <optgroup label={t('destinosEuropa')}>
                            <option value="París">París</option>
                            <option value="Lyon">Lyon</option>
                            <option value="Marsella">Marsella</option>
                            <option value="Londres">Londres</option>
                            <option value="Manchester">Manchester</option>
                            <option value="Roma">Roma</option>
                            <option value="Milán">Milán</option>
                            <option value="Venecia">Venecia</option>
                            <option value="Madrid">Madrid</option>
                            <option value="Barcelona">Barcelona</option>
                            <option value="Berlín">Berlín</option>
                            <option value="Múnich">Múnich</option>
                            <option value="Ámsterdam">Ámsterdam</option>
                            <option value="Bruselas">Bruselas</option>
                            <option value="Ginebra">Ginebra</option>
                            <option value="Zúrich">Zúrich</option>
                        </optgroup>
                        <optgroup label={t('destinosAmerica')}>
                            <option value="Nueva York">Nueva York</option>
                            <option value="Los Ángeles">Los Ángeles</option>
                            <option value="Miami">Miami</option>
                            <option value="Las Vegas">Las Vegas</option>
                            <option value="Toronto">Toronto</option>
                            <option value="Montreal">Montreal</option>
                            <option value="Vancouver">Vancouver</option>
                        </optgroup>
                        <optgroup label={t('destinosAfrica')}>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Marrakech">Marrakech</option>
                            <option value="Tánger">Tánger</option>
                            <option value="Dakar">Dakar</option>
                            <option value="Túnez">Túnez</option>
                            <option value="Nairobi">Nairobi</option>
                            <option value="Ciudad del Cabo">Ciudad del Cabo</option>
                        </optgroup>
                    </Form.Select>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default DestinacionExtranjera;