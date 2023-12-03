import React from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  CircularProgress,
  Box,
  IconButton,
  Divider,
  Alert,
  Collapse,
} from "@mui/material";
import dayjs from "dayjs";

//Icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import { getSession } from "../../auth/auth";
import { useNavigate } from "react-router-dom";

function PublicAddBookingButton(props: {
  height: number;
  datetime: string;
  canBook: boolean;
  bookableTime: string;
  court: any;
  userFullName: string;
}) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [openAC2, setOpenAC2] = useState(false);
  const [openAC3, setOpenAC3] = useState(false);
  const [openAC4, setOpenAC4] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const loading = (openAC2 || openAC3 || openAC4) && options.length === 0;
  const [processing, setProcessing] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Form Inputs
  const [duration, setDuration] = useState("60");
  const [player1, setPlayer1] = useState<any>();
  const [players, setPlayers] = useState(2);
  const [player2, setPlayer2] = useState();
  const [player3, setPlayer3] = useState();
  const [player4, setPlayer4] = useState();
  const [favourite2, setFavourite2] = useState(false);
  const [favourite3, setFavourite3] = useState(false);
  const [favourite4, setFavourite4] = useState(false);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const session: any = await getSession();

        const currentUser = await axios(
          import.meta.env.VITE_APP_BACKEND_URL + "/clubuser/current-user",
          {
            headers: {
              Authorization: `${session.accessToken.jwtToken}`,
            },
          }
        );

        setPlayer1(currentUser.data);

        const listClubUsers: any = await axios(
          import.meta.env.VITE_APP_BACKEND_URL + "/clubuser",
          {
            headers: {
              Authorization: `${session.accessToken.jwtToken}`,
            },
          }
        );

        if (active) {
          setOptions(
            listClubUsers.data.map((player: any) => {
              return {
                name: `${player.firstName} ${player.lastName}`,
                id: `${player.id}`,
                favourite: currentUser.data.favouritePlayers.some(
                  (i: any) => i.id === player.id
                ),
              };
            })
          );
        }
      } catch (e) {
        console.log(e);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  const handleSubmit = async () => {
    setProcessing(true);
    const session: any = await getSession();

    try {
      await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "/bookings",
        {
          datetime: props.datetime,
          court: props.court,
          players: [player1, player2, player3, player4].filter((p) => p),
          currentUser: session.idToken.payload.email,
        },
        {
          headers: {
            Authorization: `${session.accessToken.jwtToken}`,
          },
        }
      );

      setProcessing(false);
      navigate(0);
    } catch (e: any) {
      setProcessing(false);
      setBookingError(e.response.data.message);
      setAlertOpen(true);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    players < 4 ? setPlayers(players + 1) : null;
  };

  const handleRemove = () => {
    players > 2 ? setPlayers(players - 1) : null;
  };

  const handleFavouriteToggle = (player: any, num: number) => {
    // Visually toggle the icon
    switch (num) {
      case 2:
        setFavourite2(!favourite2);
        break;
      case 3:
        setFavourite3(!favourite3);
        break;
      case 4:
        setFavourite4(!favourite4);
        break;
    }

    // TODO: Update user with new favourite players
    // const updatedUser = await API.graphql<GraphQLQuery<UpdateClubUserMutation>>({
    //   query: updateClubUser,
    //   variables: {input: {
    //     id: selector.currentUser.id,
    //     clubUserFavouritePlayersId:
    //   }}
    // })

    // Find the index of the player in options array
    const currentPlayerIndex = options.findIndex(
      (o: any) => o.id === player.id
    );

    // Mark the option as complete in a new object
    const updatedOption = {
      ...options[currentPlayerIndex],
      favourite: !player.favourite,
    };

    // Update the options list with the updated options
    const newOptions = [...options];
    newOptions[currentPlayerIndex] = updatedOption;
    setOptions(newOptions);
  };

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        disableElevation
        disabled={!props.canBook}
        sx={{
          borderRadius: 1,
          height: props.height,
        }}
        onClick={handleOpen}
      >
        {props.canBook
          ? `Book ${dayjs.utc(props.datetime).format("h:mm a")}`
          : `Unavailable`}
      </Button>

      <Dialog fullWidth fullScreen onClose={handleClose} open={open}>
        <DialogTitle>
          <Typography variant="h3">Book a court</Typography>
        </DialogTitle>
        <DialogContent>
          <Collapse in={alertOpen}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {bookingError}
            </Alert>
          </Collapse>
          <Typography variant="body1">Booking Details</Typography>
          <Stack direction="row" spacing={2} mb={2}>
            <Stack alignItems="end">
              <Typography variant="body2">
                <strong>Court:</strong>
              </Typography>
              <Typography variant="body2">
                <strong>Date:</strong>
              </Typography>
              <Typography variant="body2">
                <strong>Start Time:</strong>
              </Typography>
              <Typography variant="body2">
                <strong>Booking Type:</strong>
              </Typography>
            </Stack>
            <Stack alignItems="start">
              <Typography variant="body2">{props.court.name}</Typography>
              <Typography variant="body2">
                {dayjs.utc(props.datetime).format("ddd MMM D, YYYY")}
              </Typography>
              <Typography variant="body2">
                {dayjs.utc(props.datetime).format("h:mmA")}
              </Typography>
              <Typography variant="body2">Public</Typography>
            </Stack>
          </Stack>
          <Typography mb={0} variant="body1">
            Players
          </Typography>
          <Stack minWidth={300} maxWidth={700} mb={2}>
            <TextField
              fullWidth
              disabled
              value={props.userFullName}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
            />
            <Stack
              width="100%"
              direction="row"
              justifyContent="space-between"
              spacing={2}
              alignItems="center"
            >
              <Autocomplete
                fullWidth
                id="player-2"
                popupIcon={null}
                value={player2}
                onChange={(_event: any, newValue: any | null) => {
                  if (newValue) {
                    setFavourite2(newValue?.favourite);
                  }
                  setPlayer2(newValue);
                }}
                open={openAC2}
                onOpen={() => {
                  setOpenAC2(true);
                }}
                onClose={() => {
                  setOpenAC2(false);
                }}
                groupBy={(option: any) => option.favourite.toString()}
                renderGroup={(params) => (
                  <div key={params.key}>
                    {params.group === "true" ? (
                      <Divider>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Typography variant="body1">Favourites</Typography>
                          <StarIcon color="warning" />
                        </Stack>{" "}
                      </Divider>
                    ) : (
                      <Divider>Other</Divider>
                    )}
                    <Box pl={2}>{params.children}</Box>
                  </div>
                )}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                options={options.sort((a: any, b: any) => {
                  return a.favourite === b.favourite ? 0 : a.favourite ? -1 : 1;
                })}
                renderOption={(props, option: any) => (
                  <Stack
                    component="li"
                    direction="row"
                    justifyContent="space-between"
                    {...props}
                  >
                    <Box>
                      <Typography>{option.name}</Typography>
                    </Box>
                  </Stack>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Player 2"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : player2 ? (
                            <IconButton
                              onClick={() => handleFavouriteToggle(player2, 2)}
                            >
                              {favourite2 ? (
                                <StarIcon color="warning" />
                              ) : (
                                <StarBorderIcon />
                              )}
                            </IconButton>
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
            {players >= 3 ? (
              <Autocomplete
                fullWidth
                id="player-3"
                popupIcon={null}
                value={player3}
                onChange={(_event: any, newValue: any | null) => {
                  if (newValue) {
                    setFavourite3(newValue?.favourite);
                  }
                  setPlayer3(newValue);
                }}
                open={openAC3}
                onOpen={() => {
                  setOpenAC3(true);
                }}
                onClose={() => {
                  setOpenAC3(false);
                }}
                groupBy={(option: any) => option.favourite.toString()}
                renderGroup={(params) => (
                  <div key={params.key}>
                    {params.group === "true" ? (
                      <Divider>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Typography variant="body1">Favourites</Typography>
                          <StarIcon color="warning" />
                        </Stack>{" "}
                      </Divider>
                    ) : (
                      <Divider>Other</Divider>
                    )}
                    <Box pl={2}>{params.children}</Box>
                  </div>
                )}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                options={options.sort((a: any, b: any) => {
                  return a.favourite === b.favourite ? 0 : a.favourite ? -1 : 1;
                })}
                renderOption={(props, option: any) => (
                  <Stack
                    component="li"
                    direction="row"
                    justifyContent="space-between"
                    {...props}
                  >
                    <Box>
                      <Typography>{option.name}</Typography>
                    </Box>
                  </Stack>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Player 3"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : player3 ? (
                            <IconButton
                              onClick={() => handleFavouriteToggle(player3, 3)}
                            >
                              {favourite3 ? (
                                <StarIcon color="warning" />
                              ) : (
                                <StarBorderIcon />
                              )}
                            </IconButton>
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            ) : null}
            {players >= 4 ? (
              <Autocomplete
                fullWidth
                id="player-4"
                popupIcon={null}
                value={player4}
                onChange={(_event: any, newValue: any | null) => {
                  if (newValue) {
                    setFavourite4(newValue?.favourite);
                  }
                  setPlayer4(newValue);
                }}
                open={openAC4}
                onOpen={() => {
                  setOpenAC4(true);
                }}
                onClose={() => {
                  setOpenAC4(false);
                }}
                groupBy={(option: any) => option.favourite.toString()}
                renderGroup={(params) => (
                  <div key={params.key}>
                    {params.group === "true" ? (
                      <Divider>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Typography variant="body1">Favourites</Typography>
                          <StarIcon color="warning" />
                        </Stack>{" "}
                      </Divider>
                    ) : (
                      <Divider>Other</Divider>
                    )}
                    <Box pl={2}>{params.children}</Box>
                  </div>
                )}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                options={options.sort((a: any, b: any) => {
                  return a.favourite === b.favourite ? 0 : a.favourite ? -1 : 1;
                })}
                renderOption={(props, option: any) => (
                  <Stack
                    component="li"
                    direction="row"
                    justifyContent="space-between"
                    {...props}
                  >
                    <Box>
                      <Typography>{option.name}</Typography>
                    </Box>
                  </Stack>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Player 4"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : player4 ? (
                            <IconButton
                              onClick={() => handleFavouriteToggle(player4, 4)}
                            >
                              {favourite4 ? (
                                <StarIcon color="warning" />
                              ) : (
                                <StarBorderIcon />
                              )}
                            </IconButton>
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            ) : null}
          </Stack>
          <Button
            variant="outlined"
            disabled={players >= 4 ? true : false}
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add Player
          </Button>
          <Button
            variant="text"
            disabled={players > 2 ? false : true}
            startIcon={<RemoveIcon />}
            onClick={handleRemove}
          >
            Remove Player
          </Button>
          <Typography variant="body1">Duration</Typography>
          <ToggleButtonGroup
            color="primary"
            value={duration}
            onChange={(_event, newDuration) => setDuration(newDuration)}
            exclusive
            size="small"
          >
            <ToggleButton sx={{ minWidth: 100 }} value="60">
              1 hr
            </ToggleButton>
            <ToggleButton sx={{ minWidth: 100 }} disabled value="90">
              1.5 hr
            </ToggleButton>
            <ToggleButton sx={{ minWidth: 100 }} disabled value="120">
              2 hr
            </ToggleButton>
          </ToggleButtonGroup>
          <Stack
            mt={4}
            direction="row"
            justifyContent="start"
            spacing={4}
            alignItems="center"
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              Book
            </Button>
            <Box display="flex">
              {processing && <CircularProgress color="info" size={24} />}
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PublicAddBookingButton;
