import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Divider,
  Avatar,
} from "@mui/material";

function mapValue(value: any) {
  const map: Record<string, string> = {
    high: "Høy",
    very_high: "Svært høy",
    medium: "Moderat",
    low: "Lav",
    none: "Ingen",

    part_time: "Deltid",
    full_time: "Fulltid",

    one_person: "Knytter seg til én person",
  };

  return map[value] ?? value ?? "-";
}

function Field({ label, value }: any) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={600}>{value ?? "-"}</Typography>
    </Box>
  );
}

export default function AdoptantProfileOrgView() {
  const { param: adopterId } = useParams();

  const [adopter, setAdopter] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [pets, setPets] = useState<Record<string, any>>({});

  useEffect(() => {
    async function load() {
      try {
        if (!adopterId) return;

        // 1. ADOPTER
        const res = await fetch(
          `http://localhost:3000/adopters/${adopterId}`
        );
        const adopterData = await res.json();
        setAdopter(adopterData);

        // 2. MATCHES
        const matchRes = await fetch(
          `http://localhost:3000/adopters/${adopterId}/matches`
        );

        const matchData = await matchRes.json();
        setMatches(matchData);

        // 3. PETS
        const petResults = await Promise.all(
          matchData.map(async (m: any) => {
            const res = await fetch(
              `http://localhost:3000/pets/${m.petId}`
            );
            return res.ok ? res.json() : null;
          })
        );

        const petMap: Record<string, any> = {};
        petResults.forEach((p) => {
          if (p?.id) petMap[p.id] = p;
        });

        setPets(petMap);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [adopterId]);

  if (!adopter) {
    return <Typography sx={{ mt: 4 }}>Laster adoptant...</Typography>;
  }

  return (
    <Grid container spacing={5}>

      {/* HEADER */}
      <Grid container spacing={2.5}>
        <Grid>
          <Typography variant="h1">{adopterId}</Typography>

          <Breadcrumbs>
            <Link to="/org/dashboard">Dashboard</Link>
            <Link to="/org/matches">Matcher</Link>
            <Typography>Adoptant</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* PROFILE CARD */}
      <Grid container size={12} spacing={3}>
        <Card>
          <CardContent className="flex flex-col gap-6">

            {/* TOP */}
            <Box className="flex items-center gap-4">
              <Avatar
                src={`/images/adoptants/${adopterId}.jpg`}
                onError={(e: any) => {
                    e.target.src = "/images/avatars/avatar-2.jpg";
                }}
                sx={{ width: 90, height: 90 }}
                />

              <Box>
                <Typography variant="h5" fontWeight={700}>
                  Adoptantprofil
                </Typography>
                <Typography color="text.secondary">
                  ID: {adopterId}
                </Typography>
              </Box>
            </Box>

            <Divider />

            {/* CORE DATA */}
            <Box className="grid grid-cols-4 gap-4">
              <Field label="Barn i husstanden" value={mapValue(adopter.kidsAge)} />
              <Field label="Har andre dyr" value={adopter.hasCurrentPets ? "Ja" : "Nei"} />
              <Field label="Arbeidssituasjon" value={mapValue(adopter.householdWorkPattern)} />
              <Field label="Daglig omsorgstid" value={`${adopter.dailyCareTime ?? "-"} min`} />
              <Field label="Alenetid" value={mapValue(adopter.aloneTimeHours)} />
              <Field label="Støytoleranse" value={mapValue(adopter.noiseToleranceLevel)} />
              <Field label="Rengjøringstoleranse" value={mapValue(adopter.cleaningTolerance)} />
              <Field label="Livsstabilitet" value={mapValue(adopter.lifeStability)} />
              <Field label="Forpliktelse" value={`${adopter.commitmentHorizonYears ?? "-"} år`} />
              <Field
                label="Erfaring"
                value={
                  adopter.experienceYears?.bird
                    ? `${adopter.experienceYears.bird} år`
                    : "Ingen"
                }
              />
              <Field label="Læringsvilje" value={mapValue(adopter.learningWillingness)} />
            </Box>

            <Divider />

            {/* PREFERENCES */}
            <Typography variant="h6">Preferanser</Typography>

            <Box className="grid grid-cols-3 gap-4">
              <Field label="Sosialitet" value={mapValue(adopter.desiredPetSociability)} />
              <Field label="Kos" value={mapValue(adopter.desiredPetAffectionLevel)} />
              <Field label="Atferdstoleranse" value={mapValue(adopter.problemBehaviorTolerance)} />
              <Field label="Interaksjon" value={mapValue(adopter.desiredHumanInteraction)} />
              <Field label="Bonding" value={mapValue(adopter.desiredBondingStyle)} />
              <Field label="Flere dyr" value={mapValue(adopter.willingnessMultipleBirds)} />
            </Box>

            <Divider />

            {/* CARE */}
            <Typography variant="h6">Fuglehold</Typography>

            <Box className="grid grid-cols-3 gap-4">
              <Field label="Søvnforhold" value={mapValue(adopter.sleepEnvironmentCommitment)} />
              <Field label="Fri flyging" value={mapValue(adopter.freeFlightExpectation)} />
              <Field label="Berikelse" value={mapValue(adopter.enrichmentCommitment)} />
              <Field label="Trening" value={mapValue(adopter.trainingInterest)} />
              <Field label="Diett" value={mapValue(adopter.dietComplexityTolerance)} />
              <Field label="Adopsjonsnivå" value={mapValue(adopter.adoptionComplexityTolerance)} />
            </Box>

            <Divider />

            {/* ============================= */}
            {/* MATCH HISTORY (NEW SECTION) */}
            {/* ============================= */}

            <Typography variant="h5">Matchhistorikk</Typography>

            <Box className="grid grid-cols-2 gap-4">
              {matches.map((m) => {
                const pet = pets[m.petId];

                return (
                  <Link
                    key={m.petId}
                    to={`/org/matches/${adopterId}__${m.petId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        p: 2,
                        border: "1px solid #eee",
                        borderRadius: 2,
                        transition: "0.2s",
                        "&:hover": { backgroundColor: "#fafafa" },
                      }}
                    >
                      <img
                        src={`/images/org/animals/${m.petId}.png`}
                        onError={(e: any) =>
                          (e.target.src =
                            "/images/org/animals/default.jpg")
                        }
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 10,
                          objectFit: "cover",
                        }}
                      />

                      <Box>
                        <Typography fontWeight={700}>
                          {pet?.name || m.petId}
                        </Typography>

                        <Typography variant="body2">
                          ❤️ {m.percentage}% match
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                );
              })}
            </Box>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}