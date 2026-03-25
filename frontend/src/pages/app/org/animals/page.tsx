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
            Dyreprofiler
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" to="/org/dashboard">
              Dashboard
            </Link>
            <Typography variant="body2">Dyreprofiler</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          
          <Tooltip title="Opprett ny dyreprofil">
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

        <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/org/animals">
              <Typography variant="h6" className="card-title px-4 pt-4">
                Dyreprofil 1 (navn)
              </Typography>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  BILDE
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Art: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Alder: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Kjønn: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Antall eiere: ...
                </Typography>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Deaktiver
                </Button>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Aktiver
                </Button>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Se matcher
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/org/animals">
              <Typography variant="h6" className="card-title px-4 pt-4">
                Dyreprofil 2 (navn)
              </Typography>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  BILDE
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Art: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Alder: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Kjønn: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Antall eiere: ...
                </Typography>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Deaktiver
                </Button>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Aktiver
                </Button>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Se matcher
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/org/animals">
              <Typography variant="h6" className="card-title px-4 pt-4">
                Dyreprofil 3 (navn)
              </Typography>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  BILDE
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Art: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Alder: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Kjønn: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Antall eiere: ...
                </Typography>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Deaktiver
                </Button>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Aktiver
                </Button>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Se matcher
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>


      <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/org/animals">
              <Typography variant="h6" className="card-title px-4 pt-4">
                Dyreprofil 4 (navn)
              </Typography>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  BILDE
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Art: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Alder: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Kjønn: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Antall eiere: ...
                </Typography>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Deaktiver
                </Button>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Aktiver
                </Button>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Se matcher
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <CardActionArea component={Link} to="/org/animals">
              <Typography variant="h6" className="card-title px-4 pt-4">
                Dyreprofil 5 (navn)
              </Typography>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  BILDE
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Art: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Alder: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Kjønn: ...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Antall eiere: ...
                </Typography>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Deaktiver
                </Button>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Aktiver
                </Button>
                <Button variant="text" color="primary" size="small" className="mt-2">
                  Se matcher
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

      </Grid>
    </Grid>
  );
}