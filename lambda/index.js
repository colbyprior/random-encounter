/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * 
 **/

'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.212c26db-9e7c-4bb6-a14f-c4389097762b';

const SKILL_NAME = 'Random Encounter';
const HELP_MESSAGE = 'Welcome to random encounter. What is your party size and average level?';
const STOP_MESSAGE = 'Goodbye!';


const data = [
    'A red dragon',
    '5 kobolds',
];

var partyLevel = "";
var partySize = "";

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetRandomEcnounter');
    },
    'GetRandomEcnounter': function () {
        const encounterArr = data;
        const factIndex = Math.floor(Math.random() * encounterArr.length);
        const encounter = encounterArr[factIndex];
        const speechOutput = encounter + ". Would you like a new encounter?";

        this.response.cardRenderer(SKILL_NAME, encounter);
        this.response.speak(speechOutput).listen("Would you like a new encounter?");
        this.emit(':responseReady');
    },
    'SetParty': function () {
        partySize = this.event.request.intent.slots.size.value;
        partyLevel = this.event.request.intent.slots.level.value;
        const speechOutput = "Your party now has " + partySize + " level " + partyLevel + " adventurers. Would you like an encounter?";

        this.response.cardRenderer(SKILL_NAME, speechOutput);
        this.response.speak(speechOutput).listen("Would you like an encounter?");
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;

        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.response.cardRenderer("Goodbye");
        this.response.speak("Goodbye");
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
