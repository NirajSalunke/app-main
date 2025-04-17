export const DataMakerFor6Hours = ({
  time,
  usage,
}: {
  time: string[];
  usage: number[];
}) => {
  const data: { time: string; Usage: number }[] = [];

  for (let i = 0; i < time.length; i++) {
    // Replace 'IST' and convert string into a format JS can parse reliably
    const cleaned = time[i].replace(" IST", "").replace(" ", "T");
    const date = new Date(cleaned);

    const hour = date.getHours();
    const formattedHour =
      hour === 0
        ? "12am"
        : hour === 12
        ? "12pm"
        : hour > 12
        ? `${hour - 12}pm`
        : `${hour}am`;

    data.push({
      time: formattedHour,
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
