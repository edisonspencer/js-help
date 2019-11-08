class Handlers {
    constructor(options) {
        this.requesterService = options.requesterService;
        this.weatherParser = options.weatherParser;
    }

    async weather(request, response) {
        const weatherURL = `https://some-url.com`;

        let serviceResponse = await this.requesterService.get(weatherURL);
        let parsedResponse = this.weatherParser.parseWeather(serviceResponse);

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(parsedResponse));
    };
}

module.exports = Handlers;