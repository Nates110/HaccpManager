package it.nates.server.users
import it.nates.server.users.User
import java.time.LocalDate

data class UserDTO(
    val email: String,
    val username: String,
    val name: String?,
    val city: String?,
    val region: String?,
    val phoneNumber: String?,
    val dateOfBirth: LocalDate?,
    val manager:Boolean
)

fun User.toDTO(): UserDTO {
    return UserDTO(email, username, name,city, region, phoneNumber, dateOfBirth,manager)
}
