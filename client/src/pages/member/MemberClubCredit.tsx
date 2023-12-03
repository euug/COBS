import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
// Navigation
import MemberDrawer from "../../layouts/components/MemberDrawer";
import MemberNavBottom from "../../layouts/components/MemberNavBottom";

import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

function createData(
  date: string,
  amount: string,
  description: string,
  id: string
) {
  return { date, amount, description, id };
}

const rows = [
  createData("2023-02-20", "-$2.00", "Tuesday doubles fee", "#000256789"),
  createData("2023-02-24", "-$2.00", "Tuesday doubles fee", "#000256790"),
  createData("2023-03-16", "+$20.00", "Club credit purchase", "#000256791"),
  createData("2023-03-21", "-$2.00", "Thursday doubles fee", "#000256792"),
  createData("2023-04-01", "-$2.00", "Thursday doubles fee", "#000256793"),
  createData("2023-02-20", "-$2.00", "Tuesday doubles fee", "#000256794"),
  createData("2023-02-24", "-$2.00", "Tuesday doubles fee", "#000256795"),
  createData("2023-03-16", "+$20.00", "Club credit purchase", "#000256796"),
  createData("2023-03-21", "-$2.00", "Thursday doubles fee", "#000256797"),
  createData("2023-04-01", "-$2.00", "Thursday doubles fee", "#000256798"),
];

function MemberClubCredit() {
  // const listClubCredit = async () => {
  //   try {
  //     const authRes = await Auth.currentUserInfo();

  //     const listRes = await API.graphql<GraphQLQuery<ListTransactionsQuery>>(
  //       graphqlOperation(listTransactions, {
  //         filter: {
  //           transactionOwner: { eq: authRes.attributes.sub },
  //         },
  //       })
  //     );

  //     setPayments(listRes.data?.listTransactions);
  //     console.log(payments);

  //     setBusy(false);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   listTransaction();
  // }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <MemberDrawer page="Club Credit" />
      <MemberNavBottom page="Credit" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 15 }}>
          <Typography variant="h1_home">Club Credit</Typography>
          <Typography variant="h3">Current Balance</Typography>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography mr={2} sx={{ fontSize: 40, fontWeight: 500 }}>
              $16.00
            </Typography>
            <Link to="purchase">
              <Button variant="contained" startIcon={<AddIcon />}>
                Add club credit
              </Button>
            </Link>
          </Box>
          <Typography variant="h3">Club credit history</Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650, maxWidth: 900 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ paddingRight: 0 }}>Date</TableCell>
                  <TableCell sx={{ paddingLeft: 0 }} align="right">
                    Amount
                  </TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="right">Transaction ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      textDecoration: "none",
                    }}
                    hover
                    component={Link}
                    to={`/member/receipt`}
                  >
                    <TableCell
                      sx={{ paddingRight: 0 }}
                      component="th"
                      scope="row"
                    >
                      {row.date}
                    </TableCell>
                    {row.amount.startsWith("+") ? (
                      <TableCell
                        align="right"
                        sx={{ color: "#008000", paddingLeft: 0 }}
                      >
                        {row.amount}
                      </TableCell>
                    ) : (
                      <TableCell
                        align="right"
                        sx={{ color: "#FF0000", paddingLeft: 0 }}
                      >
                        {row.amount}
                      </TableCell>
                    )}
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="right">{row.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
}

export default MemberClubCredit;
