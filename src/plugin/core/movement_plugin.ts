import Vec3 from 'vec3'
import {sleep} from "../../util";

export default function movementPlugin(bot, options) {

    /**
     * I don't care if this is wonky for now, until I figure
     * out advanced mathematical bullshittery we just gonna go straight
     *
     */
    bot.centerOnBlock = async function(): Promise<undefined> {
        console.log("Center")
        return new Promise(async (resolve) => {
            const initialPos = bot.entity.position

            const targetPos = Vec3(
                Math.round(initialPos.x * 2) / 2,
                Math.round(initialPos.y),
                Math.round(initialPos.z * 2) / 2
            )

            if (targetPos.x.toFixed(1).substr(-1) == "0") {
                targetPos.x += targetPos.x + .5
            }
            if (targetPos.z.toFixed(1).substr(-1) == "0") {
                targetPos.z += targetPos.z + .5
            }

            await bot.asyncLookAt(targetPos, false)

            bot.setControlState('forward', true)

            console.log(targetPos.x.toFixed(1))
            console.log(targetPos.z.toFixed(1))

            while (
                (bot.entity.position.x.toFixed(1) != targetPos.x.toFixed(1))
                    || bot.entity.position.z.toFixed(1) != targetPos.z.toFixed(1)
                ) {
                await sleep(.1)
            }

            bot.setControlState('forward', false)

            resolve()
        })
    }

    bot.walkForward = async function(blocks): Promise<undefined> {
        return new Promise(async (resolve) => {
            const initialPos = bot.entity.position

            const targetPos = bot.getPositionInFront(blocks)

            await bot.asyncLookAt(targetPos, false)

            bot.setControlState('forward', true)

            console.log(targetPos.x.toFixed(1))
            console.log(targetPos.z.toFixed(1))

            while (
                (bot.entity.position.x.toFixed(1) != targetPos.x.toFixed(1))
                || bot.entity.position.z.toFixed(1) != targetPos.z.toFixed(1)
                ) {
                await sleep(.05)
            }

            bot.setControlState('forward', false)

            resolve()
        })
    }

}
