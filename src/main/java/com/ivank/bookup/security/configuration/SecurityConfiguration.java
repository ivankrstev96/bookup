package com.ivank.bookup.security.configuration;


import com.ivank.bookup.security.jwt.JwtProperties;
import com.ivank.bookup.security.jwt.JwtTokenAuthenticationFilter;
import com.ivank.bookup.security.jwt.JwtUsernameAndPasswordAuthenticationFilter;
import com.ivank.bookup.security.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfiguration {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtProperties jwtProperties;
    private final AuthenticationConfiguration authenticationConfiguration;

    public SecurityConfiguration(
            UserDetailsServiceImpl userDetailsService,
            JwtProperties jwtProperties,
            AuthenticationConfiguration authenticationConfiguration) {
        this.userDetailsService = userDetailsService;
        this.jwtProperties = jwtProperties;
        this.authenticationConfiguration = authenticationConfiguration;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(
                        (request, response, authException) ->
                                response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
                )
                .and()
                .addFilter(
                        getJwtUsernameAndPasswordAuthenticationFilter(
                                authenticationManager(authenticationConfiguration)
                        )
                )
                .addFilterAfter(
                        new JwtTokenAuthenticationFilter(jwtProperties, userDetailsService),
                        UsernamePasswordAuthenticationFilter.class
                )
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, jwtProperties.getUri())
                .permitAll()
                .antMatchers(HttpMethod.OPTIONS)
                .permitAll()
                .antMatchers(getPublicPaths())
                .permitAll()
                .anyRequest().authenticated();

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    private String[] getPublicPaths() {
        return new String[]{
                "/api/v1/users/register",
                "/api/v1/login",
                "/api/v1/public/**"
        };
    }

    private JwtUsernameAndPasswordAuthenticationFilter getJwtUsernameAndPasswordAuthenticationFilter(
            AuthenticationManager authenticationManager
    ) {
        JwtUsernameAndPasswordAuthenticationFilter jwtUsernameAndPasswordAuthenticationFilter = new JwtUsernameAndPasswordAuthenticationFilter(
                authenticationManager,
                jwtProperties
        );
        jwtUsernameAndPasswordAuthenticationFilter.setFilterProcessesUrl("/api/v1/login");
        return jwtUsernameAndPasswordAuthenticationFilter;
    }

}
