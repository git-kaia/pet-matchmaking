import { Link } from "react-router-dom";
import { Breadcrumbs, Button, Card, CardActionArea, CardContent, Grid, Tooltip, Typography } from "@mui/material";

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

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
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

      <Grid container size={12} spacing={1}>

        

        <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/org/info">
              <Typography variant="h6" className="card-title px-4 pt-4">
                Organisasjonsnavn
              </Typography>
              <Typography variant="body1" className="px-4 pt-4">
                Reistrert: 23.03.2026
              </Typography>
              <Typography variant="body1" className="px-4 pt-4">
                Organisasjonsnummer: 2928 289 322
              </Typography>
              <Typography variant="body1" className="px-4 pt-4">
                Medlemmer registrert: 8
              </Typography>
              <Typography variant="body1" className="px-4 pt-4">
                Antall dyreprofiler: 17
              </Typography>
              <Typography variant="body1" className="px-4 pt-4">
                Antall matcher: 13
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>

      </Grid>
    </Grid>
  );
}