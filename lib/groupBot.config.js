export const commands = {
    HI: 'Hola',
    GET_CLASIFICATION: 'hotlaps',
    GET_PODIUM: 'podio',
    SET_TIME: 'mi tiempo es',
    EMPTY: 'elimina todo',
    EMPTY_MINE: 'borra',
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
    - ${commands.SET_TIME} MM:SS.MLS: añade el tiempo a la clasificación
    - ${commands.GET_CLASIFICATION}: Muestra la clasificacion actual
    - ${commands.GET_PODIUM}: Muestra el podio actual
    - ${commands.EMPTY_MINE}: Borra el tiempo introducido
    `
}