/**
 * IE: Data arriving from the transmission describing the
 * information about the Screen
 */
export type ScreenContext = {
  signal: 'PAL' | 'NTSC'
  width: number
  height: number
};
