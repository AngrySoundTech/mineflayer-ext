export enum State {
    IDLE,
    RUNNING,
    STOPPING,
}

/**
 * Simple plugin to allow us to keep track of custom states in the bot.
 *
 * @see State
 */
export default function statePlugin(bot, options) {

    bot.setState = function(state: State) {
        bot.state = state
    }

    bot.getCurrentState = function(): State {
        return bot.state
    }

    // TODO: Set state to "CONSTRUCTING" and add events for login and stuff. probably.
    bot.setState(State.IDLE)
}