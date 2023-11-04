import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import dayjs from "dayjs";

function DatetimeLive() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <>
      <Typography variant="h2">
        <strong>{dayjs(date).format("MMMM D, YYYY")}</strong>
      </Typography>
      <Typography variant="h3">
        <strong>{dayjs(date).format("h:mm:ss A")}</strong>
      </Typography>
    </>
  );
}

export default DatetimeLive;
