import Capacitance from 'capacitance';
import bfs from 'babel-fs';

export default async path => {
  let contents = await bfs.readFile(path).then(JSON.parse);
  // TODO
  console.log(contents);
};
