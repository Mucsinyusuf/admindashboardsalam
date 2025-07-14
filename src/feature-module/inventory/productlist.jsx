import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  Snackbar,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { token } from "../../utils/token";

const CustomerOnboarding = () => {
  const [branch, setBranch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [accountLimit, setAccountLimit] = useState("");
  const [limitLocked, setLimitLocked] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("/api/admin/roles", {
          headers: { Authorization: token },
        });
        const roles = await res.json();
        const formatted = roles.map((r) => ({
          id: r.id,
          label: r.description || r.name,
        }));
        setRolesList(formatted);
      } catch (err) {
        console.error("Failed to load roles", err);
      }
    };
    fetchRoles();
  }, []);

  const handleSnack = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setAccountData(null);
    setUsers([]);
    setLimitLocked(false);

    try {
      const res = await fetch("/api/onboarding/account-lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ branch, account_number: accountNumber }),
      });

      if (!res.ok) throw new Error("Lookup failed");

      const data = await res.json();
      if (!data || !data.account_number) {
        setError("Account not found. Please check the branch and account number.");
        return;
      }

      setAccountData(data);

      const directors = data.directors || [];
      const preparedUsers = directors.map((name) => ({
        full_name: name,
        phone: "",
        email: "",
        username: "",
        password: "",
        daily_limit: "",
        role: "",
        role_id: "",
      }));

      setUsers(preparedUsers);
    } catch (err) {
      console.error(err);
      setError("Invalid account details or network issue.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserChange = (index, field, value) => {
    const updated = [...users];
    updated[index][field] = value;
    setUsers(updated);
  };

  const handleSetLimit = async () => {
    if (!accountLimit || isNaN(accountLimit) || Number(accountLimit) < 100) {
      handleSnack("Enter a valid daily limit of at least 100 KES.", "error");
      return;
    }

    try {
      const res = await fetch("/api/onboarding/set-limits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          account_number: accountData.account_number,
          daily_limit: Number(accountLimit),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.status !== "success") {
        handleSnack(data.message || "Failed to set limit", "error");
        return;
      }

      const updatedUsers = users.map((user) => ({
        ...user,
        daily_limit: Number(accountLimit),
      }));
      setUsers(updatedUsers);
      setLimitLocked(true);
      setAccountLimit("");
      handleSnack("Daily limit set successfully for account and users.");
    } catch (err) {
      console.error(err);
      handleSnack("Error setting daily limit.", "error");
    }
  };

  const handleSubmitOnboarding = async () => {
    try {
      const payload = {
        account_number: accountData.account_number,
        branch: accountData.brn,
        custno: accountData.custno,
        users: users.map((u) => ({
          full_name: u.full_name,
          phone: u.phone,
          email: u.email,
          username: u.username,
          password: u.password || "12345",
          daily_limit: Number(u.daily_limit),
          role: u.role,
          role_ids: u.role_id ? [Number(u.role_id)] : [],
        })),
      };

      const res = await fetch("/api/onboarding/add-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || data.status !== "success") {
        handleSnack(data.message || "Onboarding failed", "error");
        return;
      }

      // Reset all fields after success
      setBranch("");
      setAccountNumber("");
      setAccountData(null);
      setUsers([]);
      setAccountLimit("");
      setLimitLocked(false);
      setError("");

      handleSnack("Users onboarded successfully.");
    } catch (err) {
      console.error(err);
      handleSnack("Error during onboarding.", "error");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Corporate Onboarding Lookup
      </Typography>

      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <TextField fullWidth required label="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
          </Grid>
          <Grid item md={4}>
            <TextField fullWidth required label="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
          </Grid>
          <Grid item md={4}>
            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ height: "100%", borderRadius: 2 }}>
              {loading ? "Searching..." : "Search Account"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {accountData && (
        <>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">Account Lookup Result</Typography>
              <ul>
                {Object.entries({
                  "Account Number": accountData.account_number,
                  "Account Name": accountData.account_name,
                  "Customer No": accountData.custno,
                  Branch: accountData.brn,
                  Owners: accountData.owners?.join(", "),
                  Directors: accountData.directors?.join(", "),
                  "Customer Name (Details)": accountData.details?.cust_name,
                  Address: [
                    accountData.details?.address_1,
                    accountData.details?.address_2,
                    accountData.details?.address_3,
                    accountData.details?.address_4,
                  ].filter(Boolean).join(", "),
                  "Account Status": accountData.details?.accstat,
                  "Account Type": accountData.details?.acctype,
                  "Account Open Date": accountData.details?.accopendt,
                }).map(([key, val]) => (
                  <li key={key}><strong>{key}:</strong> {val}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              label="Set Daily Limit"
              value={accountLimit}
              onChange={(e) => setAccountLimit(e.target.value)}
              type="number"
              InputProps={{ endAdornment: <InputAdornment position="end">KES</InputAdornment> }}
            />
            <Button variant="outlined" onClick={handleSetLimit} sx={{ borderRadius: 2 }}>
              Set Limit
            </Button>

            {limitLocked && (
              <Button variant="text" color="secondary" size="small" onClick={() => setLimitLocked(false)}>
                Edit Per-User Limits
              </Button>
            )}
          </Box>

          <Card>
            <CardContent>
              <Typography variant="h6">Onboard Users</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Daily Limit</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u, idx) => (
                    <TableRow key={idx}>
                      <TableCell><TextField fullWidth value={u.full_name} InputProps={{ readOnly: true }} /></TableCell>
                      <TableCell><TextField fullWidth value={u.username} onChange={(e) => handleUserChange(idx, "username", e.target.value)} /></TableCell>
                      <TableCell><TextField fullWidth type="password" value={u.password} onChange={(e) => handleUserChange(idx, "password", e.target.value)} /></TableCell>
                      <TableCell><TextField fullWidth value={u.phone} onChange={(e) => handleUserChange(idx, "phone", e.target.value)} /></TableCell>
                      <TableCell><TextField fullWidth value={u.email} onChange={(e) => handleUserChange(idx, "email", e.target.value)} /></TableCell>
                      <TableCell><TextField fullWidth type="number" value={u.daily_limit} onChange={(e) => handleUserChange(idx, "daily_limit", e.target.value)} InputProps={{ readOnly: limitLocked }} /></TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <InputLabel>Role</InputLabel>
                          <Select
                            value={u.role_id}
                            label="Role"
                            onChange={(e) => {
                              const id = e.target.value;
                              const role = rolesList.find((r) => String(r.id) === id);
                              handleUserChange(idx, "role_id", id);
                              handleUserChange(idx, "role", role?.label || "");
                            }}
                          >
                            {rolesList.map((r) => (
                              <MenuItem key={r.id} value={r.id}>{r.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box mt={2}>
                <Button variant="contained" onClick={handleSubmitOnboarding} sx={{ borderRadius: 2 }}>
                  Submit Onboarding
                </Button>
              </Box>
            </CardContent>
          </Card>
        </>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomerOnboarding;
