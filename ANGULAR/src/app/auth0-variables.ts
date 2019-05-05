interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
  }
 
  export const AUTH_CONFIG: AuthConfig = {
    clientID: 'J7yUk13170BXWjnw9giBtOt2g0RWRJqU',
    domain: 'pubs.eu.auth0.com',
    callbackURL: 'http://localhost:4200/callback'
  };