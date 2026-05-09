import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Breadcrumbs, Card, CardContent, Grid, Typography, Box, Divider, } from "@mui/material";

function t(val: any) {
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

    beginner: "Nybegynner",
    experienced: "Erfaren",
    advanced: "Avansert",

    flock: "Flokk",
    pair: "Par",
    one_person: "Én person",
    independent: "Selvstendig",

    true: "Ja",
    false: "Nei",
  };

  return map[val] ?? val ?? "-";
}

function Field({ label, value }: any) {
  return (
    <Box>
      <Typography variant="caption">{label}</Typography>
      <Typography fontWeight={600}>{value ?? "-"}</Typography>
    </Box>
  );
}

export default function AnimalProfile() {
  const { dyrenavn } = useParams();

  const [animal, setAnimal] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    if (!dyrenavn) return;

    // 1. PET
    fetch(`http://localhost:3000/pets/${dyrenavn}`)
      .then((res) => res.json())
      .then(setAnimal)
      .catch(console.error);

    // 2. ALL MATCHES
      const adopterIds = [
        "busy_cat_owner",
        "experienced_bird_keeper",
        "no_time_user",
        "motivated_beginner",
        "preference_mismatch_user",
        "family_household_user",
        "lifestyle_conflict_user"
      ];

    Promise.all(
      adopterIds.map((id) =>
        fetch(`http://localhost:3000/adopters/${id}/matches`)
          .then((r) => r.json())
          .then((data) =>
            data.map((m: any) => ({
              ...m,
              adopterId: id,
            }))
          )
      )
    )
      .then((results) => results.flat())
      .then((allMatches) => {
        const filtered = allMatches.filter(
          (m: any) => m.petId === dyrenavn
        );

        setMatches(filtered);
      })
      .catch(console.error);
  }, [dyrenavn]);

  if (!animal) {
    return <Typography sx={{ mt: 4 }}>Laster dyreprofil...</Typography>;
  }

  return (
    <Grid container spacing={5}>

      {/* HEADER */}
      <Grid>
        <Typography variant="h1">
          {animal.speciesId}: {animal.name || animal.id}
        </Typography>

        <Breadcrumbs>
          <Link to="/org/animals">Dyreprofiler</Link>
          <Typography>{animal.id}</Typography>
        </Breadcrumbs>
      </Grid>

      {/* MAIN LAYOUT */}
      <Grid container spacing={3}>

        {/* ANIMAL PROFILE */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent className="flex flex-col gap-4">

              <img
                src={`/images/org/animals/${animal.id}.png`}
                onError={(e: any) =>
                  (e.target.src = "/images/org/animals/default.jpg")
                }
                style={{
                  width: "100%",
                  height: 300,
                  objectFit: "scale-down",
                  borderRadius: 12,
                }}
              />

              <Divider />

              {/* BASIC INFO */}
              <Box className="grid grid-cols-5 gap-4">
                <Field label="Art" value={animal.speciesId} />
                <Field label="Størrelse" value={t(animal.size)} />
                <Field label="Levetid" value={`${animal.lifespanYears ?? "-"} år`} />
                <Field label="Erfaring" value={t(animal.experienceLevel)} />
              </Box>

              <Divider />

              {/* BEHAVIOR */}
              <Box className="grid grid-cols-5 gap-4">
                <Field label="Støynivå" value={t(animal.noiseLevel)} />
                <Field label="Sosialt behov" value={t(animal.socialNeed)} />
                <Field label="Kos" value={t(animal.affectionLevel)} />
                <Field label="Aggresjon" value={t(animal.aggressionRisk)} />
              </Box>

              <Divider />

              {/* CARE */}
              <Box className="grid grid-cols-5 gap-4">
                <Field label="Tid per dag" value={`${animal.timeRequired ?? "-"} min`} />
                <Field label="Rotnivå" value={t(animal.messLevel)} />
                <Field label="Kostnad" value={t(animal.financialBurden)} />
                <Field label="Omsorg" value={t(animal.careNeed)} />
              </Box>

            </CardContent>
          </Card>
        </Grid>

        {/* MATCHES PANEL */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent>

              <Typography variant="h6" sx={{ mb: 2 }}>
                Matcher ({matches.length})
              </Typography>

              {matches.length === 0 ? (
                <Typography variant="body2">
                  Ingen matcher funnet for dette dyret
                </Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {matches.map((m, i) => (
                    <Link
                      key={i}
                      to={`/org/matches/${m.adopterId}__${m.petId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          border: "1px solid #eee",
                          borderRadius: 2,
                          "&:hover": { background: "#fafafa" },
                        }}
                      >
                        <Typography fontWeight={700}>
                          ❤️ {m.percentage}%
                        </Typography>

                        <Typography variant="body2">
                          Adoptant: {m.adopterId}
                        </Typography>
                      </Box>
                    </Link>
                  ))}
                </Box>
              )}

            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Grid>
  );
}