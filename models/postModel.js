const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    // 🔷 CAMPOS EXISTENTES DEL SISTEMA
    content: String,
    title: String,
    link: String,
    price: String,
    priceType: String,
    offerType: String,
    features: {
        type: Array,
        default: []
    },
    images: {
        type: Array,
        required: true
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    user: { type: mongoose.Types.ObjectId, ref: 'user' },

    // 🔷 CAMPOS COMUNES A TODAS LAS CATEGORÍAS
    category: {
        type: String,
        default: "Agence de Voyage"
    },
    subCategory: String,
    description: String,
    wilaya: String,
    commune: String,
    contacto: String,

    // 🔷 CAMPOS DE VIAJE (COMPARTIDOS)
    datedepar: String,
    horadudepar: String,
    horariollegada: String,
    duracionviaje: String,
    fecharegreso: String,

    // 🔷 CAMPOS DE TRANSPORTE
    transporte: String,
    tipoTransporte: String,           // 🔷 NUEVO - para componente TransporteViaje
    claseTransporte: String,          // 🔷 NUEVO
    companiaTransporte: String,       // 🔷 NUEVO
    numeroTransporte: String,         // 🔷 NUEVO
    itinerarioTransporte: String,     // 🔷 NUEVO
    tiempoTransporte: String,         // 🔷 NUEVO
    serviciosTransporte: {
        type: Array,
        default: []
    },
    comentariosTransporte: String,

    // 🔷 CAMPOS DE PERIODO VIAJE
    mesInicio: String,                // 🔷 NUEVO - para componente PeriodoViaje
    mesFin: String,                   // 🔷 NUEVO
    temporada: String,                // 🔷 NUEVO
    anio: String,                     // 🔷 NUEVO

    // 🔷 PRECIOS
    prixAdulte: String,
    prixEnfant: String,
    prixBebe: String,

    // 🔷 SERVICIOS GENERALES
    servicesInclus: {
        type: Array,
        default: []
    },
    activites: {
        type: Array,
        default: []
    },
    language: {
        type: Array,
        default: []
    },
    specifications: {
        type: Array,
        default: []
    },
    optionsPaiement: {
        type: Array,
        default: []
    },
    documentsRequises: {
        type: Array,
        default: []
    },
    excursions: {
        type: Array,
        default: []
    },

    // 🔷 TIPO Y CATEGORÍA
    typeVoyage: String,
    niveauConfort: String,
    publicCible: String,

    // 🔷 CAMPOS ESPECÍFICOS PARA VOYAGE ORGANISÉ
    destinacionvoyage1: String,
    destinacionvoyage2: String,
    paysDestination: String,
    voyage1hotel1: String,
    voyage1nombrehotel1: String,
    voyage2hotel2: String,
    voyage1nombrehotel2: String,

    // 🔷 CAMPOS PARA CLASIFICACION HOTEL
    servicios: {                      // 🔷 NUEVO - para componente ClasificacionHotel
        type: Array,
        default: []
    },
    serviciosTr: {                    // 🔷 NUEVO
        type: Array,
        default: []
    },
    nombredelhotel: String,
    adresshotel: String,
    estrellas: String,
    serviciosdelhotel: String,
    incluidoenelprecio: String,
    totalhabitaciones: String,
    tipodehabutaciones: {
        type: Array,
        default: []
    },
    wifi: {
        type: Array,
        default: []
    },
    hotelWebsite: String,

    // 🔷 CAMPOS ESPECÍFICOS PARA LOCATION VACANCES
    Location_Vacances: String,
    alquilergeneral: String,
    superficie: String,
    etage: String,
    promoteurimmobilier: {
        type: Boolean,
        default: false
    },
    adress: String,
    capacitePersonnes: String,
    nombreChambres: String,
    nombreSallesBain: String,

    // 🔷 EQUIPAMIENTOS
    wifiGratuit: {
        type: Boolean,
        default: false
    },
    climatisation: {
        type: Boolean,
        default: false
    },
    cuisineEquipee: {
        type: Boolean,
        default: false
    },
    television: {
        type: Boolean,
        default: false
    },
    piscine: {
        type: Boolean,
        default: false
    },
    parking: {
        type: Boolean,
        default: false
    },
    animauxAcceptes: {
        type: Boolean,
        default: false
    },
    menageInclus: {
        type: Boolean,
        default: false
    },

    // 🔷 CHECK-IN/OUT
    checkInTime: String,
    checkOutTime: String,

    // 🔷 TARIFAS
    tarifnuit: String,
    reservacionenlinea: String,
    views: { type: Number, default: 0 },
    // 🔷 PAGO
    acompteRequise: {
        type: Boolean,
        default: false
    },
    pourcentageAcompte: String,

    // 🔷 CAMPOS ESPECÍFICOS PARA HAJJ & OMRA
    destinacionhadj: String,
    guideLocal: {
        type: Boolean,
        default: false
    },
    repasInclus: {
        type: Boolean,
        default: false
    },
    transfertAeroport: {
        type: Boolean,
        default: false
    },
    delaiTraitement: String,
    formalites: String,
    assurancesIncluses: {
        type: Boolean,
        default: false
    },
  
    // 🔷 POLÍTICAS Y CONTACTO (COMPARTIDOS)
    cancelarreserva: String,
    conditionsAnnulation: String,
    politiqueAnnulation: String,
    itemsReservations_Visa: String
   
}, {
    timestamps: true
})

// 🔷 ÍNDICES PARA MEJOR PERFORMANCE
postSchema.index({ category: 1, subCategory: 1 })
postSchema.index({ wilaya: 1, commune: 1 })
postSchema.index({ user: 1, createdAt: -1 })

module.exports = mongoose.model('post', postSchema)