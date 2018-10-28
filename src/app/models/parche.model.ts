export class Patch {
    constructor(
        public _id: String,
        public nombre: String,
        public estado: String,
        public fecha: String,
        public descripcion: String,
        public grado_correcion: String,
        public coste_estimado: String,
        public tiempo_duracion: String,
        public departamento_implicado: String,
        public responsable: String,
        public quien_va_hacer: String,
        public fecha_realizacion: String,
        public comentarios: String,
        public img: String,
    ) {}
}
