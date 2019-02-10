const SchemaBuilder = require("../schemaBuilder/builder");
const csvToJson = require('convert-csv-to-json');
const path = require('path');

module.exports = function (Answer) {
  /**
   * Genera un subarray random de una longitud determinada
   * @param {*} arr
   * @param {*} n
   */
  const randomQuestions = (arr, n) => {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("randomQuestions: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  Answer.randomQuestions = function (quantity, callback) {
    let filename = path.basename('../../questions.csv');

    let json = csvToJson.getJsonFromCsv(filename);
    try {
      const Builder = new SchemaBuilder.Builder(randomQuestions(json, quantity));

      callback(null, Builder.run());

    } catch (error) {
      callback(error);
    }

  };
  Answer.remoteMethod(
    'randomQuestions', {
      description: 'Genera aleatoriamente una serie de preguntas',
      http: {
        verb: 'get'
      },
      accepts: [{
        arg: 'quantity',
        type: 'number',
        default: 10
      }],
      returns: {
        arg: 'data',
        type: 'object'
      }
    }
  );

  Answer.getQuestions = function (callback) {
    let filename = path.basename('../../questions.csv');

    let json = csvToJson.getJsonFromCsv(filename);


    callback(null, json);
  };

  Answer.remoteMethod(
    'getQuestions', {
      description: 'Obtiene un la lista total de preguntas',
      http: {
        verb: 'get'
      },
      returns: {
        arg: 'data',
        type: 'array'
      }
    }
  );

};
