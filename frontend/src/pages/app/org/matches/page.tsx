import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";

import NiKnobs from "@/icons/nexture/ni-knobs";

export default function Page() {
  const matches = [
    {
      id: "match-luna-adoptant1",
      adoptantName: "Ola Normann",
      adoptantImage: "/images/avatars/avatar-2.jpg",
      animalName: "Luna",
      animalImage: "/images/org/animals/luna.jpg",
      score: 97,
    },
    {
      id: "match-milo-adoptant3",
      adoptantName: "Ola Normann",
      adoptantImage: "/images/avatars/avatar-2.jpg",
      animalName: "Milo",
      animalImage: "/images/org/animals/milo.jpg",
      score: 81,
    },
  ];

  return (
    <Grid container spacing={5}>
      {/* Header */}
      <Grid container spacing={2.5} className="w-full">
        <Grid xs={12} md={"grow"}>
          <Typography variant="h1">Matcher</Typography>

          <Breadcrumbs>
            <Link to="/org/dashboard">Dashboard</Link>
            <Typography variant="body2">Matcher</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid xs={12} md={"auto"} className="flex flex-row items-start gap-2">
          <Tooltip title="Sorter etter">
            <Button
              className="icon-only surface-standard"
              variant="surface"
              color="grey"
              startIcon={<NiKnobs size={"medium"} />}
            />
          </Tooltip>
        </Grid>
      </Grid>

      {/* Match cards */}
      <Grid container spacing={3}>
        {matches.map((match) => (
          <Grid key={match.id} xs={12} lg={4}>
            <Card>
              <CardActionArea
                component={Link}
                to={`/org/matches/${match.id}`}
              >
                <Typography variant="h6" className="px-4 pt-4">
                  {match.adoptantName} ↔ {match.animalName}
                </Typography>

                <CardContent>
                  <Box className="flex gap-3 mb-3">
                    <img
                      src={match.adoptantImage}
                      alt={match.adoptantName}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <img
                      src={match.animalImage}
                      alt={match.animalName}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ❤️ Match score: {match.score}%
                  </Typography>

                  <Button variant="text" size="small" className="mt-2">
                    Se match
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}