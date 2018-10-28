export class Usuario {

    constructor(
        public nombre: string,
        public apellido: string,
        public segundoapellido: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public _id?: string
    ) { }

}
