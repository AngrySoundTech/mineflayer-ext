/**
 * Basic plugin to wrap existing bot functionality in promises.
 *
 * This allows for some cleaner async programming in my opinion,
 * without needing to worry about Callback Hell.
 * It also lets us clean up how some of the function callbacks are different for some reason only known to god.
 */
export default function asyncPlugin(bot, options) {

    // TODO: Look into using promisify?

    bot.asyncPlaceBlock = function (referenceBlock, faceVector): Promise<undefined> {
        return new Promise((resolve, reject) => {
            this.placeBlock(referenceBlock, faceVector, () => {
                resolve()
            })

            setTimeout(reject, 1000)
        })
    }

    bot.asyncDig = function (block): Promise<any> {
        return new Promise((resolve, reject) => {
            this.dig(block, (err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
    }

    bot.asyncActivateBlock = function (block): Promise<any> {
        return new Promise((resolve, reject) => {
            this.activateBlock(block, (err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
    }

    bot.asyncEquip = function(itemName, destination): Promise<any> {
        return new Promise((resolve, reject) => {
            const item = this.inventory.items().filter(item => item.name === itemName)[0]
            if (!item) {
                reject(`I don't have any ${itemName}`)
            }

            this.equip(item, destination, (err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
    }

    bot.asyncConsume = function(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.consume((err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
    }

    bot.asyncLook = function(pitch, yaw, force): Promise<undefined> {
        return new Promise((resolve) => {
            bot.look(pitch, yaw, force, () => {
                resolve()
            })
        })
    }

    bot.asyncLookAt = function(point, force = false): Promise<undefined> {
        return new Promise((resolve) => {
            bot.lookAt(point, force, () => {
                resolve()
            })
        })
    }
}
