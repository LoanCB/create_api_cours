import { arrUsers } from "./data.js";

export function find_user(username) {
    let value = {
        'status_code': null,
        'data': null,
    };
    if (username) {
        let index = arrUsers.findIndex(user => user.username === username);
        if (index === -1) {
            value.status_code = 404;
            value.data = `No username named ${username}`;
        } else {
            value.status_code = 200;
            value.data = arrUsers[index];
        }
    } else {
        value.status_code = 400;
        value.data = "Need an username on parameters";
    }
    return value;
}
