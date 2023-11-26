export const manifest = Buffer.from(
  JSON.stringify({
    manifest: {
      application: {
        bin_file: 'firmware.bin',
        dat_file: 'initpacket.dat',
      },
    },
  }),
);
