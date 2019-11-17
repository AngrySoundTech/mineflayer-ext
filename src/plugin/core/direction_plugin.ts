export enum Direction {
    NORTH = "North",
    NORTH_EAST ="Northeast",
    EAST = "East",
    SOUTH_EAST ="Southeast",
    SOUTH = "South",
    SOUTH_WEST = "Southwest",
    WEST = "West",
    NORTH_WEST = "Northwest",
}


export default function directionPlugin(bot, options) {

    // Define all of our boundaries for yaw, in radians. Welcome to hell.
    // Start at north and work our way around.
    // North can have... two values.
    const R_N = 0
    const R_NE = 7 * Math.PI / 4
    const R_E = 3 * Math.PI / 2
    const R_SE = 5 * Math.PI / 4
    const R_S = Math.PI
    const R_SW = 3 * Math.PI / 4
    const R_W = Math.PI / 2
    const R_NW = Math.PI / 4
    const R_N2 = 2 * Math.PI



    // Ugly ass shunt to help me use the code I copy pasted from somewhere else
    // Because my brain doesn't understand numbers well.
    function radiansToDegrees(radians) {
        return radians * (180 / Math.PI)
    }
    function degreesToRadians(degrees) {
        return degrees * (Math.PI / 180)
    }

    /**
     * Not the prettiest function, but makes lots of other things really easy.
     * I'd rather dabble with an ugly else if ladder once than have to fuckin
     * refresh my brain on yaw and radians every other week I finally muster
     * the energy to work on this godforsaken project.
     */
    bot.getDirection = function (): Direction {
        let yaw = bot.entity.yaw
        let deg = radiansToDegrees(yaw)

        if (0 <= deg && deg < 22.5) {
            return Direction.NORTH
        } else if (22.5 <= deg && deg < 67.5) {
            return Direction.NORTH_WEST
        } else if (67.5 <= deg && deg < 112.5) {
            return Direction.WEST
        } else if (112.5 <= deg && deg < 157.5) {
            return Direction.SOUTH_WEST
        } else if (157.5 <= deg && deg < 202.5) {
            return Direction.SOUTH
        } else if (202.5 <= deg && deg < 247.5) {
            return Direction.SOUTH_EAST
        } else if (247.5 <= deg && deg < 292.5) {
            return Direction.EAST
        } else if (292.5 <= deg && deg < 337.5) {
            return Direction.NORTH_EAST
        } else if (337.5 <= deg && deg < 360.0) {
            return Direction.EAST
        }
    }

    // Use this https://minecraft.gamepedia.com/Coordinates

    bot.getPositionInFront = function(distance: number = 1) {
        let direction = bot.getDirection()
        let pos = bot.entity.position

        if (direction == Direction.NORTH) {
            return pos.offset(0,0,-distance)
        } else if (direction == Direction.EAST) {
            return pos.offset(distance,0,0)
        } else if (direction == Direction.SOUTH) {
            return pos.offset(0,0,distance)
        } else if (direction == Direction.WEST) {
            return pos.offset(-distance,0,0)
        } else if (direction == Direction.NORTH_EAST) {
            return pos.offset(distance,0,-distance)
        } else if (direction == Direction.NORTH_WEST) {
            return pos.offset(-distance,0,-distance)
        } else if (direction == Direction.SOUTH_EAST) {
            return pos.offset(distance,0,distance)
        } else if (direction == Direction.SOUTH_WEST) {
            return pos.offset(-distance,0,distance)
        }
    }

    bot.snapToDirection = async function(direction: Direction): Promise<undefined> {
        console.log("Snapping to direction: " + direction)

        let rad
        switch (direction) {
            case Direction.NORTH: {
                rad = R_N
                break
            }
            case Direction.SOUTH: {
                rad = R_S
                break
            }
            case Direction.EAST: {
                rad = R_E
                break
            }
            case Direction.WEST: {
                rad = R_W
                break
            }
            case Direction.NORTH_EAST: {
                rad = R_NE
                break
            }
            case Direction.NORTH_WEST: {
                rad = R_NW
                break
            }
            case Direction.SOUTH_EAST: {
                rad = R_SE
                break
            }
            case Direction.SOUTH_WEST: {
                rad = R_SW
                break
            }
        }

        // Fuck it just look straight ahead.
        // 0 is straight. PI / 2 would be straight up, and -PI / 2 straight down.
        // false means to not ignore server side transition.
        return bot.asyncLook(rad, 0, false)
    }
}
