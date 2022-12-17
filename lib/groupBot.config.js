export const commands = {
    HI: 'Hola',
    GET_GP_CLASIFICATION: 'hotlaps GP',
    GET_SP_CLASIFICATION: 'hotlaps SP',
    GET_PODIUM: 'podio',
    SET_GP_TIME: 'mi tiempo GP es',
    SET_SP_TIME: 'mi tiempo SP es',
    EMPTY: 'elimina todo',
    EMPTY_GP_MINE: 'borra GP',
    EMPTY_SP_MINE: 'borra SP',
    AYUDA: 'ayuda'
}
export const messages = {
    OFFLINE: 'Bot fuera de servicio temporalmente, volveremos a estar activos pronto',
    GROUP_CREATION: 'Whasssuuup grupo',
    NEW_USER: 'Qué tal piloto! Bienvenido al grupo',
    LEFT_USER: 'Bye. Esperamos verte pronto de vuelta 👋🏻',
    NOT_UNDERSTAND: 'Disculpa no te he entendido ☹️',
    HI: 'Hola',
    WELCOME: 'Bienvenid@ al chat',
    NO_PARTICIPANTS: '⏱ Nadie ha registrado tiempos validos por el momento ⏱',
    REMOVED_DONE: 'Todos los registros han sido eliminados 🗑',
    REMOVED_NOT_AUTHORIZED: 'No tienes suficientes permisos para hacer esta operacion',
    REMOVED_ONE_DONE: 'Tu registro ha sido eliminado 🎯',
    THANKS_PLAYING: 'Gracias',
    BAD_TIME_INPUT: 'Lo siento, pero el formato de tiempo que has introducido no es correcto. Recuerda que debe tener el formato MM:SS.MLS',
    HELP: `
    Los comandos disponibles son:
    - ${commands.HI}: Saludar
    - ${commands.SET_GP_TIME} MM:SS.MLS: Para registrar tiempo en GP
    - ${commands.SET_SP_TIME} MM:SS.MLS: Para registrar tiempo en SPRINT
    - ${commands.GET_GP_CLASIFICATION}: Para mostrar la clasificacion GP
    - ${commands.GET_SP_CLASIFICATION}: Para mostrar la clasificacion SPRINT
    - ${commands.GET_PODIUM}: Muestra el podio actual
    - ${commands.EMPTY_GP_MINE}: Para borrar tus registros en la clasificacion GP
    - ${commands.EMPTY_SP_MINE}: Para borrar tus registros en la clasificacion SPRINT
    `
}