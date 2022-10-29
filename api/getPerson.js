import { findAllPerson } from "../lib/getPerson.js";

module.exports = async (request, response) => {
  try {
    const persons = await findAllPerson();
    response.json(persons);
  } catch (error) {
    console.error(error);
    response.response = 400;
    response.setHeader("Content-Type", "application/json");
    response.json({ error: "mal" });
  }
};
