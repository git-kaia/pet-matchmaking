import { Link, useParams } from "react-router-dom";
import { Breadcrumbs, Card, CardContent, Grid, Typography, Box, Divider, Button } from "@mui/material";

export default function Page() {
  const { matchid } = useParams();

  // Mock match data
  const matches: Record<string, any> = {
    "match-luna": {
      matchId: "match-luna",
      score: 95,
      adoptant: {
        name: "Ola Normann",
        image: "/images/avatars/avatar-2.jpg",
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
        { label: "Aktivitetsnivå", description: "Begge foretrekker rolig miljø." },
        { label: "Plassbehov", description: "Hjemmet passer artens behov." },
        { label: "Sosial behov", description: "Begge matcher høyt på sosial interaksjon." },
      ],
    },
    "match-milo": {
      matchId: "match-milo",
      score: 82,
      adoptant: {
        name: "Ola Normann",
        image: "/images/avatars/avatar-2.jpg",
      },
      animal: {
        name: "Milo",
        image: "/images/org/animals/milo.jpg",
        link: "/org/animals/milo",
        art: "Undulat",
        alder: "2 år",
        kjonn: "Hann",
      },
      criteria: [
        { label: "Interesse", description: "Adoptanten ønsker en pratsom fugl." },
        { label: "Stell", description: "Godt samsvar mellom stell og tid." },
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
          <Typography variant="h1">Match med {match.animal.name}</Typography>

          <Breadcrumbs>
            <Link to="/adoptant/dashboard">Dashboard</Link>
            <Link to="/adoptant/matches">Matcher</Link>
            <Typography variant="body2">{match.matchId}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* CONTENT */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent className="flex flex-col gap-6">
              {/* SCORE */}
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
                <Typography variant="h6">Hvorfor ble dette en match?</Typography>

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

              <Button
                component={Link}
                to={match.animal.link}
                variant="contained"
              >
                Se dyreproil
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}