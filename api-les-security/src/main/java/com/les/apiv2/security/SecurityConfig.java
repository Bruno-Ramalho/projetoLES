package com.les.apiv2.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;

import com.les.apiv2.security.jwt.JwtAuthenticationFilter;
import com.les.apiv2.security.jwt.JwtAuthorizationFilter;
import com.les.apiv2.security.jwt.handler.UnauthorizedHandler;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UnauthorizedHandler unauthorizedHandler;

    @Autowired
    private AccessDeniedHandler accessDeniedHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        AuthenticationManager authManager = authenticationManager();
        
   //     http.csrf().disable().authorizeRequests()
//		.anyRequest().permitAll();
       
        http
        .authorizeRequests()
        .antMatchers(HttpMethod.POST, "/api/users/login").permitAll()
        .antMatchers(HttpMethod.POST, "/api/users/register").permitAll()
        .antMatchers(HttpMethod.PATCH, "/api/users/**").permitAll()
        .antMatchers(HttpMethod.PATCH, "/api/cupons/**").permitAll()
        .antMatchers("/v2/api-docs", "/configuration/*", "/swagger/*", "/webjars/*")
        .permitAll()
        .antMatchers(HttpMethod.GET, "/api/products/**").permitAll()
        .antMatchers(HttpMethod.PATCH, "/api/orders/**").permitAll()
        .anyRequest().authenticated()
        .and().csrf().disable()
        .addFilter(new JwtAuthenticationFilter(authManager))
        .addFilter(new JwtAuthorizationFilter(authManager, userDetailsService))
        .exceptionHandling()
        .accessDeniedHandler(accessDeniedHandler)
        .authenticationEntryPoint(unauthorizedHandler)
        .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        auth.userDetailsService(userDetailsService).passwordEncoder(encoder);
    }
    
    @Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/**.html", "/webjars/**", "/configuration/**");
	}

}
