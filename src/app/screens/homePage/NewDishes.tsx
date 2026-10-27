import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Container, Stack } from "@mui/material";
import { AspectRatio, CardCover } from "@mui/joy";
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
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Fresh Menu</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {list.length > 0 ? (
                list.map((ele, index) => (
                  <Card sx={{ gap: "0px" }} key={index} className="card">
                    <CardOverflow>
                      <div className="product-sale">Normal size</div>
                      <AspectRatio ratio="1">
                        <img src={ele.imagepath} alt={ele.productName} />
                      </AspectRatio>
                    </CardOverflow>
                    <CardOverflow className="product-detail">
                      <Stack className="info">
                        <Stack
                          flexDirection={"row"}
                          sx={{ alignItems: "center", gap: "10px" }}
                        >
                          <Typography className={"title"}>
                            {ele.productName}
                          </Typography>
                          <Divider width="2" height="24" bg="#d9d9d9" />
                          <Typography className={"price"}>$12</Typography>
                        </Stack>
                        <Stack
                          flexDirection={"row"}
                          sx={{ alignItems: "center", gap: "10px" }}
                        >
                          <Typography className={"views"}>20</Typography>
                          <VisibilityIcon
                            sx={{ fontSize: 20, marginLeft: "5px" }}
                          ></VisibilityIcon>
                        </Stack>
                      </Stack>
                    </CardOverflow>
                  </Card>
                ))
              ) : (
                <Box className="no-data">New products are not available</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
