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
            Dashboard organisasjon
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" to="/org/dashboard">
              Dashboard
            </Link>
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

      <Grid container size={12} spacing={3}>

        {/* ➤ DYREPROFILER */}
        <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/org/animals">
              <Typography variant="h6" className="card-title px-4 pt-4">
                Dyreprofiler
              </Typography>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Se alle dyreprofiler, legg til nye, og administrer eksisterende.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* ➤ SE MATCHER */}
        <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/org/matches">
              <Typography variant="h6" className="card-title px-4 pt-4">
                Se matcher
              </Typography>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Se nye og tidligere matcher, med match-score og detaljer.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* ➤ ORGANISASJON */}
        <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/org/info">
              <Typography variant="h6" className="card-title px-4 pt-4">
                Organisasjon
              </Typography>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Administrer organisasjonens informasjon, org.nr., navn og mer.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

      </Grid>
    </Grid>
  );
}