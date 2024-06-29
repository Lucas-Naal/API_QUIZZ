import { getConnection, sql } from "../database/connection";
import { queries } from "../database/querys";

export const ConsultarPreguntas = async(req, res) =>  {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query(queries.consultarPreguntas);

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

        const questions = Object.values(questionsMap);

        res.json(questions);

    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        res.status(500).json({ msg: "Error Interno Del Servidor" });
    }
}
