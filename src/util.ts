/**
 * Sleep for a set number of ms.
 * @param ms milliseconds to sleep for
 */
export async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
