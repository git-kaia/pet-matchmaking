import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Breadcrumbs, Card, CardContent, Grid, Typography, Box, Divider, Chip, } from "@mui/material";

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

    budgie: "Undulat",
    african_grey: "Grå jaco",
    canary: "Kanari",
    cockatoo: "Kakadue",
    conure: "Kongeparakitt",
    macaw: "Ara",
  };

  return map[val] ?? val ?? "-";
}

// Remove adopter-facing language
function cleanFeedback(text: string) {
  if (!text) return text;

  let cleaned = text

    .replace(/\bdu\b/gi, "adoptanten")
    .replace(/\bdin\b/gi, "adoptantens")
    .replace(/\bdere\b/gi, "adoptant og fugl")
    .replace(/\bdeg\b/gi, "adoptanten");

  cleaned = cleaned

    .replace(
      /Økonomien adoptantens/gi,
      "Adoptantens sin økonomi"
    )

    .replace(
      /Livssituasjonen adoptantens/gi,
      "Livssituasjonen til adoptanten"
    )

    .replace(
      /Forpliktelsen adoptantens/gi,
      "Forpliktelsen til adoptanten"
    );

  return cleaned.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) =>
    c.toUpperCase()
  );
}

const safe = (val: any) => (val === undefined || val === null ? "-" : val);

export default function Page() {
  const { param } = useParams();
  const [adopterId, petId] = param?.split("__") || [];

  const [match, setMatch] = useState<any>(null);
  const [pet, setPet] = useState<any>(null);
  const [adopter, setAdopter] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        if (!adopterId || !petId) return;

        // MATCHES
        const res = await fetch(
          `http://localhost:3000/adopters/${adopterId}/matches`
        );

        const matches = await res.json();
        const found = matches.find((m: any) => m.petId === petId);
        setMatch(found);

        // PET
        const petRes = await fetch(
          `http://localhost:3000/pets/${petId}`
        );
        if (petRes.ok) setPet(await petRes.json());

        // ADOPTER
        const adopterRes = await fetch(
          `http://localhost:3000/adopters/${adopterId}`
        );
        if (adopterRes.ok) setAdopter(await adopterRes.json());
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [param]);

  if (!match || !pet || !adopter) {
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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h1">
            Matchanalyse
          </Typography>

          <Breadcrumbs>
            <Link to="/org/dashboard">Dashboard</Link>
            <Link to="/org/matches">Matcher</Link>
            <Typography>{pet.id}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* MAIN */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 10 }}>
          <Card>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

              {/* SCORE */}
              <Typography variant="h3" sx={{ fontWeight: 800 }}>
                ❤️ {match.percentage}% match
              </Typography>

              <Divider />

              {/* ENTITY OVERVIEW */}
              <Box sx={{ display: "flex", gap: 6, flexWrap: "wrap" }}>

                {/* ADOPTER */}
                <Link to={`/org/adoptants/${adopterId}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <img
                      src={`/images/adoptants/${adopterId}.jpg`}
                      onError={(e: any) => {
                        e.target.src = "/images/avatars/avatar-2.jpg";
                      }}
                      style={{ width: 70, height: 70, borderRadius: "50%" }}
                    />

                  <Box>
                    <Typography variant="h6">{adopterId}</Typography>

                    <Typography variant="body2">
                      Erfaring: {adopter.experienceYears?.bird
                        ? `${adopter.experienceYears.bird} år`
                        : "Ingen"}
                    </Typography>

                    <Typography variant="body2">
                      Tid: {safe(adopter.dailyCareTime)} min/dag
                    </Typography>

                    <Typography variant="body2">
                      Støytoleranse: {t(adopter.noiseToleranceLevel)}
                    </Typography>

                    <Typography variant="body2">
                      Livsstabilitet: {t(adopter.lifeStability)}
                    </Typography>
                  </Box>
                </Box>
                </Link>

                {/* PET */}
                <Link to={`/org/animals/${pet.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <img
                      src={`/images/org/animals/${pet.id}.png`}
                      onError={(e: any) =>
                        (e.target.src = "/images/org/animals/default.jpg")
                      }
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 12,
                        objectFit: "cover",
                      }}
                    />

                    <Box>
                      <Typography variant="h6">{pet.id}</Typography>
                      <Typography variant="body2">
                        Art: {t(pet.speciesId)}
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

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip label={`Støy: ${t(pet.noiseLevel)}`} />
                <Chip label={`Sosial: ${t(pet.socialNeed)}`} />
                <Chip label={`Krav til omsorg: ${t(pet.careNeed)}`} />
                <Chip label={`Krav til erfaring: ${t(pet.experienceLevel)}`} />
              </Box>

              <Divider />

              {/* STRENGTHS */}
              <Box>
                <Typography variant="h6">✅ Styrker i matchen</Typography>
                {feedback.positives.map((p: string, i: number) => (
                  <Typography key={i}>• {cleanFeedback(p)}</Typography>
                ))}
              </Box>

              {/* RISKS */}
              <Box>
                <Typography variant="h6">⚠️ Risikofaktorer</Typography>
                {feedback.negatives.length ? (
                  feedback.negatives.map((n: string, i: number) => (
                    <Typography key={i}>• {cleanFeedback(n)}</Typography>
                  ))
                ) : (
                  <Typography>Ingen identifiserte risikofaktorer</Typography>
                )}
              </Box>

              <Divider />

              {/* CONCLUSION */}
              <Box>
                <Typography variant="h6">📊 Faglig vurdering</Typography>
                <Typography>
                  {cleanFeedback(feedback.conclusion)}
                </Typography>
              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}