import { Link } from "react-router-dom";

import { Breadcrumbs, Button, Card, CardContent, Grid, Tooltip, Typography, Avatar, Box, Divider, } from "@mui/material";

import NiCellsPlus from "@/icons/nexture/ni-cells-plus";
import NiKnobs from "@/icons/nexture/ni-knobs";

export default function Page() {
  return (
    <Grid container spacing={5}>
      {/* Header */}
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Min profil
          </Typography>

          <Breadcrumbs>
            <Link color="inherit" to="/adoptant/dashboard">
              Dashboard
            </Link>
            <Typography variant="body2">Profil</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid
          size={{ xs: 12, md: "auto" }}
          className="flex flex-row items-start gap-2"
        >
          <Tooltip title="Configuration">
            <Button
              className="icon-only surface-standard flex-none"
              size="medium"
              color="grey"
              variant="surface"
              startIcon={<NiKnobs size={"medium"} />}
            />
          </Tooltip>

          <Tooltip title="Add Widget">
            <Button
              className="icon-only surface-standard flex-none"
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

                {/* Personlig informasjon */}
                <Grid size={{ xs: 12, sm: 8 }}>
                  <Box className="grid grid-cols-2 gap-4">
                    <ProfileField label="Brukernavn:" value="olanormann123" />
                    <ProfileField label="Fornavn:" value="Ola" />
                    <ProfileField label="Etternavn:" value="Normann" />
                    <ProfileField label="E‑post:" value="ola.normann@example.com"/>
                    <ProfileField label="Telefonnummer:" value="+47 99887766"/>
                    <ProfileField label="Fødselsdato:" value="12.03.1998" />
                    <ProfileField label="Kjønn:" value="Mann" />
                    <ProfileField label="Adresse:" value="Gjøvikvegen 2, 2815 Gjøvik"/>
                    <ProfileField label="Passord:" value="**********" />
                  </Box>
                </Grid>
              </Grid>

              <Divider />

              {/* Om meg */}
              <Box>
                <Typography variant="subtitle1" className="mb-1">
                  Om meg
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Jeg er en dyrekjær person som ønsker å adoptere et dyr som
                  passer min livsstil og behov.
                  Jeg har en aktiv hverdag, og trenger et dyr som kan være med på turer og aktiviteter.
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

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <Box className="flex flex-col">
      <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.8 }}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        color="text.primary"
        sx={{ fontWeight: 600 }}
      >
        {value || "-"}
      </Typography>
    </Box>
  );
}

