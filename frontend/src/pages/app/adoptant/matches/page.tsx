import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  Box,
} from "@mui/material";

export default function Page() {
  const adopterId = "ideal_experienced_bird_owner"; // later: dynamic from auth/router

  const [matches, setMatches] = useState<any[]>([]);
  const [pets, setPets] = useState<Record<string, any>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Fetch matches
        const res = await fetch(
          `http://localhost:3000/adopters/${adopterId}/matches`
        );
        const matchesData = await res.json();

        setMatches(matchesData);

        // 2. Fetch pet details for each match
        const petPromises = matchesData.map((m: any) =>
          fetch(`http://localhost:3000/pets/${m.petId}`).then((res) =>
            res.json()
          )
        );

        const petResults = await Promise.all(petPromises);

        // 3. Convert to lookup object
        const petMap: Record<string, any> = {};
        petResults.forEach((pet) => {
          petMap[pet.id] = pet;
        });

        setPets(petMap);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <Grid container spacing={5}>
      {/* Header */}
      <Grid container spacing={2.5} className="w-full">
        <Grid size={{ xs: 12, lg: 4 }}>
          <Typography variant="h1">Mine matcher</Typography>

          <Breadcrumbs>
            <Link to="/adoptant/dashboard">Dashboard</Link>
            <Typography variant="body2">Matcher</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* Match cards */}
      <Grid container spacing={3}>
        {matches.map((match) => {
          const pet = pets[match.petId];

          return (
            <Grid key={match.petId} size={{ xs: 12, lg: 4 }}>
              <Card>
                <CardActionArea
                  component={Link}
                  to={`/adoptant/matches/${match.petId}`}
                >
                  <Typography variant="h6" className="px-4 pt-4">
                    Match med {pet?.name || match.petId}
                  </Typography>

                  <CardContent>
                    <Box className="flex gap-3 mb-3">
                      <img
                        src="/images/avatars/avatar-2.jpg"
                        alt="Adoptant"
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                        }}
                      />

                      <img
                        src={pet?.image || "/images/org/animals/default.jpg"}
                        alt={pet?.name}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                        }}
                      />
                    </Box>

                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ❤️ Match score: {match.percentage}%
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}