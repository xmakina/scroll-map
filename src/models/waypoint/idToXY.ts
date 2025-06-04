export default function (id: string) {
  const [x, y] = id.match(/-?\d+/gm)!;
  return [parseInt(x!), parseInt(y)];
}
