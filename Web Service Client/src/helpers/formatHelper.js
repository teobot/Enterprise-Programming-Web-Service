export default class formatHelper {
  static formatterFactory(format, data) {
    if (format.toUpperCase() === "XML") {
      return this.parseFromXML(data);
    } else if (format.toUpperCase() === "JSON") {
      return this.parseFromJSON(data);
    } else if (format.toUpperCase() === "TEXT") {
      return this.parseFromTEXT(data);
    }
  }

  static parseFromTEXT(dataToParse) {
    // This function converts structured text from the server to a json array for formatting
    var salt = "[@#@]";
    var filmList = dataToParse.split("\n");
    var filmListJsonReturn = [];
    var filmListIndex = filmList[0].split(salt);

    for (let index = 1; index < filmList.length - 1; index++) {
      const filmData = filmList[index];
      var filmObject = {};
      const film = filmData.split(salt);
      for (let fi = 0; fi < filmListIndex.length - 1; fi++) {
        filmObject[filmListIndex[fi]] = film[fi];
      }
      filmListJsonReturn.push(filmObject);
    }

    return filmListJsonReturn;
  }

  static parseFromXML(dataToParse) {
    // This function takes XML and parsers it to a JSON object array
    var filmList = dataToParse.getElementsByTagName("film");
    var xmlToJsonReturnArray = [];
    for (let fi = 0; fi < filmList.length; fi++) {
      const film = filmList[fi];
      var filmObject = {};
      for (let fia = 0; fia < film.children.length; fia++) {
        const filmChild = film.children[fia];
        filmObject[filmChild.tagName] = filmChild.textContent;
      }
      xmlToJsonReturnArray.push(filmObject);
    }

    return xmlToJsonReturnArray;
  }

  static parseFromJSON(dataToParse) {
    // This function parses the json to json,
    // This is mainly here for the factory, since its a get format type
    return dataToParse.filmList;
  }

  static XMLToString(xmlToParseToString) {
    return new XMLSerializer().serializeToString(xmlToParseToString)
  }
}
