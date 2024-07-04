package it.nates.server.Temperatura

import it.nates.server.frigoriferi.Frigorifero
import it.nates.server.frigoriferi.FrigoriferoRepository


import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional

class TemperaturaServiceImpl(private val frigoriferoRepository: FrigoriferoRepository, private val temperaturaRepository: TemperaturaRepository):TemperaturaService {
   @Transactional
    override fun getAllByFrigoAndDate(frigoId: Long, month: Long, year: Long): List<TemperaturaDTO>? {
        val frigo=frigoriferoRepository.findByIdOrNull(frigoId)
        return frigo?.let { temperaturaRepository.findAllByFrigoAndMonthAndYear(it,month,year) }
    }

    @Transactional
    override fun addTemperatura(newTemp: Temperatura, frigoId: Long): ResponseEntity<Temperatura> {
        val frigo=frigoriferoRepository.findByIdOrNull(frigoId)
        newTemp.frigo=frigo!!
        val savedTemp=temperaturaRepository.save(newTemp)
        return ResponseEntity(savedTemp,HttpStatus.CREATED)

    }

    override fun deleteTemeperatura(id: Long) {
        temperaturaRepository.deleteById(id)
    }
}