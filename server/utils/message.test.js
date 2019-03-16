var expect = require('expect');
var { generateMessage } = require('./message')


describe('Testing for message block', () => {
    it('Writing sample testcase', () => {

        var from = 'Admin';
        var text = 'Hello World'

        var message = generateMessage(from, text);

        console.log(message);
        expect(typeof (message.createdAt)).toBe('number');
        expect(message.from).toBe('Admin');
        expect(message.text).toBe('Hello World');


    });
});