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
  Box,
  Divider,
} from "@mui/material";

import NiKnobs from "@/icons/nexture/ni-knobs";

export default function Page() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState<Record<string, any>>({});

  const adopterIds = [
    "ideal_experienced_bird_owner",
    "busy_cat_low_tolerance",
    "noise_sensitive_moderate_owner",
    "overconfident_low_tolerance_beginner",
    "zero_time_unavailable",
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

        const allMatches = results.flat();
        setMatches(allMatches);

        const petResults = await Promise.all(
          allMatches.map(async (m: any) => {
            const res = await fetch(
              `http://localhost:3000/pets/${m.petId}`
            );
            return res.ok ? res.json() : null;
          })
        );

        const petMap: Record<string, any> = {};
        petResults.forEach((pet) => {
          if (pet?.id) petMap[pet.id] = pet;
        });

        setPets(petMap);
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
          <Typography variant="h1">Alle matcher</Typography>

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

      {/* LOADING */}
      {loading && (
        <Grid>
          <Typography>Laster matcher...</Typography>
        </Grid>
      )}

      {/* MATCH LIST */}
      <Grid container spacing={3}>
        {matches.map((m, i) => {
          const pet = pets[m.petId];

          return (
            <Grid key={`${m.adopterId}-${m.petId}-${i}`}>
              <Card>
                <CardActionArea
                  component={Link}
                  to={`/org/matches/${m.adopterId}/${m.petId}`}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      p: 2.5,
                    }}
                  >

                    {/* MATCH SCORE */}
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                      ❤️ Match: {m.percentage}%
                    </Typography>

                    {/* HEADER TEXT */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      <Typography variant="body1" color="text.secondary">
                        Fugl: {pet?.name || m.petId}
                      </Typography>

                      <Typography variant="body1" color="text.secondary">
                        Adoptant: {m.adopterId}
                      </Typography>
                    </Box>

                    <Divider />

                    {/* IMAGES */}
                    <Box className="flex gap-3 items-center">
                      {/* ADOPTER */}
                      <img
                        src="/images/avatars/avatar-2.jpg"
                        alt="Adopter"
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                        }}
                      />

                      {/* BIRD */}
                      <img
                        src={
                          pet
                            ? `/images/org/animals/${pet.id}.png`
                            : "/images/org/animals/default.jpg"
                        }
                        onError={(e: any) => {
                          e.target.src =
                            "/images/org/animals/default.jpg";
                        }}
                        alt={pet?.name || "Bird"}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "12px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                    <Divider />

                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}