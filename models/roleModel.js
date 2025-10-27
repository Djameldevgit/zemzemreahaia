import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  isUser: { 
    type: Boolean, 
    default: false,
    description: "Indica si es rol de usuario básico" 
  },
  isSuperUser: { 
    type: Boolean, 
    default: false,
    description: "Indica si es rol de superusuario" 
  },
  isModerator: { 
    type: Boolean, 
    default: false,
    description: "Indica si es rol de moderador" 
  },
  isAdmin: { 
    type: Boolean, 
    default: false,
    description: "Indica si es rol de administrador" 
  },
  isActive: {
    type: Boolean,
    default: true,
    description: "Indica si el rol está activo"
  }
}, { 
  timestamps: true,
  versionKey: false 
});

// Método para obtener el nombre del rol basado en los booleanos
roleSchema.methods.getRoleName = function() {
  if (this.isAdmin) return 'admin';
  if (this.isSuperUser) return 'Super-utilisateur';
  if (this.isModerator) return 'Moderateur';
  if (this.isUser) return 'user';
  return 'none';
};

const Role = mongoose.model('role', roleSchema);

export default Role;