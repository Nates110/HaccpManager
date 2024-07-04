package it.nates.server.fonitori

import it.nates.server.users.UserRepository

import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class FornitoreServiceImpl(private val fornitoreRepository: FornitoreRepository,private val userRepository: UserRepository):FornitoreService {
    override fun getAllByUser(userId:String): List<FornitoreDTO>? {
        val user=userRepository.findByIdOrNull(userId)
        return user?.let { fornitoreRepository.findAllByUser(it) }
    }
@Transactional
    override fun addFornitore(newFornitore: Fornitore,userId:String): ResponseEntity<Fornitore> {
        val user=userRepository.findByIdOrNull(userId)
        newFornitore.user=user!!
        val savedFornitore=fornitoreRepository.save(newFornitore)
        return ResponseEntity(savedFornitore, HttpStatus.CREATED)
    }

    override fun updateFornitore(updatedFornitore: Fornitore): ResponseEntity<Fornitore> {
        TODO("Not yet implemented")
    }

    override fun deleteFornitore(id: String) {
        fornitoreRepository.deleteById(id)
    }

}