import { useState } from "react";
import { Card, CardHeader, Avatar, IconButton } from "@mui/material";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import EditFamilyDialog from "./EditFamilyDialog";

interface FamilyProps {
  fullName: string;
  firstLetter: string;
  dateBirth: string;
  index: number;
}

export default function FamilyCard(props: FamilyProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  // Coloured avatars
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <>
      <Card sx={{ minWidth: 350, maxWidth: 500 }}>
        <CardHeader
          avatar={
            <Avatar
              {...stringAvatar(props.fullName)}
              aria-label="family-member"
            >
              {props.firstLetter}
            </Avatar>
          }
          title={props.fullName}
          subheader={
            props.dateBirth ? new Date(props.dateBirth).toDateString() : ""
          }
          action={
            <IconButton onClick={handleOpen} aria-label="edit">
              <EditIcon />
            </IconButton>
          }
        />
      </Card>

      <EditFamilyDialog index={props.index} open={open} openChanger={setOpen} />
    </>
  );
}
