import { db } from "../firebase/firebase";

export const clearAllPerson = async (groupId) => {
  if (!groupId) {
    throw new Error("No groupid available");
  }
  try {
    return db
      .collection("items")
      .where("groupId", "==", groupId)
      .get()
      .then((snapshot) => snapshot.docs.forEach((item) => item.ref.delete()))
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteOnePerson = async (userId, groupId) => {
  if (!groupId) {
    throw new Error("No groupid available");
  }
  try {
    return db
      .collection("items")
      .where("groupId", "==", groupId)
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((item) => {
          if (item.data().userId === userId) {
            item.ref.delete();
          }
        })
      )
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw new Error(error);
  }
};

export const findAllPerson = async (groupId) => {
  try {
    let collection;
    if (!groupId) {
      collection = db.collection("items");
      // throw new Error("No groupid available");
    } else {
      collection = db.collection("items").where("groupId", "==", groupId);
    }
    return collection
      .get()
      .then((snapshot) => {
        // there won't be much data the sort will be done in memory
        // otherwise an index is needed with duration and groupId
        const data = snapshot.docs.map((doc) => ({ ...doc.data() }));
        return data.sort((a, b) => {
          if (a.duracion >= b.duracion) {
            return 1;
          } else if (a.duracion < b.duracion) {
            return -1;
          } else {
            return 0;
          }
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
};

export const addPerson = async (userId, name, duracion, groupId = null) => {
  try {
    return db
      .collection("items")
      .add({ userId, name, duracion, groupId })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
};

export const upsertPerson = async (userId, name, duracion, groupId = null) => {
  try {
    return db
      .collection("items")
      .where("groupId", "==", groupId)
      .get()
      .then((snapshot) => {
        const one = snapshot.docs.find((doc) => doc.data().name === name);
        if (!one) {
          return db
            .collection("items")
            .add({ userId, name, duracion, groupId });
        } else {
          one.ref.update({ duracion });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
};

export const setPeopleTemplate = (persons) => {
  const texts = persons.map(
    (person, index) =>
      `${index + 1} - ${person.name} - ${timeToString(person.duracion)}`
  );
  return `${texts.join("\n")}`;
};

export const setPodiumTemplate = (persons) => {
  let podium = [
    `🏆 - ${persons[0].name} - ${timeToString(persons[0].duracion)}`,
  ];

  if (persons.length > 1) {
    podium = [
      ...podium,
      `🥈 - ${persons[1].name} - ${timeToString(persons[1].duracion)}`,
    ];
  }
  if (persons.length > 2) {
    podium = [
      ...podium,
      `🥉 - ${persons[2].name} - ${timeToString(persons[2].duracion)}`,
    ];
  }
  return `${podium.join("\n")}`;
};

const timeToString = (time) => {
  let miliseconds = time % 1000;
  const scaleSeconds = Math.floor(time / 1000);
  const hours = Math.floor(scaleSeconds / (24 * 60));
  const restHours = scaleSeconds % (24 * 60);
  const minutes = Math.floor(restHours / 60);
  const seconds = restHours % 60;
  const output = `${hours.toString().padStart(2, 0)}:${minutes
    .toString()
    .padStart(2, 0)}:${seconds.toString().padStart(2, 0)}.${miliseconds
    .toString()
    .padStart(3, 0)}`;

  return output;
};
