package it.nates.server.users
import it.nates.server.users.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: JpaRepository<User, String> {
    fun findByUsername(username: String): User?
    //Manager is true if is a manger or false if is a basic user
    fun findAllByManager(value:Boolean):List<UserDTO>
}