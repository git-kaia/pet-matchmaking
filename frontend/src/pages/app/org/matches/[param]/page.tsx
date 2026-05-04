import { useParams, useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";

export default function Page() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const petId = params.param || params.matchid || null;

  const adopterId = searchParams.get("adopterId");

  const [match, setMatch] = useState<any>(null);
  const [pet, setPet] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        if (!adopterId || !petId) return;

        // 1. Get matches
        const res = await fetch(
          `http://localhost:3000/adopters/${adopterId}/matches`
        );

        if (!res.ok) return;

        const data = await res.json();

        const found = Array.isArray(data)
          ? data.find((m: any) => m.petId === petId)
          : null;

        setMatch(found);

        // 2. Get pet
        if (found) {
          const petRes = await fetch(
            `http://localhost:3000/pets/${petId}`
          );

          if (petRes.ok) {
            const petData = await petRes.json();
            setPet(petData);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [adopterId, petId]);

  if (!match || !pet) {
    return <Typography sx={{ mt: 4 }}>Laster...</Typography>;
  }

  const feedback = match.feedback || {
    positives: [],
    negatives: [],
    conclusion: "",
  };

  return (
    <Grid container spacing={5}>
      {/* HEADER */}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h1">
            Match med {pet.name || petId}
          </Typography>

          <Breadcrumbs>
            <Link to="/org/dashboard">Dashboard</Link>
            <Link to="/org/matches">Matcher</Link>
            <Typography>{pet.name || petId}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* CONTENT */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent className="flex flex-col gap-6">

              {/* SCORE */}
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                ❤️ {match.percentage}% match
              </Typography>

              <Divider />

              {/* PET FOCUS */}
              <Box className="flex gap-4 items-center">
                <img
                  src={pet.image || `/images/org/animals/default.jpg`}
                  alt={pet.name}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />

                <Box>
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography variant="body2">
                    Art: {pet.speciesId}
                  </Typography>
                  <Typography variant="body2">
                    Alder: {pet.ageYears} år
                  </Typography>
                  <Typography variant="body2">
                    Kjønn: {pet.sex}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* POSITIVES */}
              <Box>
                <Typography variant="h6">✅ Positive faktorer</Typography>
                {feedback.positives.map((p: string, i: number) => (
                  <Typography key={i}>• {p}</Typography>
                ))}
              </Box>

              {/* NEGATIVES */}
              <Box>
                <Typography variant="h6">⚠️ Utfordringer</Typography>
                {feedback.negatives.length ? (
                  feedback.negatives.map((n: string, i: number) => (
                    <Typography key={i}>• {n}</Typography>
                  ))
                ) : (
                  <Typography>Ingen utfordringer</Typography>
                )}
              </Box>

              <Divider />

              {/* CONCLUSION */}
              <Box>
                <Typography variant="h6">📊 Vurdering</Typography>
                <Typography>{feedback.conclusion}</Typography>
              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}