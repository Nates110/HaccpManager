package it.nates.server.fonitori

import it.nates.server.users.User
import jakarta.annotation.Nullable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface FornitoreRepository :JpaRepository<Fornitore,String> {
    @Nullable
    fun findAllByUser(user: User):List<FornitoreDTO>?


}