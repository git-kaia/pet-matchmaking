import { Link, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Page() {
  const { matchid } = useParams(); // this is petId
  const adopterId = "ideal_experienced_bird_owner";

  const [match, setMatch] = useState<any>(null);
  const [pet, setPet] = useState<any>(null);
  const [adopter, setAdopter] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Get all matches
        const res = await fetch(
          `http://localhost:3000/adopters/${adopterId}/matches`
        );
        const matches = await res.json();

        // 2. Find correct match
        const foundMatch = matches.find((m: any) => m.petId === matchid);
        setMatch(foundMatch);

        // 3. Fetch pet
        if (foundMatch) {
          const petRes = await fetch(
            `http://localhost:3000/pets/${foundMatch.petId}`
          );
          const petData = await petRes.json();
          setPet(petData);
        }

        // 4. Fetch adopter
        const adopterRes = await fetch(
          `http://localhost:3000/adopters/${adopterId}`
        );
        const adopterData = await adopterRes.json();
        setAdopter(adopterData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [matchid]);

  if (!match || !pet || !adopter) {
    return <Typography sx={{ mt: 4 }}>Laster...</Typography>;
  }

  return (
    <Grid container spacing={5}>
      {/* HEADER */}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Typography variant="h1">
            Match med {pet.name || match.petId}
          </Typography>

          <Breadcrumbs>
            <Link to="/adoptant/dashboard">Dashboard</Link>
            <Link to="/adoptant/matches">Matcher</Link>
            <Typography variant="body2">{match.petId}</Typography>
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

              {/* IMAGES */}
              <Box className="flex gap-4 items-center">
                <img
                  src="/images/avatars/avatar-2.jpg"
                  alt="Adopter"
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                />
                <img
                  src={pet.image || "/images/org/animals/default.jpg"}
                  alt={pet.name}
                  style={{ width: 100, height: 100, borderRadius: "12px" }}
                />
              </Box>

              <Divider />

              {/* POSITIVES */}
              <Box>
                <Typography variant="h6">✅ Positive faktorer</Typography>
                {match.feedback.positives.map((p: string, i: number) => (
                  <Typography key={i} variant="body2">
                    • {p}
                  </Typography>
                ))}
              </Box>

              {/* NEGATIVES */}
              <Box>
                <Typography variant="h6">⚠️ Utfordringer</Typography>
                {match.feedback.negatives.length === 0 ? (
                  <Typography variant="body2">Ingen</Typography>
                ) : (
                  match.feedback.negatives.map((n: string, i: number) => (
                    <Typography key={i} variant="body2">
                      • {n}
                    </Typography>
                  ))
                )}
              </Box>

              <Divider />

              {/* CONCLUSION */}
              <Box>
                <Typography variant="h6">📊 Vurdering</Typography>
                <Typography variant="body2">
                  {match.feedback.conclusion}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}