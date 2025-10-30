import React from 'react';
import { Card, Form, Button, Row, Col, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ImageUpload = ({ images, handleChangeImages, deleteImages, theme }) => {
    const { t } = useTranslation('categories');
    
    // Función para mostrar imagen/video mejorada
    const mediaShow = (src, isVideo = false, index) => {
        const mediaElement = isVideo ? (
            <video 
                controls 
                style={{ 
                    width: '100%', 
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                }}
            >
                <source src={src} type="video/mp4" />
                {t('navigateurNonSupport')}
            </video>
        ) : (
            <img 
                src={src} 
                alt={t('preview')} 
                style={{ 
                    width: '100%', 
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                }}
            />
        );

        return (
            <div className="position-relative">
                {mediaElement}
                <Badge 
                    bg={isVideo ? 'info' : 'success'} 
                    className="position-absolute top-0 start-0 m-1"
                >
                    {isVideo ? '🎥' : '🖼️'}
                </Badge>
                <Badge 
                    bg="secondary" 
                    className="position-absolute top-0 end-0 m-1"
                >
                    #{index + 1}
                </Badge>
            </div>
        );
    };

    return (
        <Card className="mb-4 border-0 shadow-sm">
          
            <Card.Body>
                {/* Preview des images */}
                {images.length > 0 && (
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="mb-0">
                                {t('mediasSelectionnes')} 
                                <Badge bg="primary" className="ms-2">
                                    {images.length}
                                </Badge>
                            </h6>
                            <small className="text-muted">
                                {t('cliquezSupprimer')}
                            </small>
                        </div>
                        <Row className="g-3">
                            {images.map((img, index) => (
                                <Col key={index} xs={6} md={4} lg={3}>
                                    <div className="position-relative media-thumbnail">
                                        {img.camera 
                                            ? mediaShow(img.camera, false, index)
                                            : img.url
                                                ? mediaShow(img.url, img.url.match(/video/i), index)
                                                : mediaShow(URL.createObjectURL(img), img.type?.match(/video/i), index)
                                        }
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="position-absolute top-0 end-0 rounded-circle"
                                            onClick={() => deleteImages(index)}
                                            style={{ 
                                                width: '28px', 
                                                height: '28px',
                                                transform: 'translate(30%, -30%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '14px',
                                                padding: 0
                                            }}
                                        >
                                            ×
                                        </Button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}

                {/* Upload d'images */}
                <Form.Group>
                    <Form.Label className={`btn ${theme ? 'btn-outline-light' : 'btn-primary'} w-100 py-3`}>
                        <i className="fas fa-cloud-upload-alt me-2"></i>
                        {t('ajouterMedias')}
                        <Form.Control 
                            type="file" 
                            multiple 
                            accept="image/*,video/*" 
                            onChange={handleChangeImages}
                            style={{ display: 'none' }}
                        />
                    </Form.Label>
                    <Form.Text className="text-muted d-block mt-2">
                        <i className="fas fa-info-circle me-1"></i>
                        {t('formatsAcceptes')}
                    </Form.Text>
                </Form.Group>

             
            </Card.Body>
        </Card>
    );
};

export default ImageUpload;