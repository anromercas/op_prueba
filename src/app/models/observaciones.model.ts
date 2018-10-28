export class ObservacionesPreventivas {
    constructor(
        public fechacreacion: string,
        public usuario: string,
        public formulario: string,
        public fecha: string,
        public zona: string,
        public estado: string,
        public repeticion?: string,
        public _id?: string
    ) { }
}
