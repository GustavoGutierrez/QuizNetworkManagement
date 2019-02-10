class ToggleChoicesList {
    constructor(_title, _items) {
        this._title = _title;
        this._items = _items;
        this._question = {
            "title": "",
            "type": "string",
            "enum": []
        };
        this._question.title = _title;
        this._question.enum = _items;
    }
    buld() {
        return this._question;
    }
}
module.exports = ToggleChoicesList;
