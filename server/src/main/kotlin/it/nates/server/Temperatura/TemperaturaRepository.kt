package it.nates.server.Temperatura

import it.nates.server.frigoriferi.Frigorifero
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TemperaturaRepository:JpaRepository<Temperatura,Long> {
    fun findAllByFrigoAndMonthAndYear(frigo: Frigorifero, month: Long, year: Long):List<TemperaturaDTO>?
}