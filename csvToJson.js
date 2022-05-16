function csvToJson(data) {

    let userData = {};

    let lines = data.split("\n");
    let headers = lines[0].split(",");
    let info = lines[1].split(",");

    for(let i=0; i<headers.length; i++) {

        let key = headers[i].replace(/[^a-zA-Z]/g, "");
        let value = info[i].replaceAll("\"", "");

        userData[key] = value;
    }

    return userData;
}

export default csvToJson;