const MultipleChoicesList = require("./multipleChoicesList");
const ToggleChoicesList = require("./toggleChoicesList");

/*
{
  "Tipo": "selectionUniq",
  "ReferenceLayer": "1",
  "Question": "¿Qué dos caracteríusticas forman parte de TCP?",
  "A": "Fiable",
  "B": "Sin conexión",
  "C": "No controla el flujo",
  "D": "Reénvia lo que no se haya recibido.",
  "CorrectAnswer": "A\r"
  }
*/

interface Question {
  Type: string;
  ReferenceLayer: string;
  Question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  CorrectAnswer: string;
}

enum QuestionType {
  MULTI_SELECT = "multiSelect",
  SELECT_UNIQ = "selectionUniq",
  NUMBER = "number",
}

export class Builder {

  private _JsonSchema = {
    "type": "object",
    "properties": {},
    "required": []
  };


  constructor(private _questions: Question[]) { }

  run() {
    let answers = {};
    let form = [];
    if (this._questions.length) {
      this._questions.forEach((q, index) => {
        let questionName = `q${index + 1}`;

        let valAnswer = q.CorrectAnswer.trim();

        answers[questionName] = valAnswer.indexOf(',') >= 0 ? valAnswer.split(',') : valAnswer;

        this._JsonSchema.required.push(questionName);
        let title = `${index+1}. ${q.Question.trim()}`;

        switch (q.Type) {

          case QuestionType.MULTI_SELECT: {
            this._JsonSchema.properties[questionName] = new MultipleChoicesList(title, ["A",
              "B",
              "C",
              "D"]).buld();

            form.push(
              {
                "key": questionName,
                "type": "checkboxes",
                "titleMap": [
                  { "value": "A", "name": q.A.trim() },
                  { "value": "B", "name": q.B.trim() },
                  { "value": "C", "name": q.C.trim() },
                  { "value": "D", "name": q.D.trim() },
                ]
              }
            )
            break;
          }

          case QuestionType.SELECT_UNIQ: {
            this._JsonSchema.properties[questionName] = new ToggleChoicesList(title, [
              "A",
              "B",
              "C",
              "D",
            ]).buld();

            form.push(
              {
                "key": questionName,
                "type": "radios",
                "titleMap": [
                  { "value": "A", "name": q.A.trim() },
                  { "value": "B", "name": q.B.trim() },
                  { "value": "C", "name": q.C.trim() },
                  { "value": "D", "name": q.D.trim() },
                ]
              }
            )
            break;
          }

          case QuestionType.NUMBER: {
            console.log('No implement:', q);
            break;
          }

          default: {
            console.log('Question not souport', q);
            break;
          }

        }

      });
    }

    return { schema: this._JsonSchema, answers, form };
  }
}
