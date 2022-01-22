// const cache: { string?: string } = {};

// function nomalize(local: string): string {
//   switch (local) {
//     case 'jp-JP':
//     case 'jp':
//       return 'jp';
//     case 'vi-VN':
//     case 'vn':
//       return 'vn';
//     default:
//       return 'en';
//   }
// }

export function i18(msg: string, defaultValue: string) {
  // const local = nomalize(router().locale || 'en');
  // if (!cache[local]) {
  //   cache[local] = require(`../i18/${local}`);
  // }
  // const trans = cache[local][msg];
  // return trans ?? defaultValue ?? msg;
  // TODO: Fix this
  return defaultValue || msg;
}
