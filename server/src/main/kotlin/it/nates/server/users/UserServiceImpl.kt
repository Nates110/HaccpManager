package it.nates.server.users
import it.nates.server.DuplicateProfileException
import it.nates.server.ProfileNotFoundException
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
@Transactional
class UserServiceImpl(private val userRepository: UserRepository): UserService {

    override fun getAll(): List<UserDTO> {
        return userRepository.findAll().map {
            it.toDTO()
        }
    }


    override fun getUser(email: String): UserDTO? {
        return userRepository.findByIdOrNull(email)?.toDTO() ?: throw ProfileNotFoundException()
    }

    override fun getAllAgencies(): List<UserDTO> {
        return userRepository.findAllByManager(false)
    }

    override fun getUserByUsername(username: String): UserDTO? {
        return userRepository.findByUsername(username)?.toDTO()
    }

    override fun addUser(newUser: User): ResponseEntity<User> {
        if (userRepository.existsById(newUser.email)) {
            throw DuplicateProfileException()
        }
        val savedUser = userRepository.save(newUser)
        return ResponseEntity(savedUser, HttpStatus.CREATED)
    }

    override fun updateUser(updatedUser: User): ResponseEntity<User> {
        if (!userRepository.existsById(updatedUser.email)) {
            throw ProfileNotFoundException()
        }
        val updateResult = userRepository.save(updatedUser)
        return ResponseEntity(updateResult, HttpStatus.OK)
    }

    override fun deleteUser(email: String) {
        try {
            userRepository.deleteById(email)
        } catch (e: Exception) {
            println("DELETE USER $email FAILED. REASON: $e")
        }
    }
}