import Keycloak from 'keycloak-js';
import axios from 'axios';

class KeycloakService {
  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:9090',
      realm: 'spk',
      clientId: 'spk',
    });

    this.token = null;
    this.korisnikId = null;
  }

  async init(onAuthenticatedCallback) {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
      });

      if (authenticated) {
        this.token = this.keycloak.token;
        this.scheduleTokenRefresh();
        await this.handleUser();
        if (onAuthenticatedCallback) onAuthenticatedCallback();
      } else {
        console.error('Keycloak authentication failed');
      }
    } catch (error) {
      console.error('Error during Keycloak initialization:', error);
    }
  }


  async fetchUserFromBackend() {
    try {
      const response = await axios.get('/api/korisnik/uuid', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      this.korisnikId = response.data.id;
      localStorage.setItem('korisnikId', this.korisnikId);
      localStorage.setItem('token', this.token);

      console.log('Fetched korisnikId:', this.korisnikId);
      return true;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Korisnik nije registriran u bazi, treba ga registritati');
        return false;
      } else {
        console.error('Greška tokom fetchovanja korisnika:', error);
        throw error;
      }
    }
  }

  async registerNewUser() {
    const tokenParsed = this.decodeToken(this.token);

    const korisnikData = {
      ime: tokenParsed.given_name,
      prezime: tokenParsed.family_name,
      email: tokenParsed.email,
      datumRodenja: this.parseDate(tokenParsed.birthdate),
      brojTelefona: tokenParsed.phone,
      tipKorisnikaId: this.getUserType(tokenParsed), // iako ce uvijek reg korisnik biti employee, tj 3
      kcUuid: tokenParsed.sub
    };

    console.log('Podaci za registraciju korisnika:', korisnikData);

    try {
      const response = await axios.post('/api/korisnik', korisnikData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      this.korisnikId = response.data.id;
      localStorage.setItem('korisnikId', this.korisnikId);
      localStorage.setItem('token', this.token);

      console.log('Novi korisnik registrovan sa ID:', this.korisnikId);
    } catch (error) {
      console.error('Greška tokom registracije korisnika:', error);
    }
  }

  async handleUser() {
    try {
      const userExists = await this.fetchUserFromBackend();
      if (!userExists) {
        await this.registerNewUser();
      }
    } catch (error) {
      console.error('Greška tokom obrade korisnika:', error);
    }
  }

  
  scheduleTokenRefresh() {
    const refreshInterval = (this.keycloak.tokenParsed.exp * 1000 - Date.now()) - 5000; // 5 seconds before expiry
    setTimeout(async () => {
      try {
        await this.keycloak.updateToken(30); // Refresh token
        this.token = this.keycloak.token;
        this.scheduleTokenRefresh();
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }, refreshInterval);
  }

  getUserType(tokenParsed) {
    if(tokenParsed.realm_access.roles.includes('EMPLOYEE')) {
      localStorage.setItem('tipKorisnika', 'EMPLOYEE');
      return 3;
    } else if(tokenParsed.realm_access.roles.includes('MANAGER')) {
      localStorage.setItem('tipKorisnika', 'MANAGER');
      return 2;
    } else {
      localStorage.setItem('tipKorisnika', 'ADMIN');
      return 1;
    }
  }

  parseDate(date) {
    // from mm/dd/yyyy to yyyy-mm-dd
    const parts = date.split('/');
    return `${parts[2]}-${parts[0]}-${parts[1]}`;
  }

  decodeToken(token) {
    const payload = token.split('.')[1]; // Extract the payload part of the token
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe Base64 characters
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };


  logout() {
    this.keycloak.logout();
    localStorage.removeItem('korisnikId');
    localStorage.removeItem('token');
    localStorage.removeItem('tipKorisnika');
    console.log('User logged out');
  }

  isAuthenticated() {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.korisnikId;
  }
}

const keycloakService = new KeycloakService();
export default keycloakService;
