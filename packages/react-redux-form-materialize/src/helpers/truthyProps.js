export default function getTruthyProps(obj) {
  return Object.values(obj).filter(val => !!val);
}
