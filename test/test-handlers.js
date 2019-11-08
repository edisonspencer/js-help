const httpMock = require("node-mocks-http");
const assert = require('assert');
const sinon = require('sinon');
const handlers = require('../handlers');
const requesterService = require('../services/requester');
const weatherParser = require('../parsers/weather');

describe('Handlers', function () {

    let expectedServiceResponse = {
        'service': 'response'
    };
    let expectedParserResponse = {
        'parser': 'response'
    };

	let handler;
    let request;
    let response;
    let requester;

	context('weather endpoint', function () {

        let mockWeatherParser;

        beforeEach(function () {
        	requester = new requesterService();
            mockWeatherParser = sinon.createStubInstance(weatherParser, {
                parseWeather: sinon.stub().returns(expectedParserResponse)
            });

            handler = new handlers({
                requesterService: requester,
                weatherParser: mockWeatherParser
            });

			request = httpMock.createRequest({
                method: 'GET',
                url: '/weather'
            });
            response = httpMock.createResponse();
        });

        it('returns weather on success', async function () {
            sinon.stub(requester, 'get').callsFake((_) => {
                return new Promise((resolve, _) => {
                    resolve(expectedServiceResponse);
                });
            });
            
            await handler.weather(request, response);

            assert.ok(requester.get.calledOnce, 'Expected RequesterService.get to have been called once');
            assert.equal(requester.get.getCall(0).args[0], `https://some-url.com`);

            assert.ok(mockWeatherParser.parseWeather.calledOnce, 'Expected WeatherParser.parseWeather to have been called once'); // fails here
            assert.equal(mockWeatherParser.parseWeather.getCall(0).args[0], expectedServiceResponse);

            assert.equal(response._getStatusCode(), 200);
            assert.equal(response._getHeaders()['content-type'], 'application/json');
            assert.equal(response._getData(), JSON.stringify(expectedParserResponse));
        });
	});
});	