module.exports = {
    PORT: process.env.PORT || 3200,
    CONNECT_PSQL: process.env.DATABASE_URL || "postgresql://postgres@localhost:5432/users-db",
    SECRET_TOKEN: "miclavedetokens",
    // To make the JWT more efficient we need 3 things:
    Issuer: "Clifford-UN", // Issuer (Software organization who issues the token)
    Audience: "Clifford-UN", // Audience (Domain within which this token will live and function)
    Expiration_Time: "20m",
    Algorithm: "HS256"
}