import React from "react";
import { Container, Box, Stack } from "@mui/material";
import { CardCover, CssVarsProvider, Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active User</Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {topUsers.length > 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <Card className="card" key={member._id}>
                      <CardCover>
                        <img
                          src={imagePath}
                          alt={member.memberNick}
                          loading="lazy"
                        />
                      </CardCover>

                      <CardContent className="user-datail">
                        <Typography className="member-nick">
                          {member.memberNick}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })
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
