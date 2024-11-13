import axios from 'axios';
import { logger } from '../middlewares/loggers.js';

// Grupo 1: EndPoints de app.js
const group1 = [
  { method: 'get', url: '/' },
  { method: 'get', url: '/api/sessions' },
  { method: 'get', url: '/api/products' },
  { method: 'get', url: '/api/carts' },
  { method: 'get', url: '/current' },
];

// Grupo 2: Interface EndPoints
const group2 = [
  { method: 'get', url: '/home' },
  { method: 'get', url: '/register' },
  { method: 'get', url: '/login' },
  { method: 'get', url: '/profile' },
  { method: 'get', url: '/products' },
  { method: 'get', url: '/chat' },
];

// Grupo 3:
const group3 = [
  { method: 'get', url: '/api/sessions/registerFail' },
  { method: 'get', url: '/api/sessions/logout' },
  { method: 'get', url: '/api/sessions/current' },
  { method: 'post', url: '/api/sessions/register', data: { firstName: "John", lastName: "travolta", email: "travoltajohn@hotmail.com", password: "Travoltiano", dateOfBirth: "1990-01-01" } },
  { method: 'wait', duration: 1000 }, // Espera 1 segundo antes de hacer el login
  { method: 'post', url: '/api/sessions/login', data: { email: "travoltajohn@hotmail.com", password: "Travoltiano" } },
];

let totalGetSuccessCount = 0; // Contador global para GET
let totalPostSuccessCount = 0; // Contador global para POST

async function checkEndpoint({ method, url, data }) {
  try {
    let response;
    if (method === 'get') {
      response = await axios.get(`http://localhost:8080${url}`);
      console.log(`GET Endpoint ${url}: OK - `, response.status);
      return { success: true, method }; // Devuelve éxito y método
    } else if (method === 'post') {
      response = await axios.post(`http://localhost:8080${url}`, data);
      console.log(`POST Endpoint ${url}: OK - `, response.status);
      return { success: true, method }; // Devuelve éxito y método
    }
  } catch (error) {
    console.error(`Error al acceder al endpoint ${url}:`, error.message);
    return { success: false }; // Devuelve false si hubo un error
  }
}

async function checkEndpoints(group) {
  let getSuccessCount = 0; // Contador local para GET exitosos
  let postSuccessCount = 0; // Contador local para POST exitosos

  for (const endpoint of group) {
    if (endpoint.method === 'wait') {
      await new Promise(resolve => setTimeout(resolve, endpoint.duration));
      continue; // Salta al siguiente ciclo
    }
    const result = await checkEndpoint(endpoint);
    if (result.success) {
      if (result.method === 'get') {
        getSuccessCount++; // Aumenta el contador para los GET exitosos
      } else if (result.method === 'post') {
        postSuccessCount++; // Aumenta el contador para los POST exitosos
      }
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Espera 0.5 segundos
  }

  // Devuelve los contadores de éxito de este grupo
  return { getSuccessCount, postSuccessCount };
}

export function startCheck() {
  return new Promise((resolve) => {
    logger.warn("INICIANDO CHEQUEOS DE ENDPOINTS...\n");

    setTimeout(async () => {
      logger.info("Chequeando ENDPOINTS Principales");
      const { getSuccessCount: group1GetSuccess, postSuccessCount: group1PostSuccess } = await checkEndpoints(group1);
      totalGetSuccessCount += group1GetSuccess; // Aumenta el contador global
      logger.info(`GET exitosos: ${group1GetSuccess}/${group1.length}\n`);

      logger.info("Chequeando ENDPOINTS de Interfaces");
      const { getSuccessCount: group2GetSuccess } = await checkEndpoints(group2);
      totalGetSuccessCount += group2GetSuccess; // Aumenta el contador global
      logger.info(`GET exitosos: ${group2GetSuccess}/${group2.length}\n`);

      logger.info("Chequeando SUB-ENDPOINTS");
      const { getSuccessCount: group3GetSuccess, postSuccessCount: group3PostSuccess } = await checkEndpoints(group3);
      totalGetSuccessCount += group3GetSuccess; // Aumenta el contador global
      totalPostSuccessCount += group3PostSuccess; // Aumenta el contador global

      // Calcular el total de GET en grupo 3
      const totalGetGroup3 = group3.filter(ep => ep.method === 'get').length;

      logger.info(`GET exitosos: ${group3GetSuccess}/${totalGetGroup3}`);
      logger.info(`POST exitosos: ${group3PostSuccess}/${(group3.filter(ep => ep.method === 'post').length)}`);

      // Total de todos los endpoints
      const totalGet = group1.filter(ep => ep.method === 'get').length + group2.filter(ep => ep.method === 'get').length + group3.filter(ep => ep.method === 'get').length;
      const totalPost = group1.filter(ep => ep.method === 'post').length + group2.filter(ep => ep.method === 'post').length + group3.filter(ep => ep.method === 'post').length;

      logger.info(`Total de GET exitosos: ${totalGetSuccessCount}/${totalGet}`);
      logger.info(`Total de POST exitosos: ${totalPostSuccessCount}/${totalPost}\n`); // Asegúrate de contar correctamente

      resolve(); // Resuelve la promesa cuando terminen los chequeos
    }, 5 * 1000); // 6 segundos de retraso antes de iniciar el chequeo
  });
}
