export const DataMakerFor6Hours = ({
  time,
  usage,
}: {
  time: string[];
  usage: number[];
}) => {
  const data: { time: string; Usage: number }[] = [];
  for (let i = 0; i < time.length; i++) {
    const date = new Date(time[i]);
    data.push({
      time:
        date.getHours() > 12
          ? (date.getHours() - 12).toString() + "pm"
          : date.getHours().toString() + "am",
      Usage: usage[i],
    });
  }
  return data;
};

export const DataMakerFor24Hours = ({
  time,
  usage,
}: {
  time: string[];
  usage: number[];
}) => {
  const data: { time: string; Usage: number }[] = [];
  for (let i = 0; i < time.length; i++) {
    const date = new Date(time[i]);
    data.push({
      time:
        date.getHours() > 12
          ? (date.getHours() - 12).toString() + "pm"
          : date.getHours().toString() + "am",
      Usage: usage[i],
    });
  }
  return data;
};

export const DataMakerFor7Days = ({
  time,
  usage,
}: {
  time: string[];
  usage: number[];
}) => {
  const data: { time: string; Usage: number }[] = [];
  for (let i = 0; i < time.length; i++) {
    const date = new Date(time[i]);
    data.push({
      time: date.getDay().toString() + "/" + date.getMonth().toString(),
      Usage: usage[i],
    });
  }
  return data;
};
