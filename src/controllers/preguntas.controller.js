import { getConnection, sql } from "../database/connection";
import { queries } from "../database/querys";

export const ConsultarPreguntas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.consultarPreguntas);

    const questionsMap = {};

    result.recordset.forEach(row => {
      if (!questionsMap[row.Id_question]) {
        questionsMap[row.Id_question] = {
          Id_question: row.Id_question,
          question: row.question,
          options: []
        };
      }

      questionsMap[row.Id_question].options.push({
        Id_Options: row.Id_Options,
        Option_: row.Option_,
        Is_Correct: row.Is_Correct
      });
    });

    let questions = Object.values(questionsMap);

    // Seleccionar 10 preguntas aleatoriamente
    questions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);

    // Modificar cada pregunta para incluir la respuesta correcta y las incorrectas
    questions.forEach(question => {
      const correctOption = question.options.find(option => option.Is_Correct);
      const incorrectOptions = question.options.filter(option => !option.Is_Correct);
      question.correctAnswer = correctOption.Option_;
      question.incorrectAnswers = incorrectOptions.map(option => option.Option_);
    });

    res.json(questions);
  } catch (error) {
    console.error('Error al obtener preguntas:', error);
    res.status(500).json({ msg: "Error Interno Del Servidor" });
  }
};
