import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Container, Stack } from "@mui/material";
import { CardCover } from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
const list = [
  { productName: "Cutlet", imagepath: "/img/cutlet.webp" },
  { productName: "Lavash", imagepath: "/img/lavash.webp" },
  { productName: "Kebab", imagepath: "/img/kebab.webp" },
  { productName: "Kebab", imagepath: "/img/kebab-fresh.webp" },
];
export default function NewDishes() {
  return (
    <div className="fresh-dishes-frame">
      <Container>
        <Stack className="fresh-section">
          <Box className="category-title">Fresh Menu</Box>
          <Stack className="cards-frame">
            {list.map((ele, index) => {
              return (
                <CssVarsProvider key={index}>
                  <Card className="card">
                    <CardCover>
                      <img src={ele.imagepath} alt={ele.productName} />
                    </CardCover>
                    <CardCover className="card-cover" />
                    <CardContent sx={{ justifyContent: "flex-end" }}>
                      <Stack
                        sx={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      ></Stack>
                    </CardContent>

                    <CardOverflow
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        borderTop: "1px solid ",
                        background: "white",
                        height: "49px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        <Typography className="fresh-text">
                          {ele.productName}
                        </Typography>
                        <Divider height="24" width="2" bg="#D9D9D9" />
                        <Typography className="fresh-menu-price">$7</Typography>
                      </Stack>
                      <Typography className="fresh-text-view">
                        1{" "}
                        <VisibilityIcon
                          sx={{ fontSize: 21, marginLeft: "5px" }}
                        />
                      </Typography>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
