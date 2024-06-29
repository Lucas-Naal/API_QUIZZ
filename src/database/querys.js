export const queries = {
    //!ConsultarPreguntas
    consultarPreguntas: "SELECT  q.Id_question,q.question, o.Id_Options, o.Option_, o.Is_Correct FROM  Questions q JOIN  Options o ON q.Id_question = o.Id_question",
};
