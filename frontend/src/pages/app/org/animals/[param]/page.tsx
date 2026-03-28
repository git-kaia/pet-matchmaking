import { Link, useParams } from "react-router-dom";
import { Breadcrumbs, Card, CardContent, Grid, Typography, Box, Divider } from "@mui/material";

export default function AnimalProfile() {
  const { dyrenavn } = useParams();

  // Midlertidig fugledata
  const animals: Record<string, any> = {
    luna: {
      name: "Luna",
      image: "/images/org/animals/luna.jpg",
      klasse: "Fugl",
      art: "Nymfeparakitt",
      alder: "1 år",
      kjonn: "Hunn",
      adresse: "Fugleveien 12",
      postnummer: "3045",
      poststed: "Drammen",
      beskrivelse:
        "Luna er en sosial og nysgjerrig nymfeparakitt som trives i rolige hjem med mye menneskelig kontakt.",
    },

    milo: {
      name: "Milo",
      image: "/images/org/animals/milo.jpg",
      klasse: "Fugl",
      art: "Undulat",
      alder: "2 år",
      kjonn: "Hann",
      adresse: "Papegøyeveien 45",
      postnummer: "0581",
      poststed: "Oslo",
      beskrivelse:
        "Milo er en aktiv og pratsom undulat som elsker leker og mental stimulering.",
    },

    kiwi: {
      name: "Kiwi",
      image: "/images/org/animals/kiwi.jpg",
      klasse: "Fugl",
      art: "Papegøye",
      alder: "4 år",
      kjonn: "Hunn",
      adresse: "Skogstien 9",
      postnummer: "2003",
      poststed: "Lillestrøm",
      beskrivelse:
        "Kiwi er svært intelligent og liker mye stimuli. Hun er sosial og trives i aktive hjem.",
    },
  };

  const animal = animals[(dyrenavn || "").toLowerCase()];

  if (!animal) {
    return (
      <Typography variant="h6" sx={{ mt: 4 }}>
        Fant ikke dyreprofil.
      </Typography>
    );
  }

  return (
    <Grid container spacing={5}>
      {/* HEADER */}
      <Grid container spacing={2.5} className="w-full">
        <Grid item xs={12} md={"auto"}>
          <Typography variant="h1">{animal.name}</Typography>

          <Breadcrumbs>
            <Link to="/org/dashboard">Dashboard</Link>
            <Link to="/org/animals">Dyreprofiler</Link>
            <Typography variant="body2">{animal.name}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* INNHOLD */}
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent className="flex flex-col gap-6">
              {/* BILDE */}
              <Box>
                <img
                  src={animal.image}
                  alt={animal.name}
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </Box>

              <Divider />

              {/* INFO */}
              <Box className="grid grid-cols-2 gap-4">
                <ProfileField label="Navn:" value={animal.name} />
                <ProfileField label="Klasse:" value={animal.klasse} />
                <ProfileField label="Art:" value={animal.art} />
                <ProfileField label="Alder:" value={animal.alder} />
                <ProfileField label="Kjønn:" value={animal.kjonn} />
                <ProfileField label="Adresse:" value={animal.adresse} />
                <ProfileField label="Postnummer:" value={animal.postnummer} />
                <ProfileField label="Poststed:" value={animal.poststed} />
              </Box>

              <Divider />

              {/* BESKRIVELSE */}
              <Box>
                <Typography variant="subtitle1" className="mb-1">
                  Beskrivelse
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {animal.beskrivelse}
                </Typography>
              </Box>

              <Divider />

              {/* MATCHER */}
              <Box>
                <Typography variant="h6" className="mb-1">
                  Matcher
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Matcher med mennesker kommer her senere.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    
    </Grid>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <Box className="flex flex-col">
      <Typography variant="caption" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value || "-"}
      </Typography>
    </Box>
  );
}