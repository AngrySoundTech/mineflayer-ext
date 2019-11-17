import { ChatEvent } from "../core/chat_plugin";

export default function lifePreserverPlugin(bot, options) {

    bot.on(ChatEvent.SNITCH_HIT, (username, message, type, rawMessage, matches) => {
        const snitch = message

        // TODO: Log bot out if snitch is within certain radius.
    })

}
