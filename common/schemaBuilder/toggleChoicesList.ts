interface IItem{
  title: string;
  const: string;
}

class ToggleChoicesList {
  private _question =  {
    "title": "",
    "type": "string",
    "enum": []
  };

  constructor(private _title:string, private _items:IItem[]) {
    this._question.title = _title;

    this._question.enum = _items;
  }

  public buld() {

    return this._question;

  }
}
module.exports  = ToggleChoicesList;
