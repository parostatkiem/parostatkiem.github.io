import { Object3D, Vector2 } from "three"
import { getAllChannels } from "./pubnub"
import { createChannelVisual, RADIUS } from "./channel"




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
        getRandomArbitrary(objectSize + objectMargin, window.innerWidth - objectSize - objectMargin),
        getRandomArbitrary(objectSize + objectMargin, window.innerWidth - objectSize - objectMargin)

    );



const assignChannelPosition = (otherChannels: Channel[]): Vector2 => {
    let pos: Vector2;
    // do {

    pos = getRandomPositionOnScreen(RADIUS * 2, RADIUS);
    // }
    // while (otherChannels.some(({ position }) => pos.x - position.x < RADIUS || pos.x + 3 * RADIUS > position.x
    //     || pos.y - position.y < RADIUS || pos.y + 3 * RADIUS > position.y));


    return pos
}



// let channels: Channel[] = []



// setTimeout(async () => {

const channels = (await getAllChannels()).data.reduce<Channel[]>((alreadyProcessed, c) => ([...alreadyProcessed, { name: c.name ?? "<unknown>", position: assignChannelPosition(alreadyProcessed) }]), []);


// }, 2000);

