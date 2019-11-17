export enum ChatEvent {
    LOCAL_CHAT = 'localChat',
    SNITCH_HIT = 'snitchHitChat'
}

/**
 * Basic plugin to add chat events for civ classics.
 */
export default function chatPlugin(bot, options) {

    // Add chat patterns for any type of chat typical to CivClassics

    // Local chat (<1000 blocks)
    // EX: <Figasaur> Free Fig!!
    //     Full match <Figasaur> Free Fig!!
    //     Group 1.   Figasaur
    //     Group 2.   Free Fig!!
    bot.chatAddPattern(/^<(.+)> (.*)$/, ChatEvent.LOCAL_CHAT, 'Local chat')

    // Snitch hit
    // EX: * gavbea entered snitch at note_oak-row_4 [world -1561 72 -1389]
    //     Group 1. gavbea
    //     Group 2.	note_oak-row_4
    //     Group 3.	-1561
    //     Group 4.	72
    //     Group 5.	-1389
    bot.chatAddPattern(/^\s?\* (.+) entered snitch at (.+) \[world (.+) (.+) (.+)]$/, ChatEvent.SNITCH_HIT, 'Snitch Hit')
}
