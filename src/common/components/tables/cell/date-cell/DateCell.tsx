import { memo, useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es";
import { Typography, Tooltip } from "@mui/material";

dayjs.extend(utc);

interface Props {
  date: Date | string | null;
}

export const DateCell = memo(({ date }: Props) => {
  const formatted = useMemo(() => {
    if (!date) return null;

    const base = dayjs(date)
      .add(dayjs().utcOffset(), "minutes")
      .locale("es");

    return {
      short: base.format("DD/MM/YYYY HH:mm"),
      long: base.format("dddd, DD [de] MMMM [de] YYYY, HH:mm"),
    };
  }, [date]);

  if (!formatted) {
    return <Typography>-</Typography>;
  }

  return (
    <Tooltip title={formatted.long} arrow>
      <Typography
        color="info"
        fontWeight={400}
        fontSize="sm"
        sx={{ cursor: "help", whiteSpace: "nowrap" }}
      >
        {formatted.short}
      </Typography>
    </Tooltip>
  );
});
