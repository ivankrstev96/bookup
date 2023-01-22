package com.ivank.bookup.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProperties jwtProperties;
    private final UserDetailsService userDetailsService;

    public JwtTokenAuthenticationFilter(JwtProperties jwtProperties, UserDetailsService userDetailsService) {
        this.jwtProperties = jwtProperties;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        // tokens are passed in auth header:
        String header = request.getHeader(jwtProperties.getHeader());
        // validate the header and check the prefix:
        if (header == null || !header.startsWith(jwtProperties.getPrefix())) {
            filterChain.doFilter(request, response);
            return;
        }
        // ... if no token provided the user won't be authenticated (e.g. accessing public path)
        // ... if trying to access restricted path w/o token exception will be thrown
        // get token:
        String token = header.replace(jwtProperties.getPrefix(), "");
        try { // exceptions might throw when creating the claims e.g. expired token
            // validate token:
            Claims claims = Jwts.parser()
                    .setSigningKey(jwtProperties.getSecret().getBytes())
                    .parseClaimsJws(token)
                    .getBody();
            String username = claims.getSubject();
            if (username != null) {
                final UserDetails user = userDetailsService.loadUserByUsername(username);
                // create auth object to represent authenticated user:
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        username, null, user.getAuthorities()
                );
                Map<String, Object> details = new HashMap<>();
                details.put("user", user);
                auth.setDetails(details);
                // authenticate user:
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (Exception e) {
            // clear context if authentication failed
            SecurityContextHolder.clearContext();
        }

        // continue to next filter in filter chain
        filterChain.doFilter(request, response);
    }
}
