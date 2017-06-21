const languageStrings = {
    'en': {
        translation: {
            FACTS: [
                'At age 62, Armstrong surpassed The Beatles at the top of the pop charts with his 1963 recording for the Broadyway show Hello, Dolly.',
                'The song “What a Wonderful World” was not a hit during Louis Armstrongs lifetime.',
                'Jazz music was born around 1895 in New Orleans',
                'On November 21, 1934 Ella Fitzgerald made her stage debut at the Apollo Theater at age seventeen.',
                'In 1958 Ella Fitzgerald became the first African-American woman to win a Grammy Award. She took home one for "Best Jazz Performance" and another for "Best Female Pop Vocal Performance".',
                'Count Basis was inducted into the Big Band and Jazz Hall of Fame in 1981.',
                'One of Artie Shaws biggest hits was his 1938 recording of Cole Porters Begin the Beguine.',
                'Billie Holidays birth name was Eleanora Fagan Gough.',
                'In 1935 Billie Holiday starred alongside Duke Ellington in the film Symphony in Black',
                'When Billie Holiday performed at Carnegie Hall in 1948, she received three curtain calls before a sold-out crowd.',
                'Django Reinhardt, dispite having two of his fingers disabled from a fire, went to to create a new jazz guitar technique creating the sound we now assosiate as gypsy jazz.',
                'Even though he was asked to travel with Benny Goodmans band, Django Reinhard never did.',
                'Due to his smooth-toned trombone playing, Rommy Dorsey was know as the Sentimental Gentleman of Swing.',
                'The song Opus Number One, composed by Sy Oliver, became a hit for the Tommy Dorsey Orchestra in 1944.',
            ],
            SKILL_NAME: 'Jazz Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a jazz fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};