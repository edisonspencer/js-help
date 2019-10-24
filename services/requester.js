const request = require('request');

class RequesterService {
    get(url) {
        request.get(url, (error, response, data) => {
                if (error != null) {
                    throw error;
                }
            }
        );
    }
}

module.exports = RequesterService;