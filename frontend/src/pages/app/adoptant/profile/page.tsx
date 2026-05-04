import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
  Avatar,
  Box,
  Divider,
} from "@mui/material";

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
          <CardContent className="flex flex-col gap-6">
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
                <Box className="grid grid-cols-2 gap-4">
                  <Field label="Boligtype" value={adopter.householdType} />
                  <Field label="Plass" value={adopter.spaceLevel} />
                  <Field label="Støytoleranse" value={adopter.noiseToleranceLevel} />
                  <Field label="Omsorgstid (timer)" value={adopter.dailyCareTime} />
                  <Field label="Erfaring (år)" value={adopter.experienceYearsBird} />
                  <Field label="Livsstabilitet" value={adopter.lifeStability} />
                  <Field label="Forpliktelse (år)" value={adopter.commitmentHorizonYears} />
                </Box>
              </Grid>
            </Grid>

            <Divider />

            {/* Info */}
            <Box>
              <Typography variant="subtitle1">Om meg</Typography>
              <Typography variant="body2" color="text.secondary">
                Profilen din brukes til å matche deg med riktige fugler basert på livsstil, erfaring og preferanser.
              </Typography>
            </Box>

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