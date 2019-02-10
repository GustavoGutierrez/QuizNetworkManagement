class MultipleChoicesList {
  private _question = {
    "title": "",
    "type": "array",
    "items": {
      "type": "string",
      "enum": []
    }
  }

  constructor(private _title:string, private _items:string[]) {
    this._question.title = _title;
    this._question.items.enum = _items;
  }

  public buld() {

    return this._question;

  }
}

module.exports = MultipleChoicesList;
