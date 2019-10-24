class Handlers {
	constructor(options) {
        this.requesterService = options.requesterService;
        this.weatherParser = options.weatherParser;
    }

	weather(request, response) {
        const weatherURL = `https://some-url.com`;

        try {
            this.requesterService.get(weatherURL)
                .then(serviceResponse => {
                    this.weatherParser.parseWeather(serviceResponse);
                });
        } catch (exception) {
            return;
        }
    };
}

module.exports = Handlers;