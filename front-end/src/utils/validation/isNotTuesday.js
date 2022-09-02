export default function isNotTuesday(date) {
  const dateNumbers = date.split("-");
  let day = new Date(
    dateNumbers[0],
    dateNumbers[1] - 1,
    dateNumbers[2]
  ).getDay();
  return !(day === 2);
}
