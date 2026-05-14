import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Breadcrumbs, Card, CardContent, Grid, Typography, Box, Divider,} from "@mui/material";

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
    intermediate: "Mellomnivå",

    flock: "Flokk",
    pair: "Par",
    one_person: "Én person",
    independent: "Selvstendig",

    true: "Ja",
    false: "Nei",

    budgie: "Undulat",
    african_grey: "Grå jaco",
    canary: "Kanari",
    cockatoo: "Gultoppkakadue", 
    conure: "Solparakitt",
    macaw: "Blågulara",
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

  useEffect(() => {
    if (!dyrenavn) return;

    // 1. PET
    fetch(`http://localhost:3000/pets/${dyrenavn}`)
      .then((res) => res.json())
      .then(setAnimal)
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
          <Link to="/adoptant/matches">Matcher</Link>
          <Typography>{animal.id}</Typography>
        </Breadcrumbs>
      </Grid>

      {/* MAIN LAYOUT */}
      <Grid container size={8} spacing={3}>

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
                <Field label="Art" value={t(animal.speciesId)} />
                <Field label="Størrelse" value={t(animal.size)} />
                <Field label="Levetid" value={`${animal.lifespanYears ?? "-"} år`} />
                <Field label="Erfaring" value={t(animal.experienceLevel)} />
              </Box>

              <Divider />

              {/* BEHAVIOR */}
              <Box className="grid grid-cols-5 gap-4">
                <Field label="Støynivå" value={t(animal.noiseLevel)} />
                <Field label="Sosialt behov" value={t(animal.socialNeed)} />
                <Field label="Nivå av kjærlighet" value={t(animal.affectionLevel)} />
                <Field label="Nivå av aggresjon" value={t(animal.aggressionRisk)} />
              </Box>

              <Divider />

              {/* CARE */}
              <Box className="grid grid-cols-5 gap-4">
                <Field label="Krav til omsorgstid per dag" value={`${animal.timeRequired ?? "-"} min`} />
                <Field label="Nivå av kjæledyrrelatert rot" value={t(animal.messLevel)} />
                <Field label="Nivå av omsorgskostnader" value={t(animal.financialBurden)} />
                <Field label="Krav til omsorg" value={t(animal.careNeed)} />
              </Box>

            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Grid>
  );
}