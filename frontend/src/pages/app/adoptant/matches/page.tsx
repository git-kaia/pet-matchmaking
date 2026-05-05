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
  const adopterId = "ideal_experienced_bird_owner";

  const [matches, setMatches] = useState<any[]>([]);
  const [pets, setPets] = useState<Record<string, any>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:3000/adopters/${adopterId}/matches`
        );
        const matchesData = await res.json();

        setMatches(matchesData);

        const petPromises = matchesData.map((m: any) =>
          fetch(`http://localhost:3000/pets/${m.petId}`).then((res) =>
            res.json()
          )
        );

        const petResults = await Promise.all(petPromises);

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
      {/* HEADER */}
      <Grid container spacing={2.5} className="w-full">
        <Grid size={{ xs: 12, lg: 4 }}>
          <Typography variant="h1">Mine matcher</Typography>

          <Breadcrumbs>
            <Link to="/adoptant/dashboard">Dashboard</Link>
            <Typography variant="body2">Matcher</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* MATCH CARDS */}
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
                      {/* ADOPTER IMAGE */}
                      <img
                        src="/images/avatars/avatar-2.jpg"
                        alt="Adoptant"
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                        }}
                      />

                      {/* PET IMAGE (FIXED) */}
                      <img
                        src={`/images/org/animals/${match.petId}.png`}
                        onError={(e: any) =>
                          (e.target.src =
                            "/images/org/animals/default.jpg")
                        }
                        alt={pet?.name || match.petId}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          objectFit: "cover",
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