package it.nates.server.frigoriferi

import it.nates.server.users.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface FrigoriferoRepository:JpaRepository<Frigorifero,Long> {
    fun findAllByUser(user: User):List<FrigoriferoDTO>?
}