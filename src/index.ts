import mineflayer from 'mineflayer'
import { sleep } from './util'

import asyncPlugin from "./plugin/core/async_plugin";
import statePlugin from "./plugin/core/state_plugin";
import chatPlugin from "./plugin/core/chat_plugin";
import directionPlugin from "./plugin/core/direction_plugin";
import movementPlugin from "./plugin/core/movement_plugin";

/**
 * Any mineflayer functionality we want to expose will be wrapped in this class.
 * This restricts what we have access to an adds a bit of overhead, but allows
 * us to generate typings and be smart about what we're doing and makes relying
 * on these things easier down the road.
 */
export default class MineflayerExt {

    /**
     * Core plugins, which are included for all bots. These are loaded _first_ in order.
     */
    private static corePlugins = [
        // First, let's load the plugins that don't depend on each other.
        statePlugin,
        chatPlugin,
        asyncPlugin,

        // Ok now these will have some dependencies on other core plugins.
        // The order we load them though shouldn't matter, since we're just injecting functions,
        // and nothing can be called until the bot is created.
        directionPlugin,
        movementPlugin,
    ]

    /**
     * Optional plugins. These must be loaded into the bot after creating it,
     * but offer functionality we might not want on every bot.
     *
     * These plugins can also take configurable options.
     */
    static optionalPlugins = {
        // lifePreserverPlugin TODO
    }


    /**
     * Create a bot. The promise will resolve after the bot is created and all ready to go, in the world.
     */
    static async createBot(options: BotOptions): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                const bot = mineflayer.createBot(options)

                // Inject all of our neat custom plugin into the bot so it's all ready to go.
                bot.loadPlugins(this.corePlugins)

                // Wait five seconds, to give time to finish logging in.
                // This can probably be changed to a callback, but I had some issues with it for some reason.
                await sleep(5 * 1000)

                resolve(bot)
            } catch (e) {
                reject(e)
            }
        })
    }

}

/**
 * Options that are available when creating a bot.
 * These are passed directly to mineflayer, this class exists to provide typing information.
 */
class BotOptions {
    username?: String
    password?: String
    version?: String
    plugins?: {}
    logErrors?: Boolean
    loadInternalPlugins?: Boolean
    verbose?: Boolean
}
