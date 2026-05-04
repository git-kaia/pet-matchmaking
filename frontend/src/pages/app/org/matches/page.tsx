import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Breadcrumbs,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Tooltip,
} from "@mui/material";

import NiKnobs from "@/icons/nexture/ni-knobs";

export default function Page() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const adopterIds = [
    "ideal_experienced_bird_owner",
    "adopter_1",
  ];

  useEffect(() => {
    async function load() {
      try {
        const results = await Promise.all(
          adopterIds.map(async (id) => {
            const res = await fetch(
              `http://localhost:3000/adopters/${id}/matches`
            );

            if (!res.ok) return [];

            const data = await res.json();

            return Array.isArray(data)
              ? data.map((m: any) => ({
                  ...m,
                  adopterId: id,
                }))
              : [];
          })
        );

        setMatches(results.flat());
      } catch (err) {
        console.error("Failed to load matches:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <Grid container spacing={5}>
      {/* HEADER */}
      <Grid container spacing={2.5} className="w-full">
        <Grid>
          <Typography variant="h1">Matcher</Typography>

          <Breadcrumbs>
            <Typography>Dashboard</Typography>
            <Typography>Matcher</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid>
          <Tooltip title="Sorter">
            <Button startIcon={<NiKnobs />} variant="outlined">
              Sorter
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      {loading && (
        <Grid>
          <Typography>Laster matcher...</Typography>
        </Grid>
      )}

      {/* MATCH LIST */}
      <Grid container spacing={3}>
        {matches.map((m, i) => (
          <Grid key={`${m.adopterId}-${m.petId}-${i}`}>
            <Card>
              <CardActionArea
                component={Link}
                to={`/org/matches/${m.petId}?adopterId=${m.adopterId}`}
              >
                <CardContent> 
                  <Typography variant="h6">{m.petId}</Typography>
                  <Typography>Adopter: {m.adopterId}</Typography>
                  <Typography>❤️ {m.percentage}%</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}