package it.nates.server.frigoriferi

import it.nates.server.EntityBase
import it.nates.server.users.User
import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne

@Entity
class Frigorifero(
    @ManyToOne
    var user: User?,
    val name:String,
    val type:String

): EntityBase<Long>() {
}