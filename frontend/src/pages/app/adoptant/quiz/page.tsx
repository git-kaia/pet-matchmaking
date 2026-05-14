import { Link } from "react-router-dom";

import { Breadcrumbs, Button, Card, CardContent, Grid, Tooltip, Typography, CardActionArea } from "@mui/material";

import NiCellsPlus from "@/icons/nexture/ni-cells-plus";
import NiKnobs from "@/icons/nexture/ni-knobs";

export default function Page() {
  return (
    <Grid container spacing={5}>
      {/* Header */}
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Kartlegging / quiz
          </Typography>

          <Breadcrumbs>
            <Link color="inherit" to="/adoptant/dashboard">
              Dashboard
            </Link>
            <Typography variant="body2">Quiz</Typography>
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

        <Grid size={{ lg: 4, xs: 12 }}>
          <Card>
            <Typography variant="h6" component="h6" className="card-title px-4 pt-4">
                Ta quiz – start kartlegging
              </Typography>
              <CardActionArea component={Link} to="/adoptant/quiz">
            <Button component={Link} to="/adoptant/quiz" className="text-left" color="inherit">
              Start
            </Button>
            </CardActionArea>
              <CardContent>
              </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Grid>
  );
}

