package it.nates.server.Temperatura

import it.nates.server.EntityBase
import it.nates.server.frigoriferi.Frigorifero
import it.nates.server.users.User
import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne

@Entity
class Temperatura(

    @ManyToOne
    var frigo:Frigorifero?,
    val day:Long,
    val month:Long,
    val year:Long




    ):EntityBase<Long>() {
}