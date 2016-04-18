import argollector from 'argollector';

import duang from './lib/duang';

switch (true) {
  case !!argollector[0]:
    duang(argollector[0]);
    break;
  case !argollector[0]:
  case !!argollector['-h']:
  case !!argollector['--help']:
  default:
    console.log('Usage: duang <file> [options]');
    console.log('');
    console.log('Options:');
    console.log('  -h, --help             show help message');
    process.exit(0);
}
