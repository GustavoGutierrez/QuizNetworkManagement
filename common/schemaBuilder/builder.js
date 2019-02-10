"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MultipleChoicesList = require("./multipleChoicesList");
const ToggleChoicesList = require("./toggleChoicesList");
var QuestionType;
(function (QuestionType) {
    QuestionType["MULTI_SELECT"] = "multiSelect";
    QuestionType["SELECT_UNIQ"] = "selectionUniq";
    QuestionType["NUMBER"] = "number";
})(QuestionType || (QuestionType = {}));
class Builder {
    constructor(_questions) {
        this._questions = _questions;
        this._JsonSchema = {
            "type": "object",
            "properties": {},
            "required": []
        };
    }
    run() {
        let answers = {};
        let form = [];
        if (this._questions.length) {
            this._questions.forEach((q, index) => {
                let questionName = `q${index + 1}`;
                let valAnswer = q.CorrectAnswer.trim();
                answers[questionName] = valAnswer.indexOf(',') >= 0 ? valAnswer.split(',') : valAnswer;
                this._JsonSchema.required.push(questionName);
                let title = `${index + 1}. ${q.Question.trim()}`;
                switch (q.Type) {
                    case QuestionType.MULTI_SELECT: {
                        this._JsonSchema.properties[questionName] = new MultipleChoicesList(title, ["A",
                            "B",
                            "C",
                            "D"]).buld();
                        form.push({
                            "key": questionName,
                            "type": "checkboxes",
                            "titleMap": [
                                { "value": "A", "name": q.A.trim() },
                                { "value": "B", "name": q.B.trim() },
                                { "value": "C", "name": q.C.trim() },
                                { "value": "D", "name": q.D.trim() },
                            ]
                        });
                        break;
                    }
                    case QuestionType.SELECT_UNIQ: {
                        this._JsonSchema.properties[questionName] = new ToggleChoicesList(title, [
                            "A",
                            "B",
                            "C",
                            "D",
                        ]).buld();
                        form.push({
                            "key": questionName,
                            "type": "radios",
                            "titleMap": [
                                { "value": "A", "name": q.A.trim() },
                                { "value": "B", "name": q.B.trim() },
                                { "value": "C", "name": q.C.trim() },
                                { "value": "D", "name": q.D.trim() },
                            ]
                        });
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
exports.Builder = Builder;
