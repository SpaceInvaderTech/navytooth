import { fetch } from './fetch';

const url =
  'https://github.com/SpaceInvaderTech/openhaystack_moko/releases/download/half-baked/nrf52810_xxaa.bin';

const result = fetch(url);

export async function fetchFirmware() {
  const { body } = await result;
  return body;
}
