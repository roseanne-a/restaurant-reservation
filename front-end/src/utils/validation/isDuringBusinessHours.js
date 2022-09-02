export default function isDuringBusinessHours(time) {
  const newTime = Number(time.replace(":", ""));
  return newTime >= 1030 && newTime <= 2130;
}
