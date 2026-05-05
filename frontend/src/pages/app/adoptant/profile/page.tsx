import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Breadcrumbs, Button, Card,  CardContent, Grid, Tooltip,  Typography, Avatar, Box, Divider, } from "@mui/material";

import NiKnobs from "@/icons/nexture/ni-knobs";

import { getAdopter } from "@/api/adopter";

export default function Page() {
  const adopterId = "ideal_experienced_bird_owner";
  const [adopter, setAdopter] = useState<any>(null);

  useEffect(() => {
    getAdopter(adopterId)
      .then(setAdopter)
      .catch(console.error);
  }, []);

  if (!adopter) {
    return <Typography sx={{ mt: 4 }}>Laster profil...</Typography>;
  }

  console.log(adopter);

const mapValue = (value: any) => {
  const map: Record<string, string> = {
    high: "Høy",
    very_high: "Svært høy",
    medium: "Middels",
    low: "Lav",
    none: "Ingen",
    part_time: "Deltid",
    full_time: "Fulltid",
    one_person: "Knytter seg til én person",
  };

  return map[value] ?? value;
};

  return (
    <Grid container spacing={5}>
      {/* Header */}
      <Grid container spacing={2.5}>
        <Grid>
          <Typography variant="h1">Min profil</Typography>

          <Breadcrumbs>
            <Link to="/adoptant/dashboard">Dashboard</Link>
            <Typography variant="body2">Profil</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* Profile */}
      <Grid container size={12} spacing={3}>
        <Card>
          <CardContent className="flex flex-col gap-4">
            <Grid container spacing={4}>
              {/* Avatar */}
              <Grid>
                <Box className="flex flex-col items-center gap-2">
                  <Avatar
                    src="/images/avatars/avatar-2.jpg"
                    sx={{ width: 100, height: 100 }}
                  />
                  <Button size="small">Bytt bilde</Button>
                </Box>
              </Grid>

              {/* Data */}
              <Grid>
                <Typography variant="h3" className="font-bold gap-2">Om deg</Typography>

                <Box className="grid grid-cols-4 gap-4">
                    <Field label="Barn i husstanden" value={mapValue(adopter.kidsAge)} />

                    <Field
                      label="Har andre dyr"
                      value={adopter.hasCurrentPets ? "Ja" : "Nei"}
                    />

                    <Field
                      label="Type dyr"
                      value={adopter.typeOfPet?.length ? adopter.typeOfPet.join(", ") : "Ingen"}
                    />

                    <Field
                      label="Arbeidshverdag"
                      value={mapValue(adopter.householdWorkPattern)}
                    />

                    <Field
                      label="Daglig omsorgstid"
                      value={`${adopter.dailyCareTime} min`}
                    />

                    <Field
                      label="Alenetid"
                      value={mapValue(adopter.aloneTimeHours)}
                    />

                    <Field
                      label="Støytoleranse"
                      value={mapValue(adopter.noiseToleranceLevel)}
                    />

                    <Field
                      label="Toleranse for rot"
                      value={mapValue(adopter.cleaningTolerance)}
                    />

                    <Field
                      label="Livsstabilitet"
                      value={mapValue(adopter.lifeStability)}
                    />

                    <Field
                      label="Forpliktelse"
                      value={`${adopter.commitmentHorizonYears} år`}
                    />

                    <Field
                      label="Erfaring med fugl"
                      value={
                        adopter.experienceYears?.bird
                          ? `${adopter.experienceYears.bird} år`
                          : "Ingen"
                      }
                    />

                    <Field
                      label="Læringsvilje"
                      value={mapValue(adopter.learningWillingness)}
                    />
                  </Box>
              </Grid>
            </Grid>

            {/* Info */}
            <Box>
              <Typography variant="subtitle1">Om meg</Typography>
              <Typography variant="body2" color="text.secondary">
                Jeg er en erfaren fugleentusiast med over 10 års erfaring med å ta vare på ulike fuglearter. 
                Jeg har hatt alt fra små undulater til større papegøyer.
              </Typography>
            </Box>

            <Divider />
                <Typography variant="h6">Dine preferanser</Typography>

                <Box className="grid grid-cols-2 gap-4">
                  <Field label="Ønsket sosialitet" value={mapValue(adopter.desiredPetSociability)} />
                  <Field label="Ønsket kos" value={mapValue(adopter.desiredPetAffectionLevel)} />
                  <Field label="Toleranse for problematferd" value={mapValue(adopter.problemBehaviorTolerance)} />
                  <Field label="Ønsket interaksjon" value={mapValue(adopter.desiredHumanInteraction)} />
                  <Field label="Bonding-type" value={mapValue(adopter.desiredBondingStyle)} />
                  <Field label="Flere fugler" value={mapValue(adopter.willingnessMultipleBirds)} />
                </Box>

            <Divider />
                <Typography variant="h6">Fuglehold</Typography>

                <Box className="grid grid-cols-2 gap-4">
                  <Field label="Søvnforhold" value={mapValue(adopter.sleepEnvironmentCommitment)} />
                  <Field label="Fri flyging" value={mapValue(adopter.freeFlightExpectation)} />
                  <Field label="Berikelse" value={mapValue(adopter.enrichmentCommitment)} />
                  <Field label="Trening" value={mapValue(adopter.trainingInterest)} />
                  <Field label="Diett-toleranse" value={mapValue(adopter.dietComplexityTolerance)} />
                  <Field label="Adopsjonskompleksitet" value={mapValue(adopter.adoptionComplexityTolerance)} />
                </Box>

            <Divider />

            <Box className="flex justify-end">
              <Button variant="contained">Rediger profil</Button>
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
      <Typography variant="body2" fontWeight={600}>
        {value ?? "-"}
      </Typography>
    </Box>
  );
}