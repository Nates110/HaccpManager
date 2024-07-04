package it.nates.server.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource


@Configuration
@EnableWebSecurity
class WebSecurityConfig {
    @Autowired
    private lateinit var jwtAuthConverter: JwtAuthConverter
    @Bean
    @Throws(Exception::class)
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {

        http.authorizeHttpRequests()

            .requestMatchers(HttpMethod.POST, "/API/profiles").permitAll()
            .requestMatchers(HttpMethod.POST,"/API/agencies/").permitAll()
            .requestMatchers(HttpMethod.POST,"/API/fornitori/**").hasAnyRole(MANAGER, CLIENT)
            .requestMatchers(HttpMethod.POST,"/API/temperature/**").hasAnyRole(MANAGER,CLIENT)
            .requestMatchers(HttpMethod.DELETE,"/API/temperature/**").hasAnyRole(MANAGER,CLIENT)
            .requestMatchers(HttpMethod.GET,"/API/profiles/").hasAnyRole(MANAGER)
            .requestMatchers(HttpMethod.PUT,"/API/profiles/{email}").hasAnyRole(MANAGER, EXPERT, CLIENT)
            .requestMatchers(HttpMethod.POST,"/API/login").permitAll()
            .requestMatchers(HttpMethod.POST,"/API/user").permitAll()
            .requestMatchers(HttpMethod.GET, "/realms/").permitAll()
            .requestMatchers(HttpMethod.GET,"/API/**").authenticated()
            .requestMatchers(HttpMethod.POST,"/API/**").authenticated()
            .requestMatchers(HttpMethod.PUT,"/API/**").authenticated()
            .requestMatchers(HttpMethod.GET,"/**").permitAll()


        http.csrf().ignoringRequestMatchers("/API/**")
        http.oauth2ResourceServer()
            .jwt()
            .jwtAuthenticationConverter(jwtAuthConverter)
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        return http.build()
    }


    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource? {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = mutableListOf("http://localhost:3000/socket.io")
        //configuration.allowedMethods = mutableListOf("GET", "POST")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }


    companion object {
        const val MANAGER = "Manager"
        const val EXPERT = "Expert"
        const val CLIENT = "Client"
    }
}

