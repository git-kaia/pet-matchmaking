import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Card, CardContent,  CardActionArea, Grid, Typography, } from "@mui/material";

function t(val: string) {
  const map: any = {
    low: "Lav",
    medium: "Moderat",
    high: "Høy",
    very_high: "Svært høy",

    very_small: "Svært liten",
    small: "Liten",
    medium_size: "Medium",
    large: "Stor",
    very_large: "Svært stor",

    beginner: "Nybegynner",
    experienced: "Erfaren",
    advanced: "Avansert",
  };

  return map[val] ?? val ?? "-";
}

export default function Page() {
  const [animals, setAnimals] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/pets")
      .then((res) => res.json())
      .then(setAnimals)
      .catch(console.error);
  }, []);

  console.log("ANIMALS:", animals);

  return (
    <Grid container spacing={5}>
      {/* HEADER */}
      <Grid>
        <Typography variant="h1">Dyreprofiler</Typography>

        <Breadcrumbs>
          <Link to="/org/dashboard">Dashboard</Link>
          <Typography>Dyreprofiler</Typography>
        </Breadcrumbs>
      </Grid>

      {/* LIST */}
      <Grid container spacing={3}>
        {animals.map((animal) => (
          <Grid key={animal.id} size={{ xs: 12, md: 4 }}>
            <Card>
              <CardActionArea component={Link} to={`/org/animals/${animal.id}`}>
                <CardContent>

                  {/* IMAGE */}
                  <img
                    src={`/images/org/animals/${animal.id}.png`}
                    onError={(e: any) =>
                      (e.target.src = "/images/org/animals/default.jpg")
                    }
                    style={{
                      width: "100%",
                      height: 275,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />

                  {/* NAME */}
                  <Typography variant="h6" mt={1}>
                    {animal.id}
                  </Typography>

                  {/* SPECIES */}
                  <Typography variant="body2">
                    Art: {animal.speciesId ?? "-"}
                  </Typography>

                  {/* CORE INFO */}
                  <Typography variant="body2">
                    Størrelse: {t(animal.size)}
                  </Typography>

                  <Typography variant="body2">
                    Støynivå: {t(animal.noiseLevel)}
                  </Typography>

                  <Typography variant="body2">
                    Sosialt behov: {t(animal.socialNeed)}
                  </Typography>

                  <Typography variant="body2">
                    Erfaring: {t(animal.experienceLevel)}
                  </Typography>

                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}