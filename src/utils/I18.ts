import { useRouter } from 'next/router';

const cache = {};

function nomalize(local) {
  switch (local) {
    case 'jp-JP':
    case 'jp':
      return 'jp';
    case 'vi-VN':
    case 'vn':
      return 'vn';
  }
  return 'en';
}

export function i18(msg: string, defaultValue: string) {
  let local = nomalize(useRouter().locale);
  if (!cache[local]) {
    cache[local] = require('../i18/' + local);
  }
  let trans = cache[local][msg];
  return trans ?? defaultValue ?? msg;
}
