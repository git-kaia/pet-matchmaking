import { Link } from "react-router-dom";

import { Breadcrumbs, Button, Card, CardContent, Grid, Tooltip, Typography, Avatar, Box, Divider, CardActionArea } from "@mui/material";

import NiCellsPlus from "@/icons/nexture/ni-cells-plus";
import NiKnobs from "@/icons/nexture/ni-knobs";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Min organisasjon
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" to="/org/dashboard">
              Dashboard
            </Link>
            <Typography variant="body2">Min organisasjon</Typography>
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
              <Typography variant="subtitle1" className="mb-1">
                  Min profil
                </Typography>
              <Grid container spacing={4}>
                
                <Grid size={{ xs: 12, sm: 4 }} className="flex justify-center">
                  <Box className="flex flex-col items-center gap-2">
                    <Avatar
                      src="/images/avatars/avatar-3.jpg"
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
                    <ProfileField label="Brukernavn:" value="karinormann123" />
                    <ProfileField label="Fornavn:" value="Kari" />
                    <ProfileField label="Etternavn:" value="Normann" />
                    <ProfileField label="E‑post:" value="kari.normann@example.com"/>
                    <ProfileField label="Telefonnummer:" value="+47 99867766"/>
                    <ProfileField label="Fødselsdato:" value="12.08.1995" />
                    <ProfileField label="Kjønn:" value="Kvinne" />
                    <ProfileField label="Adresse:" value="Fugleveien 12, 1234 Oslo" />
                    <ProfileField label="Passord:" value="**********" />
                  </Box>
                </Grid>
              </Grid>

              <Box className="flex justify-end mt-4">
                <Button variant="contained">Rediger profil</Button>
              </Box>

              <Divider />

              {/* Min organisasjon */}
              <Box>
                <Typography variant="subtitle1" className="mb-1">
                  Min organisasjon
                </Typography>

                <Typography variant="h6" className="card-title px-1 pt-4">
                Fugleteamet
              </Typography>
              <Avatar
                      src="/images/org/fugleteamet-logo.jpg"
                      alt="Organisasjonslogo"
                      sx={{ width: "150px !important", height: "50px !important" }}
                    />
              <Typography variant="body1" className="px-1 pt-4">
                Reistrert: 23.03.2026
              </Typography>
              <Typography variant="body1" className="px-1 pt-4">
                Organisasjonsnummer: 2928 289 322
              </Typography>
              <Typography variant="body1" className="px-1 pt-4">
                Adresse: Portveien 3, 0674 OSLO
              </Typography>
              <Typography variant="body1" className="px-1 pt-4">
                Medlemmer registrert: 8
              </Typography>
              <Typography variant="body1" className="px-1 pt-4">
                Antall dyreprofiler: 17
              </Typography>
              <Typography variant="body1" className="px-1 pt-4">
                Antall matcher: 13
              </Typography>
                
              </Box>

              <Box className="flex justify-end mt-4">
                <Button variant="contained">Rediger organisasjon</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid container size={12} spacing={1}>

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