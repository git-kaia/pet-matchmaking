import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Breadcrumbs, Button, Card, CardContent, Grid, Tooltip, Typography, Avatar, Box, Divider } from "@mui/material";

import NiCellsPlus from "@/icons/nexture/ni-cells-plus";
import NiKnobs from "@/icons/nexture/ni-knobs";

import { getAdopter } from "@/api/adopter";

export default function Page() {
  const [adopter, setAdopter] = useState<any>(null);

  useEffect(() => {
    getAdopter("adopter_1")
      .then(setAdopter)
      .catch(console.error);
  }, []);

  if (!adopter) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    <Grid container spacing={5}>
      {/* Header */}
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Min profil
          </Typography>

          <Breadcrumbs>
            <Link to="/adoptant/dashboard">Dashboard</Link>
            <Typography variant="body2">Profil</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex gap-2">
          <Tooltip title="Configuration">
            <Button
              className="icon-only surface-standard"
              size="medium"
              color="grey"
              variant="surface"
              startIcon={<NiKnobs size={"medium"} />}
            />
          </Tooltip>

          <Tooltip title="Add Widget">
            <Button
              className="icon-only surface-standard"
              size="medium"
              color="grey"
              variant="surface"
              startIcon={<NiCellsPlus size={"medium"} />}
            />
          </Tooltip>
        </Grid>
      </Grid>

      {/* Profile card */}
      <Grid container size={12} spacing={3}>
        <Grid size={{ lg: 8, xs: 12 }}>
          <Card>
            <CardContent className="flex flex-col gap-6">

              <Grid container spacing={4}>
                {/* Avatar */}
                <Grid size={{ xs: 12, sm: 4 }} className="flex justify-center">
                  <Box className="flex flex-col items-center gap-2">
                    <Avatar
                      src="/images/avatars/avatar-2.jpg"
                      alt="Profilbilde"
                      sx={{ width: "100px !important", height: "100px !important" }}
                    />
                    <Button variant="outlined" size="small">
                      Bytt profilbilde
                    </Button>
                  </Box>
                </Grid>

                {/* Dynamic adopter data */}
                <Grid size={{ xs: 12, sm: 8 }}>
                  <Box className="grid grid-cols-2 gap-4">
                    <ProfileField label="ID:" value={adopter.id} />
                    <ProfileField label="Boligtype:" value={adopter.householdType} />
                    <ProfileField label="Plass:" value={adopter.spaceLevel} />
                    <ProfileField label="Støynivå:" value={adopter.noiseToleranceLevel} />
                    <ProfileField label="Omsorgstid:" value={adopter.dailyCareTime?.toString()} />
                    <ProfileField label="Erfaring med fugl:" value={adopter.experienceYearsBird?.toString()} />
                    <ProfileField label="Livsstil:" value={adopter.lifeStability} />
                    <ProfileField label="Forpliktelse:" value={adopter.commitmentHorizonYears?.toString()} />
                  </Box>
                </Grid>
              </Grid>

              <Divider />

              {/* About */}
              <Box>
                <Typography variant="subtitle1" className="mb-1">
                  Om meg
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Dette er din adopter-profil basert på spørreskjemaet.
                  Dataene brukes til å finne riktige dyrematcher.
                </Typography>
              </Box>

              <Box className="flex justify-end mt-4">
                <Button variant="contained">Rediger profil</Button>
              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

/* Reusable component */
function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <Box className="flex flex-col">
      <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.8 }}>
        {label}
      </Typography>

      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value || "-"}
      </Typography>
    </Box>
  );
}