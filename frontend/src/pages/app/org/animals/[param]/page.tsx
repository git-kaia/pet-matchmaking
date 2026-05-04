import { useParams } from "react-router-dom";
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

export default function AnimalProfile() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/pets/${id}`)
      .then((res) => res.json())
      .then(setAnimal)
      .catch(console.error);
  }, [id]);

  if (!animal) {
    return <Typography sx={{ mt: 4 }}>Laster dyreprofil...</Typography>;
  }

  return (
    <Grid container spacing={5}>
      {/* HEADER */}
      <Grid>
        <Typography variant="h1">{animal.name}</Typography>

        <Breadcrumbs>
          <Typography>Dyreprofiler</Typography>
          <Typography>{animal.name}</Typography>
        </Breadcrumbs>
      </Grid>

      {/* CONTENT */}
      <Grid container spacing={3}>
        <Card>
          <CardContent className="flex flex-col gap-6">
            <img
              src={`/images/org/animals/${animal.id}.jpg`}
              onError={(e: any) =>
                (e.target.src = "/images/org/animals/default.jpg")
              }
              style={{
                width: "100%",
                height: 260,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />

            <Box className="flex gap-4 items-center">
                <img
                  src="/images/avatars/avatar-2.jpg"
                  alt="Adopter"
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                />
            </Box>

            <Divider />

            {/* BASIC */}
            <Box className="grid grid-cols-2 gap-4">
              <Field label="Art" value={animal.species_id} />
              <Field label="Størrelse" value={animal.size} />
              <Field label="Levetid" value={`${animal.lifespan_years} år`} />
              <Field label="Erfaringsnivå" value={animal.experience_level} />
            </Box>

            <Divider />

            {/* BEHAVIOR */}
            <Typography variant="h6">Atferd</Typography>
            <Box className="grid grid-cols-2 gap-4">
              <Field label="Støynivå" value={animal.noise_level} />
              <Field label="Sosialt behov" value={animal.social_need} />
              <Field label="Kos" value={animal.affection_level} />
              <Field label="Aggresjonsrisiko" value={animal.aggression_risk} />
            </Box>

            <Divider />

            {/* CARE */}
            <Typography variant="h6">Omsorg</Typography>
            <Box className="grid grid-cols-2 gap-4">
              <Field label="Daglig tid" value={`${animal.time_required} min`} />
              <Field label="Søvnbehov" value={animal.sleep_need} />
              <Field label="Flybehov" value={animal.flight_need} />
              <Field label="Mental stimulering" value={animal.mental_stimulation_need} />
            </Box>

            <Divider />

            {/* SPECIAL */}
            <Typography variant="h6">Spesielt</Typography>
            <Box className="grid grid-cols-2 gap-4">
              <Field label="Bonding" value={animal.bonding_style} />
              <Field
                label="Trenger partner"
                value={animal.requires_bird_partner ? "Ja" : "Nei"}
              />
              <Field label="Diett" value={animal.diet_complexity} />
              <Field label="Mess nivå" value={animal.mess_level} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function Field({ label, value }: any) {
  return (
    <Box>
      <Typography variant="caption">{label}</Typography>
      <Typography fontWeight={600}>{value || "-"}</Typography>
    </Box>
  );
}