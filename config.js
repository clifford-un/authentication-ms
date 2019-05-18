module.exports = {
    PORT: process.env.PORT || 3000,
    SECRET_TOKEN: "miclavedetokens",
    // To make the JWT more efficient we need 3 things:
    Issuer: "Clifford-UN", // Issuer (Software organization who issues the token)
    Audience: "Clifford-UN", // Audience (Domain within which this token will live and function)
    Expiration_Time: "30s",
    Algorithm: "HS256"
}