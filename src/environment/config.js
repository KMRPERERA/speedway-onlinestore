const config = {
    development: {
      apiUrl: 'https://onlinestorebackend20250502182239.azurewebsites.net',
    }
  };
  
  const env = process.env.NODE_ENV || 'development';
  export default config[env];