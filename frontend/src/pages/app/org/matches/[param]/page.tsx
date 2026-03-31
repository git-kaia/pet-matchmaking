import { Link, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";

export default function Page() {
  const { matchid } = useParams();

  const matches: Record<string, any> = {
    "match-luna-adoptant1": {
      matchId: "match-luna-adoptant1",
      score: 97,
      adoptant: {
        name: "Ola Normann",
        image: "/images/avatars/avatar-2.jpg",
        link: "/adoptant/profile",
      },
      animal: {
        name: "Luna",
        image: "/images/org/animals/luna.jpg",
        link: "/org/animals/luna",
        art: "Nymfeparakitt",
        alder: "1 år",
        kjonn: "Hunn",
      },
      criteria: [
        { label: "Erfaring", description: "Adoptanten har erfaring med fugl." },
        { label: "Aktivitet", description: "God match mellom aktivitetsnivå." },
      ],
    },
  };

  const match = matches[matchid || ""];

  if (!match) {
    return (
      <Typography variant="h6" sx={{ mt: 4 }}>
        Fant ikke matchen.
      </Typography>
    );
  }

  return (
    <Grid container spacing={5}>
      {/* HEADER */}
      <Grid container spacing={2.5} className="w-full">
        <Grid item xs={12} md="grow">
          <Typography variant="h1">
            Match: {match.adoptant.name} &amp; {match.animal.name}
          </Typography>

          <Breadcrumbs>
            <Link to="/org/dashboard">Dashboard</Link>
            <Link to="/org/matches">Matcher</Link>
            <Typography>{match.matchId}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* CONTENT */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent className="flex flex-col gap-6">
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                ❤️ {match.score}% match
              </Typography>

              <Divider />

              {/* IMAGES */}
              <Box className="flex gap-4 items-center">
                <img
                  src={match.adoptant.image}
                  alt={match.adoptant.name}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <img
                  src={match.animal.image}
                  alt={match.animal.name}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </Box>

              <Divider />

              {/* DETAILS */}
              <Box>
                <Typography variant="h6">Matchkriterier</Typography>

                {match.criteria.map((c: any, i: number) => (
                  <Box key={i} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2">{c.label}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {c.description}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider />

              {/* ORG ACTIONS */}
              <Box className="flex gap-3">
                <Button variant="contained">Kontakt adoptant</Button>
                <Button variant="outlined" color="error">
                  Slett match
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}