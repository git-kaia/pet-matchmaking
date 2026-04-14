import { useEffect, useState } from "react";
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
import { getBirds } from "@/api/birds";

export default function Page() {
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBirds()
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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

      {/* Loading state */}
      {loading && (
        <Grid size={12}>
          <Typography>Laster fugler...</Typography>
        </Grid>
      )}

      {/* Fuglekort */}
      <Grid container size={12} spacing={3}>
        {animals.map((animal) => (
          <Grid key={animal.id} size={{ lg: 4, xs: 12 }}>
            <Card>
              <CardActionArea
                component={Link}
                to={`/org/animals/${animal.id}`}
              >
                <Typography variant="h6" className="px-4 pt-4">
                  {animal.name}
                </Typography>

                <CardContent>
                  <Box className="w-full mb-3">
                    <img
                      src={`/images/org/animals/${animal.id}.jpg`}
                      alt={animal.name}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "8px"
                      }}
                    />
                  </Box>

                  <Typography variant="body2">
                    Art: {animal.speciesId}
                  </Typography>

                  <Typography variant="body2">
                    Alder: {animal.ageYears} år
                  </Typography>

                  <Typography variant="body2">
                    Kjønn: {animal.sex}
                  </Typography>

                  <Box className="flex flex-col mt-2">
                    <Button variant="text" size="small">
                      Deaktiver
                    </Button>
                    <Button variant="text" size="small">
                      Aktiver
                    </Button>
                    <Button variant="text" size="small">
                      Se matcher
                    </Button>
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