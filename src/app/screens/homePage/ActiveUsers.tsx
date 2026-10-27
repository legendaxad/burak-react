import React from "react";
import { Container, Box, Stack } from "@mui/material";
import { CardCover, CssVarsProvider, Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";

const activeUsers = [
  { memberNick: "Justin", memberImage: "/img/martin.webp" },
  { memberNick: "Justin", memberImage: "/img/justin.webp" },
  { memberNick: "Rose", memberImage: "/img/rose.webp" },
  { memberNick: "Nusret", memberImage: "/img/nusret.webp" },
];

export default function ActiveUsers() {
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active User</Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {activeUsers.length > 0 ? (
                activeUsers.map((ele, index) => (
                  <Card className="card" key={index}>
                    <CardCover>
                      <img
                        src={ele.memberImage}
                        alt={ele.memberNick}
                        loading="lazy"
                      />
                    </CardCover>

                    <CardContent className="user-datail">
                      <Typography className="member-nick">
                        {ele.memberNick}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Box className="no-data">No active users available</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
