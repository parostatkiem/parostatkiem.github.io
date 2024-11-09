import { Object3D, Vector2 } from "three"
import { getAllChannels } from "./pubnub"
import { createChannelVisual, RADIUS } from "./channel/channel"
import { MAX_X, MAX_Y } from "./coordinates"




export type Channel = {
    name: string,
    position: Vector2
}



export const getChannelsVisual = (): Object3D[] => channels.map(createChannelVisual)

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
const getRandomPositionOnScreen = (objectSize: number, objectMargin: number): Vector2 =>
    new Vector2(
        getRandomArbitrary(objectSize + objectMargin, MAX_X - objectSize - objectMargin),
        getRandomArbitrary(objectSize + objectMargin, MAX_Y - objectSize - objectMargin)

    );



const assignChannelPosition = (otherChannels: Channel[]): Vector2 => {
    let pos: Vector2;
    do {

        pos = getRandomPositionOnScreen(RADIUS * 2, RADIUS);
    }

    // while (false)
    // console.log(otherChannels)
    while (otherChannels.some(({ position }) => position.distanceTo(pos) < 3 * RADIUS))


    return pos
}



// let channels: Channel[] = []



// setTimeout(async () => {

const channels = (await getAllChannels()).data.reduce<Channel[]>((alreadyProcessed, c) => ([...alreadyProcessed, { name: c.name ?? "<unknown>", position: assignChannelPosition(alreadyProcessed) }]), []);


// }, 2000);

