package it.nates.server.frigoriferi

import it.nates.server.users.UserRepository
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
@Transactional
class FrigoriferoServiceImpl(private val frigoriferoRepository: FrigoriferoRepository, private val userRepository: UserRepository):FrigoriferoService {
    override fun getAllByUser(userId: String): List<FrigoriferoDTO>? {
        val user=userRepository.findByIdOrNull(userId)
        return user?.let { frigoriferoRepository.findAllByUser(it) }
    }

    override fun addFrigorifero(newFrigorifero: Frigorifero, userId: String): ResponseEntity<Frigorifero> {
        val user=userRepository.findByIdOrNull(userId)
        newFrigorifero.user=user!!
        val savedFrig=frigoriferoRepository.save(newFrigorifero)
        return ResponseEntity(savedFrig,HttpStatus.CREATED)

    }

    override fun deleteFrigorifero(id: Long) {
        frigoriferoRepository.deleteById(id)
    }
}