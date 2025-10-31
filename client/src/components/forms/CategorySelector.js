import React from 'react';
import { Form, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const CategorySelector = ({ postData, handleChangeInput }) => {
    const { t } = useTranslation('categories');

    const categorias = [
        { value: "Voyage_Organise", emoji: "🗺️", color: "primary" },
        { value: "Location_Vacances", emoji: "🏠", color: "success" },
        { value: "hadj_Omra", emoji: "🕋", color: "warning" },
        { value: "Reservations_Visa", emoji: "📋", color: "info" },
        { value: "Sejour", emoji: "🏨", color: "secondary" },
        { value: "Croisiere", emoji: "🚢", color: "danger" },
        { value: "Autre", emoji: "🔖", color: "dark" }
    ];

    const getCategoriaActual = () => {
        return categorias.find(cat => cat.value === postData.subCategory);
    };

    return (
        <Form.Group className="mb-4">
            <Form.Label className="fw-bold">📂 {t('categoriaPublicacion')}</Form.Label>
            
            {/* Mostrar categoría seleccionada */}
            {postData.subCategory && (
                <div className="mb-3">
                    <Badge bg={getCategoriaActual()?.color || 'primary'} className="fs-6 p-2">
                        {getCategoriaActual()?.emoji} {t(`categoriass.${postData.subCategory}`)}
                    </Badge>
                </div>
            )}

            <Form.Select 
                name="subCategory" 
                value={postData.subCategory || ''} 
                onChange={handleChangeInput}
                size="lg"
                required
                className="border-2"
            >
                <option value="">{t('seleccionarCategoria')}</option>
                {categorias.map((categoria) => (
                    <option key={categoria.value} value={categoria.value}>
                        {categoria.emoji} {t(`categoriass.${categoria.value}`)}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
};

export default CategorySelector;