import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Tooltip,
  Typography,
  Box
} from "@mui/material";

import NiCellsPlus from "@/icons/nexture/ni-cells-plus";

export default function Page() {
  // Midlertidige fugle-profiler
  const animals = [
    {
      name: "Luna",
      image: "/images/org/animals/luna.jpg",
      klasse: "Fugl",
      art: "Nymfeparakitt",
      alder: "1 år",
      kjonn: "Hunn"
    },
    {
      name: "Milo",
      image: "/images/org/animals/milo.jpg",
      klasse: "Fugl",
      art: "Undulat",
      alder: "2 år",
      kjonn: "Hann"
    },
    {
      name: "Kiwi",
      image: "/images/org/animals/kiwi.jpg",
      klasse: "Fugl",
      art: "Papegøye",
      alder: "4 år",
      kjonn: "Hunn"
    },
    {
      name: "Sunny",
      image: "/images/org/animals/sunny.jpg",
      klasse: "Fugl",
      art: "Kanarifugl",
      alder: "3 år",
      kjonn: "Hann"
    },
  ];

  return (
    <Grid container spacing={5}>
      {/* Header */}
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1">Dyreprofiler</Typography>

          <Breadcrumbs>
            <Link to="/org/dashboard">Dashboard</Link>
            <Typography variant="body2">Dyreprofiler</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Tooltip title="Opprett ny dyreprofil">
            <Button
              className="icon-only surface-standard flex-none"
              size="medium"
              color="grey"
              variant="surface"
              startIcon={<NiCellsPlus size={"medium"} />}
            />
          </Tooltip>
        </Grid>
      </Grid>

      {/* Fuglekort */}
      <Grid container size={12} spacing={3}>
        {animals.map((animal, i) => (
          <Grid key={i} size={{ lg: 4, xs: 12 }}>
            <Card>
              <CardActionArea component={Link} to={`/org/animals/${animal.name.toLowerCase()}`}>
                <Typography variant="h6" className="px-4 pt-4">
                  {animal.name}
                </Typography>

                <CardContent>
                  <Box className="w-full mb-3">
                    <img
                      src={animal.image}
                      alt={animal.name}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "8px"
                      }}
                    />
                  </Box>

                  <Typography variant="body2">Klasse: {animal.klasse}</Typography>
                  <Typography variant="body2">Art: {animal.art}</Typography>
                  <Typography variant="body2">Alder: {animal.alder}</Typography>
                  <Typography variant="body2">Kjønn: {animal.kjonn}</Typography>

                  <Box className="flex flex-col mt-2">
                    <Button variant="text" size="small">Deaktiver</Button>
                    <Button variant="text" size="small">Aktiver</Button>
                    <Button variant="text" size="small">Se matcher</Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}