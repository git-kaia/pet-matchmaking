import { Link, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";

function t(val: string) {
  const map: any = {
    low: "Lav",
    medium: "Moderat",
    high: "Høy",
    very_high: "Svært høy",

    very_small: "Svært liten",
    small: "Liten",
    medium_size: "Medium",
    large: "Stor",
    very_large: "Svært stor",
    intermediate: "Mellomnivå",

    beginner: "Nybegynner",
    experienced: "Erfaren",
    advanced: "Avansert",
  };

  return map[val] ?? val ?? "-";
}

const safe = (val: any) =>
  val === undefined || val === null ? "-" : val;

export default function Page() {
  const { matchid } = useParams();
  const adopterId = "experienced_bird_keeper";

  const [match, setMatch] = useState<any>(null);
  const [pet, setPet] = useState<any>(null);
  const [adopter, setAdopter] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // MATCHES
        const res = await fetch(
          `http://localhost:3000/adopters/${adopterId}/matches`
        );

        const matches = await res.json();

        const foundMatch = matches.find(
          (m: any) => m.petId === matchid
        );

        setMatch(foundMatch);

        // PET
        if (foundMatch) {
          const petRes = await fetch(
            `http://localhost:3000/pets/${foundMatch.petId}`
          );

          const petData = await petRes.json();
          setPet(petData);
        }

        // ADOPTER
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
            <Typography variant="body2">
              {match.petId}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* CONTENT */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 10 }}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {/* SCORE */}
              <Typography
                variant="h3"
                sx={{ fontWeight: 800 }}
              >
                ❤️ {match.percentage}% match
              </Typography>

              <Divider />

              {/* ENTITY OVERVIEW */}
              <Box
                sx={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                }}
              >
                {/* ADOPTER */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`/images/adoptants/${adopterId}.jpg`}
                    onError={(e: any) => {
                      e.target.src =
                        "/images/avatars/avatar-2.jpg";
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                  <Box>
                    <Typography variant="h6">
                      {adopterId}
                    </Typography>

                    <Typography variant="body2">
                      Erfaring:{" "}
                      {adopter.experienceYears?.bird
                        ? `${adopter.experienceYears.bird} år`
                        : "-"}
                    </Typography>

                    <Typography variant="body2">
                      Tid: {safe(adopter.dailyCareTime)} min/dag
                    </Typography>

                    <Typography variant="body2">
                      Støytoleranse:{" "}
                      {t(adopter.noiseToleranceLevel)}
                    </Typography>

                    <Typography variant="body2">
                      Livsstabilitet:{" "}
                      {t(adopter.lifeStability)}
                    </Typography>
                  </Box>
                </Box>

                {/* PET */}
                <Link
                  to={`/adoptant/animals/${pet.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`/images/org/animals/${pet.id}.png`}
                      onError={(e: any) =>
                        (e.target.src =
                          "/images/org/animals/default.jpg")
                      }
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 12,
                        objectFit: "cover",
                      }}
                    />

                    <Box>
                      <Typography variant="h6">
                        {pet.id}
                      </Typography>

                      <Typography variant="body2">
                        Art: {pet.speciesId}
                      </Typography>

                      <Typography variant="body2">
                        Størrelse: {t(pet.size)}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Box>

              <Divider />

              {/* MATCH FACTORS */}
              <Typography variant="h6">
                Viktige matchfaktorer for {t(pet.id)}:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Chip label={`Støy: ${t(pet.noiseLevel)}`} />
                <Chip label={`Sosial: ${t(pet.socialNeed)}`} />
                <Chip label={`Omsorg: ${t(pet.careNeed)}`} />
                <Chip
                  label={`Erfaring: ${t(
                    pet.experienceLevel
                  )}`}
                />
              </Box>

              <Divider />

              {/* POSITIVES */}
              <Box>
                <Typography variant="h6">
                  ✅ Positive faktorer
                </Typography>

                {match.feedback.positives.map(
                  (p: string, i: number) => (
                    <Typography key={i} variant="body2">
                      • {p}
                    </Typography>
                  )
                )}
              </Box>

              {/* NEGATIVES */}
              <Box>
                <Typography variant="h6">
                  ⚠️ Utfordringer
                </Typography>

                {match.feedback.negatives.length === 0 ? (
                  <Typography variant="body2">
                    Ingen
                  </Typography>
                ) : (
                  match.feedback.negatives.map(
                    (n: string, i: number) => (
                      <Typography
                        key={i}
                        variant="body2"
                      >
                        • {n}
                      </Typography>
                    )
                  )
                )}
              </Box>

              <Divider />

              {/* CONCLUSION */}
              <Box>
                <Typography variant="h6">
                  📊 Vurdering
                </Typography>

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