import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Breadcrumbs, Card, CardContent, Grid, Typography, Box, Divider, } from "@mui/material";

function t(val: any) {
  const map: any = {
    low: "Lav",
    medium: "Moderat",
    high: "Høy",
    very_high: "Svært høy",

    small: "Liten",
    large: "Stor",

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

  useEffect(() => {
  if (!dyrenavn) {
    console.warn("Missing pet id in route!");
    return;
  }

  fetch(`http://localhost:3000/pets/${dyrenavn}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("PET DATA:", data);
      setAnimal(data);
    })
    .catch(console.error);
}, [dyrenavn]);

console.log("URL PARAMS:", useParams());

  if (!animal) {
    return <Typography sx={{ mt: 4 }}>Laster dyreprofil...</Typography>;
  }

  return (
    <Grid container spacing={5}>
      {/* HEADER */}
      <Grid>
        <Typography variant="h1">{animal.speciesId}: {animal.id}</Typography>

        <Breadcrumbs>
        <Link to="/org/animals">Dyreprofiler</Link>
          <Typography>{animal.id}</Typography>
        </Breadcrumbs>
      </Grid>

      {/* CONTENT */}
      <Grid container size={12} spacing={3}>
        <Card>
          <CardContent className="flex flex-col gap-4">

            {/* IMAGE */}
            <img
              src={`/images/org/animals/${animal.id}.png`}
              onError={(e: any) =>
                (e.target.src = "/images/org/animals/default.jpg")
              }
              style={{ width: "100%", height: 260, objectFit: "cover" }}
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
              <Field label="Daglig tid" value={`${animal.timeRequired ?? "-"} min`} />
              <Field label="Rotnivå" value={t(animal.messLevel)} />
              <Field label="Kostnad" value={t(animal.financialBurden)} />
              <Field label="Omsorg" value={t(animal.careNeed)} />
            </Box>

            <Divider />

            {/* SPECIAL */}
            <Box className="grid grid-cols-5 gap-4">
              <Field label="Bonding" value={t(animal.bondingStyle)} />
              <Field label="Trenger partner" value={t(animal.requiresBirdPartner)} />
              <Field label="Mental stimulering" value={t(animal.mentalStimulationNeed)} />
              <Field label="Flybehov" value={t(animal.flightNeed)} />
              <Field label="Diett" value={t(animal.dietComplexity)} />
            </Box>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}