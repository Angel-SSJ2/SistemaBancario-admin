const corsOptions = {
    origin: true,
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization, x-token',
};

export { corsOptions };
