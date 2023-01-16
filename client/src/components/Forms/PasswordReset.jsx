import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  TextField,
} from "@mui/material";
import Header from "components/Header";
import * as yup from "yup";
import { Formik } from "formik";
import { themeSettings } from "theme";

const intialValues = {
  password: "",
  newPassword: "",
};

const userSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  newPassword: yup.string().required("New Password is required"),
});

const PasswordReset = ({ username }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const theme = useTheme();
  return (
    <Box m="20px">
      <Header
        title="Reset Password"
        subtitle="Reset your password here"
      ></Header>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={intialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="30px" mt="20px">
              <Box
                sx={{
                  backgroundColor: theme.palette.secondary[800],
                  padding: "10px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h3">{username}</Typography>
              </Box>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              ></TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="New Password"
                onBlur={handleBlur}
                value={values.newPassword}
                onChange={handleChange}
                name="newPassword"
                error={!!touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
                sx={{ gridColumn: "span 2" }}
              ></TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Reset Password
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PasswordReset;
