import { Link } from "react-router-dom";

import { Breadcrumbs, Button, Card, CardContent, Grid, Tooltip, Typography, CardActionArea } from "@mui/material";

import NiCellsPlus from "@/icons/nexture/ni-cells-plus";
import NiKnobs from "@/icons/nexture/ni-knobs";

export default function Page() {
  return (
    <Grid container spacing={5}>
      
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Dashboard adoptant
          </Typography>

          <Breadcrumbs>
            <Link color="inherit" to="/adoptant/dashboard">
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

       
        <Grid size={{ lg: 8, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/adoptant/quiz">
              <Typography variant="h6" component="h6" className="card-title px-4 pt-4">
                Ta quiz – start kartlegging
              </Typography>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Start kartleggingen og la oss finne de best egnede dyrematchene for deg.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        
        <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/adoptant/matches">
              <Typography variant="h6" component="h6" className="card-title px-4 pt-4">
                Se matcher
              </Typography>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Se dine personlige matcher og utforsk hvilke dyr som passer best.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        
        <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/adoptant/profile">
              <Typography variant="h6" component="h6" className="card-title px-4 pt-4">
                Min profil
              </Typography>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Se og rediger dine opplysninger og adopsjonspreferanser.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

      </Grid>
    </Grid>
  );
}

