package it.nates.server.users
import it.nates.server.users.User
import org.springframework.http.ResponseEntity

interface UserService {

    fun getAll(): List<UserDTO>

    fun getUser(email: String): UserDTO?

    fun getAllAgencies():List<UserDTO>

    fun getUserByUsername(nickname: String): UserDTO?

    fun addUser(newUser: User): ResponseEntity<User>

    fun updateUser(updatedUser: User): ResponseEntity<User>

    fun deleteUser(email: String)
}