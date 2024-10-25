export interface Propiedad {
    id: number;
    nombre: string;
    ubicacion:string;
    parqueadero:boolean;
    piscina:boolean;
    cuartos:boolean;
    camas:number;
    area:number;
    capacidad:number;
    disponible:boolean;
    precioXnoche:number;
    status:number;
    arrendadorId:number;
    calificaciones:[];
    solicitudes:[];  }

