package it.nates.server.security

data class NewUserDTO(
    val username: String,
    val password: String,
    val email: String,) {
}