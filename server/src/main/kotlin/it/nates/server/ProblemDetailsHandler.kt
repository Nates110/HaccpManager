package it.nates.server

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class ProblemDetailsHandler: ResponseEntityExceptionHandler() {
    @ExceptionHandler(AttachmentNotFoundException::class)
    fun handleAttachmentNotFound(e: AttachmentNotFoundException) = ProblemDetail
        .forStatusAndDetail( HttpStatus.NOT_FOUND, e.message!! )
    @ExceptionHandler(DuplicateAttachmentException::class)
    fun handleDuplicateAttachment(e: DuplicateAttachmentException) = ProblemDetail
        .forStatusAndDetail(HttpStatus.CONFLICT, e.message!! )

    @ExceptionHandler(InternNotFoundException::class)
    fun handleInternNotFound(e: InternNotFoundException) = ProblemDetail
        .forStatusAndDetail( HttpStatus.NOT_FOUND, e.message!! )
    @ExceptionHandler(DuplicateInternException::class)
    fun handleDuplicateIntern(e: DuplicateInternException) = ResponseEntity.status(HttpStatus.CONFLICT).body(ProblemDetail
        .forStatusAndDetail(HttpStatus.CONFLICT, e.message!! ))

    @ExceptionHandler(MessageNotFoundException::class)
    fun handleMessageNotFound(e: MessageNotFoundException) = ProblemDetail
        .forStatusAndDetail( HttpStatus.NOT_FOUND, e.message!! )
    @ExceptionHandler(DuplicateMessageException::class)
    fun handleDuplicateMessage(e: DuplicateMessageException) = ProblemDetail
        .forStatusAndDetail(HttpStatus.CONFLICT, e.message!! )

    @ExceptionHandler(ProductNotFoundException::class)
    fun handleProductNotFound(e: ProductNotFoundException) = ProblemDetail
        .forStatusAndDetail( HttpStatus.NOT_FOUND, e.message!! )
    @ExceptionHandler(DuplicateProductException::class)
    fun handleDuplicateProduct(e: DuplicateProductException) = ProblemDetail
        .forStatusAndDetail(HttpStatus.CONFLICT, e.message!! )

    @ExceptionHandler(TicketNotFoundException::class)
    fun handleTicketNotFound(e: TicketNotFoundException) = ProblemDetail
        .forStatusAndDetail( HttpStatus.NOT_FOUND, e.message!! )
    @ExceptionHandler(DuplicateTicketException::class)
    fun handleDuplicateTicket(e: DuplicateTicketException) = ProblemDetail
        .forStatusAndDetail(HttpStatus.CONFLICT, e.message!! )

    @ExceptionHandler(TicketStateHistoryNotFoundException::class)
    fun handleTicketStateHistoryNotFound(e: TicketStateHistoryNotFoundException) = ProblemDetail
        .forStatusAndDetail( HttpStatus.NOT_FOUND, e.message!! )
    @ExceptionHandler(DuplicateTicketStateHistoryException::class)
    fun handleDuplicateTicketStateHistory(e: DuplicateTicketStateHistoryException) = ProblemDetail
        .forStatusAndDetail(HttpStatus.CONFLICT, e.message!! )
    @ExceptionHandler(InvalidTicketStateHistoryException::class)
    fun handleInvalidTicketStateHistory(e: InvalidTicketStateHistoryException) = ProblemDetail
        .forStatusAndDetail(HttpStatus.BAD_REQUEST, e.message!! )

    @ExceptionHandler(ProfileNotFoundException::class)
    fun handleProfileNotFound(e: ProfileNotFoundException) = ProblemDetail
        .forStatusAndDetail( HttpStatus.NOT_FOUND, e.message!! )
    @ExceptionHandler(DuplicateProfileException::class)
    fun handleDuplicateProfile(e: DuplicateProfileException) = ResponseEntity.status(HttpStatus.CONFLICT).body(ProblemDetail
        .forStatusAndDetail(HttpStatus.CONFLICT, e.message!! ))

    @ExceptionHandler(InvalidInputException::class)
    fun handleInvalidInput(e: InvalidInputException) = ProblemDetail
        .forStatusAndDetail(HttpStatus.BAD_REQUEST, e.message!! )
}

class AttachmentNotFoundException: RuntimeException() {
    override val message: String?
        get() = "Attachment not found"
}

class DuplicateAttachmentException: RuntimeException() {
    override val message: String?
        get() = "Attachment is duplicate"
}

class InternNotFoundException: RuntimeException() {
    override val message: String?
        get() = "Intern not found"
}

class DuplicateInternException: RuntimeException() {
    override val message: String?
        get() = "Intern is duplicate"
}

class MessageNotFoundException: RuntimeException() {
    override val message: String?
        get() = "Message not found"
}

class DuplicateMessageException: RuntimeException() {
    override val message: String?
        get() = "Message is duplicate"
}

class ProfileNotFoundException: RuntimeException() {
    override val message: String?
        get() = "Profile not found"
}

class DuplicateProfileException: RuntimeException() {
    override val message: String?
        get() = "Profile is duplicate"
}

class DuplicateProductException: RuntimeException() {
    override val message: String?
        get() = "Product is duplicate"
}

class ProductNotFoundException: RuntimeException() {
    override val message: String?
        get() = "Product not found"
}

class TicketNotFoundException: RuntimeException() {
    override val message: String?
        get() = "Ticket not found"
}

class DuplicateTicketException: RuntimeException() {
    override val message: String?
        get() = "Ticket is duplicate"
}

class TicketStateHistoryNotFoundException: RuntimeException() {
    override val message: String?
        get() = "Ticket state history not found"
}

class DuplicateTicketStateHistoryException: RuntimeException() {
    override val message: String?
        get() = "Ticket state history is duplicate"
}

class InvalidTicketStateHistoryException: RuntimeException() {
    override val message: String?
        get() = "Ticket state history is not valid"
}

class InvalidInputException(private val msg: String?): RuntimeException() {
    override val message: String?
        get() = msg
}
