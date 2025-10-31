const express = require("express");
require("dotenv").config();
const authRoutes = require('./routes/auth.routes');
const calificacionesRoutes = require("./routes/calificaciones.routes");
const caracteristicasRoutes = require("./routes/caracteristicas.routes");
const chatsRoutes = require("./routes/chats.routes");
const codigosRoutes = require("./routes/codigos.routes");
const comentariosRoutes = require("./routes/comentarios.routes");
const destinosRoutes = require("./routes/destinos.routes");
const feedsRoutes = require("./routes/feeds.routes");
const gustosRoutes = require("./routes/gustos.routes");
const invitacionRoutes = require("./routes/invitaciones.routes");
const lugarRoutes = require("./routes/lugares.routes");
const matchRoutes = require("./routes/matches.routes");
const membresiaRoutes = require('./routes/membresias.routes');
const metodoRoutes = require("./routes/metodos.routes");
const notificacionRoutes = require("./routes/notificaciones.routes");
const rolRoutes = require ("./routes/roles.routes");
const ubiRoutes = require("./routes/ubicaciones.routes")
const usuariosRoutes = require("./routes/usuarios.routes");
const viajeRoutes = require("./routes/viajes.routes")
const Tipo_calRoutes = require("./routes/tipo_calificaciones.routes")
const Tipo_docRoutes = require("./routes/tipo_documentos.routes")
const Tipo_turRoutes = require("./routes/tipo_turismos.routes")

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// CORS para permitir conexiones desde el frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Prefijo de la API montaje de las rutas
app.use("/api/calificaciones", calificacionesRoutes);
app.use("/api/caracteristicas", caracteristicasRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/codigos", codigosRoutes);
app.use("/api/comentarios", comentariosRoutes);
app.use("/api/destinos", destinosRoutes);
app.use("/api/feeds",feedsRoutes);
app.use("/api/gustos",gustosRoutes);
app.use("/api/invitaciones",invitacionRoutes);
app.use("/api/lugares", lugarRoutes);
app.use("/api/matches",matchRoutes);
app.use("/api/membresias", membresiaRoutes);
app.use("/api/metodos" , metodoRoutes);
app.use("/api/notificaciones" , notificacionRoutes);
app.use("/api/roles" , rolRoutes);
app.use("/api/ubicaciones", ubiRoutes);
app.use("/api/tipo_calificaciones", Tipo_calRoutes);
app.use("/api/tipo_documentos", Tipo_docRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/viajes", viajeRoutes);
app.use("/api/tipo_turismos ", Tipo_turRoutes);
app.use('/auth', authRoutes);

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
