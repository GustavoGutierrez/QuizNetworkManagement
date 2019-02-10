class MultipleChoicesList {
    constructor(_title, _items) {
        this._title = _title;
        this._items = _items;
        this._question = {
            "title": "",
            "type": "array",
            "items": {
                "type": "string",
                "enum": []
            }
        };
        this._question.title = _title;
        this._question.items.enum = _items;
    }
    buld() {
        return this._question;
    }
}
module.exports = MultipleChoicesList;
