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
} from "@mui/material";

import NiCellsPlus from "@/icons/nexture/ni-cells-plus";
import { getBirds } from "@/api/birds";

export default function Page() {
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBirds()
      .then(setAnimals)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Grid container spacing={5}>
      {/* HEADER */}
      <Grid container spacing={2.5} className="w-full">
        <Grid>
          <Typography variant="h1">Dyreprofiler</Typography>

          <Breadcrumbs>
            <Link to="/org/dashboard">Dashboard</Link>
            <Typography>Dyreprofiler</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid>
          <Tooltip title="Ny dyreprofil">
            <Button startIcon={<NiCellsPlus />} variant="outlined">
              Ny
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      {/* LOADING */}
      {loading && (
        <Grid>
          <Typography>Laster fugler...</Typography>
        </Grid>
      )}

      {/* LIST */}
      <Grid container spacing={3}>
        {animals.map((animal) => (
          <Grid key={animal.id}>
            <Card>
              <CardActionArea component={Link} to={`/org/animals/${animal.id}`}>

                <CardContent>
                  <img
                    src={`/images/org/animals/${animal.id}.jpg`}
                    onError={(e: any) =>
                      (e.target.src = "/images/org/animals/default.jpg")
                    }
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />

                  <Typography variant="h6">{animal.name}</Typography>

                  <Typography variant="body2">
                    Art: {animal.species_id}
                  </Typography>

                  <Typography variant="body2">
                    Størrelse: {animal.size}
                  </Typography>

                  <Typography variant="body2">
                    Erfaring: {animal.experience_level}
                  </Typography>

                  <Typography variant="body2">
                    ❤️ Sosialt behov: {animal.social_need}
                  </Typography>
                </CardContent>

              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}