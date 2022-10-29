import {
  findAllPerson,
  setPeopleTemplate,
  addPerson,
  clearAllPerson,
  setPodiumTemplate,
} from "./getPerson";

export const startAction = async (bot, ctx) => {
  const {
    chat: { id, first_name },
  } = ctx;
  const template = `Hola! Vamos a jugar 💪🏻 ${first_name}`;
  await bot.sendMessage(id, template, {
    parse_mode: "Markdown",
  });
};

export const tiempoAction = async (bot, ctx) => {
  const {
    chat: { id },
  } = ctx;
  await bot.sendMessage(id, 'Escribe el tiempo usado en formato "H : M : S . MS"', {
    parse_mode: "Markdown",
  });
};

export const getClasificacion = async (bot, ctx) => {
  const {
    chat: { id },
  } = ctx;
  const clasificacion = await findAllPerson();
  if (clasificacion.length === 0) {
    await bot.sendMessage(id,'Nadie ha participado aun! 💪🏻🏁', {
      parse_mode: "Markdown",
    });  
  }
  const mensaje = setPeopleTemplate(clasificacion);
  await bot.sendMessage(id, mensaje, {
    parse_mode: "Markdown",
  });
};

export const getPodiumAction = async (bot, ctx) => {
  const {
    chat: { id },
  } = ctx;
  const clasificacion = await findAllPerson();
  if (clasificacion.length === 0) {
    await bot.sendMessage(id,'Nadie ha participado aun! 💪🏻🏁', {
      parse_mode: "Markdown",
    });  
  }
  const podium = clasificacion.splice(0, 3);
  const mensaje = setPodiumTemplate(podium);
  await bot.sendMessage(id, mensaje, {
    parse_mode: "Markdown",
  });
};

export const clearAllAction = async (bot, ctx) => {
  const {
    chat: { id },
  } = ctx;
  const clasificacion = await clearAllPerson();
  await bot.sendMessage(id, "Todos los registros eliminados", {
    parse_mode: "Markdown",
  });
};

export const addTiempoAction = async (bot, ctx) => {
  const {
    chat: { id, first_name },
    text,
  } = ctx;
  try {
    if (!text) {
      throw new Error("Empty date");
    }
    const parsedDate = parsedTime(text);
    if (!parsedDate) {
      throw new Error("Not a Date");
    }
    const tiempo = parsedDate.miliseconds + parsedDate.seconds*1000 + parsedDate.minutes*60*1000 + parsedDate.hours*24*60*1000 ;
    await addPerson(first_name, tiempo);

    await bot.sendMessage(id, `Gracias por participar ${first_name} 👏🏻`, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    await bot.sendMessage(id, "formato no correcto", {
      parse_mode: "Markdown",
    });
    throw error;
  }
};

const parsedTime = (time) => {
  if (!time) {
    return false;
  }
  const arrTime =(time).split(/\:|\./)

  if (arrTime.length === 1 | arrTime.length > 4) {
    return null;
  }

  const parsedTime = [...arrTime.reverse().map(num => parseInt(num, 10)),...new Array(4-arrTime.length).fill(0)];
  const [ miliseconds, seconds, minutes, hours ] = parsedTime;

  if (miliseconds > 1000) {return null;}
  if (seconds > 60) {return null;}
  if (minutes > 60) {return null;}
  if (hours > 24) {return null;}

  return {hours, minutes, seconds, miliseconds};
};
