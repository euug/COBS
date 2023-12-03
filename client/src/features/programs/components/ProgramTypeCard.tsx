import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  styled,
} from "@mui/material";

import { Link } from "react-router-dom";

interface ProgramTypeCardProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
}

const HoverCard = styled(Card)`
  &:hover {
    transition: transform 0.2s;
    transform: scale(1.05);
  }
`;

function ProgramTypeCard(props: ProgramTypeCardProps) {
  return (
    <HoverCard sx={{ minWidth: 250, maxWidth: 345, m: 2 }}>
      <CardActionArea component={Link} to={props.link}>
        <CardMedia
          component="img"
          height="200"
          src={`${import.meta.env.VITE_APP_BACKEND_URL}/${props.image}`}
          alt="adult clinic"
        />
        <CardContent>
          <Typography mb={0} gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography mb={2} variant="subtitle2">
            Ages {props.subtitle}
          </Typography>
          <Typography variant="body2" color="text.secondary" minHeight="110px">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </HoverCard>
  );
}

export default ProgramTypeCard;
